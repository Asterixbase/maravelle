-- ============================================================
-- Maravelle — Seed Data
-- Sample brands + products with Unsplash imagery
-- Replace with real Awin/Rakuten feed data once approved
-- ============================================================

-- ── Extra brands ──────────────────────────────────────────────────────────────
insert into brands (slug, name, network, merchant_id, is_active, featured_rank, tagline, description) values
  ('burberry', 'Burberry', 'awin', '2001', true, 5, 'Iconic British luxury since 1856', 'The quintessential British luxury brand, famous for its trench coats and signature check pattern.'),
  ('ralph-lauren', 'Ralph Lauren', 'awin', '2002', true, 6, 'American luxury with a British sensibility', 'Timeless American style elevated to luxury — from Polo to Purple Label.'),
  ('ted-baker', 'Ted Baker', 'awin', '2003', true, 7, 'Distinctly British with a quirky twist', 'London-born fashion brand known for its attention to detail and signature flourishes.'),
  ('reiss', 'Reiss', 'awin', '2004', true, 8, 'Modern luxury for the style-conscious', 'Contemporary British brand offering refined wardrobe essentials with a luxurious edge.'),
  ('mulberry', 'Mulberry', 'awin', '2005', true, 9, 'English leather goods of distinction', 'Somerset-born purveyor of the finest British leather handbags and accessories.'),
  ('paul-smith', 'Paul Smith', 'awin', '2006', true, 10, 'Classic with a twist', 'Sir Paul Smith''s eponymous brand: quintessentially British, always unexpected.'),
  ('hugo-boss', 'Hugo Boss', 'awin', '2007', true, 11, 'Modern sophistication', 'Global leader in premium and luxury fashion for the confident professional.'),
  ('allsaints', 'AllSaints', 'awin', '2008', true, 12, 'Rock and roll luxury', 'London-based brand fusing luxury materials with a distinctive rock-and-roll aesthetic.')
on conflict (slug) do nothing;

-- ── Women's Fashion ───────────────────────────────────────────────────────────

insert into products (brand_id, slug, name, description, category, price_gbp, sale_price_gbp, image_urls, affiliate_url, link_id, in_stock, sizes, colours, tags, is_editors_pick, is_trending, is_new_arrival) values

-- Burberry Trench Coat
((select id from brands where slug = 'burberry'),
 'burberry-classic-trench-coat-honey',
 'The Classic Trench Coat',
 'The original Burberry trench coat in signature honey. Cut in a relaxed silhouette from our iconic gabardine fabric — the same innovative material Thomas Burberry created in 1879. Features the distinctive double-breasted front, storm shield and epaulettes.',
 'women-fashion', 1890.00, null,
 ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&q=80'],
 'https://www.burberry.com', 'brby-trench-001', true,
 ARRAY['XS','S','M','L','XL'], ARRAY['Honey','Black','Navy'],
 ARRAY['trench coat','outerwear','iconic','british','classic'],
 true, true, false),

-- Ralph Lauren Cashmere Sweater
((select id from brands where slug = 'ralph-lauren'),
 'ralph-lauren-cashmere-polo-navy',
 'Cashmere Polo Sweater',
 'Luxuriously soft pure cashmere polo sweater with the iconic embroidered Polo pony. An enduring wardrobe essential, woven in Italy from the finest Grade-A cashmere fibres.',
 'women-fashion', 425.00, 295.00,
 ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=750&fit=crop&q=80'],
 'https://www.ralphlauren.co.uk', 'rl-cashmere-001', true,
 ARRAY['XS','S','M','L'], ARRAY['Navy','Ivory','Camel','Forest Green'],
 ARRAY['cashmere','knitwear','polo','luxury','italian'],
 true, false, false),

-- Reiss Midi Dress
((select id from brands where slug = 'reiss'),
 'reiss-afia-fitted-midi-dress-black',
 'Afia Fitted Midi Dress',
 'A sleek fitted midi dress cut from stretch-crepe fabric for a flawless, figure-skimming silhouette. Features a subtle cowl neckline and midi-length hem — effortlessly elegant from desk to dinner.',
 'women-fashion', 225.00, null,
 ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=750&fit=crop&q=80'],
 'https://www.reiss.com', 'reiss-midi-001', true,
 ARRAY['4','6','8','10','12','14','16'], ARRAY['Black','Ivory','Navy'],
 ARRAY['midi dress','occasion','evening','elegant','crepe'],
 true, true, true),

