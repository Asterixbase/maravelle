-- ============================================================
-- Maravelle — Supabase PostgreSQL Schema
-- Region: eu-west-2 (London)
-- Run this in Supabase SQL Editor after creating the project
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";   -- for full-text search

-- ── ENUM types ────────────────────────────────────────────────────────────────

create type affiliate_network as enum ('awin', 'rakuten', 'cj', 'amazon');

create type product_category as enum (
  'women-fashion', 'men-fashion', 'beauty', 'homeware',
  'accessories', 'footwear', 'jewellery', 'fragrance'
);

create type conversion_status as enum ('pending', 'approved', 'rejected');

-- ── TABLES ────────────────────────────────────────────────────────────────────

-- 1. brands
create table brands (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  name            text not null,
  logo_url        text,
  hero_image_url  text,
  tagline         text,
  description     text,
  network         affiliate_network not null,
  merchant_id     text not null,
  is_active       boolean not null default true,
  featured_rank   smallint,
  created_at      timestamptz not null default now()
);

-- 2. products
create table products (
  id               uuid primary key default uuid_generate_v4(),
  brand_id         uuid not null references brands(id) on delete cascade,
  slug             text unique not null,
  name             text not null,
  description      text,
  category         product_category not null,
  subcategory      text,
  price_gbp        numeric(10,2) not null,
  sale_price_gbp   numeric(10,2),
  currency         char(3) not null default 'GBP',
  image_urls       text[] not null default '{}',
  affiliate_url    text not null,
  link_id          text unique not null,  -- short UUID for /r/:linkId
  in_stock         boolean not null default true,
  sizes            text[] not null default '{}',
  colours          text[] not null default '{}',
  material         text,
  tags             text[] not null default '{}',
  is_editors_pick  boolean not null default false,
  is_trending      boolean not null default false,
  is_new_arrival   boolean not null default true,
  click_count      integer not null default 0,
  conversion_count integer not null default 0,
  search_vector    tsvector generated always as (
    to_tsvector('english', coalesce(name,'') || ' ' || coalesce(description,'') || ' ' || array_to_string(tags,' '))
  ) stored,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index products_search_idx on products using gin(search_vector);
create index products_category_idx on products(category);
create index products_brand_idx on products(brand_id);
create index products_link_id_idx on products(link_id);
create index products_trending_idx on products(click_count desc) where in_stock = true;

-- 3. user_profiles (mirrors auth.users)
create table user_profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  email               text not null,
  display_name        text,
  avatar_url          text,
  consent_analytics   boolean not null default false,
  consent_marketing   boolean not null default false,
  created_at          timestamptz not null default now()
);

-- 4. wishlist_items
create table wishlist_items (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  uuid not null references products(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique(user_id, product_id)
);

create index wishlist_user_idx on wishlist_items(user_id);

-- 5. affiliate_clicks
create table affiliate_clicks (
  id          uuid primary key default uuid_generate_v4(),
  link_id     text not null,
  product_id  uuid references products(id) on delete set null,
  user_id     uuid references auth.users(id) on delete set null,
  session_id  text not null,
  ip_hash     text not null,
  user_agent  text,
  referer     text,
  country     char(2),
  clicked_at  timestamptz not null default now()
);

create index clicks_link_id_idx on affiliate_clicks(link_id);
create index clicks_clicked_at_idx on affiliate_clicks(clicked_at desc);

-- 6. affiliate_conversions
create table affiliate_conversions (
  id                    uuid primary key default uuid_generate_v4(),
  click_id              uuid references affiliate_clicks(id) on delete set null,
  network               affiliate_network not null,
  order_id              text not null,
  commission_gbp        numeric(10,2) not null,
  sale_amount_gbp       numeric(10,2) not null,
  status                conversion_status not null default 'pending',
  postback_received_at  timestamptz not null default now(),
  unique(network, order_id)
);

-- 7. editorial_posts
create table editorial_posts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  title           text not null,
  excerpt         text,
  body            text not null,
  cover_image_url text,
  author_name     text not null default 'Maravelle Editorial',
  tags            text[] not null default '{}',
  published_at    timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 8. brand_feed_runs (tracks Awin feed imports)
create table brand_feed_runs (
  id             uuid primary key default uuid_generate_v4(),
  brand_id       uuid not null references brands(id) on delete cascade,
  status         text not null default 'running',  -- running | success | failed
  products_added integer not null default 0,
  products_updated integer not null default 0,
  error_message  text,
  started_at     timestamptz not null default now(),
  finished_at    timestamptz
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────

alter table brands enable row level security;
alter table products enable row level security;
alter table user_profiles enable row level security;
alter table wishlist_items enable row level security;
alter table affiliate_clicks enable row level security;
alter table affiliate_conversions enable row level security;
alter table editorial_posts enable row level security;
alter table brand_feed_runs enable row level security;

-- Brands: public read
create policy "brands_public_read" on brands for select using (is_active = true);

-- Products: public read
create policy "products_public_read" on products for select using (in_stock = true);

-- User profiles: own row only
create policy "profiles_own" on user_profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- Wishlist: own rows only
create policy "wishlist_own" on wishlist_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Clicks: insert by anyone (anon tracking), read by service role only
create policy "clicks_insert" on affiliate_clicks for insert with check (true);

-- Editorial: public read
create policy "editorial_public_read" on editorial_posts for select using (true);

-- ── TRIGGERS ─────────────────────────────────────────────────────────────────

-- Auto-create user_profile on sign-up
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Update updated_at on products
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on products
  for each row execute procedure update_updated_at();

-- Increment click_count on product when a click is recorded
create or replace function increment_click_count()
returns trigger language plpgsql security definer as $$
begin
  if new.product_id is not null then
    update products set click_count = click_count + 1 where id = new.product_id;
  end if;
  return new;
end;
$$;

create trigger on_affiliate_click
  after insert on affiliate_clicks
  for each row execute procedure increment_click_count();

-- ── SEED: Initial brands ──────────────────────────────────────────────────────

insert into brands (slug, name, network, merchant_id, is_active, featured_rank, tagline) values
  ('john-lewis', 'John Lewis', 'awin', '1234', true, 1, 'Quality you can trust, style that endures'),
  ('marks-and-spencer', 'Marks & Spencer', 'awin', '5678', true, 2, 'The British icon of quality and style'),
  ('harrods', 'Harrods', 'rakuten', '9012', true, 3, 'The world's most famous department store'),
  ('fenwick', 'Fenwick', 'awin', '3456', true, 4, 'Luxury multi-brand retail at its finest');