-- Ted Baker Floral Dress
((select id from brands where slug = 'ted-baker'),
 'ted-baker-hannela-midi-dress-floral',
 'Hannela Floral Midi Dress',
 'A beautifully feminine midi dress adorned with Ted''s signature botanical print. Cut in a flowing fabric with a wrap-style bodice and flutter sleeves — quintessentially Ted.',
 'women-fashion', 185.00, 129.00,
 ARRAY['https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=600&h=750&fit=crop&q=80'],
 'https://www.tedbaker.com', 'ted-floral-001', true,
 ARRAY['0','1','2','3','4','5'], ARRAY['Floral Multi','Blue Floral'],
 ARRAY['floral','midi dress','summer','feminine','wrap'],
 false, true, true),

-- Marks & Spencer Cashmere
((select id from brands where slug = 'marks-and-spencer'),
 'ms-pure-cashmere-crew-camel',
 'Pure Cashmere Crew Neck Jumper',
 'Exceptional quality pure cashmere in a timeless crew-neck silhouette. Sustainably sourced and responsibly produced — M&S cashmere is renowned for its softness and durability.',
 'women-fashion', 149.00, null,
 ARRAY['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=750&fit=crop&q=80'],
 'https://www.marksandspencer.com', 'ms-cashmere-001', true,
 ARRAY['XS','S','M','L','XL','XXL'], ARRAY['Camel','Soft White','Black','Blush Pink','Sage'],
 ARRAY['cashmere','knitwear','crew neck','classic','sustainable'],
 false, false, false),

-- John Lewis Silk Blouse
((select id from brands where slug = 'john-lewis'),
 'jl-and-partners-silk-blouse-cream',
 '& Partners Silk Blouse',
 'Crafted from pure silk charmeuse, this fluid blouse drapes beautifully and transitions effortlessly from workwear to evening. An investment piece that improves with every wear.',
 'women-fashion', 89.00, 65.00,
 ARRAY['https://images.unsplash.com/photo-1589810264340-db7f03cf76cb?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=750&fit=crop&q=80'],
 'https://www.johnlewis.com', 'jl-silk-001', true,
 ARRAY['6','8','10','12','14','16','18'], ARRAY['Cream','Blush','Black','Navy'],
 ARRAY['silk','blouse','workwear','elegant','fluid'],
 false, false, true);

-- ── Men's Fashion ─────────────────────────────────────────────────────────────

insert into products (brand_id, slug, name, description, category, price_gbp, sale_price_gbp, image_urls, affiliate_url, link_id, in_stock, sizes, colours, tags, is_editors_pick, is_trending, is_new_arrival) values

-- Hugo Boss Suit
((select id from brands where slug = 'hugo-boss'),
 'hugo-boss-huge-slim-fit-suit-navy',
 'Huge Slim-Fit Suit',
 'Our bestselling Huge suit in a refined navy wool blend. Slim-fit cut with a structured shoulder — sharp enough for the boardroom, versatile enough for any occasion. Italian craftsmanship at its finest.',
 'men-fashion', 599.00, null,
 ARRAY['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600&h=750&fit=crop&q=80'],
 'https://www.hugoboss.com', 'boss-suit-001', true,
 ARRAY['36R','38R','40R','42R','44R','46R'], ARRAY['Navy','Charcoal','Black'],
 ARRAY['suit','tailoring','formal','wool','slim fit'],
 true, true, false),

-- Paul Smith Shirt
((select id from brands where slug = 'paul-smith'),
 'paul-smith-signature-stripe-shirt',
 'Signature Stripe Shirt',
 'Paul Smith''s iconic multi-stripe shirt — the design that launched a thousand imitations, never bettered. Cotton poplin with an elegant fit and the famous contrast cuff stripe.',
 'men-fashion', 165.00, null,
 ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop&q=80'],
 'https://www.paulsmith.com', 'ps-stripe-001', true,
 ARRAY['S','M','L','XL','XXL'], ARRAY['Multi Stripe','White Stripe'],
 ARRAY['shirt','stripe','paul smith','cotton','iconic'],
 true, false, false),

-- AllSaints Leather Jacket
((select id from brands where slug = 'allsaints'),
 'allsaints-milo-leather-biker-jacket-black',
 'Milo Leather Biker Jacket',
 'Our iconic biker jacket, crafted from smooth leather with a worn-in feel straight out of the box. Asymmetric zip closure, quilted shoulder panels and ribbed hem — a true AllSaints classic.',
 'men-fashion', 498.00, 349.00,
 ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=600&h=750&fit=crop&q=80'],
 'https://www.allsaints.com', 'as-biker-001', true,
 ARRAY['XS','S','M','L','XL','XXL'], ARRAY['Black','Brown'],
 ARRAY['leather jacket','biker','outerwear','iconic','rock'],
 false, true, true),

-- Ralph Lauren Oxford Shirt
((select id from brands where slug = 'ralph-lauren'),
 'ralph-lauren-slim-fit-oxford-shirt-white',
 'Slim Fit Oxford Shirt',
 'The definitive Oxford shirt — slim-fit cut in our signature cotton Oxford cloth with the embroidered Polo pony. A wardrobe cornerstone since 1967, perfected over decades.',
 'men-fashion', 95.00, null,
 ARRAY['https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=750&fit=crop&q=80'],
 'https://www.ralphlauren.co.uk', 'rl-oxford-001', true,
 ARRAY['S','M','L','XL','XXL'], ARRAY['White','Blue','Pink','Yellow'],
 ARRAY['shirt','oxford','polo','classic','slim fit'],
 false, false, true);

-- ── Beauty ────────────────────────────────────────────────────────────────────

insert into products (brand_id, slug, name, description, category, price_gbp, sale_price_gbp, image_urls, affiliate_url, link_id, in_stock, sizes, colours, tags, is_editors_pick, is_trending, is_new_arrival) values

-- Harrods Fragrance
((select id from brands where slug = 'harrods'),
 'harrods-beauty-oud-silk-edp-100ml',
 'Oud Silk Eau de Parfum 100ml',
 'An exclusive Harrods fragrance creation — warm oud wood entwined with silky rose absolute, white musk and creamy sandalwood. Bottled in a hand-cut crystal flacon, exclusively available at Harrods.',
 'fragrance', 295.00, null,
 ARRAY['https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=600&h=750&fit=crop&q=80'],
 'https://www.harrods.com', 'hrd-oud-001', true,
 ARRAY['50ml','100ml'], ARRAY[''],
 ARRAY['fragrance','oud','perfume','luxury','exclusive','harrods'],
 true, true, false),

-- John Lewis Beauty Set
((select id from brands where slug = 'john-lewis'),
 'jl-beauty-gift-set-skincare-collection',
 'Luxury Skincare Gift Collection',
 'A beautifully curated collection of premium skincare essentials — vitamin C serum, hyaluronic acid moisturiser and overnight repair mask — presented in a signature gift box. Perfect for gifting or treating yourself.',
 'beauty', 125.00, 89.00,
 ARRAY['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=750&fit=crop&q=80'],
 'https://www.johnlewis.com', 'jl-skincare-001', true,
 ARRAY[''], ARRAY[''],
 ARRAY['skincare','gift set','vitamin c','moisturiser','luxury beauty'],
 false, true, true),

-- M&S Candle
((select id from brands where slug = 'marks-and-spencer'),
 'ms-luxury-candle-neroli-white-tea',
 'Neroli & White Tea Luxury Candle',
 'Hand-poured in England from a pure soy wax blend, fragranced with neroli blossom, white tea and a hint of bergamot. Burns for up to 50 hours, presented in a reusable frosted glass vessel.',
 'beauty', 35.00, null,
 ARRAY['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1602928309038-57db2f04d059?w=600&h=750&fit=crop&q=80'],
 'https://www.marksandspencer.com', 'ms-candle-001', true,
 ARRAY[''], ARRAY['White','Black'],
 ARRAY['candle','soy wax','home fragrance','neroli','luxury'],
 false, false, true);

-- ── Homeware ──────────────────────────────────────────────────────────────────

insert into products (brand_id, slug, name, description, category, price_gbp, sale_price_gbp, image_urls, affiliate_url, link_id, in_stock, sizes, colours, tags, is_editors_pick, is_trending, is_new_arrival) values

-- John Lewis Linen Bedding
((select id from brands where slug = 'john-lewis'),
 'jl-premium-linen-duvet-cover-natural-king',
 'Premium Washed Linen Duvet Cover Set — King',
 'Stonewashed Belgian linen that gets softer with every wash. A 230-thread count weave with a beautifully relaxed texture — the gold standard in luxury bedding. Set includes duvet cover and two pillowcases.',
 'homeware', 185.00, null,
 ARRAY['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=750&fit=crop&q=80'],
 'https://www.johnlewis.com', 'jl-linen-001', true,
 ARRAY['Single','Double','King','Super King'], ARRAY['Natural','White','Sage','Blush'],
 ARRAY['bedding','linen','belgian linen','duvet cover','luxury home'],
 true, false, false),

-- Harrods Cashmere Throw
((select id from brands where slug = 'harrods'),
 'harrods-pure-cashmere-throw-camel',
 'Pure Cashmere Throw',
 'Woven from the finest Grade-A Mongolian cashmere, this sumptuous throw offers unrivalled warmth without weight. Finished with a hand-rolled edge and presented in a Harrods gift box.',
 'homeware', 450.00, null,
 ARRAY['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=750&fit=crop&q=80'],
 'https://www.harrods.com', 'hrd-throw-001', true,
 ARRAY[''], ARRAY['Camel','Ivory','Grey','Navy'],
 ARRAY['cashmere','throw','homeware','luxury','gift'],
 true, true, false),

-- M&S Tableware Set
((select id from brands where slug = 'marks-and-spencer'),
 'ms-maxim-12-piece-dinner-set-white',
 'Maxim 12-Piece Porcelain Dinner Set',
 'Fine porcelain with a smooth white glaze and subtle embossed rim — a timeless setting for every occasion. Dishwasher and microwave safe. Set includes 4 dinner plates, 4 side plates and 4 bowls.',
 'homeware', 79.00, 59.00,
 ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&h=750&fit=crop&q=80'],
 'https://www.marksandspencer.com', 'ms-dinner-001', true,
 ARRAY[''], ARRAY['White'],
 ARRAY['dinner set','porcelain','tableware','dining','kitchen'],
 false, false, true);

-- ── Accessories ───────────────────────────────────────────────────────────────

insert into products (brand_id, slug, name, description, category, price_gbp, sale_price_gbp, image_urls, affiliate_url, link_id, in_stock, sizes, colours, tags, is_editors_pick, is_trending, is_new_arrival) values

-- Mulberry Bag
((select id from brands where slug = 'mulberry'),
 'mulberry-bayswater-oak-natural-grain',
 'Bayswater in Oak Natural Grain Leather',
 'The Bayswater — Mulberry''s most iconic bag since 2003. Structured silhouette in natural grain leather with the signature postman''s lock. Handcrafted at our Somerset factory, England.',
 'accessories', 1150.00, null,
 ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=750&fit=crop&q=80'],
 'https://www.mulberry.com', 'mul-bayswater-001', true,
 ARRAY['One Size'], ARRAY['Oak','Black','Tan','Burgundy'],
 ARRAY['handbag','leather','mulberry','british','luxury bag','iconic'],
 true, true, false),

-- Burberry Scarf
((select id from brands where slug = 'burberry'),
 'burberry-classic-check-cashmere-scarf',
 'Classic Check Cashmere Scarf',
 'The most recognisable scarf in the world. Woven from pure cashmere in our signature check — the same pattern that has defined British style since 1924. Finished with hand-rolled edges.',
 'accessories', 590.00, null,
 ARRAY['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=750&fit=crop&q=80',
       'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=750&fit=crop&q=80'],
 'https://www.burberry.com', 'brby-scarf-001', true,
 ARRAY['One Size'], ARRAY['Camel Check','Black Check','Grey Check'],
 ARRAY['scarf','cashmere','check','burberry','iconic','gift'],
 true, true, false);
