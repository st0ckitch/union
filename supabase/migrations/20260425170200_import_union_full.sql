-- =============================================================================
-- Imported from en.union.ru via scripts/scraper/scrape.mjs
-- Generated at 2026-04-25T17:02:00.883Z
-- 113 products
-- FX rate used: 1 RUB → 0.03 GEL
-- =============================================================================

-- Wipe previous union.ru imports (so re-running this is idempotent)
DELETE FROM public.products WHERE source_url LIKE '%union.ru%';

DO $$
DECLARE
  target_cat UUID;
  parent_cat UUID;
BEGIN
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'gloss';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FILO-60, LACCATO GLOSS / INVISIBLE', 'FILO-60, LACCATO GLOSS / INVISIBLE', 'filo-60-laccato-gloss-invisible-6064',
    'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Алюминиевая кромка. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Алюминиевая кромка. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    3150, target_cat, '{"https://www.union.ru/upload/iblock/765/70ibb0sca2n2zul0q2bcma1f2dfzb5sw/2-_-FILO-Gloss.jpg","https://www.union.ru/upload/iblock/a22/ur0yihdqvvvybqhbwl0lb8tjfrpyapo6/2-_-FILO-Gloss-1600x1600.jpg","https://www.union.ru/upload/iblock/ec2/4p2wysaetmffo7geoacqpbgpmyf3hgq2/Piatto.png","https://www.union.ru/upload/iblock/b2c/1wjpqlkb17kdf7e4mxza0h8sov8fczxt/FILO-Entry-Bianco.jpg","https://www.union.ru/upload/iblock/acc/qndy3whnicpr02pwf30k8bllxgui0k68/chameleon_new_60Al_Out_2_.jpg","https://www.union.ru/upload/iblock/2a0/vlibocnchlbg5v9gm1w3n0qtpxyp1bhr/_%20сечение%20DECO%20Filo%2060%20alu%20out.png","https://www.union.ru/upload/iblock/c6a/rjh22v7qzfl6qzqa1lzhzbzwietaykss/_Planar_OUT_laccato_2.jpg","https://www.union.ru/upload/iblock/9ad/3a9x5aavd9581clju68xfgkrc020rv1b/undoor_45.jpg"}',
    '{"thickness":"6 см","hinges":"- скрытые INVISTA или OTLAV made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 100 х 350 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Piatto"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/filo-60-laccato-gloss-invisible-6064'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'enamel';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FILO-60, LACCATO / INVISIBLE', 'FILO-60, LACCATO / INVISIBLE', 'filo-60-laccato-invisible-5303',
    'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Опции – алюминиевый молдинг на полотне. Опции – алюминиевая кромка. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБ', 'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Опции – алюминиевый молдинг на полотне. Опции – алюминиевая кромка. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБ',
    1890, target_cat, '{"https://www.union.ru/upload/iblock/688/3kegkzmkbgoxduerh2bw14dzn56nh1ct/_-Filo-05.jpg","https://www.union.ru/upload/iblock/99d/19ysj75xbw8hhyvxmltx5tys8sayp0zk/_-Filo-1600x1600.jpg","https://www.union.ru/upload/iblock/ec2/4p2wysaetmffo7geoacqpbgpmyf3hgq2/Piatto.png","https://www.union.ru/upload/iblock/b2c/1wjpqlkb17kdf7e4mxza0h8sov8fczxt/FILO-Entry-Bianco.jpg","https://www.union.ru/upload/iblock/acc/qndy3whnicpr02pwf30k8bllxgui0k68/chameleon_new_60Al_Out_2_.jpg","https://www.union.ru/upload/iblock/0a2/yzyj4hjcv2motuo5g7uzccf70ip6mowh/UNIWOOD-1%2027-11-25.png","https://www.union.ru/upload/iblock/c6a/rjh22v7qzfl6qzqa1lzhzbzwietaykss/_Planar_OUT_laccato_2.jpg","https://www.union.ru/upload/iblock/2a0/vlibocnchlbg5v9gm1w3n0qtpxyp1bhr/_%20сечение%20DECO%20Filo%2060%20alu%20out.png"}',
    '{"thickness":"6 см","hinges":"- скрытые INVISTA или OTLAV made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 100 х 350 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Piatto"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/filo-60-laccato-invisible-5303'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'hidden-paintable';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FILO-60, FONDO / INVISIBLE', 'FILO-60, FONDO / INVISIBLE', 'skrytaya-dever-pod-pokrasky',
    'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Опции – алюминиевая кромка. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Опции – алюминиевая кромка. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    1500, target_cat, '{"https://www.union.ru/upload/iblock/042/5e4o3t3hhksyg83caj79dfado40reglf/new.jpg","https://www.union.ru/upload/iblock/3d3/9e37e92ykif9ar6plewz68dq6rb76y8b/_-Fondo-1600x1600.jpg","https://www.union.ru/upload/iblock/acc/qndy3whnicpr02pwf30k8bllxgui0k68/chameleon_new_60Al_Out_2_.jpg","https://www.union.ru/upload/iblock/c6a/rjh22v7qzfl6qzqa1lzhzbzwietaykss/_Planar_OUT_laccato_2.jpg","https://www.union.ru/upload/iblock/2a0/vlibocnchlbg5v9gm1w3n0qtpxyp1bhr/_%20сечение%20DECO%20Filo%2060%20alu%20out.png","https://www.union.ru/upload/iblock/f1f/5h2f3ubrlpx753kscnu7f10wx0xbto2i/Короб%20INVISIBLE-03%20сжат.png.webp","https://www.union.ru/upload/iblock/801/qgfrr4mjrezv3mt5bizofq725ctcnj1w/Короб%20INVISIBLE-02%20сжат.png.webp"}',
    '{"thickness":"6 см","hinges":"- скрытые INVISTA или OTLAV made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 100 х 350 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/skrytaya-dever-pod-pokrasky'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'natural-veneer';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FILO-60, Vento / INVISIBLE', 'FILO-60, Vento / INVISIBLE', 'filo-60-veneer-invisible-6193',
    'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Опции – алюминиевый молдинг на полотне. Опции – алюминиевая кромка. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБ', 'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Опции – алюминиевый молдинг на полотне. Опции – алюминиевая кромка. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБ',
    2700, target_cat, '{"https://www.union.ru/upload/iblock/fb4/bqyirzvdtjte0apuvs66oja0bblhtz19/_-VENTO-05.jpg","https://www.union.ru/upload/iblock/6ee/dx2trxbcck8yr02z1vshk4k2hogj5s5w/FILO_60-Vento-INVISIBLE-1600.png","https://www.union.ru/upload/iblock/dc8/uhuwkkv0wi6mjvb9vr9gex9kps7fx541/1-FILO-Vento-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/4d7/nnmk3txltzqcj082exx274wepw5hs8rm/FILO-Entry-Noce-Canaletto_1.jpg","https://www.union.ru/upload/iblock/72b/cfnglq63ow1buh6p08ccd1fxtvc8hxut/2-FILO-Velino-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/cc5/ipsy35k10duxmg1447awmcsqc9yljn09/3-FILO-Vetta-Noce-Cnaletto.jpg","https://www.union.ru/upload/iblock/716/p0p8aedu7emfaxaevuv4h3b9cxpllzjy/4-FILO-Valetti-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/7b5/2siqmv99k8pski41iasl8ooz68u8lf2k/5-FILO-Vezana-Noce-Canaletto.jpg"}',
    '{"thickness":"6 см","hinges":"– скрытые INVISTA или OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 100 х 350 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Vento"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/filo-60-veneer-invisible-6193'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'affordable-quality';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIX-45 - doors on an aluminum box with a trim', 'UNIX-45 - doors on an aluminum box with a trim', 'unix-45-s',
    'Полотно UNIX-45 Каркас полотна из закаленного алюминия в чёрном цвете защищает полотно по периметр. Панели HDF увеличенной толщины 8 мм придают конструкции максимальную жёсткость. Антивандальное покрытие, устойчивое к царапинам (DRY SKIN, Neve (Белый)). Петли видимые в чёрном цвете. Замок - бесшумный магнитный AGB, made in Italy. Размеры – 600/700/800/900 x 2000/2100/2400 мм. Короб U-SYSTEM Сверхнадежный короб-моноблок представляет собой единую конструкцию с наличником. Выполнен из закаленного анодированного алюминия в чёрном цвете. Не подвержен деформациям и устойчив к влаге. Надежное соединение наличников под 45°. Износостойкий, суперэластичный уплотнитель DEVENTER (made in Germany). Дополнительный уплотнитель в наличнике – идеальное прилегание к стене. Компланарность полотна с наличника', 'Полотно UNIX-45 Каркас полотна из закаленного алюминия в чёрном цвете защищает полотно по периметр. Панели HDF увеличенной толщины 8 мм придают конструкции максимальную жёсткость. Антивандальное покрытие, устойчивое к царапинам (DRY SKIN, Neve (Белый)). Петли видимые в чёрном цвете. Замок - бесшумный магнитный AGB, made in Italy. Размеры – 600/700/800/900 x 2000/2100/2400 мм. Короб U-SYSTEM Сверхнадежный короб-моноблок представляет собой единую конструкцию с наличником. Выполнен из закаленного анодированного алюминия в чёрном цвете. Не подвержен деформациям и устойчив к влаге. Надежное соединение наличников под 45°. Износостойкий, суперэластичный уплотнитель DEVENTER (made in Germany). Дополнительный уплотнитель в наличнике – идеальное прилегание к стене. Компланарность полотна с наличника',
    900, target_cat, '{"https://www.union.ru/upload/iblock/bf3/2iwvlo9i6f3gth26l2xuc3153y3hmybv/UNIX_45-Contract-2400x1600.jpg","https://www.union.ru/upload/iblock/c84/26sombrm1nb59bzv2o58u7ex6ddxdrs4/UNIX-Contract-1-01.jpg","https://www.union.ru/upload/iblock/952/4w0yyw67gvpak5ynznasmkvivigkkr6e/UNIX-Contract-_-01.jpg","https://www.union.ru/upload/iblock/580/4iyko66cy4wuqryc2lktmleqm8lwfeeq/UNIX-Contract-_-02.jpg","https://www.union.ru/upload/iblock/04d/dq8yc7u5v1qc3ev4j6e76g6cf6h6k2cu/UNIX-Contract-_-03.jpg","https://www.union.ru/upload/iblock/904/9ly1vtr9l3oze8hhgztizp06iytxk6p2/-unix-_-_-2.jpg","https://www.union.ru/upload/iblock/430/mytuxcv1u3pu5q2i666v2lo29iffdnj9/Двери%20в%20наличии%2011-2024-1.png.webp"}',
    '{"hinges":"видимые в чёрном цвете","lock":"with a trim on the opening side in finish - AL08 Black","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"of the canvas and the box with the trim in the color AL08 Black","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/unix-45-s'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'affordable-quality';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIX-60 / INVISIBLE', 'UNIX-60 / INVISIBLE', 'unix-60-invisible-32321',
    'Полотно UNIX-60 Толщина 6 см. Структура – закаленный алюминий с 4-х сторон. Две панели HDF по 0,6 см. Отделка – Decorit. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 270 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIX-60 Толщина 6 см. Структура – закаленный алюминий с 4-х сторон. Две панели HDF по 0,6 см. Отделка – Decorit. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 270 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    2120, target_cat, '{"https://www.union.ru/upload/iblock/61e/4bozw0gq9st7837i956n33fmah0k5wj2/2-_-UNIX-2_2.jpg","https://www.union.ru/upload/iblock/27e/x3g5xresus3ke452hvr9rww3vp96stoa/2_UNIX_2_2_1600x1600.jpg","https://www.union.ru/upload/iblock/f36/24vlybs5zt5jhx53wnge4gwo30d35c6w/UNIX-Invisible-OUT-1600x1600.png","https://www.union.ru/upload/iblock/f68/j83cshda3vna2vfrahcm5yqlt4pxxjv3/UNIX-Planar-OUT-1600x1600.png","https://www.union.ru/upload/iblock/d56/cks13oqgpuc7jiqbf2efln09z093fblr/Короб%20INVISIBLE%20LUX-03%20сжат.png.webp","https://www.union.ru/upload/iblock/016/0jr0w3rcwbqzeqfu713gijeh5fc6ady6/Короб%20INVISIBLE-02%20сжат.png.webp"}',
    '{"thickness":"6 см","hinges":"- скрытые INVISTA или OTLAV made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 270 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL03 Soft Gold","material":"DC06 Noce Chiaro","made_in":"Italy","model":"Piatto"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/unix-60-invisible-32321'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SIGMA, 01 / INVISIBLE', 'SIGMA, 01 / INVISIBLE', 'sigma-01-invisible',
    'Полотно SIGMA Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / зеркало. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно SIGMA Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / зеркало. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    4200, target_cat, '{"https://www.union.ru/upload/iblock/b5a/75tx1ulf1ijylmvy3pv4bypuzx2qrupx/SIGMA-Sg-01.jpg","https://www.union.ru/upload/iblock/c83/f9bazk6n6mpp8g4d64jsxjnnl404aayk/SIGMA-01-INVIS-1600x1600.png","https://www.union.ru/upload/iblock/f27/77wymsoklgt9inwwitq07c4idobzf0oy/SIGMA-01.png","https://www.union.ru/upload/iblock/238/ysrxlc3agba4zs7y6k9orxx1i93i8tbz/SIGMA-02.png","https://www.union.ru/upload/iblock/34e/ncx1x9306wta1c2183xefnyjhuy8jhc5/SIGMA-03.png","https://www.union.ru/upload/iblock/df7/y082acp3fpjw0ww654yae9iqwcyo31jo/SLIM-INVISIB-1600x1600.jpg","https://www.union.ru/upload/iblock/706/o0p3mt1upsc7i2vuadz34xez1uhp118b/SLIM-PLANAR-1600x1600.jpg","https://www.union.ru/upload/iblock/f4e/c204ogre6z21ku2pgr300cgk4j4s550d/Короб%20INVISIBLE%20LUX-03%20сжат.png.webp"}',
    '{"hinges":"– AGB, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"01"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/sigma-01-invisible'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'stone-marble';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FILO-60, HPL / INVISIBLE', 'FILO-60, HPL / INVISIBLE', 'filo-60-hpl-invisible-28033',
    'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Опции – алюминиевая кромка. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно FILO-60 Толщина 6 см. Каркас – двойной брус. Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 350 см. Опции – алюминиевая кромка. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    2700, target_cat, '{"https://www.union.ru/upload/iblock/5a4/xc1iue137ge4k23y86qkm61c7kpy3yrg/2-_-FILO-Hpl.jpg","https://www.union.ru/upload/iblock/81e/ltz6ie3b79sora9aq871sc0mm0djaidj/2-_-FILO-Hpl-1600x1600.jpg","https://www.union.ru/upload/iblock/acc/qndy3whnicpr02pwf30k8bllxgui0k68/chameleon_new_60Al_Out_2_.jpg","https://www.union.ru/upload/iblock/2a0/vlibocnchlbg5v9gm1w3n0qtpxyp1bhr/_%20сечение%20DECO%20Filo%2060%20alu%20out.png","https://www.union.ru/upload/iblock/c6a/rjh22v7qzfl6qzqa1lzhzbzwietaykss/_Planar_OUT_laccato_2.jpg","https://www.union.ru/upload/iblock/135/h54wf34mzqzvdjgqbn3mx5h320c7cxjr/Короб%20INVISIBLE%20LUX-03%20сжат.png.webp","https://www.union.ru/upload/iblock/302/ejc5gmpqutwcuzia3x1yr7h1kwpk4d1x/Короб%20INVISIBLE-02%20сжат.png.webp"}',
    '{"thickness":"6 см","hinges":"- скрытые INVISTA или OTLAV made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 100 х 350 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","material":"HP04 Marmo Bianco","made_in":"Italy","model":"Piatto"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/filo-60-hpl-invisible-28033'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SIGMA, 02 / INVISIBLE', 'SIGMA, 02 / INVISIBLE', 'sigma-02-invisible',
    'Полотно SIGMA Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / зеркало. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно SIGMA Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / зеркало. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    4200, target_cat, '{"https://www.union.ru/upload/iblock/8b2/4t6oz9x39ryxeoop5o1fkjonbmmroxgm/SIGMA-02-INVIS-2400x1600.png","https://www.union.ru/upload/iblock/f6e/i18gw8pbjzzghl1c02g73ic25k0ecoi4/SIGMA-02-INVIS-1600x1600.png","https://www.union.ru/upload/iblock/238/ysrxlc3agba4zs7y6k9orxx1i93i8tbz/SIGMA-02.png","https://www.union.ru/upload/iblock/f27/77wymsoklgt9inwwitq07c4idobzf0oy/SIGMA-01.png","https://www.union.ru/upload/iblock/34e/ncx1x9306wta1c2183xefnyjhuy8jhc5/SIGMA-03.png","https://www.union.ru/upload/iblock/df7/y082acp3fpjw0ww654yae9iqwcyo31jo/SLIM-INVISIB-1600x1600.jpg","https://www.union.ru/upload/iblock/706/o0p3mt1upsc7i2vuadz34xez1uhp118b/SLIM-PLANAR-1600x1600.jpg","https://www.union.ru/upload/iblock/f72/6pm7aoy49mog5pf2r1fnpy4d1qz9lzh3/Короб%20INVISIBLE%20LUX-03%20сжат.png.webp"}',
    '{"hinges":"– AGB, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"02"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/sigma-02-invisible'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SLIM, Space, TRANSPARENT / INVISIBLE', 'SLIM, Space, TRANSPARENT / INVISIBLE', 'slim-transparent-invisible-28084',
    'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / зеркало. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / зеркало. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    3300, target_cat, '{"https://www.union.ru/upload/iblock/b9f/qvzan7ajoisw27rumggc4l8zqt8r5n5t/2-_-SLIM-Space-Sole.jpg","https://www.union.ru/upload/iblock/2f5/bfhpfflg7b595g04wvb8omlkmhym73jy/2-_-SLIM-Space-Sole-1600x1600.jpg","https://www.union.ru/upload/iblock/fc3/7408lyml1s7luymzxl2xfh18kuv7mku0/SLIM-Space.jpg","https://www.union.ru/upload/iblock/ee7/rxgj8ftref2fzwh9fmc9wyej4pp73m6b/SLIM-Tre_01.jpg","https://www.union.ru/upload/iblock/498/03419chdt2elkhv5e07m1v1ahp526b7q/SLIM-Quattro.jpg","https://www.union.ru/upload/iblock/7bb/g1mkypefzapillik713umknbc341avm5/SLIM-Radar.jpg","https://www.union.ru/upload/iblock/ddd/ng4yoth4jgk80h5d906w0tkbiy4sggwo/SLIM-Ritmo_1.jpg","https://www.union.ru/upload/iblock/df7/y082acp3fpjw0ww654yae9iqwcyo31jo/SLIM-INVISIB-1600x1600.jpg"}',
    '{"hinges":"– AGB, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"Space"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/slim-transparent-invisible-28084'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SIGMA, 03 / INVISIBLE', 'SIGMA, 03 / INVISIBLE', 'sigma-03-invisible',
    'Полотно SIGMA Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / зеркало. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно SIGMA Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / зеркало. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    4200, target_cat, '{"https://www.union.ru/upload/iblock/875/mzm4k7bnmk0orxmw3pmw5qk8i1c2yi8r/SIGMA-03-INVIS-2400x1600.png","https://www.union.ru/upload/iblock/b7c/91otw3t4ho07lqdhz9vj6i0qtdolyqob/SIGMA-03-INVIS-1600x1600.png","https://www.union.ru/upload/iblock/34e/ncx1x9306wta1c2183xefnyjhuy8jhc5/SIGMA-03.png","https://www.union.ru/upload/iblock/f27/77wymsoklgt9inwwitq07c4idobzf0oy/SIGMA-01.png","https://www.union.ru/upload/iblock/238/ysrxlc3agba4zs7y6k9orxx1i93i8tbz/SIGMA-02.png","https://www.union.ru/upload/iblock/df7/y082acp3fpjw0ww654yae9iqwcyo31jo/SLIM-INVISIB-1600x1600.jpg","https://www.union.ru/upload/iblock/706/o0p3mt1upsc7i2vuadz34xez1uhp118b/SLIM-PLANAR-1600x1600.jpg","https://www.union.ru/upload/iblock/ac7/npdv6b4c9lsxfs75yg5x22x0msag1qkb/Короб%20INVISIBLE%20LUX-03%20сжат.png.webp"}',
    '{"hinges":"– AGB, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"03"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/sigma-03-invisible'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SLIM, Tre, TRANSPARENT / INVISIBLE', 'SLIM, Tre, TRANSPARENT / INVISIBLE', 'slim-tre-transparent-invisible-16864',
    'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    3300, target_cat, '{"https://www.union.ru/upload/iblock/858/ondyjp02j9kowkbskwlorocd1a4prd6l/2-_-SLIM-Tre.jpg","https://www.union.ru/upload/iblock/30c/3ci0iotuwcwyv40l7dwribeximl7ug22/2-_-SLIM-Cinque-1600x1600.jpg","https://www.union.ru/upload/iblock/ee7/rxgj8ftref2fzwh9fmc9wyej4pp73m6b/SLIM-Tre_01.jpg","https://www.union.ru/upload/iblock/fc3/7408lyml1s7luymzxl2xfh18kuv7mku0/SLIM-Space.jpg","https://www.union.ru/upload/iblock/498/03419chdt2elkhv5e07m1v1ahp526b7q/SLIM-Quattro.jpg","https://www.union.ru/upload/iblock/7bb/g1mkypefzapillik713umknbc341avm5/SLIM-Radar.jpg","https://www.union.ru/upload/iblock/ddd/ng4yoth4jgk80h5d906w0tkbiy4sggwo/SLIM-Ritmo_1.jpg","https://www.union.ru/upload/iblock/df7/y082acp3fpjw0ww654yae9iqwcyo31jo/SLIM-INVISIB-1600x1600.jpg"}',
    '{"hinges":"– AGB, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"Tre"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/slim-tre-transparent-invisible-16864'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SLIM, Ritmo, TRANSPARENT / INVISIBLE', 'SLIM, Ritmo, TRANSPARENT / INVISIBLE', 'slim-ritmo-transparent-invisible-16903',
    'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    3300, target_cat, '{"https://www.union.ru/upload/iblock/265/yn9bd1v01ikep6fyq824cfxbpyugndy4/2-_-SLIM-Ritmo.jpg","https://www.union.ru/upload/iblock/408/dilhz4h7uswzii48z2pxrjsyxnwd1axk/2-_-SLIM-Ritmo-1600x1600.jpg","https://www.union.ru/upload/iblock/ddd/ng4yoth4jgk80h5d906w0tkbiy4sggwo/SLIM-Ritmo_1.jpg","https://www.union.ru/upload/iblock/fc3/7408lyml1s7luymzxl2xfh18kuv7mku0/SLIM-Space.jpg","https://www.union.ru/upload/iblock/ee7/rxgj8ftref2fzwh9fmc9wyej4pp73m6b/SLIM-Tre_01.jpg","https://www.union.ru/upload/iblock/498/03419chdt2elkhv5e07m1v1ahp526b7q/SLIM-Quattro.jpg","https://www.union.ru/upload/iblock/7bb/g1mkypefzapillik713umknbc341avm5/SLIM-Radar.jpg","https://www.union.ru/upload/iblock/df7/y082acp3fpjw0ww654yae9iqwcyo31jo/SLIM-INVISIB-1600x1600.jpg"}',
    '{"hinges":"– AGB, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"Ritmo"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/slim-ritmo-transparent-invisible-16903'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SLIM, Quattro, TRANSPARENT / INVISIBLE', 'SLIM, Quattro, TRANSPARENT / INVISIBLE', 'slim-quattro-transparent-invisible-16869',
    'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    3300, target_cat, '{"https://www.union.ru/upload/iblock/972/m27q6sae0k234dzil9vv1ekpie0x5rlu/2-_-SLIM-Quattro.jpg","https://www.union.ru/upload/iblock/72e/fwxefv0eimxsf8te3y8dnym3zs55r1zu/2_SLIM_Quattro_1600x1600.jpg","https://www.union.ru/upload/iblock/498/03419chdt2elkhv5e07m1v1ahp526b7q/SLIM-Quattro.jpg","https://www.union.ru/upload/iblock/fc3/7408lyml1s7luymzxl2xfh18kuv7mku0/SLIM-Space.jpg","https://www.union.ru/upload/iblock/ee7/rxgj8ftref2fzwh9fmc9wyej4pp73m6b/SLIM-Tre_01.jpg","https://www.union.ru/upload/iblock/7bb/g1mkypefzapillik713umknbc341avm5/SLIM-Radar.jpg","https://www.union.ru/upload/iblock/ddd/ng4yoth4jgk80h5d906w0tkbiy4sggwo/SLIM-Ritmo_1.jpg","https://www.union.ru/upload/iblock/df7/y082acp3fpjw0ww654yae9iqwcyo31jo/SLIM-INVISIB-1600x1600.jpg"}',
    '{"hinges":"– AGB, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"Quattro"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/slim-quattro-transparent-invisible-16869'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SLIM, Radar, TRANSPARENT / INVISIBLE', 'SLIM, Radar, TRANSPARENT / INVISIBLE', 'slim-radar-transparent-invisible-16901',
    'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое. Петли – AGB, made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    3300, target_cat, '{"https://www.union.ru/upload/iblock/675/2em4ackins3z00ie8f5nu236w8lwhuj4/2-_-SLIM-Radar.jpg","https://www.union.ru/upload/iblock/a38/mwbahwu3mv53dj529p8hye0cppohbw5l/2-_-SLIM-Radar.png","https://www.union.ru/upload/iblock/7bb/g1mkypefzapillik713umknbc341avm5/SLIM-Radar.jpg","https://www.union.ru/upload/iblock/fc3/7408lyml1s7luymzxl2xfh18kuv7mku0/SLIM-Space.jpg","https://www.union.ru/upload/iblock/ee7/rxgj8ftref2fzwh9fmc9wyej4pp73m6b/SLIM-Tre_01.jpg","https://www.union.ru/upload/iblock/498/03419chdt2elkhv5e07m1v1ahp526b7q/SLIM-Quattro.jpg","https://www.union.ru/upload/iblock/ddd/ng4yoth4jgk80h5d906w0tkbiy4sggwo/SLIM-Ritmo_1.jpg","https://www.union.ru/upload/iblock/df7/y082acp3fpjw0ww654yae9iqwcyo31jo/SLIM-INVISIB-1600x1600.jpg"}',
    '{"hinges":"– AGB, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"Radar"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/slim-radar-transparent-invisible-16901'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LAGO-60, Lira / INVISIBLE', 'LAGO-60, Lira / INVISIBLE', 'lago-60-glass-invisible-28054',
    'Полотно LAGO-60 Толщина 6 см. Структура – закаленный алюминий. Стекло прозрачное / стекло матовое / зеркало / стекло крашеное глянцевое / стекло крашеное матовое. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно LAGO-60 Толщина 6 см. Структура – закаленный алюминий. Стекло прозрачное / стекло матовое / зеркало / стекло крашеное глянцевое / стекло крашеное матовое. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    2700, target_cat, '{"https://www.union.ru/upload/iblock/cbc/b8tw8u6g6040gwu6k6303bzlhez7kdbv/2-_-LAGO-Lira-_-_-_-03.jpg","https://www.union.ru/upload/iblock/3b6/8vh0r4u0ejhs3y26z944f3pq2l2uqa5l/2-_-LAGO-Lira-_-_-_-03-1600x1600.jpg","https://www.union.ru/upload/iblock/0de/rvv5ia7e5m82ud5vl33lpy58r5rajr46/_-LAGO-GLASS-_00_01.jpg","https://www.union.ru/upload/iblock/9c1/guov39ug5z8xb2yjnxxd6mof3ybuve9v/LAGO_Plain_01_01.jpg","https://www.union.ru/upload/iblock/e6d/jjf4sz0w9zb4t9ntyw7cd49wxkwcox5d/LAGO_Modelica_01_01.jpg","https://www.union.ru/upload/iblock/88d/0julqonanh2bmdzwpob9om0anmsgwqv1/lago_60-INVISIBLE-1600x1600.jpg","https://www.union.ru/upload/iblock/814/pq0rz53k9h9czqe4662kjk0lrrkzxyzr/lago_60-PLANAR-1600x1600.jpg","https://www.union.ru/upload/iblock/e41/cb14964m27nyvuv346pur4skav7oqjle/Короб%20INVISIBLE%20LUX-03%20сжат.png.webp"}',
    '{"thickness":"6 см","hinges":"- скрытые INVISTA или OTLAV made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL08 Black","made_in":"Italy","model":"Lira"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/lago-60-glass-invisible-28054'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LAGO-60, Plain / INVISIBLE', 'LAGO-60, Plain / INVISIBLE', 'lago-60-plain-invisible-18370',
    'Полотно LAGO-60 Толщина 6 см. Структура – закаленный алюминий. стекло крашеное глянцевое / стекло крашеное матовое / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно LAGO-60 Толщина 6 см. Структура – закаленный алюминий. стекло крашеное глянцевое / стекло крашеное матовое / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    2700, target_cat, '{"https://www.union.ru/upload/iblock/554/p4jl71uqtu2l2wt14x2aslmf03obz0gx/2-_-LAGO-Plain.jpg","https://www.union.ru/upload/iblock/9a0/meis588ttnndc1nnqqc0wlrkvh40z71k/2_LAGO_Plain_1600x1600.jpg","https://www.union.ru/upload/iblock/9c1/guov39ug5z8xb2yjnxxd6mof3ybuve9v/LAGO_Plain_01_01.jpg","https://www.union.ru/upload/iblock/0de/rvv5ia7e5m82ud5vl33lpy58r5rajr46/_-LAGO-GLASS-_00_01.jpg","https://www.union.ru/upload/iblock/e6d/jjf4sz0w9zb4t9ntyw7cd49wxkwcox5d/LAGO_Modelica_01_01.jpg","https://www.union.ru/upload/iblock/88d/0julqonanh2bmdzwpob9om0anmsgwqv1/lago_60-INVISIBLE-1600x1600.jpg","https://www.union.ru/upload/iblock/814/pq0rz53k9h9czqe4662kjk0lrrkzxyzr/lago_60-PLANAR-1600x1600.jpg","https://www.union.ru/upload/iblock/96c/9ya9s5ijhq2o6dluo4ekc9shh0e9eyi9/Короб%20INVISIBLE%20LUX-03%20сжат.png.webp"}',
    '{"thickness":"6 см","hinges":"- скрытые INVISTA или OTLAV made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна и ручка в отделке AL07 Dark Brown","made_in":"Italy","model":"Plain"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/lago-60-plain-invisible-18370'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LAGO-60, Modelica / INVISIBLE', 'LAGO-60, Modelica / INVISIBLE', 'lago-60-modelica-invisible-18371',
    'Полотно LAGO-60 Толщина 6 см. Структура – закаленный алюминий. стекло крашеное глянцевое / стекло крашеное матовое / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно LAGO-60 Толщина 6 см. Структура – закаленный алюминий. стекло крашеное глянцевое / стекло крашеное матовое / зеркало. Петли - скрытые INVISTA или OTLAV made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 90 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    2700, target_cat, '{"https://www.union.ru/upload/iblock/970/pkrihuuem286rsq7bdz6g1axpb0nb3us/2-_-LAGO-Modelica-_-_.jpg","https://www.union.ru/upload/iblock/6ae/0rdv8spnq9bfnvbo9emne4k5a77q8aj6/2_LAGO_Modelica_1600x1600.jpg","https://www.union.ru/upload/iblock/e6d/jjf4sz0w9zb4t9ntyw7cd49wxkwcox5d/LAGO_Modelica_01_01.jpg","https://www.union.ru/upload/iblock/0de/rvv5ia7e5m82ud5vl33lpy58r5rajr46/_-LAGO-GLASS-_00_01.jpg","https://www.union.ru/upload/iblock/9c1/guov39ug5z8xb2yjnxxd6mof3ybuve9v/LAGO_Plain_01_01.jpg","https://www.union.ru/upload/iblock/88d/0julqonanh2bmdzwpob9om0anmsgwqv1/lago_60-INVISIBLE-1600x1600.jpg","https://www.union.ru/upload/iblock/814/pq0rz53k9h9czqe4662kjk0lrrkzxyzr/lago_60-PLANAR-1600x1600.jpg","https://www.union.ru/upload/iblock/92d/7hnhogp2dsggw1ftvs2d078r2qgzj41m/Короб%20INVISIBLE%20LUX-03%20сжат.png.webp"}',
    '{"thickness":"6 см","hinges":"- скрытые INVISTA или OTLAV made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 90 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"полотна, молдинги и ручка в отделке AL08 Black","made_in":"Italy","model":"Modelica"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/lago-60-modelica-invisible-18371'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-surface';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIFLEX-3D, Alu, Legato / INVISIBLE', 'UNIFLEX-3D, Alu, Legato / INVISIBLE', 'uniflex-3d-legato-invisible',
    'Полотно UNIFLEX-3D Толщина 60 мм. Каркас – двойной брус. Объемное 3D прессование. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA, OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 900 х 2400 мм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIFLEX-3D Толщина 60 мм. Каркас – двойной брус. Объемное 3D прессование. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA, OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 900 х 2400 мм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    5880, target_cat, '{"https://www.union.ru/upload/iblock/400/44qidaja9zhba4x63w30xa998ng7vt0j/UNIFLEX-3D Legato UL40 INVISIBLE 2400x1600.png","https://www.union.ru/upload/iblock/086/8dn3crsu59ubsa5coxiju2p6p7drx2xq/UNIFLEX-3D%20Legato%20UL40%20INVISIBLE%201600x1600.png","https://www.union.ru/upload/iblock/7c7/4m1yt6ll6ej1z9bb8nom8ahyqw43m1jd/UNIFLEX-3D%20mod%20Legato%20UL40.png","https://www.union.ru/upload/iblock/9be/2zqi2hoxmlg792e77klhz78z39wereb7/Mod%20Canvas.png","https://www.union.ru/upload/iblock/cfd/0nv6dpzwbbppsoffnm7g7etqq195cdi7/Mod%20Tartan.png","https://www.union.ru/upload/iblock/914/y5dejwweuyk5kdx81t5gu1qf85g2inp6/Mod%20Plisse.png","https://www.union.ru/upload/iblock/cf8/13lu1znzy16jbipankx0nh2ln4g56f8k/FILO-Step_1.jpg","https://www.union.ru/upload/iblock/f31/lgfej5xrgw2v0kpnx6x1r1gb8mr63j1m/FILO_60-Reef.png"}',
    '{"hinges":"– скрытые INVISTA, OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 900 х 2400 мм","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Legato"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/uniflex-3d-legato-invisible'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-surface';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIFLEX-3D, Alu, Canvas / INVISIBLE', 'UNIFLEX-3D, Alu, Canvas / INVISIBLE', 'uniflex-3d-canvas-invisible',
    'Полотно UNIFLEX-3D Толщина 60 мм. Каркас – двойной брус. Объемное 3D прессование. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA, OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 900 х 2400 мм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIFLEX-3D Толщина 60 мм. Каркас – двойной брус. Объемное 3D прессование. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA, OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 900 х 2400 мм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    5880, target_cat, '{"https://www.union.ru/upload/iblock/f4c/ejelzngyn8jes3x8qaf7mo7b7kehotbl/2 двери Canvas 01.jpg","https://www.union.ru/upload/iblock/eef/py7kwb21wccrytfx8k309bebrdc5hzsx/Canvas%20Noce%20Italiano%20INVISIBLE%20Black%201600x1600.png","https://www.union.ru/upload/iblock/9be/2zqi2hoxmlg792e77klhz78z39wereb7/Mod%20Canvas.png","https://www.union.ru/upload/iblock/cfd/0nv6dpzwbbppsoffnm7g7etqq195cdi7/Mod%20Tartan.png","https://www.union.ru/upload/iblock/914/y5dejwweuyk5kdx81t5gu1qf85g2inp6/Mod%20Plisse.png","https://www.union.ru/upload/iblock/7c7/4m1yt6ll6ej1z9bb8nom8ahyqw43m1jd/UNIFLEX-3D%20mod%20Legato%20UL40.png","https://www.union.ru/upload/iblock/cf8/13lu1znzy16jbipankx0nh2ln4g56f8k/FILO-Step_1.jpg","https://www.union.ru/upload/iblock/f31/lgfej5xrgw2v0kpnx6x1r1gb8mr63j1m/FILO_60-Reef.png"}',
    '{"hinges":"– скрытые INVISTA, OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 900 х 2400 мм","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Canvas"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/uniflex-3d-canvas-invisible'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-surface';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIFLEX-3D, Alu, Plisse / INVISIBLE', 'UNIFLEX-3D, Alu, Plisse / INVISIBLE', 'uniflex-3d-plisse-invisible',
    'Полотно UNIFLEX-3D Толщина 60 мм. Каркас – двойной брус. Объемное 3D прессование. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA, OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 900 х 2400 мм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIFLEX-3D Толщина 60 мм. Каркас – двойной брус. Объемное 3D прессование. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA, OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 900 х 2400 мм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    5880, target_cat, '{"https://www.union.ru/upload/iblock/f4f/k8t3pdr1l0strqge2toqet9liifo9ys4/Plisse Noce Italiano INV 2400x1600.png","https://www.union.ru/upload/iblock/35a/tt254ejqers0ijqt07ivvrya8jzd2jtg/Plisse%20Noce%20Italiano%20INV%201600x1600.png","https://www.union.ru/upload/iblock/914/y5dejwweuyk5kdx81t5gu1qf85g2inp6/Mod%20Plisse.png","https://www.union.ru/upload/iblock/9be/2zqi2hoxmlg792e77klhz78z39wereb7/Mod%20Canvas.png","https://www.union.ru/upload/iblock/cfd/0nv6dpzwbbppsoffnm7g7etqq195cdi7/Mod%20Tartan.png","https://www.union.ru/upload/iblock/7c7/4m1yt6ll6ej1z9bb8nom8ahyqw43m1jd/UNIFLEX-3D%20mod%20Legato%20UL40.png","https://www.union.ru/upload/iblock/cf8/13lu1znzy16jbipankx0nh2ln4g56f8k/FILO-Step_1.jpg","https://www.union.ru/upload/iblock/f31/lgfej5xrgw2v0kpnx6x1r1gb8mr63j1m/FILO_60-Reef.png"}',
    '{"hinges":"– скрытые INVISTA, OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 900 х 2400 мм","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Plisse"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/uniflex-3d-plisse-invisible'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-surface';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIFLEX-3D, Alu, Tartan / INVISIBLE', 'UNIFLEX-3D, Alu, Tartan / INVISIBLE', 'uniflex-3d-tartan-invisible',
    'Полотно UNIFLEX-3D Толщина 60 мм. Каркас – двойной брус. Объемное 3D прессование. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA, OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 900 х 2400 мм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIFLEX-3D Толщина 60 мм. Каркас – двойной брус. Объемное 3D прессование. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA, OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 900 х 2400 мм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    5880, target_cat, '{"https://www.union.ru/upload/iblock/119/v8v6xmslgyo0q557zxi6qaxnkuojgzoa/Tartan Noce Italiano INVIS 2400x1600.png","https://www.union.ru/upload/iblock/a4e/vk4d213eizu18qwiem38g11aq3oicdnz/Tartan%20Noce%20Italiano%20INVIS%201600x1600.png","https://www.union.ru/upload/iblock/cfd/0nv6dpzwbbppsoffnm7g7etqq195cdi7/Mod%20Tartan.png","https://www.union.ru/upload/iblock/9be/2zqi2hoxmlg792e77klhz78z39wereb7/Mod%20Canvas.png","https://www.union.ru/upload/iblock/914/y5dejwweuyk5kdx81t5gu1qf85g2inp6/Mod%20Plisse.png","https://www.union.ru/upload/iblock/7c7/4m1yt6ll6ej1z9bb8nom8ahyqw43m1jd/UNIFLEX-3D%20mod%20Legato%20UL40.png","https://www.union.ru/upload/iblock/cf8/13lu1znzy16jbipankx0nh2ln4g56f8k/FILO-Step_1.jpg","https://www.union.ru/upload/iblock/f31/lgfej5xrgw2v0kpnx6x1r1gb8mr63j1m/FILO_60-Reef.png"}',
    '{"hinges":"– скрытые INVISTA, OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 900 х 2400 мм","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Tartan"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/uniflex-3d-tartan-invisible'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-surface';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIFLEX-3D, Alu, Step / INVISIBLE', 'UNIFLEX-3D, Alu, Step / INVISIBLE', 'uniflex-3d-step-invisible-28115',
    'Полотно UNIFLEX-3D Толщина 6 cм. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 cм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIFLEX-3D Толщина 6 cм. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 cм. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    6780, target_cat, '{"https://www.union.ru/upload/iblock/075/10rsfvx8qs650kj1z9cunm0kf8x6iq06/2-_-uniflex-3D-Step-V.jpg","https://www.union.ru/upload/iblock/cfa/bvd6o0nj5aljc0bfk5d2xun3oxqohqey/2-_-uniflex-3D-Step-V-1600x1600.jpg","https://www.union.ru/upload/iblock/cf8/13lu1znzy16jbipankx0nh2ln4g56f8k/FILO-Step_1.jpg","https://www.union.ru/upload/iblock/f31/lgfej5xrgw2v0kpnx6x1r1gb8mr63j1m/FILO_60-Reef.png","https://www.union.ru/upload/iblock/7c7/4m1yt6ll6ej1z9bb8nom8ahyqw43m1jd/UNIFLEX-3D%20mod%20Legato%20UL40.png","https://www.union.ru/upload/iblock/9be/2zqi2hoxmlg792e77klhz78z39wereb7/Mod%20Canvas.png","https://www.union.ru/upload/iblock/cfd/0nv6dpzwbbppsoffnm7g7etqq195cdi7/Mod%20Tartan.png","https://www.union.ru/upload/iblock/914/y5dejwweuyk5kdx81t5gu1qf85g2inp6/Mod%20Plisse.png"}',
    '{"hinges":"– скрытые INVISTA или OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 100 х 300 cм","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Step"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/uniflex-3d-step-invisible-28115'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-surface';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIFLEX-3D, Alu, Reef / INVISIBLE', 'UNIFLEX-3D, Alu, Reef / INVISIBLE', 'uniflex-3d-reef-invisible-44131',
    'Полотно UNIFLEX-3D Толщина 6 см. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIFLEX-3D Толщина 6 см. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – натуральный шпон. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    6780, target_cat, '{"https://www.union.ru/upload/iblock/9f5/8xk747q3l2lrz8qtuha2k5lh4r5x26hu/2-_-uniflex-3D-Step-VM.jpg","https://www.union.ru/upload/iblock/385/ed3126afl40p8aysc6dy6hisfbfh95bp/2_uniflex_3D_Step_VM_1600x1600.jpg","https://www.union.ru/upload/iblock/f31/lgfej5xrgw2v0kpnx6x1r1gb8mr63j1m/FILO_60-Reef.png","https://www.union.ru/upload/iblock/cf8/13lu1znzy16jbipankx0nh2ln4g56f8k/FILO-Step_1.jpg","https://www.union.ru/upload/iblock/7c7/4m1yt6ll6ej1z9bb8nom8ahyqw43m1jd/UNIFLEX-3D%20mod%20Legato%20UL40.png","https://www.union.ru/upload/iblock/9be/2zqi2hoxmlg792e77klhz78z39wereb7/Mod%20Canvas.png","https://www.union.ru/upload/iblock/cfd/0nv6dpzwbbppsoffnm7g7etqq195cdi7/Mod%20Tartan.png","https://www.union.ru/upload/iblock/914/y5dejwweuyk5kdx81t5gu1qf85g2inp6/Mod%20Plisse.png"}',
    '{"thickness":"6 см","hinges":"– скрытые INVISTA или OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 100 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Reef"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/uniflex-3d-reef-invisible-44131'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-surface';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIFLEX-3D, Alu, Wave / INVISIBLE', 'UNIFLEX-3D, Alu, Wave / INVISIBLE', 'uniflex-3d-wave-invisible-28092',
    'Полотно UNIFLEX-3D Толщина 6 см. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – спил массива древесины. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». v «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIFLEX-3D Толщина 6 см. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – спил массива древесины. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». v «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    6780, target_cat, '{"https://www.union.ru/upload/iblock/2af/2z63t640fhty7aokwwwxc2pm5i7vgq41/2-_-uniflex-3D-Wave.jpg","https://www.union.ru/upload/iblock/9a7/7x2gi8mrds3jgyq0hgv0pti1kh7cugu7/2-_-uniflex-3D-Wave-1600x1600.jpg","https://www.union.ru/upload/iblock/0bf/cz45g32bdiqi1aqbofc2d9wlnsthe32c/FILO-Wave_3.jpg","https://www.union.ru/upload/iblock/5e5/8ms7dpxa6abewc1rnnmu2131drrh0295/FILO_60-Wave_V.png","https://www.union.ru/upload/iblock/7c7/4m1yt6ll6ej1z9bb8nom8ahyqw43m1jd/UNIFLEX-3D%20mod%20Legato%20UL40.png","https://www.union.ru/upload/iblock/9be/2zqi2hoxmlg792e77klhz78z39wereb7/Mod%20Canvas.png","https://www.union.ru/upload/iblock/cfd/0nv6dpzwbbppsoffnm7g7etqq195cdi7/Mod%20Tartan.png","https://www.union.ru/upload/iblock/914/y5dejwweuyk5kdx81t5gu1qf85g2inp6/Mod%20Plisse.png"}',
    '{"thickness":"6 см","hinges":"– скрытые INVISTA или OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 100 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Wave"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/uniflex-3d-wave-invisible-28092'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-surface';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'UNIFLEX-3D, Alu, Wave-V / INVISIBLE', 'UNIFLEX-3D, Alu, Wave-V / INVISIBLE', 'uniflex-3d-wave-v-invisible-44151',
    'Полотно UNIFLEX-3D Толщина 6 см. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – спил массива древесины. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». v «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА', 'Полотно UNIFLEX-3D Толщина 6 см. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – спил массива древесины. Алюминиевая торцевая кромка по периметру полотна. Петли – скрытые INVISTA или OTLAV made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 см. Скрытый короб INVISIBLE Усиленный, закаленный алюминий. Фальшкороб – дополнительная жесткость. Суппорты 10 шт. (made in Italy), удобство монтажа. Армирующая сетка от растрескивания штукатурки. Компланарность со стеной при открывании «из проёма» и «в проём». v «Маяки» для монтажа гипсокартона. Открывание 180°. Уплотнитель DEVENTER (made in Germany). Отделка – алюминий без покрытия. Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской. РЕКОМЕНДАЦИИ ПО ПОКРАСКЕ КОРОБА',
    6780, target_cat, '{"https://www.union.ru/upload/iblock/751/f95ae8qxvcorxojqjm2frp2o94kv8b1y/2-_-uniflex-3D-Wave-V.jpg","https://www.union.ru/upload/iblock/f86/e0a54y2cor9vjnhneyd4kzu8120x0hxq/2-_-uniflex-3D-Wave-V-1600x1600.jpg","https://www.union.ru/upload/iblock/5e5/8ms7dpxa6abewc1rnnmu2131drrh0295/FILO_60-Wave_V.png","https://www.union.ru/upload/iblock/0bf/cz45g32bdiqi1aqbofc2d9wlnsthe32c/FILO-Wave_3.jpg","https://www.union.ru/upload/iblock/7c7/4m1yt6ll6ej1z9bb8nom8ahyqw43m1jd/UNIFLEX-3D%20mod%20Legato%20UL40.png","https://www.union.ru/upload/iblock/9be/2zqi2hoxmlg792e77klhz78z39wereb7/Mod%20Canvas.png","https://www.union.ru/upload/iblock/cfd/0nv6dpzwbbppsoffnm7g7etqq195cdi7/Mod%20Tartan.png","https://www.union.ru/upload/iblock/914/y5dejwweuyk5kdx81t5gu1qf85g2inp6/Mod%20Plisse.png"}',
    '{"thickness":"6 см","hinges":"– скрытые INVISTA или OTLAV made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 100 х 300 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Wave"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/uniflex-3d-wave-v-invisible-44151'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'designer-doors';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'TONDA, Tirol', 'TONDA, Tirol', 'tonda-laccato-5346',
    'Полотно TONDA Толщина 5 см. Круглый торец. Отделка – матовая эмаль / глянцевая эмаль. Петли – made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 см. Короб TONDA Закаленный алюминий. Надежное соединение элементов короба. Фальшкороб на толщину стены. Открывание 180°. Отделка – анодировка Серебристый алюминий. Опции: покраска порошковой краской.', 'Полотно TONDA Толщина 5 см. Круглый торец. Отделка – матовая эмаль / глянцевая эмаль. Петли – made in Italy. Замок - магнитный AGB, made in Italy. Максимальные размеры – 100 х 300 см. Короб TONDA Закаленный алюминий. Надежное соединение элементов короба. Фальшкороб на толщину стены. Открывание 180°. Отделка – анодировка Серебристый алюминий. Опции: покраска порошковой краской.',
    2880, target_cat, '{"https://www.union.ru/upload/iblock/448/qyxvm5tis3yq3n1uxwdfo1etbzh2fd1j/2-_-TONDA-03.jpg","https://www.union.ru/upload/iblock/936/g2scn2dvylq3xea2z6kk602n669rshte/2-_-TONDA-03_1600x1600.jpg","https://www.union.ru/upload/iblock/979/wlle53m8fexnmildthpdd8husovdasec/TONDA_06-1600x1600.png","https://www.union.ru/upload/iblock/556/mikko29xgi47u84pmdk4dytxf48uemyo/TONDA_07-1600x1600.png","https://www.union.ru/upload/iblock/fb5/3r0reg6h6brwj4x6mwyb4l169v81cyl2/TONDA_08-1600x1600.png","https://www.union.ru/upload/iblock/fe8/vejcapn1577bmpr6yp7vxs0osjm8nn58/TONDA_09-1600x1600.png","https://www.union.ru/upload/iblock/6dd/k10ks2jkudjo2w8nva2058w0al3n96dp/Tonda-Tirol-_00.jpg","https://www.union.ru/upload/iblock/f81/t9o273hl87wz6zz8omlw2cy7trlii9kf/TONDA-_-1600x1600.png"}',
    '{"thickness":"5 см","hinges":"– made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 100 х 300 см","opening_angle":"2","made_in":"Italy","model":"Tirol"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/tonda-laccato-5346'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-enamel';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'CORDA / UNIDOOR', 'CORDA / UNIDOOR', 'corda-unidoor-26411',
    'Полотно CORDA Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.', 'Полотно CORDA Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.',
    3150, target_cat, '{"https://www.union.ru/upload/iblock/124/dl9qx3a5ree530v5pazfqupqogedn6eu/2-_-_-CORDA.jpg","https://www.union.ru/upload/iblock/375/shkfpk55dqbm88j8ounjbyriloglhppz/103P.jpg","https://www.union.ru/upload/iblock/163/1ss5im8sklh44adm16sd5yb1ai8ci48l/101P.jpg","https://www.union.ru/upload/iblock/434/njod0qpw24yxeposvytx8no816d25l75/101V.jpg","https://www.union.ru/upload/iblock/6ff/7gs44vnu511er6mjz4ym920nqwgabcu6/103V.jpg","https://www.union.ru/upload/iblock/490/j3bwx1edt554aj1i6wbkpiucv0kiy2q2/105_Bianco_01.png","https://www.union.ru/upload/iblock/9e1/dj6lt0yk91angw767lrgainrges1xdnl/110P.jpg","https://www.union.ru/upload/iblock/aaf/dkf0009p2wqvxaocl6kuod9q8zb226us/126P.jpg"}',
    '{"thickness":"4,5 см","hinges":"– скрытые, made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 90 х 260 см","opening_angle":"2","frame":"The PLANAR box DECO boxshaped trim Полотно CORDA Толщина 4,5 см","made_in":"Italy","model":"103P"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/corda-unidoor-26411'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-enamel';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LEVEL / UNIDOOR', 'LEVEL / UNIDOOR', 'level-unidoor-24398',
    'Полотно GRAND Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.', 'Полотно GRAND Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.',
    2880, target_cat, '{"https://www.union.ru/upload/iblock/98f/iip56gx8zxfda17pedz2uotb459jjkt2/2-_-_-LEVEL.jpg","https://www.union.ru/upload/iblock/79e/wgv3n30m70eanzeejjulkrxtsg28yu51/level-103.jpg","https://www.union.ru/upload/iblock/563/b1qjyeiv58i5j65hb7uvpsa6goumk3dv/LEVEL-101_-_-_-Bianco..jpg","https://www.union.ru/upload/iblock/677/fs739bpjfd86xh6rug9kp41kg6cm45tg/LEVEL-126_-_-_-Bianco..jpg","https://www.union.ru/upload/iblock/bca/unz5wsm44gbk5gef1y9tqyx5vhz6w40g/U02i_-_-_-Bianco-2023.jpg"}',
    '{"thickness":"4,5 см","hinges":"– скрытые, made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 90 х 260 см","opening_angle":"2","frame":"The PLANAR box DECO boxshaped trim Полотно GRAND Толщина 4,5 см","made_in":"Italy","model":"103"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/level-unidoor-24398'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-enamel';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'TREND / UNIDOOR', 'TREND / UNIDOOR', 'trend-unidoor-25867',
    'Полотно TREND Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль / глянцевая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.', 'Полотно TREND Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль / глянцевая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.',
    2700, target_cat, '{"https://www.union.ru/upload/iblock/594/pvr2nnvxmtt8d0d4b6ud340b9v2lewon/2-_-_-TREND.jpg","https://www.union.ru/upload/iblock/f19/q0r6b9aokpccyio41lymg7n7mryr3cbt/TREND-TR18.jpg","https://www.union.ru/upload/iblock/cfd/s12k0gr38nt11azvun9ei7o2mnxogar8/TREND-TR06_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/365/50ydlyq28bjz9alv39r26x20jg36t9t5/TREND-TR10_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/b12/2d2npi3r19cpm9eblwmlfwx8l32hjzrh/TREND-TR11_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/3f9/p0efufdkdr5ny98lg94jvbp0ic50czc0/TREND-TR12_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/1f8/rfsdkp7vkv8mh3jwtijy6fqceaookwjc/trend14-_4_.jpg","https://www.union.ru/upload/iblock/896/mvkmh3an3v8j31zrzfxqj22rw7rggjvp/Trend14V_Bianco_L01.jpg"}',
    '{"thickness":"4,5 см","hinges":"– скрытые, made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 90 х 260 см","opening_angle":"2","frame":"The PLANAR box DECO boxshaped trim Полотно TREND Толщина 4,5 см","made_in":"Italy","model":"TR18"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/trend-unidoor-25867'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-enamel';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'GRAND / UNIDOOR', 'GRAND / UNIDOOR', 'grand-unidoor-28052',
    'Полотно GRAND Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.', 'Полотно GRAND Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.',
    2880, target_cat, '{"https://www.union.ru/upload/iblock/b62/m053ifqb5d1bfzj9dwf6xcecj5sbpf7a/2-_-_-CRAND.jpg","https://www.union.ru/upload/iblock/d06/lgqvmgs9s423a22on4rd63znuy5ar6po/GRAND-GR01-Bianco.jpg","https://www.union.ru/upload/iblock/09e/1d7vlq1l3e9hyy9rneaqshhwgex9hb3r/GRAND-GR02_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/145/pywjqqwxzqqv4ay15x2lrkglhcz2rqei/Bianco.jpg","https://www.union.ru/upload/iblock/760/ftkep7y71s8ic2c4vijtoxrhyf3wcjc5/GR03V-Bianco.png","https://www.union.ru/upload/iblock/409/3btb6aidt4jqkjahfji7gfax7oco2sjr/GRAND-GR04_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/235/9ztxguh2cxhtasp1qwgomi1citoy5jfv/GRAND-GR05_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/3af/tc4g8wsy828tyd3anw6pa3k7q51jcwny/GRAND-GR06_-_-_-Bianco.jpg"}',
    '{"thickness":"4,5 см","hinges":"– скрытые, made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 90 х 260 см","opening_angle":"2","frame":"The PLANAR box DECO boxshaped trim Полотно GRAND Толщина 4,5 см","made_in":"Italy","model":"GR01"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/grand-unidoor-28052'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-enamel';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'ALDA / UNIDOOR', 'ALDA / UNIDOOR', 'alda-unidoor-24543',
    'Полотно ALDA Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.', 'Полотно ALDA Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.',
    2880, target_cat, '{"https://www.union.ru/upload/iblock/00c/f4joppxneko74zql933la22za7xezqgm/2-_-_-ALDA-1.jpg","https://www.union.ru/upload/iblock/768/08lx5n2ly215c0110sv4w1atnfs9b4gu/ALDA-103-Bianco.jpg","https://www.union.ru/upload/iblock/93f/rbns9t2ggfv2s0iw8sjuetywhg7hcdlk/ALDA-101_-_-_-Bianco..jpg","https://www.union.ru/upload/iblock/519/i6pbv6qtrbq9scurym0y1og5vh5gn248/ALDA-126_-_-_-Bianco..jpg","https://www.union.ru/upload/iblock/bca/unz5wsm44gbk5gef1y9tqyx5vhz6w40g/U02i_-_-_-Bianco-2023.jpg"}',
    '{"thickness":"4,5 см","hinges":"– скрытые, made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 90 х 260 см","opening_angle":"2","frame":"The PLANAR box DECO boxshaped trim Полотно ALDA Толщина 4,5 см","made_in":"Italy","model":"103"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/alda-unidoor-24543'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-enamel';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'PRIMA / UNIDOOR', 'PRIMA / UNIDOOR', 'prima-unidoor-28051',
    'Полотно PRIMA Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.', 'Полотно PRIMA Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.',
    3030, target_cat, '{"https://www.union.ru/upload/iblock/d9e/lutoc12djbb2fwl5qj4r9osct335b9pr/2-_-_-PRIMA.jpg","https://www.union.ru/upload/iblock/1c7/23an6uy0s86v1t3022ss6bue9djckqav/PRIMA-P_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/1f9/ml8ly3yyw34f9p08e884xay5h4lzxcl5/PRIMA-PU_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/643/mvm03bflzjbroafxyiasmjn85y68fanp/PRIMA-PU_-_-_-Bianco_-_-RIFLESSO-DIAMANTE.jpg","https://www.union.ru/upload/iblock/325/zzp3k0wqfzo6x78qvwkeoc9g45ydjlpc/PRIMA-VU_-_-_-Bianco_-_-SATINATO-BIANCO.jpg","https://www.union.ru/upload/iblock/861/aw69koa2wm6pmf4umrrng2s1ng5zcb1u/PRIMA-V_-_-_-Bianco_-_-SATINATO-BIANCO.jpg","https://www.union.ru/upload/iblock/12c/2e8d7yxoj104et1f89qb311nkj91z5bg/PRIMA-VD_-_-_-Bianco_-_-SATINATO-BIANCO.jpg","https://www.union.ru/upload/iblock/76d/qgptjr0vxxhcz0efdk36c9h4p0vq19f9/PRIMA-P3_-_-_-Bianco.jpg"}',
    '{"thickness":"4,5 см","hinges":"– скрытые, made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 90 х 260 см","opening_angle":"2","frame":"The PLANAR box DECO boxshaped trim Полотно PRIMA Толщина 4,5 см","made_in":"Italy","model":"P"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/prima-unidoor-28051'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-enamel';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STELLA / UNIDOOR', 'STELLA / UNIDOOR', 'stella-unidoor-25359',
    'Полотно STELLA Толщина 4,5 см. Рамочная конструкция, массив древесины. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.', 'Полотно STELLA Толщина 4,5 см. Рамочная конструкция, массив древесины. Отделка – матовая эмаль. Петли – скрытые, made in Italy. Замок – магнитный AGB, made in Italy. Максимальные размеры – 90 х 260 см. Короб UNIDOOR Патент UNION. Комбинированный массив + МДФ. Одинаковые габариты по наличнику с двух сторон. Компланарность полотна с наличниками. Удобство подгонки и монтажа добора.',
    3060, target_cat, '{"https://www.union.ru/upload/iblock/c04/87om2ebhlh6n0peemq1aqqmtsvu5olf9/2-_-_-STELLA.jpg","https://www.union.ru/upload/iblock/ce2/3fxj23k2fwfacsu6cqqsls3yqgsjceyf/STELLA-PD2_-_-_-_-_-_-Bianco.jpg","https://www.union.ru/upload/iblock/9d6/ibrjswcdut67fl42hifr2czqfw1etapj/STELLA-PD_-_-_-_-_-_-Bianco..jpg","https://www.union.ru/upload/iblock/d27/k02ni7dk5co9h086xbptaznmxswqnfnh/STELLA-SV_-_-_-_-_-_-Bianco_-_-SATINATO-BIANCO-TR..jpg","https://www.union.ru/upload/iblock/9e3/9gyogxlx3u1xf3ophwsy3jme13lcphl2/STELLA-SVD_-_-_-_-_-_-Bianco_-_-SATINATO-BIANCO-TR.jpg"}',
    '{"thickness":"4,5 см","hinges":"– скрытые, made in Italy","lock":"– магнитный AGB, made in Italy","max_size":"– 90 х 260 см","opening_angle":"2","made_in":"Italy","model":"PD2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stella-unidoor-25359'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'pivot';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'PIVOT-SLIM Space', 'PIVOT-SLIM Space', 'pivot-slim-39288',
    'PIVOT-SLIM Полотно SLIM – поворотное на две стороны. Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое. Петли – made in Italy. Автоматическая фиксация в открытом и закрытом положении. Максимальные размеры – 120 х 300 см.', 'PIVOT-SLIM Полотно SLIM – поворотное на две стороны. Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое. Петли – made in Italy. Автоматическая фиксация в открытом и закрытом положении. Максимальные размеры – 120 х 300 см.',
    5220, target_cat, '{"https://www.union.ru/upload/iblock/260/ff3pqtk42hb4fgjjvyr3awiiziw3zt77/SLIM-Pivot-02_1.jpg","https://www.union.ru/upload/resize_cache/iblock/184/s1phxdyo28vrm3sseqk6t73dsr7scexl/800_800_1/SLIM_Pivot_02_1_1600x1600.jpg","https://www.union.ru/upload/iblock/fc3/7408lyml1s7luymzxl2xfh18kuv7mku0/SLIM-Space.jpg","https://www.union.ru/upload/iblock/ee7/rxgj8ftref2fzwh9fmc9wyej4pp73m6b/SLIM-Tre_01.jpg","https://www.union.ru/upload/iblock/498/03419chdt2elkhv5e07m1v1ahp526b7q/SLIM-Quattro.jpg","https://www.union.ru/upload/iblock/7bb/g1mkypefzapillik713umknbc341avm5/SLIM-Radar.jpg","https://www.union.ru/upload/iblock/ddd/ng4yoth4jgk80h5d906w0tkbiy4sggwo/SLIM-Ritmo_1.jpg","https://www.union.ru/upload/iblock/6b7/hs834l3d8pdzwvllv650ftqcatta8rwv/PIVOT_SLIM-06_2024.jpg"}',
    '{"hinges":"– made in Italy","max_size":"– 120 х 300 см","opening_angle":"2","frame":"полотна в чёрном цвете AL08 Black","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/pivot-slim-39288'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'pivot';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'PIVOT-FILO FONDO', 'PIVOT-FILO FONDO', 'pivot-45-10211',
    'PIVOT-FILO Полотно FILO – поворотное на две стороны. Отделка – грунт под покраску / матовая эмаль / глянцевая эмаль / натуральный шпон / декоративный композитный материал. Алюминиевая торцевая кромка по периметру полотна – опция. Петли – made in Italy. Автоматическая фиксация в открытом и закрытом положении. Максимальные размеры – 120 х 300 см.', 'PIVOT-FILO Полотно FILO – поворотное на две стороны. Отделка – грунт под покраску / матовая эмаль / глянцевая эмаль / натуральный шпон / декоративный композитный материал. Алюминиевая торцевая кромка по периметру полотна – опция. Петли – made in Italy. Автоматическая фиксация в открытом и закрытом положении. Максимальные размеры – 120 х 300 см.',
    3570, target_cat, '{"https://www.union.ru/upload/iblock/d4d/q2ym2mf6pyi76exf9ld4kqmdwxx37osv/2-_-PIVOT-45-laccato.jpg","https://www.union.ru/upload/iblock/763/qm7acq4314yehixlzt88t8csub6drg3o/2-_-PIVOT-45-laccato-1600x1600.jpg","https://www.union.ru/upload/iblock/ec2/4p2wysaetmffo7geoacqpbgpmyf3hgq2/Piatto.png","https://www.union.ru/upload/iblock/dc8/uhuwkkv0wi6mjvb9vr9gex9kps7fx541/1-FILO-Vento-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/72b/cfnglq63ow1buh6p08ccd1fxtvc8hxut/2-FILO-Velino-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/cc5/ipsy35k10duxmg1447awmcsqc9yljn09/3-FILO-Vetta-Noce-Cnaletto.jpg","https://www.union.ru/upload/iblock/716/p0p8aedu7emfaxaevuv4h3b9cxpllzjy/4-FILO-Valetti-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/7b5/2siqmv99k8pski41iasl8ooz68u8lf2k/5-FILO-Vezana-Noce-Canaletto.jpg"}',
    '{"hinges":"– made in Italy","max_size":"– 120 х 300 см","opening_angle":"2","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/pivot-45-10211'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'folding-doors';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LIBRO-SLIM, Space', 'LIBRO-SLIM, Space', 'libro-slim-space',
    'Складные двери LIBRO-SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры – 100 х 300 см. Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Раздвижная система в отделке профиля. Петли made in Italy. В открытом положении – максимально открытый проём. Максимальные размер конструкции – 400 х 300h см.', 'Складные двери LIBRO-SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры – 100 х 300 см. Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Раздвижная система в отделке профиля. Петли made in Italy. В открытом положении – максимально открытый проём. Максимальные размер конструкции – 400 х 300h см.',
    3660, target_cat, '{"https://www.union.ru/upload/iblock/c46/y3n4shrihfc62mt3v66lc57eycxbw337/LIBRO-_-Slim-01-2.png","https://www.union.ru/upload/iblock/6c7/xhkdv94zk0lwuu9pdkxjef6rlepela7k/LIBRO-_-Slim-01-2.png","https://www.union.ru/upload/iblock/ef4/ewps2r5l5im1l8i2dcr5uvs970pwmwr7/LIBRO_SLIM-_-_1-2400_1600.jpg","https://www.union.ru/upload/iblock/65c/neakg1wmjvznu0v64h6o99eny3is6ju1/LIBRO_SLIM-_1-2400_1600.jpg","https://www.union.ru/upload/iblock/ea7/2ed5vods4motjt0zemllo44nmd3p6i0i/LIBRO_SLIM-_2-2400_1600.jpg","https://www.union.ru/upload/iblock/72c/0wrhswz6nfa2ze1g1b52czt1v0lyvs4s/LIBRO_SLIM-_1-2400_1600.jpg","https://www.union.ru/upload/iblock/5a2/v85yt6ync78775l9oascifztl5oiisuu/LIBRO_SLIM-_2-2400_1600.jpg","https://www.union.ru/upload/iblock/09c/ys3lc36x0334i711fvjkfsxwtzuqh78f/LIBRO_SLIM-_2-2400_1600.jpg"}',
    '{"hinges":"are finished in AL08 Black","max_size":"– 100 х 300 см","opening_angle":"2","frame":"and handle in AL08 Black finish","made_in":"Italy","model":"Space"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/libro-slim-space'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'shadow-gap';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FILO-60, Vento / UNIWOOD', 'FILO-60, Vento / UNIWOOD', 'filo-60-vento-uniwood',
    'A DOOR WITH A SHADOW GAP. UNION company together with the Italian studio DECOMA DESIGN present an innovative door design with SHADOW GAP on the UNIWOOD box. The new generation UNIWOOD coplanar box promises to be a real discovery for architects and designers, creating harmony between aestheticsoh and functionality in the interior. Advantages of the door with SHADOW GAPM on the UNIWOOD box: - shadow gap is a hit of the season in design; - wall decoration is simplified due to lighthouses — aluminum corners; - uniform height on both sides of the door; - convenience and durability of installation through an aluminum profile; - reliablethe possibility of fastening the hinges through an aluminum profile; - design innovation due to a single plane with a wall. It''s not just a door − it''s the most s', 'A DOOR WITH A SHADOW GAP. UNION company together with the Italian studio DECOMA DESIGN present an innovative door design with SHADOW GAP on the UNIWOOD box. The new generation UNIWOOD coplanar box promises to be a real discovery for architects and designers, creating harmony between aestheticsoh and functionality in the interior. Advantages of the door with SHADOW GAPM on the UNIWOOD box: - shadow gap is a hit of the season in design; - wall decoration is simplified due to lighthouses — aluminum corners; - uniform height on both sides of the door; - convenience and durability of installation through an aluminum profile; - reliablethe possibility of fastening the hinges through an aluminum profile; - design innovation due to a single plane with a wall. It''s not just a door − it''s the most s',
    3270, target_cat, '{"https://www.union.ru/upload/iblock/be4/u6m0bcrrab52l8m2nrqxchyp11wi3qlj/FILO-60 Vento Noce Canaletto Black UNIW 2400x1600.png","https://www.union.ru/upload/iblock/f3d/tpdq44uqjpw0yxc5uqgv1lvb0wutqfhg/FILO-60%20Vento%20Noce%20Canaletto%20Black%20UNIWOOD.png","https://www.union.ru/upload/iblock/dc8/uhuwkkv0wi6mjvb9vr9gex9kps7fx541/1-FILO-Vento-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/4d7/nnmk3txltzqcj082exx274wepw5hs8rm/FILO-Entry-Noce-Canaletto_1.jpg","https://www.union.ru/upload/iblock/72b/cfnglq63ow1buh6p08ccd1fxtvc8hxut/2-FILO-Velino-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/716/p0p8aedu7emfaxaevuv4h3b9cxpllzjy/4-FILO-Valetti-Noce-Canaletto.jpg","https://www.union.ru/upload/iblock/cc5/ipsy35k10duxmg1447awmcsqc9yljn09/3-FILO-Vetta-Noce-Cnaletto.jpg","https://www.union.ru/upload/iblock/7b5/2siqmv99k8pski41iasl8ooz68u8lf2k/5-FILO-Vezana-Noce-Canaletto.jpg"}',
    '{"thickness":"6 см","hinges":"- скрытые OTLAV, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 100 х 290 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Vento"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/filo-60-vento-uniwood'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'shadow-gap';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FILO-60, LACCATO / UNIWOOD', 'FILO-60, LACCATO / UNIWOOD', 'filo-60-piatto-laccato-uniwood',
    'A DOOR WITH A SHADOW GAP. UNION company together with the Italian studio DECOMA DESIGN present an innovative door design with SHADOW GAP on the UNIWOOD box. The new generation UNIWOOD coplanar box promises to be a real discovery for architects and designers, creating harmony between aestheticsoh and functionality in the interior. Advantages of the door with SHADOW GAPM on the UNIWOOD box: - shadow gap is a hit of the season in design; - wall decoration is simplified due to lighthouses — aluminum corners; - uniform height on both sides of the door; - convenience and durability of installation through an aluminum profile; - reliablethe possibility of fastening the hinges through an aluminum profile; - design innovation due to a single plane with a wall. It''s not just a door − it''s the most s', 'A DOOR WITH A SHADOW GAP. UNION company together with the Italian studio DECOMA DESIGN present an innovative door design with SHADOW GAP on the UNIWOOD box. The new generation UNIWOOD coplanar box promises to be a real discovery for architects and designers, creating harmony between aestheticsoh and functionality in the interior. Advantages of the door with SHADOW GAPM on the UNIWOOD box: - shadow gap is a hit of the season in design; - wall decoration is simplified due to lighthouses — aluminum corners; - uniform height on both sides of the door; - convenience and durability of installation through an aluminum profile; - reliablethe possibility of fastening the hinges through an aluminum profile; - design innovation due to a single plane with a wall. It''s not just a door − it''s the most s',
    2470, target_cat, '{"https://www.union.ru/upload/iblock/21d/f2rj92z4wkp7097i0sjl3y10sr5tqifa/FILO_60-UNIWOOD-Laccato-2400x1600.png","https://www.union.ru/upload/iblock/333/5a7l68p1pntv3uculhv8go2m03xk9bkt/FILO-60%20LACCATO%20UNIWOOD-02%201600x1600.png","https://www.union.ru/upload/iblock/ec2/4p2wysaetmffo7geoacqpbgpmyf3hgq2/Piatto.png","https://www.union.ru/upload/iblock/b2c/1wjpqlkb17kdf7e4mxza0h8sov8fczxt/FILO-Entry-Bianco.jpg","https://www.union.ru/upload/iblock/0a2/yzyj4hjcv2motuo5g7uzccf70ip6mowh/UNIWOOD-1%2027-11-25.png","https://www.union.ru/upload/iblock/acc/qndy3whnicpr02pwf30k8bllxgui0k68/chameleon_new_60Al_Out_2_.jpg","https://www.union.ru/upload/iblock/c6a/rjh22v7qzfl6qzqa1lzhzbzwietaykss/_Planar_OUT_laccato_2.jpg","https://www.union.ru/upload/iblock/2a0/vlibocnchlbg5v9gm1w3n0qtpxyp1bhr/_%20сечение%20DECO%20Filo%2060%20alu%20out.png"}',
    '{"thickness":"6 см","hinges":"- скрытые OTLAV, made in Italy","lock":"- магнитный AGB, made in Italy","max_size":"– 100 х 340 см","opening_angle":"2","gasket":"DEVENTER (made in Germany)","frame":"– двойной брус","made_in":"Italy","model":"Piatto"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/filo-60-piatto-laccato-uniwood'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'soundproof';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'interior-doors'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FILO-60, Soundproof', 'FILO-60, Soundproof', 'filo-60-soundproof',
    'color: #222222;">INVISIBLE and original boxes with designer platbands — PLANAR and DECO; • Hidden OTLAV hinges (made in Italy); • AGBPOLARIS ALUTOP magnetic lock (made in Italy); • A rich palette of finishes: FONDO, LACCATO, LACCATO GLOSS, VENEER, HPL, UNIFLEX -3D; • 5 colors of aluminum; • A single plane with the wall when opening "Out of the opening" and "Into the opening"; • 180° opening; • They can be single-leaf and double-leaf; • Standard canvas size: width 60 / 70 / 80 / 90 cm, height 200 / 210 / 240 see; • Non-standard canvas size: width from 60 cm to 90 cm (in 1 cm increments), inheight from 190 to 270 cm (in 1 cm increments); • Uniform style with the rest of the UNION range.', 'color: #222222;">INVISIBLE and original boxes with designer platbands — PLANAR and DECO; • Hidden OTLAV hinges (made in Italy); • AGBPOLARIS ALUTOP magnetic lock (made in Italy); • A rich palette of finishes: FONDO, LACCATO, LACCATO GLOSS, VENEER, HPL, UNIFLEX -3D; • 5 colors of aluminum; • A single plane with the wall when opening "Out of the opening" and "Into the opening"; • 180° opening; • They can be single-leaf and double-leaf; • Standard canvas size: width 60 / 70 / 80 / 90 cm, height 200 / 210 / 240 see; • Non-standard canvas size: width from 60 cm to 90 cm (in 1 cm increments), inheight from 190 to 270 cm (in 1 cm increments); • Uniform style with the rest of the UNION range.',
    2370, target_cat, '{"https://www.union.ru/upload/iblock/976/8znqmhicv9dkofg1o3z9qb0kcdzn0l1a/Noce-Americano_Vox-2400x1600_01.jpg","https://www.union.ru/upload/iblock/af6/2ymczoipdtovxdnq5asuexgyiz7j9wky/Noce-Americano_Vox-3150x1600_01.jpg","https://www.union.ru/upload/iblock/52c/zzcq5oyo1afl65ljz8nagyeanfhgx79p/_-Fondo-05-3150x1600.jpg","https://www.union.ru/upload/iblock/b75/gkdtr1e291l4kww1h19qza4bt140c1m5/_-Filo-05-3150x1600.jpg","https://www.union.ru/upload/iblock/d68/n3jdqzn1cjr2glkr4542u9fk5mgmxylt/2-_-FILO-Gloss-3150x1600.jpg","https://www.union.ru/upload/iblock/a54/dkppvqthngli6kb2x82yhdfml8hp8kb1/2-_-FILO-Hpl-3150x1600.jpg","https://www.union.ru/upload/iblock/84b/wo2az2ut0fbdrnr82eonzy3aneuw06rh/2-_-uniflex-3D-Step-V-3150x1600.jpg"}',
    '{"hinges":"(made in Italy); • AGBPOLARIS ALUTOP magnetic lock (made in Italy); • A rich pal","lock":"(made in Italy); • A rich palette of finishes: FONDO, LACCATO, LACCATO GLOSS, VE","opening_angle":"2","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/filo-60-soundproof'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-doors';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'SLIDER', 'SLIDER', 'slider-razdvizhnye-dveri-v-penal-393',
    'SLIDER, Piatto, FONDO. FILO-45 canvas, Piatto model, primed for painting (L00 Fondo). A canvas of a conditional size of 70x210 cm, an ABSOLUTE pencil case (which does not require framing the opening), all the necessary cuts.', 'SLIDER, Piatto, FONDO. FILO-45 canvas, Piatto model, primed for painting (L00 Fondo). A canvas of a conditional size of 70x210 cm, an ABSOLUTE pencil case (which does not require framing the opening), all the necessary cuts.',
    3510, target_cat, '{"https://www.union.ru/upload/iblock/9d9/xqnsigix0a9whw4p29w24w7h3mjnu8wu/SLIDER_1_01.jpg","https://www.union.ru/upload/iblock/8f9/nqpyjfxw8qcl7zmz2u3eaflt3ws8dbux/SLIDER_1.jpg.webp","https://www.union.ru/upload/iblock/082/hmdyhvqfkq71nfpljg99p0a0l1wde731/SLIDER-Vento-Rovere-Cenere.jpg","https://www.union.ru/upload/iblock/f1a/vchuzr4e60dz2qftnbw76g1vxep1xldd/SLIDER_-Vento-Rovere-Cenere.jpg","https://www.union.ru/upload/iblock/dba/r9500tl11v3p8b8vkdyl5t323z7tyv1p/SLIDER_11.jpg","https://www.union.ru/upload/iblock/aea/4s3umr66eqzlip5cead0gyn76jp8gis6/_-_-_-SLIDER-_-_-ECLISSE_-SYNTESIS-LINE-_-_-INVISIBLE_-Alu.jpg","https://www.union.ru/upload/iblock/1de/5v4ciewwrof9t40qyalbler41c5143rc/SLIDER-_-_-28_11_2023.png.webp"}',
    '{"lock":"UNION R11 (RU) Preview","opening_angle":"2","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/slider-razdvizhnye-dveri-v-penal-393'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-doors';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'MAGIC', 'MAGIC', 'magic-1219',
    'MAGIC, Piatto, FONDO. FILO-45 canvas, Piatto model primed for painting (L00 Fondo), conditional size 60/70/80/90x200/210 cm, hidden sliding MAGIC system, all the necessary cuts.', 'MAGIC, Piatto, FONDO. FILO-45 canvas, Piatto model primed for painting (L00 Fondo), conditional size 60/70/80/90x200/210 cm, hidden sliding MAGIC system, all the necessary cuts.',
    2520, target_cat, '{"https://www.union.ru/upload/iblock/be5/te4yhc05ca44ul62xd4o2n2lgipi3v09/MAGIC-_-2400_1600.png","https://www.union.ru/upload/iblock/29d/a43q6pp1xjhjeu0fpzy2grwrugjhvmlc/foto_100_scorrevole1.jpg","https://www.union.ru/upload/iblock/ede/zbo9ats0o3sb22ot9xj3ddkzq6ek3ha3/MAGIC_4-_-1000_1000.jpg.webp","https://www.union.ru/upload/iblock/ca1/ttrwv3bt9vnp393aq8y9tzvpzj02vui0/23f72bd17d6195e511927cd5ad7d9e3da4d8e2e4.jpg","https://www.union.ru/upload/iblock/552/q5x4rlkx8vfcsrm7jc69u3k7v7mrni7j/MAGIC-_-_.png.webp"}',
    '{"lock":"UNION R11 (RU) Preview","opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/magic-1219'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wooden-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-FILO, FONDO', 'STRATUS-FILO, FONDO', 'stratus-filo-fondo',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 350h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – грунт под покраску. Максимальные размеры полотна –120 х 350h см. Опции – алюминиевая кромка.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 350h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – грунт под покраску. Максимальные размеры полотна –120 х 350h см. Опции – алюминиевая кромка.',
    2040, target_cat, '{"https://www.union.ru/upload/dev2fun_opengraph/600/fs24uvmuzitgkecvk2v18fgfrvnb0wvo.jpg","https://www.union.ru/upload/iblock/3ec/mjl7ra3b8vpmgd61r71ombg84px7c2uk/STRATUS-Fondo-01.jpg","https://www.union.ru/upload/iblock/b60/61nh3b0t194amgxdqybdoudvc1dhsmgw/STRATUS-Fondo-02.jpg","https://www.union.ru/upload/iblock/004/9e52ifhhv163er2fb5xocwgypsw59uzv/TERNO-SCORREVOLI-_-Eclettica_01.png","https://www.union.ru/upload/iblock/63d/9epeo9zxhdikj5x53jobiz1ku2hwf8aq/Screenshot_6.png.webp","https://www.union.ru/upload/iblock/9d7/0ayje7frs4w59fvx6f4s819u91m9mi8b/FILO-370x220.png.webp","https://www.union.ru/upload/iblock/307/grdnv2vmt6vxhfv6g5yh3ho8m581ot0p/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/85f/7z5euvh9c52asdgzvf7rh00ep9y38v9e/Chrome_Matt_AL09.jpg"}',
    '{"thickness":"4,5 см","max_size":"полотна –120 х 350h см","opening_angle":"2","frame":"– двойной брус","made_in":"Italy","model":"Piatto, Fondo"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-filo-fondo'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wooden-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-FILO, LACCATO', 'STRATUS-FILO, LACCATO', 'stratus-filo-laccato',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 350h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Максимальные размеры полотна –120 х 350h см. Опции – алюминиевая кромка.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 350h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – матовая эмаль. Максимальные размеры полотна –120 х 350h см. Опции – алюминиевая кромка.',
    2310, target_cat, '{"https://www.union.ru/upload/dev2fun_opengraph/456/0y57isnb5t7m2o53q8zznqsol68wi8zm.jpg","https://www.union.ru/upload/iblock/2c5/iki1rgodoypnhzku2d509hbyxbovzy1y/FILO-Laccato-01.jpg","https://www.union.ru/upload/iblock/8cb/e9r6zyfyivk0xyu87fgpmbsct26eytnu/STRATUS_-LAGO_-_-_-_-_.jpg","https://www.union.ru/upload/iblock/e76/jowrlkf1q4wz8fbx7kiaogb5i9v0ahtn/_-01.jpg","https://www.union.ru/upload/iblock/004/9e52ifhhv163er2fb5xocwgypsw59uzv/TERNO-SCORREVOLI-_-Eclettica_01.png","https://www.union.ru/upload/iblock/63d/9epeo9zxhdikj5x53jobiz1ku2hwf8aq/Screenshot_6.png.webp","https://www.union.ru/upload/iblock/9d7/0ayje7frs4w59fvx6f4s819u91m9mi8b/FILO-370x220.png.webp","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg"}',
    '{"thickness":"4,5 см","max_size":"полотна –120 х 350h см","opening_angle":"2","frame":"– двойной брус","made_in":"Italy","model":"Piatto, Laccato"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-filo-laccato'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wooden-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-FILO, LACCATO GLOSS', 'STRATUS-FILO, LACCATO GLOSS', 'stratus-filo-laccato-gloss',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 350h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – глянцевая эмаль. Максимальные размеры полотна –120 х 350h см. Алюминиевая торцевая кромка на полотне.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 350h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – глянцевая эмаль. Максимальные размеры полотна –120 х 350h см. Алюминиевая торцевая кромка на полотне.',
    3240, target_cat, '{"https://www.union.ru/upload/iblock/9dd/q394aa1ex09bjiqf83hkwzjibquao7qa/FILO-Gloss-01.jpg","https://www.union.ru/upload/iblock/b8c/2h66o2yyiq5y36yg6m3cjlgnt5ghkmq2/FILO-Gloss-01.jpg","https://www.union.ru/upload/iblock/217/dcw5og22dc8rd5zfg53naku6zzjjqgu3/_-LAGO-_-05.jpg","https://www.union.ru/upload/iblock/004/9e52ifhhv163er2fb5xocwgypsw59uzv/TERNO-SCORREVOLI-_-Eclettica_01.png","https://www.union.ru/upload/iblock/63d/9epeo9zxhdikj5x53jobiz1ku2hwf8aq/Screenshot_6.png.webp","https://www.union.ru/upload/iblock/9d7/0ayje7frs4w59fvx6f4s819u91m9mi8b/FILO-370x220.png.webp","https://www.union.ru/upload/iblock/690/fmxkru74ng3x5krsgkm4y3de4343un1r/Gloss_Bianco_GL206052020193752.jpg","https://www.union.ru/upload/iblock/33d/0ojf8sl6d8psyx70i9r9af1k6qbghidm/LG02_Bianco_Night_RAL_9010.jpg"}',
    '{"thickness":"4,5 см","max_size":"полотна –120 х 350h см","opening_angle":"2","frame":"– двойной брус","made_in":"Italy","model":"Piatto, Laccato Gloss"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-filo-laccato-gloss'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wooden-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-FILO, Vento', 'STRATUS-FILO, Vento', 'stratus-filo-vento',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 350h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – натуральный шпон. Максимальные размеры полотна –120 х 350h см. Опции – алюминиевая кромка.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 350h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – натуральный шпон. Максимальные размеры полотна –120 х 350h см. Опции – алюминиевая кромка.',
    3000, target_cat, '{"https://www.union.ru/upload/iblock/040/v0zfiqousexhyqrlmfdmh0w2znp7m36j/VENER-Vento-01.jpg","https://www.union.ru/upload/iblock/cfe/w339uziumnp43qarxadwwgcold9x4ye6/VENER-Vento-01.jpg","https://www.union.ru/upload/iblock/78f/b5mjvu2w0tkspzlrxip3pxgwfixo5z39/STRATUS_-Velino-Rovere-Canuto.jpg","https://www.union.ru/upload/iblock/0db/1fqtb2gw2v6rcyotqvekuu4ki5smw2se/STRATUS-Mogano-Dark-Brown.jpg","https://www.union.ru/upload/iblock/004/9e52ifhhv163er2fb5xocwgypsw59uzv/TERNO-SCORREVOLI-_-Eclettica_01.png","https://www.union.ru/upload/iblock/63d/9epeo9zxhdikj5x53jobiz1ku2hwf8aq/Screenshot_6.png.webp","https://www.union.ru/upload/iblock/9d7/0ayje7frs4w59fvx6f4s819u91m9mi8b/FILO-370x220.png.webp","https://www.union.ru/upload/iblock/b8c/ifhth140802vx1il0aw7efbe6mbulnww/V36-Rovere-Miele-s.jpg"}',
    '{"thickness":"4,5 см","max_size":"полотна –120 х 350h см","opening_angle":"2","frame":"– двойной брус","made_in":"Italy","model":"Vento"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-filo-vento'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wooden-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-FILO, HPL', 'STRATUS-FILO, HPL', 'stratus-filo-hpl',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – декоративный композитный материал. Алюминиевая торцевая кромка на полотне. Максимальные размеры полотна –120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно FILO Толщина 4,5 см. Каркас – двойной брус. Отделка – декоративный композитный материал. Алюминиевая торцевая кромка на полотне. Максимальные размеры полотна –120 х 300h см.',
    3210, target_cat, '{"https://www.union.ru/upload/dev2fun_opengraph/d87/jy4rp3jau2lunomjmjac6iw1jia6tq13.jpg","https://www.union.ru/upload/iblock/d65/pit2u79wae9n0bnd2vlmqbpesvnv4vj0/FILO-Hpl-01.jpg","https://www.union.ru/upload/iblock/004/9e52ifhhv163er2fb5xocwgypsw59uzv/TERNO-SCORREVOLI-_-Eclettica_01.png","https://www.union.ru/upload/iblock/63d/9epeo9zxhdikj5x53jobiz1ku2hwf8aq/Screenshot_6.png.webp","https://www.union.ru/upload/iblock/9d7/0ayje7frs4w59fvx6f4s819u91m9mi8b/FILO-370x220.png.webp","https://www.union.ru/upload/iblock/936/qhft2qt4gtvq2vathy2grhz1ws2fo57b/Pietra_Calce_HP02.jpg","https://www.union.ru/upload/iblock/9a3/919byneysruqnqz4t9vkrvp0z3vayxos/HP15%20Pietra%20Italiana.png","https://www.union.ru/upload/iblock/713/ju0ryuey8ulx0r639xnvz0v8gyhbbhud/HP14%20Pietra%20Grezzo.png"}',
    '{"thickness":"4,5 см","max_size":"полотна –120 х 300h см","opening_angle":"2","frame":"– двойной брус","material":"- stone finish Элегантное и функциональное решение для зонирования пространства,","made_in":"Italy","model":"Piatto, HPL"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-filo-hpl'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wooden-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS - UNIFLEX-3D, Step', 'STRATUS - UNIFLEX-3D, Step', 'stratus-uniflex-3d-step',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно UNIFLEX-3D Толщина 4,5 см. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – натуральный шпон. Алюминиевая торцевая кромка на полотне. Максимальные размеры полотна –120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно UNIFLEX-3D Толщина 4,5 см. Каркас – двойной брус. Объемная 3D фрезеровка. Отделка – натуральный шпон. Алюминиевая торцевая кромка на полотне. Максимальные размеры полотна –120 х 300h см.',
    7740, target_cat, '{"https://www.union.ru/upload/iblock/0df/xmj8alfx2p8yiv09zwotcvbpoc72mbwe/VENER-Step-V-02.jpg","https://www.union.ru/upload/iblock/b9e/1qteclfuqkykax2q0he0wu1ngypaof7o/VENER-Step-V-02.jpg","https://www.union.ru/upload/iblock/569/wr5gll3d3vbtd2s6n29sjs9b7ffupnrn/VENER-Step-V.jpg","https://www.union.ru/upload/iblock/0e3/0ffjltv7m4yxvjbx43wyqzju98jcyluw/Step-_-08_2022.jpg","https://www.union.ru/upload/iblock/004/9e52ifhhv163er2fb5xocwgypsw59uzv/TERNO-SCORREVOLI-_-Eclettica_01.png","https://www.union.ru/upload/iblock/63d/9epeo9zxhdikj5x53jobiz1ku2hwf8aq/Screenshot_6.png.webp","https://www.union.ru/upload/iblock/9d7/0ayje7frs4w59fvx6f4s819u91m9mi8b/FILO-370x220.png.webp","https://www.union.ru/upload/iblock/55b/rfqbo9zwejhcyrmboel5s25y7847hxcw/Step-US17-Rovere-Chiaro.jpg"}',
    '{"thickness":"4,5 см","max_size":"полотна –120 х 300h см","opening_angle":"2","frame":"– двойной брус","made_in":"Italy","model":"Step"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-uniflex-3d-step'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-SIGMA, 01', 'STRATUS-SIGMA, 01', 'stratus-sigma-01',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.',
    3000, target_cat, '{"https://www.union.ru/upload/iblock/e6f/tlyboi0uk8j8o12epd13jvon2m5zhs6v/SIGMA 01 2400x1600.png","https://www.union.ru/upload/iblock/f64/e7lk9e154zudv2yhvrj1khez5u4w6lqz/SIGMA%2001%202400x1600.png","https://www.union.ru/upload/iblock/9c1/loyquhm3ciibrvabn1sqgai3vaum0zsc/Sigma%20Sg%2001.jpg","https://www.union.ru/upload/iblock/c41/b2xd901cej9h6q0aioivtrfhdcwoa4jx/RETE%20Oro%20Фрагмент%202400x1600.jpg","https://www.union.ru/upload/iblock/e59/tcb7j9phm3auuejjqtmadmbeep711y6u/RETE%20Nero%20фрагмент.jpg","https://www.union.ru/upload/iblock/2bb/tz4wvqwm99c35br8g1zmsjlm6z9tekb8/STRATUS%20SLIM%20вдоль%20стены%2002%202400x1600.jpg","https://www.union.ru/upload/iblock/4e7/i250eqt5r4pu3qelcej73tvecqtov7ye/TERNO%20SCORREVOLI%20–%20Fluid-01%202400x1600.png","https://www.union.ru/upload/iblock/2af/a69ze6dndby61z2bha49akdzf59nk4bf/STRATUS%20SLIM%2001.png"}',
    '{"max_size":"полотна – 120 х 300h см","opening_angle":"2","frame":"of the canvas and track in black color AL08 Black","made_in":"Italy","model":"01"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-sigma-01'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-SIGMA, 02', 'STRATUS-SIGMA, 02', 'stratus-sigma-02',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.',
    3000, target_cat, '{"https://www.union.ru/upload/iblock/0eb/1x0n26bis6fxwj9ol337m1o6n6ur1mpy/Sigma Sg 02.jpg","https://www.union.ru/upload/iblock/140/8r9q9pj095cqtol3cbcfivz1s0rxu2pg/Sigma%20Sg%2002.jpg","https://www.union.ru/upload/iblock/649/4yk0byrzk7fuhj51dmrqt8jy1714cwgx/RETE%20Oro%20Фрагмент%202400x1600.jpg","https://www.union.ru/upload/iblock/91a/nby0rvi9lo86cn79wf52r0rq641tjaed/RETE%20Nero%20фрагмент.jpg","https://www.union.ru/upload/iblock/5ec/3t5z63yhambkqrhxe9735z1qh2tfze81/STRATUS%20SLIM%20вдоль%20стены%2002%202400x1600.jpg","https://www.union.ru/upload/iblock/482/j07nf5rhicwyo29f1er9am6sa9ctxdll/TERNO%20SCORREVOLI%20–%20Fluid-01%202400x1600.png","https://www.union.ru/upload/iblock/09f/o2l2123awznzh908ab6u2lrq7m5kexjx/STRATUS%20SLIM%2001.png","https://www.union.ru/upload/iblock/00c/vvpjet8df7ov76qd2jtofsr47j9rcnd7/STRATUS%20SLIM%2002.png"}',
    '{"max_size":"полотна – 120 х 300h см","opening_angle":"2","frame":"of the canvas is in black color AL08 Black","made_in":"Italy","model":"02"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-sigma-02'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-SIGMA, 03', 'STRATUS-SIGMA, 03', 'stratus-sigma-03',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.',
    3000, target_cat, '{"https://www.union.ru/upload/iblock/959/pdyh2wqqpbkq545q80h84aq9ahq2ualp/Sigma Sg 03.jpg","https://www.union.ru/upload/iblock/ebc/sb42kxhr3as63p1d6rgkoxlgxpv5cr1k/Sigma%20Sg%2003.jpg","https://www.union.ru/upload/iblock/b6a/vixnszoqy83uxk2vhxc4p05ogfvxpshn/RETE%20Oro%20Фрагмент%202400x1600.jpg","https://www.union.ru/upload/iblock/77f/9wdf7nuqhzucum7wiygpzldss0kvzxz1/RETE%20Nero%20фрагмент.jpg","https://www.union.ru/upload/iblock/9d6/2qhu4vsy1zfvl7n9mpks829pop29w31q/STRATUS%20SLIM%20вдоль%20стены%2002%202400x1600.jpg","https://www.union.ru/upload/iblock/34a/erj2kvbxqk8est27vrs10aub250ggi2b/TERNO%20SCORREVOLI%20–%20Fluid-01%202400x1600.png","https://www.union.ru/upload/iblock/580/5exopz4folcoz0dgzp8l0bkkcpgef2kd/STRATUS%20SLIM%2001.png","https://www.union.ru/upload/iblock/95d/bm59as8u365h4voy1jiz7ef3ycpc7zv8/STRATUS%20SLIM%2002.png"}',
    '{"max_size":"полотна – 120 х 300h см","opening_angle":"2","frame":"of the canvas is in black color AL08 Black","made_in":"Italy","model":"03"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-sigma-03'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-SLIM, Space', 'STRATUS-SLIM, Space', 'stratus-slim-space',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.',
    2220, target_cat, '{"https://www.union.ru/upload/dev2fun_opengraph/11a/a4cwd62bycfs5xfw2zdz4kijabuwisbj.jpg","https://www.union.ru/upload/iblock/0b2/ymzfvt6hd09grj08sg4qggnyc42ffxje/SLIM-Piatto-01.jpg","https://www.union.ru/upload/iblock/f09/e460hqo1qf29sr5rooowd12is6gd4kq7/SLIM-Piatto-Transparente-Sole-01.jpg","https://www.union.ru/upload/iblock/503/n4p5bf735yhprxuicwi24zp5yhazfm94/SLIM-_-2400x1600.jpg","https://www.union.ru/upload/iblock/87b/esd5l8lewpgyrefv4j2apkkv32k4vsz6/Rete-Oro-2.jpg","https://www.union.ru/upload/iblock/b1e/uwxbal1tytuy1o5o1cr00sf35b7mzilg/RETE-Oro-3.jpg","https://www.union.ru/upload/iblock/664/0x2kxfhmh76o47ktmuu89f7nwu3ts72k/RETE-Oro-Argento-02-1-2400x1600.jpg","https://www.union.ru/upload/iblock/172/9lg13xxfwqezur61x9vdhdd0twoztshz/RETE-Oro-4.jpg"}',
    '{"max_size":"полотна – 120 х 300h см","opening_angle":"2","frame":"in color AL08 Black","made_in":"Italy","model":"Space"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-slim-space'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-SLIM, Tre', 'STRATUS-SLIM, Tre', 'stratus-slim-tre',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.',
    2220, target_cat, '{"https://www.union.ru/upload/iblock/958/8v1ul3nmf4iqx1zfq4d62ym6kwhnf7q4/SLIM-_inque-01.jpg","https://www.union.ru/upload/iblock/3cc/2t1gnts3tp1w3o8mu54q1upsld6pfa3k/SLIM-Tre-01.jpg","https://www.union.ru/upload/iblock/0b2/ymzfvt6hd09grj08sg4qggnyc42ffxje/SLIM-Piatto-01.jpg","https://www.union.ru/upload/iblock/f09/e460hqo1qf29sr5rooowd12is6gd4kq7/SLIM-Piatto-Transparente-Sole-01.jpg","https://www.union.ru/upload/iblock/503/n4p5bf735yhprxuicwi24zp5yhazfm94/SLIM-_-2400x1600.jpg","https://www.union.ru/upload/iblock/87b/esd5l8lewpgyrefv4j2apkkv32k4vsz6/Rete-Oro-2.jpg","https://www.union.ru/upload/iblock/b1e/uwxbal1tytuy1o5o1cr00sf35b7mzilg/RETE-Oro-3.jpg","https://www.union.ru/upload/iblock/664/0x2kxfhmh76o47ktmuu89f7nwu3ts72k/RETE-Oro-Argento-02-1-2400x1600.jpg"}',
    '{"max_size":"полотна – 120 х 300h см","opening_angle":"2","frame":"in AL04 Soft Bronze color","made_in":"Italy","model":"Tre"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-slim-tre'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-SLIM, Quattro', 'STRATUS-SLIM, Quattro', 'stratus-slim-quattro',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.',
    2220, target_cat, '{"https://www.union.ru/upload/iblock/ff5/cem7vraqu6xuf95uuoujuv382ir1rdxf/SLIM-Quattro-01.jpg","https://www.union.ru/upload/iblock/ea4/ziqzjj430yc6o64xg6er59hhx4eknvxt/SLIM-Quattro-01.jpg","https://www.union.ru/upload/iblock/0b2/ymzfvt6hd09grj08sg4qggnyc42ffxje/SLIM-Piatto-01.jpg","https://www.union.ru/upload/iblock/f09/e460hqo1qf29sr5rooowd12is6gd4kq7/SLIM-Piatto-Transparente-Sole-01.jpg","https://www.union.ru/upload/iblock/503/n4p5bf735yhprxuicwi24zp5yhazfm94/SLIM-_-2400x1600.jpg","https://www.union.ru/upload/iblock/87b/esd5l8lewpgyrefv4j2apkkv32k4vsz6/Rete-Oro-2.jpg","https://www.union.ru/upload/iblock/b1e/uwxbal1tytuy1o5o1cr00sf35b7mzilg/RETE-Oro-3.jpg","https://www.union.ru/upload/iblock/664/0x2kxfhmh76o47ktmuu89f7nwu3ts72k/RETE-Oro-Argento-02-1-2400x1600.jpg"}',
    '{"max_size":"полотна – 120 х 300h см","opening_angle":"2","frame":"in AL03 Soft Bronze color","made_in":"Italy","model":"Quattro"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-slim-quattro'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-SLIM, Radar', 'STRATUS-SLIM, Radar', 'stratus-slim-radar',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.',
    2220, target_cat, '{"https://www.union.ru/upload/iblock/4fa/e4rmjb1hja72vtwgdl4mnqpbsrq4t7ze/SLIM-Radar-01-2400_1600.jpg","https://www.union.ru/upload/iblock/e7c/w897odjztaobc3iktoqrz0q9016g1v3a/SLIM-Radar-01.jpg","https://www.union.ru/upload/iblock/0b2/ymzfvt6hd09grj08sg4qggnyc42ffxje/SLIM-Piatto-01.jpg","https://www.union.ru/upload/iblock/f09/e460hqo1qf29sr5rooowd12is6gd4kq7/SLIM-Piatto-Transparente-Sole-01.jpg","https://www.union.ru/upload/iblock/503/n4p5bf735yhprxuicwi24zp5yhazfm94/SLIM-_-2400x1600.jpg","https://www.union.ru/upload/iblock/87b/esd5l8lewpgyrefv4j2apkkv32k4vsz6/Rete-Oro-2.jpg","https://www.union.ru/upload/iblock/b1e/uwxbal1tytuy1o5o1cr00sf35b7mzilg/RETE-Oro-3.jpg","https://www.union.ru/upload/iblock/664/0x2kxfhmh76o47ktmuu89f7nwu3ts72k/RETE-Oro-Argento-02-1-2400x1600.jpg"}',
    '{"max_size":"полотна – 120 х 300h см","opening_angle":"2","frame":"in color AL08 Black","made_in":"Italy","model":"Radar"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-slim-radar'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-SLIM, Ritmo', 'STRATUS-SLIM, Ritmo', 'stratus-slim-ritmo',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры полотна – 120 х 300h см.',
    2220, target_cat, '{"https://www.union.ru/upload/iblock/ac0/0gb1yt31hbth58caz80dgihpphox1cs7/SLIM_Pulsar_01.jpg","https://www.union.ru/upload/iblock/d3e/j8bemptu1ej1wiulvz98azgqll1kj540/SLIM-Ritmo-01.jpg","https://www.union.ru/upload/iblock/0b2/ymzfvt6hd09grj08sg4qggnyc42ffxje/SLIM-Piatto-01.jpg","https://www.union.ru/upload/iblock/f09/e460hqo1qf29sr5rooowd12is6gd4kq7/SLIM-Piatto-Transparente-Sole-01.jpg","https://www.union.ru/upload/iblock/503/n4p5bf735yhprxuicwi24zp5yhazfm94/SLIM-_-2400x1600.jpg","https://www.union.ru/upload/iblock/87b/esd5l8lewpgyrefv4j2apkkv32k4vsz6/Rete-Oro-2.jpg","https://www.union.ru/upload/iblock/b1e/uwxbal1tytuy1o5o1cr00sf35b7mzilg/RETE-Oro-3.jpg","https://www.union.ru/upload/iblock/664/0x2kxfhmh76o47ktmuu89f7nwu3ts72k/RETE-Oro-Argento-02-1-2400x1600.jpg"}',
    '{"max_size":"полотна – 120 х 300h см","opening_angle":"2","frame":"in color AL08 Black","made_in":"Italy","model":"Ritmo"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-slim-ritmo'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-LAGO, Lira', 'STRATUS-LAGO, Lira', 'stratus-lago-lira',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно LAGO Структура – закаленный алюминий. Стекло прозрачное / стекло матовое / зеркало / стекло крашеное глянцевое / стекло крашеное матовое. Максимальные размеры – 120 х 300 см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно LAGO Структура – закаленный алюминий. Стекло прозрачное / стекло матовое / зеркало / стекло крашеное глянцевое / стекло крашеное матовое. Максимальные размеры – 120 х 300 см.',
    2190, target_cat, '{"https://www.union.ru/upload/dev2fun_opengraph/3ce/9u0pjjo7wms8m3qm7uskmsam2oeyal1y.jpg","https://www.union.ru/upload/iblock/674/wl8rn9bubuemhi42ztr7vih5zp3nz16j/LAGO-Lira-12_3.jpg","https://www.union.ru/upload/iblock/efa/j9trhmeyvh4l8nb9a4ju2clo1q0s71f2/_-LAGO-_-06-2400x1600.jpg","https://www.union.ru/upload/iblock/27a/0tn6glw0iffp5i1m939nxwte5n1v0f2c/STRATUS_-LAGO_-Lira_2-2400x1600.jpg","https://www.union.ru/upload/iblock/2e6/hyft2eomnqb6wpbhcy500rqo6t3ekzrh/LAGO-Piatto-01-2400x1600.jpg","https://www.union.ru/upload/iblock/9ef/spcb1v2obcf82qev6kbjhh020bk9mgou/STRATUS_-LAGO_-Lira_3-2400x1600.jpg","https://www.union.ru/upload/iblock/b85/bt3g9ikve6d99hfc1j27i72a96c7us13/LAGO-Lira-_01.jpg","https://www.union.ru/upload/iblock/1b8/eexlwmohuqv9ms1qq5vkjqpurw0pjtb2/STRATUS_-LAGO_02.jpg"}',
    '{"max_size":"– 120 х 300 см","opening_angle":"2","frame":"in AL08 Black color","made_in":"Italy","model":"Lira"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-lago-lira'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-LAGO, Plain', 'STRATUS-LAGO, Plain', 'stratus-lago-plain',
    'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно LAGO Структура – закаленный алюминий. Стекло прозрачное / стекло матовое / зеркало / стекло крашеное глянцевое / стекло крашеное матовое. Максимальные размеры – 120 х 300 см.', 'Раздвижной механизм STRATUS Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Устройства останова – SOFT CLOSING, made in Italy. Универсальность элементов – одни и те же треки для конструкций скрытого и видимого монтажа. Съемный алюминиевый наличник – для конструкций с видимым треком. Максимальные размер конструкции – 700 х 300h см. Полотно LAGO Структура – закаленный алюминий. Стекло прозрачное / стекло матовое / зеркало / стекло крашеное глянцевое / стекло крашеное матовое. Максимальные размеры – 120 х 300 см.',
    2190, target_cat, '{"https://www.union.ru/upload/dev2fun_opengraph/9fd/dh52vanr1gyiff7tnn34dpg1r90iivf6.jpg","https://www.union.ru/upload/iblock/efa/j9trhmeyvh4l8nb9a4ju2clo1q0s71f2/_-LAGO-_-06-2400x1600.jpg","https://www.union.ru/upload/iblock/27a/0tn6glw0iffp5i1m939nxwte5n1v0f2c/STRATUS_-LAGO_-Lira_2-2400x1600.jpg","https://www.union.ru/upload/iblock/2e6/hyft2eomnqb6wpbhcy500rqo6t3ekzrh/LAGO-Piatto-01-2400x1600.jpg","https://www.union.ru/upload/iblock/9ef/spcb1v2obcf82qev6kbjhh020bk9mgou/STRATUS_-LAGO_-Lira_3-2400x1600.jpg","https://www.union.ru/upload/iblock/b85/bt3g9ikve6d99hfc1j27i72a96c7us13/LAGO-Lira-_01.jpg","https://www.union.ru/upload/iblock/1b8/eexlwmohuqv9ms1qq5vkjqpurw0pjtb2/STRATUS_-LAGO_02.jpg","https://www.union.ru/upload/iblock/5df/02l9kabydpztd61zbtgz4aij3eyozhtf/TERNO-SCORREVOLI-_-Fluid_01-2400x1600.png"}',
    '{"max_size":"– 120 х 300 см","opening_angle":"2","frame":"in the color AL09 Chrome Matt","made_in":"Italy","model":"Plain"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-lago-plain'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'aluminum-glass-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'STRATUS-LAGO, Modelica', 'STRATUS-LAGO, Modelica', 'stratus-lago-modelica',
    'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap', 'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap',
    2190, target_cat, '{"https://www.union.ru/upload/dev2fun_opengraph/eff/38j681d1kf2z1fozowlq194u4oxl7gwx.jpg","https://www.union.ru/upload/iblock/d9e/aiwgi9vh9q9j1dm7e9sm8iuc652x1x3k/LAGO-Modelica-02-2400x1600.jpg","https://www.union.ru/upload/iblock/c1d/56fuv22euhtm3i62ikoxg2ruitf1793u/LAGO-Modelica-01-2400x1600.jpg","https://www.union.ru/upload/iblock/ede/sgx2bafumekwxe3m4iezzwg9pngmdz18/LAGO-Modelica-03-2400x1600.jpg","https://www.union.ru/upload/iblock/ad1/3ble75484x0rr8bz3c4r9s5oy2p9hi5e/LAGO-Modelica_01-2400x1600.png","https://www.union.ru/upload/iblock/a96/7vlfj12f10grwstvn3gu9scnp3q8v6ax/LAGO-Modelica-ArDeco-_-2-01-2400x1600.jpg","https://www.union.ru/upload/iblock/5d7/52agwt076yrisrhgjzfmjzhhyqh6vs50/LAGO-Modelica-ArDeco-_-3-02-2400x1600.jpg","https://www.union.ru/upload/iblock/a79/q74rc04xir79mdehuzcnigyqfso29kh7/STRATUS%20LAGO%2001.png"}',
    '{"opening_angle":"2","frame":"and track in AL08 Black color","model":"Modelica"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stratus-lago-modelica'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'folding-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LIBRO-SLIM, Space', 'LIBRO-SLIM, Space', 'transformer-slim-space',
    'Складные перегородки LIBRO-SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры – 100 х 300 см. Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Раздвижная система в отделке профиля. Петли made in Italy. В открытом положении – максимально открытый проём. Максимальные размер конструкции – 400 х 300h см.', 'Складные перегородки LIBRO-SLIM Структура – закаленный алюминий. Стекло – прозрачное / матовое / рифленое / прозрачное с металлизированной сеткой / зеркало. Безопасное стекло толщиной 0,6 - 0,7 см. Максимальные размеры – 100 х 300 см. Трек – закаленный алюминий. Раздвижной механизм – TERNO SCORREVOLI, made in Italy. Раздвижная система в отделке профиля. Петли made in Italy. В открытом положении – максимально открытый проём. Максимальные размер конструкции – 400 х 300h см.',
    3660, target_cat, '{"https://www.union.ru/upload/iblock/31e/sel0dthttq4vt3jujxskcc7st0fsqaog/LIBRO-Slim-01.jpg","https://www.union.ru/upload/iblock/0c3/6pqdq01e2wtvuot2fllkktuc9qdlolqi/LIBRO-03-Slim.jpg","https://www.union.ru/upload/iblock/185/p09bo563yofle6q4lqgc46cj6x13tq6v/LIBRO-Slim-01.jpg","https://www.union.ru/upload/iblock/397/vnvma5z1s8zjq157kumjj8yrnorlgzjc/LIBRO_SLIM_01.jpg","https://www.union.ru/upload/iblock/0b8/iidl7i2j2ezo5985puujz5s32fbiexht/_-1_03.jpg","https://www.union.ru/upload/iblock/7d6/7xshivbd0y93u14g7kw87f6zcjh5hude/LIBRO_SLIM-_-_1-2400_1600.jpg","https://www.union.ru/upload/iblock/a89/r7et23b1zklehvv021ngqhk3gc01jind/LIBRO_SLIM-_1-2400_1600.jpg","https://www.union.ru/upload/iblock/5a1/2wbghsgtnsv8qdrxo3mnghtf1jmfft5x/LIBRO_SLIM-_2-2400_1600.jpg"}',
    '{"hinges":"are finished in AL08 Black","max_size":"– 100 х 300 см","opening_angle":"2","frame":"and handle in AL08 Black finish","made_in":"Italy","model":"Space"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/transformer-slim-space'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'folding-partitions';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'sliding-partitions'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'TRANSFORMER', 'TRANSFORMER', 'transformiruemye-peregorodki-6179',
    'TRANSFORMER, Vario. The Vario model. Construction of three canvases. The canvases are deaf in the L00 Fondo finish (primer for painting). Canvas size 30-80x190-210 cm, accessories in the color AL09 Chrome Matt (chrome matt), all the necessary cuts (without handles).', 'TRANSFORMER, Vario. The Vario model. Construction of three canvases. The canvases are deaf in the L00 Fondo finish (primer for painting). Canvas size 30-80x190-210 cm, accessories in the color AL09 Chrome Matt (chrome matt), all the necessary cuts (without handles).',
    5280, target_cat, '{"https://www.union.ru/upload/iblock/389/g5er7znk3bgpgjo0a2zpcs07b82zttt2/transformer-2.jpg","https://www.union.ru/upload/iblock/445/k9vd1p3jyqh97bm4oqd93ygfl6yf2chu/transformer-2.jpg","https://www.union.ru/upload/iblock/376/mzr6rhh5skentvuu241p97ekc4w3cdoe/Transformer-Vario-01.jpg","https://www.union.ru/upload/iblock/e58/fjgli0y3ad3b128r1haihig0n0rr3ed4/Transformer-Vario.jpg","https://www.union.ru/upload/iblock/9c9/hjemnv1bexj27rksh16cdq4i5hdmazzy/65320b8686faad634ca6824699ef249fdbfbd626.jpg","https://www.union.ru/upload/iblock/a11/90llbsjtrwjsqmptubdbd8o8ba5hea0m/thumb-_4_.jpg"}',
    '{"lock":"!important; }","opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/transformiruemye-peregorodki-6179'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'modern-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER Alu', 'COVER Alu', 'cover-alu',
    'Стеновые панели COVER Alu изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - LACCATO, матовая эмаль, - LACCATO GLOSS, глянцевая эмаль, - HPL, декоративный композитный материал, - VENEER, натуральный шпон ценных пород древесины в вертикальном Velino направлении. С тыльной стороны панелей предусмотрен компенсационный слой. Для расширения возможностей системы и вариаций дизайна введены декоративные алюминиевые профили. Отделки профиля / молдинга – ALUMINIUM. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка и выравнивание панелей между собой производится с использованием распорного профиля. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровно', 'Стеновые панели COVER Alu изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - LACCATO, матовая эмаль, - LACCATO GLOSS, глянцевая эмаль, - HPL, декоративный композитный материал, - VENEER, натуральный шпон ценных пород древесины в вертикальном Velino направлении. С тыльной стороны панелей предусмотрен компенсационный слой. Для расширения возможностей системы и вариаций дизайна введены декоративные алюминиевые профили. Отделки профиля / молдинга – ALUMINIUM. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка и выравнивание панелей между собой производится с использованием распорного профиля. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровно',
    720, target_cat, '{"https://www.union.ru/upload/iblock/36a/zdagf8pel7jfc1bh6bp329w6c0ziq9wz/COVER Stock 002 2400x1600.png","https://www.union.ru/upload/iblock/569/0rry8k4z14l0q6ili7va2hua4tq763ps/COVER%20Stock%20002%202400x1600.png","https://www.union.ru/upload/iblock/b13/upbd0nggy2q9xz89lwu74mintjf0v74n/COVER%20Stock%20006.jpg","https://www.union.ru/upload/iblock/5b7/36rd98xxwyzvyb5r2ozgbfbpbm3s5f5k/COVER%20Alu%20Rovere%20Fume%20Soft%20Gold%202400x1600.png","https://www.union.ru/upload/iblock/d55/eydop6u8k23p8orhs1l6mh7x7o71n12m/COVER%20Stock%2004%202400x1600.png","https://www.union.ru/upload/iblock/c0a/lvbf1lwhws7j5ms4suxsbnlhqhsopfyf/COVER%20Stock%20004.jpg","https://www.union.ru/upload/iblock/9e7/b6rvu1ynhhn6xo70c0bg7ygg9y6uoks4/Render%20Cover.png","https://www.union.ru/upload/iblock/ea6/tfayob8t20faizi2psfb4o8gotxoa5m9/COVER%20Stock%20001.jpg"}',
    '{"opening_angle":"2","material":"HP02 Pietra Calce HP15 Pietra Italiana HP14 Pietra Grezzo HP01 Pietra Piombo HP0"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-alu'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'modern-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, LACCATO', 'COVER, LACCATO', 'cover-laccato-6639',
    'Стеновые панели COVER, LACCATO изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - матовая эмаль. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.', 'Стеновые панели COVER, LACCATO изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - матовая эмаль. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.',
    600, target_cat, '{"https://www.union.ru/upload/iblock/13d/854b0vijem61gt1iqeommq1sk2g8r5ej/COVER laccato.jpg","https://www.union.ru/upload/iblock/5b1/q36nsbkyoe4xib6zgh4l73atcqtxm3me/COVER%20laccato.jpg","https://www.union.ru/upload/iblock/168/e1ky3lxoij8r62v0t91u4ov372g3q5x9/COVER%20Laccato%20-1%202400x1600.png","https://www.union.ru/upload/iblock/f2a/biinh94nreyudrru8u9y2nh94thwpwuq/COVER%20Laccato-2%202400x1600.png","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg","https://www.union.ru/upload/iblock/5ef/062okwbokx00rh5xcax4bn4f3zmwn8rm/L03_Avorio_RAL_1013.jpg","https://www.union.ru/upload/iblock/409/qw36gy0lwxy60z4z8cc3vzpqb79qok1b/L06_Grigio_Seta_RAL_7044.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-laccato-6639'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'modern-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, LACCATO GLOSS.', 'COVER, LACCATO GLOSS.', 'cover-laccato-gloss-26810',
    'Стеновые панели COVER, LACCATO GLOSS изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - глянцевая эмаль. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.', 'Стеновые панели COVER, LACCATO GLOSS изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - глянцевая эмаль. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.',
    1050, target_cat, '{"https://www.union.ru/upload/iblock/c4a/klmwgnaib76ivhl008bylij607ue39bj/COVER gloss.jpg","https://www.union.ru/upload/iblock/a1e/9c6dq3ur71eajxuz0srnbqvnujvj5bzx/COVER%20gloss.jpg","https://www.union.ru/upload/iblock/f0a/0qqk5tl0xdh5u59y2v2fconygrc243a3/_-1_06-_-1660.jpg","https://www.union.ru/upload/iblock/988/q4c0u9176dxg59utavkl7v88ji994ow7/9b2d8522412415b913212904bd869a060b34bad8.jpg","https://www.union.ru/upload/iblock/df6/k3jbi735epbhyxaeu7iyza4189tjyes2/2_-_-1_01.jpg","https://www.union.ru/upload/iblock/690/fmxkru74ng3x5krsgkm4y3de4343un1r/Gloss_Bianco_GL206052020193752.jpg","https://www.union.ru/upload/iblock/33d/0ojf8sl6d8psyx70i9r9af1k6qbghidm/LG02_Bianco_Night_RAL_9010.jpg","https://www.union.ru/upload/iblock/c27/dziung5ipdxk15285bjnggx70qfv80fl/LG03_Avorio_RAL_1013.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-laccato-gloss-26810'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'modern-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, VENEER', 'COVER, VENEER', 'cover-veneer-26813',
    'Стеновые панели COVER, VENEER изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - натуральны шпон, матовый лак. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.', 'Стеновые панели COVER, VENEER изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - натуральны шпон, матовый лак. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.',
    810, target_cat, '{"https://www.union.ru/upload/iblock/1cc/hiq3ftmw7zcal4llvu6hk8dob0v12bxw/COVER Veneer.jpg","https://www.union.ru/upload/iblock/d2e/tkz3290hpu3pz5ujneeq8pv1jawj80yi/COVER%20Veneer.jpg","https://www.union.ru/upload/iblock/110/9irqdyc6k9pnce41nn1mx24xuc2z6drm/COVER-FILO_60-Vento-V20.jpg","https://www.union.ru/upload/iblock/66d/8pkkkwcavpt6otlpbsfv2r8ghgh1q19j/COVER-05%202400x1600.png","https://www.union.ru/upload/iblock/4b8/zom85wa8gyjga3t09muelngi2bfrrii9/COVER_-Vento_-Noce-Americano-2.jpg","https://www.union.ru/upload/iblock/e5b/umlmts790rykoceht1ez4wqao70d39tp/1034afc611f71a483abe91a9c1f776871bd283f0.jpg","https://www.union.ru/upload/iblock/89f/z5z3irqxujss2x7e2c2vb6vabt3awgc8/COVER_-Noce-Europeo.jpg","https://www.union.ru/upload/iblock/b8c/ifhth140802vx1il0aw7efbe6mbulnww/V36-Rovere-Miele-s.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-veneer-26813'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'modern-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, HPL', 'COVER, HPL', 'cover-hpl-26811',
    'Стеновые панели COVER, HPL изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - декоративный композитный материал. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.', 'Стеновые панели COVER, HPL изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - декоративный композитный материал. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.',
    1350, target_cat, '{"https://www.union.ru/upload/iblock/d5e/avf2qbwyu2h2o5vkvcfiw5m72qr429yg/COVER hpl.jpg","https://www.union.ru/upload/iblock/1a1/33amvyg24c253i4bu69hr7esoor7yiau/COVER%20hpl.jpg","https://www.union.ru/upload/iblock/7f5/660f25q7kje73bnbg54gsi323dljc6ak/65ba9478ac665e0cbd25664a45d4d65f9dd6e0f0.jpg","https://www.union.ru/upload/iblock/441/gzjmoue6si6nlfadj3t5d0okp11uym0m/COVER_-HPL-Marmo-Grigio.jpg","https://www.union.ru/upload/iblock/936/qhft2qt4gtvq2vathy2grhz1ws2fo57b/Pietra_Calce_HP02.jpg","https://www.union.ru/upload/iblock/9a3/919byneysruqnqz4t9vkrvp0z3vayxos/HP15%20Pietra%20Italiana.png","https://www.union.ru/upload/iblock/713/ju0ryuey8ulx0r639xnvz0v8gyhbbhud/HP14%20Pietra%20Grezzo.png","https://www.union.ru/upload/iblock/bff/fcew8tglebs49hjw0om3xqqn56k199ik/Pietra_Piombo_HP01.jpg"}',
    '{"opening_angle":"2","material":"HPL - stone finish COVER, HPL становятся полноценным архитектурным инструментом"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-hpl-26811'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, UNIFLEX-3D, Legato', 'COVER, UNIFLEX-3D, Legato', 'cover-uniflex-3d-legato',
    'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 240 см.', 'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 240 см.',
    2100, target_cat, '{"https://www.union.ru/upload/iblock/7bd/26zqk2nt5kt0r2zs4x3ixy9bxvkopo0j/UNIFLEX 3D Legato 2400x1600.png","https://www.union.ru/upload/iblock/bea/eiaohw9dqbxlem20ks9wp487uejgzb2c/UNIFLEX%203D%20Legato%202400x1600.png","https://www.union.ru/upload/iblock/38c/fta2ce84cjbzhrdessttu0rsqz4qvwcy/интерьер%20UNION%20STEP%202400x1600.png","https://www.union.ru/upload/iblock/e68/xf87djzfjb9e9hsaq5hj39pfic9fjq7m/интерьер%20UNION%20STEP%202%202400x1600.png","https://www.union.ru/upload/iblock/e62/jqulxcbwkzqkzdr7dw5feh6txofypk3d/интерьер%20UNION%20STEP%203%202400x1600.png","https://www.union.ru/upload/iblock/a36/vpcuyqfqlhsuz2ee69um5sbeu3kujgue/интерьер%20UNION%20STEP%204%202400x1600.png","https://www.union.ru/upload/iblock/e27/7415ea9k4peftu4cvonri4bobqa1043r/интерьер%20UNION%20STEP%205%202400x1600.png","https://www.union.ru/upload/iblock/a61/f1ebbxvjov8zrmqdl79y580qzd80b4q9/Legato%20UL40%20Noce%20Italiano%202000x2000.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-uniflex-3d-legato'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, UNIFLEX-3D, Canvas', 'COVER, UNIFLEX-3D, Canvas', 'cover-uniflex-3d-canvas',
    'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 240 см.', 'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 240 см.',
    2100, target_cat, '{"https://www.union.ru/upload/iblock/955/ovkm64hjeecbylpdlmyydt3kmbgo806v/UNIFLEX 3D New COVER Canvas 2400х1600.png","https://www.union.ru/upload/iblock/d2a/ycys0pr2ql4c2wr0zctqrmh1pwuv8sdb/UNIFLEX%203D%20New%20COVER%20Canvas%202400х1600.png","https://www.union.ru/upload/iblock/de0/6cl7gorno7jmztui061u2of1dbszm54p/интерьер%20UNION%20STEP%202400x1600.png","https://www.union.ru/upload/iblock/f0a/rnoa0gl9b68cst8vg4582ynxjgrmuz0b/интерьер%20UNION%20STEP%202%202400x1600.png","https://www.union.ru/upload/iblock/7b8/dni45r5u90z6s4d2zawo7mwzsjrx73w5/интерьер%20UNION%20STEP%203%202400x1600.png","https://www.union.ru/upload/iblock/ffd/qnjt0gj2v92wvqsiokok54mr08z0co5o/интерьер%20UNION%20STEP%204%202400x1600.png","https://www.union.ru/upload/iblock/c0f/b229jpeqr341wbp9o8kgoz7mr57qdrwy/интерьер%20UNION%20STEP%205%202400x1600.png","https://www.union.ru/upload/iblock/a61/e6foqnac58612igh1ww95o4lxrnw98y8/UC41%20Rovere%20Ambra.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-uniflex-3d-canvas'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, UNIFLEX-3D, Tartan', 'COVER, UNIFLEX-3D, Tartan', 'cover-uniflex-3d-tartan',
    'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 240 см.', 'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 240 см.',
    2100, target_cat, '{"https://www.union.ru/upload/iblock/de7/8wnap3zm5m67du7ot66yf19fe6h5onay/UNIFLEX 3D New COVER Tartan 2400х1600.png","https://www.union.ru/upload/iblock/296/6efygby1ief1w6qgw78zf9pty9tx7nyh/UNIFLEX%203D%20New%20COVER%20Tartan%202400х1600.png","https://www.union.ru/upload/iblock/162/tewwlokygozqx0pul8xuikt8kjpieu4j/интерьер%20UNION%20STEP%202400x1600.png","https://www.union.ru/upload/iblock/dc5/2x8m7zphsuajom6614tc3zv8yyhluzqe/интерьер%20UNION%20STEP%202%202400x1600.png","https://www.union.ru/upload/iblock/d8b/5s2w5eeckjw62gu0cn82cu3y9arsrnfr/интерьер%20UNION%20STEP%203%202400x1600.png","https://www.union.ru/upload/iblock/bfb/hrxo0gqbbrq6pv9280uk5x011mf0ckrb/интерьер%20UNION%20STEP%204%202400x1600.png","https://www.union.ru/upload/iblock/5c7/oeaja357eh3yhxh15ourhycy0kue8hke/интерьер%20UNION%20STEP%205%202400x1600.png","https://www.union.ru/upload/iblock/343/3ucpn00dxlkvc2x16b7tl6ixsuabwp3l/UT41%20Rovere%20Ambra.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-uniflex-3d-tartan'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, UNIFLEX-3D, Plisse', 'COVER, UNIFLEX-3D, Plisse', 'cover-uniflex-3d-plisse',
    'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 240 см.', 'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 240 см.',
    2100, target_cat, '{"https://www.union.ru/upload/iblock/c6c/tn7fzwx3ue14ebrjbjtw1xhensom9jut/UNIFLEX 3D New COVER Plisse 2400х1600.png","https://www.union.ru/upload/iblock/be1/v4dmo6blfqi7dr5yv99oxvd90j3q7uhq/UNIFLEX%203D%20New%20COVER%20Tartan%202400х1600.png","https://www.union.ru/upload/iblock/bf2/fxf8gy00d3yrka7d2gri9iqcuhp5e9s3/интерьер%20UNION%20STEP%202400x1600.png","https://www.union.ru/upload/iblock/efd/i0tl6q54f0xy7p7qngpmr2deybx8udbd/интерьер%20UNION%20STEP%202%202400x1600.png","https://www.union.ru/upload/iblock/9c2/6gtl5sg1785zivyi8fds5m7f0tr7qem9/интерьер%20UNION%20STEP%203%202400x1600.png","https://www.union.ru/upload/iblock/b49/28dfv4fw4nb8ypvczuxy2qoykhd3o3hy/интерьер%20UNION%20STEP%204%202400x1600.png","https://www.union.ru/upload/iblock/83e/mmlp00y15rsxj5ysecbfvpxsb8wj2dnw/интерьер%20UNION%20STEP%205%202400x1600.png","https://www.union.ru/upload/iblock/fe4/9xcaa7r9ngf0wnetofgl72gsx80w3psg/UP41%20Rovere%20Ambra.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-uniflex-3d-plisse'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, UNIFLEX-3D, Step', 'COVER, UNIFLEX-3D, Step', 'cover-step-27716',
    'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 285 см.', 'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, натуральный шпон, - 3D поверхность, массив дерева. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 285 см.',
    2100, target_cat, '{"https://www.union.ru/upload/iblock/ccf/wcl9rqkv1jn26likdo4xiqan2n2a2499/COVER-Step-V.jpg","https://www.union.ru/upload/iblock/0d1/tv0kmzp01q1lawgbj5km83993wooyi37/COVER-Step-V.jpg","https://www.union.ru/upload/iblock/4ff/f7op6xq16f2kd10v2sf2oa4soj4a56wr/интерьер%20UNION%20STEP%202400x1600.png","https://www.union.ru/upload/iblock/25b/oikyqp34nvojzyugh837ssfrkxofdv7b/интерьер%20UNION%20STEP%202%202400x1600.png","https://www.union.ru/upload/iblock/63b/8ah5ar0407byhgcf942ffj3jo7awcwhv/интерьер%20UNION%20STEP%203%202400x1600.png","https://www.union.ru/upload/iblock/eeb/cubo3cxf1fte1cxsjva340y8hb45597n/интерьер%20UNION%20STEP%204%202400x1600.png","https://www.union.ru/upload/iblock/b81/hdjmbaasso9b8gc8l736lit5nab9ecp7/интерьер%20UNION%20STEP%205%202400x1600.png","https://www.union.ru/upload/iblock/55b/rfqbo9zwejhcyrmboel5s25y7847hxcw/Step-US17-Rovere-Chiaro.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-step-27716'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = '3d-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, UNIFLEX-3D, Wave', 'COVER, UNIFLEX-3D, Wave', 'cover-wave-27718',
    'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, массив древесины, - 3D поверхность, натуральный шпон. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.', 'Стеновые панели COVER, UNIFLEX-3D изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - 3D поверхность, массив древесины, - 3D поверхность, натуральный шпон. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.',
    3600, target_cat, '{"https://www.union.ru/upload/iblock/b82/kladevktfeur8gcnd9x1q7otgs1z9itc/COVER-Wave.jpg","https://www.union.ru/upload/iblock/05b/bnsec8nl3lu7qywc1a9bg1qn820ovfn2/COVER-Wave.jpg","https://www.union.ru/upload/iblock/c6f/n3x0o2xmb69xy0yy5rxzfi8noi7k8aol/WAVE_3.jpg","https://www.union.ru/upload/iblock/db2/7b7h2nxtj5qi2gta20boffksvsmeh8zw/WAVE-_-1000_1000.jpg","https://www.union.ru/upload/iblock/614/wikz6opfuwcewm97mbpfqv9xy95ueehq/wave-05_1_2_.jpg","https://www.union.ru/upload/iblock/43a/ztrscj4jfyh1e3g9g10twxqu32hf5bz8/wave-05_2_2_.jpg","https://www.union.ru/upload/iblock/b5d/9nnm6bmpl7e9xwz688jur06ksetsqx71/Wave_-UW16-Noce-Canaletto.png","https://www.union.ru/upload/iblock/c8c/djbx7pjehhseo31c9yi932ej0ncb1ljl/Wave_V_0_-UW16-Noce-Canaletto.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-wave-27718'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, GRAND, LACCATO', 'COVER, GRAND, LACCATO', 'cover-grand-laccato-29078',
    'Стеновые панели COVER, GRAND, LACCATO изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - матовая эмаль. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.', 'Стеновые панели COVER, GRAND, LACCATO изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - матовая эмаль. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.',
    630, target_cat, '{"https://www.union.ru/upload/iblock/39b/1dmbxk646j1o0atdyh4m1r4mr9e6kums/COVER_-GRAND-GR01_00.jpg","https://www.union.ru/upload/iblock/a0e/53jdmz4rib9snrorjxmmi39j74363e4z/COVER_-GRAND-GR01_00.jpg","https://www.union.ru/upload/iblock/6af/03p4pxnewd6027fa97ujjimj7mkmcc63/GRAND-800x800.jpg","https://www.union.ru/upload/iblock/bb0/cjb7im5nr5c639ee3q199b5wi71n3m01/GRAND-GR01-_-_-_-_-_-GRAND_-_-_-Bianco...jpg","https://www.union.ru/upload/iblock/7ff/msd92pbiug1jfees56hsdqgwtfnue5fo/GRAND-GR01-_-_-_-_-_-GRAND_-_-_-Bianco..jpg","https://www.union.ru/upload/iblock/a92/mb6pyadlct4v7r11srssy2ednm74d93r/GRAND-GR01_-_-_-Bianco-Night-_-Potal-Oro...jpg","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-grand-laccato-29078'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'classic-panels';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wall-panels'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'COVER, PRIMA, LACCATO', 'COVER, PRIMA, LACCATO', 'cover-prima-laccato-27986',
    'Стеновые панели COVER, PRIMA, LACCATO изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - матовая эмаль. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.', 'Стеновые панели COVER, PRIMA, LACCATO изготавливаются из экологически чистого мдф толщиной 1,6 см. Внешняя отделка: - матовая эмаль. С тыльной стороны панелей предусмотрен компенсационный слой. Торцы стеновых панелей доработаны под типовые узлы сопряжения. Стыковка панелей производится с перехлестом через торцевые соединения, торцы панелей тонированы в цвет лицевой отделки. Установка и фиксация панелей к основанию / стене производится с помощью скрытой регулируемой системы (профиль навески), позволяющей компенсировать неровности основания. В случае установки панелей до потолка, необходимо предусматривать зазор до потолка не менее 1,5 см. Размеры панелей: ширина: 12 - 80 см; высота: 30 - 275 см.',
    660, target_cat, '{"https://www.union.ru/upload/iblock/ba5/d0lrp4zs22jk114pc08ol21qxcgffck2/PRIMA-_-_.jpg","https://www.union.ru/upload/iblock/05e/i1capbfgw76lng4xcluv86qsza7acgai/PRIMA-_-_.jpg","https://www.union.ru/upload/iblock/b63/cl7ko4x9bknrkc3g2cs6gats2hmf4kdv/PRIMA-P-_-_-_-_-_-Oro..jpg","https://www.union.ru/upload/iblock/311/iq8ery1y9nvkb7b9mjlqy9b4njjkzec2/Prima-_.jpg","https://www.union.ru/upload/iblock/350/h51xoj2r1dwv589k3s52ss8cly9j6i4i/PRIMA-800x800.jpg","https://www.union.ru/upload/iblock/d43/9eucqtyxmqnztyjyuwjremlbc0ufvbt8/PRIMA-P-_-_-_-_-_-Oro..-_2_.jpg","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cover-prima-laccato-27986'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes-walkin';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FORMINA is open', 'FORMINA is open', 'formina-18116',
    'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap', 'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap',
    2040, target_cat, '{"https://www.union.ru/upload/iblock/b24/4uwzt4hopk6fsw29s8l8hi4u16y672v8/FORMINA-_-_-2400x1600.png","https://www.union.ru/upload/iblock/8f9/yyq8qt6yi7ln1mv3w6tlwyif2pc11kyp/FORMINA-_-_-3150x1600.png","https://www.union.ru/upload/iblock/10a/ifdl4lqk8uaa4a60erooyq6frf0y20t4/FORMINA-garderobnaya-Grafite-03-2-3150x1600.png","https://www.union.ru/upload/iblock/10b/nre9475e37k5arj7crrbg3uy6qkekqb9/FORMINA%20П-гардеробная%2002%203150x1600.png","https://www.union.ru/upload/iblock/0e0/npd05bdxxnhijjxegnshcy2044y9l3o8/21_%20FORMINA%2004%20svet%203150x1600.png","https://www.union.ru/upload/iblock/2e4/7j2ti2tkvxx7bsirhnpce9l52c00pmdv/FORMINA-_-_-03-_-_-3150x1600.png","https://www.union.ru/upload/iblock/036/bb6kk6jwiuys2ocopffu294phu680ojr/FORMINA-_-M01_02.png.webp","https://www.union.ru/upload/iblock/2ab/f6zgyfghdhcdk7bdgwy18ecntqaxilwq/FORMINA-_-M02_02.png.webp"}',
    '{"opening_angle":"2","frame":"and 2","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/formina-18116'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes-walkin';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LAGUNA', 'LAGUNA', 'laguna',
    'LAGUNA wall-mounted dressing room, large selection of elements, easy transformation. Custom-made dressing room with delivery in Moscow and the Russian Federatio...', 'LAGUNA wall-mounted dressing room, large selection of elements, easy transformation. Custom-made dressing room with delivery in Moscow and the Russian Federatio...',
    1560, target_cat, '{"https://www.union.ru/upload/iblock/957/acnk5t36wjyip5pktmv1pz0gybjgnuts/LAGUNA 05 1 2400x1600.png","https://www.union.ru/upload/iblock/50d/2v3wsh5s0yz47jjoko0ul7w63q5ig622/LAGUNA%2005%201%203150x1600.png","https://www.union.ru/upload/iblock/48b/7w13kvukhzq2lnysc63wquhsyyefaa8i/_-LAGUNA-3-01-3150x1600.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/laguna'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes-walkin';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'ALTO', 'ALTO', 'alto-13933',
    'Dressing room ALTO is mounted "floor-to-wall" or "floor-to-ceiling" in a strut on vertical aluminum racks. You can select modules of standard sizes, combine filling elements and install them at the desired height, creating the optimal configuration for yourself. Wardrobe parameters such as depth 56 cm and height up to 300 see, they will make everyday use as convenient as possible. ALTO is more than just a dressing room.', 'Dressing room ALTO is mounted "floor-to-wall" or "floor-to-ceiling" in a strut on vertical aluminum racks. You can select modules of standard sizes, combine filling elements and install them at the desired height, creating the optimal configuration for yourself. Wardrobe parameters such as depth 56 cm and height up to 300 see, they will make everyday use as convenient as possible. ALTO is more than just a dressing room.',
    2280, target_cat, '{"https://www.union.ru/upload/iblock/3eb/i08uksp8mils097fhs04bttno79ofds8/garderobnaya-obrazets-steklo-2400kh1600.png","https://www.union.ru/upload/iblock/e21/k2q6bsz7csranq46u865wtng3qx39auy/garderobnaya-ALTO_1-3150kh1600.png","https://www.union.ru/upload/iblock/efd/rryyxbanum6nhhpd19z7zrnczhvh44a6/ALTO-garderobnaya-03-3150x1600.png","https://www.union.ru/upload/iblock/155/16npbyzxqq2bd6zucrqljgynahqnc92b/ALTO-v-potolok-_1-3150x1600.png","https://www.union.ru/upload/iblock/cdf/cdossqf6q29r0qu3e4k20exdxhagbt80/Garderob-ALTO-04-2750x1600.png","https://www.union.ru/upload/iblock/8a0/nf1two3fd2eeqgwrrwngdrmfqrjnr2w5/garderobnaya-Alto-02-3150x1600.png"}',
    '{"lock":"{ font-size: 20pt; padding: 10px; line-height: 48px; color: #fff; background-col","opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/alto-13933'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'cabinets-storage';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FORMINA with facades made of aluminum with glass', 'FORMINA with facades made of aluminum with glass', 'formina-s-alyuminievymi-fasadami',
    'The reinforced frame and 2.5 cm thick shelves with a high-quality, wear-resistant DECORIT coating (the names correspond to the EGGER catalog) will last you for many years. The cabinet adapts to the height of your room with a usable depth of 56 cm. A wide range of filling elements. Dressers have drawers with full extension. DnThe bottom of the drawers is finished with eco-leather. The shoe racks have a comfortable 30° tilt angle, which provides a complete view of the shoes. Shoes are placed in 2 rows. Adjustable Italian wardrobe mounting system to the wall, which prevents it from tipping over (made in Italy). Facade straightener (made in Italy), if necessary, allows you to fix the curvature of the facade. The design has one vertical wall between the modules, Italian style, which looks more', 'The reinforced frame and 2.5 cm thick shelves with a high-quality, wear-resistant DECORIT coating (the names correspond to the EGGER catalog) will last you for many years. The cabinet adapts to the height of your room with a usable depth of 56 cm. A wide range of filling elements. Dressers have drawers with full extension. DnThe bottom of the drawers is finished with eco-leather. The shoe racks have a comfortable 30° tilt angle, which provides a complete view of the shoes. Shoes are placed in 2 rows. Adjustable Italian wardrobe mounting system to the wall, which prevents it from tipping over (made in Italy). Facade straightener (made in Italy), if necessary, allows you to fix the curvature of the facade. The design has one vertical wall between the modules, Italian style, which looks more',
    4310, target_cat, '{"https://www.union.ru/upload/iblock/74f/ea2owtmrr466kfx8q3oo9lttu9ocykc9/FORMINA-svet-2400x1600.png","https://www.union.ru/upload/iblock/db6/1p92sxu2sern381jwyy5nrv8ltdsz3ct/FORMINA-svet-3-3150x1600.png","https://www.union.ru/upload/iblock/64f/zhvbcazsubq48siux2r9bc1z4if5t2ni/Гардеробная-1Х3%203150х1600.png","https://www.union.ru/upload/iblock/81c/yi4u9vhc33n8e7oggi9h6ioi9609b8x7/Formina-_-_-02-_-_-3150x1600.png","https://www.union.ru/upload/iblock/da3/shixo4tc52a1dtnz92f42x13khauom2r/FORMINA_-07-F5_MAXI-3150x1600.jpg","https://www.union.ru/upload/iblock/1dd/w9q9yu2d1hfcrps2x614bmclrll7sxc9/MINI-2%202400x2476.png.webp","https://www.union.ru/upload/iblock/b41/mpx6w9va45hevhz4rlb0z7aytdf313xh/MAXI-1%202400x2476.png.webp","https://www.union.ru/upload/iblock/c89/jo6qf21hzn6qa83l410h0mes04yze3ef/MINI-_-_.png.webp"}',
    '{"thickness":"2.5 cm","hinges":"(made in Germany) with a door closer, ensure smooth closing","opening_angle":"2","frame":"of the facade in black color AL08 Black, GT02 Trasparente Grafite glass","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/formina-s-alyuminievymi-fasadami'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'cabinets-storage';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'FORMINA with facades', 'FORMINA with facades', 'formina-44826',
    'How often have you spent time searching for the right thing in the depths of an old closet? With the new cabinet FORMINA this scenario is becoming a thing of the past: conveniencebookshelves, drawers, shoe racks, hangers help to organize not only clothesYes, but also shoes, accessories, bags, and more. As a result, you save precious minutes in the morning and enjoy the elegance of the interior and order every day! FORMINA is the epitome of exquisite design by Francesco Ruffini and thoughtful functionality: It is possible to design any configuration: straight, angular or U–shaped. The cabinet can be installed in a niche or against a wall. Individual fillingthe equipment "adapts" to you: dressers, shelves and shoe racks can be fixed to the desired height. High-quality fittings (made in Italy', 'How often have you spent time searching for the right thing in the depths of an old closet? With the new cabinet FORMINA this scenario is becoming a thing of the past: conveniencebookshelves, drawers, shoe racks, hangers help to organize not only clothesYes, but also shoes, accessories, bags, and more. As a result, you save precious minutes in the morning and enjoy the elegance of the interior and order every day! FORMINA is the epitome of exquisite design by Francesco Ruffini and thoughtful functionality: It is possible to design any configuration: straight, angular or U–shaped. The cabinet can be installed in a niche or against a wall. Individual fillingthe equipment "adapts" to you: dressers, shelves and shoe racks can be fixed to the desired height. High-quality fittings (made in Italy',
    2920, target_cat, '{"https://www.union.ru/upload/iblock/69d/cu7m9ue1dx3wwntcmkzw7guz9ts7pbbc/FORMINA-_-1-2400x1600.png","https://www.union.ru/upload/iblock/55e/n5f9fah2l3gsw0yl9p9ucgth6t86fnba/интерьер%20FORMINA%2003%202%203150х1600.png","https://www.union.ru/upload/iblock/2c4/o1d9qbdbn5qf0fuxjlv9u9koj835okcn/FORMINA-_-3150x1600.png","https://www.union.ru/upload/iblock/359/3kkxhmtiv3bu4xrqp2t3cfdexd0dkx3z/FORMINA-Alda-3150x1600.jpg","https://www.union.ru/upload/iblock/523/9fosgj2ds2mrugprunlpinptfh4nn1aw/интерьер%20FORMINA%2004%201%203150х1600.png","https://www.union.ru/upload/iblock/837/n2s14wvwvi9ush5tf1a3ddgtxf10u5lb/_-FORMINA-01-2-_-3150x1600.jpg","https://www.union.ru/upload/iblock/9d5/dw35639oh0z4v1s38ea7u1708yo57q10/FORMINA-_-2_04-3150x1600.png","https://www.union.ru/upload/iblock/5b5/g9gte37dgt7j2s1x02gzkoz9983rjzq0/NOTTE_02.png.webp"}',
    '{"thickness":"1.6 cm","hinges":"with door closers (made in Germany)","opening_angle":"2","material":"H3710 ST12 Karini walnut","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/formina-44826'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'cabinets-storage';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'wardrobes'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LUCE', 'LUCE', 'shkaf-vitrina-luce',
    'Working with other pieces of furniture from the UNION LUX collection opens up limitless possibilities for creating a unique space.', 'Working with other pieces of furniture from the UNION LUX collection opens up limitless possibilities for creating a unique space.',
    11970, target_cat, '{"https://www.union.ru/upload/iblock/80b/buu8anpi9iyz8ot62l9ii8y0j95fexnw/LUCE_01-2400x1600.jpg","https://www.union.ru/upload/iblock/34b/4qdvnp4sfx9rei6lbcls7ex2j94imnrn/LUCE_01-3150x1600.jpg","https://www.union.ru/upload/iblock/886/dgfmliegzqkq3vlkxulhbhvcrqb754p7/LUCE_02-3150x1600.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/shkaf-vitrina-luce'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'libraries';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'MONTBLANC', 'MONTBLANC', 'stellazh-montblanc',
    'Aesthetics - rounded shapes of racks and shelves. Unique finish: shelves - aluminum covered with natural walnut veneer, hanging drawers - solid wood. Safety glass - 0.8 cm thick Wide range of aluminum colors. Ergonomics - dressers with full-extension drawers. The same style as the rest of the UNION LUX range. High-quality fittings. Space zoning - the ability to install both on the wall and anywhere when fixing the floor-ceiling.', 'Aesthetics - rounded shapes of racks and shelves. Unique finish: shelves - aluminum covered with natural walnut veneer, hanging drawers - solid wood. Safety glass - 0.8 cm thick Wide range of aluminum colors. Ergonomics - dressers with full-extension drawers. The same style as the rest of the UNION LUX range. High-quality fittings. Space zoning - the ability to install both on the wall and anywhere when fixing the floor-ceiling.',
    16130, target_cat, '{"https://www.union.ru/upload/iblock/cc5/k4razsik5amhmiui1sq3nfkfi06mokx7/MONBLAN_-01-1-2400x1600.jpg","https://www.union.ru/upload/iblock/0a8/skvraspqb3muk94ktx8ys2qa3965dwvz/MONBLAN-_-01-1-3150x1600.jpg","https://www.union.ru/upload/iblock/a8a/vvekqi0d10d4p4kotgk5ixflr8mjtas3/MONBLAN-_-02-1-3150x1600.jpg","https://www.union.ru/upload/iblock/26f/yt1scx0b7x7aaguqw0o1ruhoxbqg51gl/TRAMONTE_01-3150x1600-_-_.png","https://www.union.ru/upload/iblock/4aa/95glg8uh241zokb2790shfsziwyr40m0/TRAMONTE_02-3150x1600-_-_.png","https://www.union.ru/upload/iblock/56b/vww4hb8g0evi3kfhbujvbvoqziwb0ywl/TRAMONTE_03-3150x1600-_-_.png","https://www.union.ru/upload/iblock/b82/lrr5ib3f9yfgfmpk173wu4rbd7dgg44o/TRAMONTE-_-M1.png.webp","https://www.union.ru/upload/iblock/29f/vge9ykkth3166ykby6jxvrmm9mldt2l8/TRAMONTE-_-M2.png.webp"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stellazh-montblanc'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'libraries';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'ALTO', 'ALTO', 'alto-15288',
    'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap', 'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap',
    2280, target_cat, '{"https://www.union.ru/upload/iblock/d13/s7cmjx12yh0yn1gl2tnsd4preozjfbir/Forte-steklo-04_00-2400x1600.png","https://www.union.ru/upload/iblock/631/9x0ljii3dvzp0oqf665sh7row6hghlfr/Forte-steklo-04_00-2400x1600.png","https://www.union.ru/upload/iblock/51f/9sx62mabl8w2xnw21ds7wxgmyqw0n4yz/stellazh-FORTE-04_1-3150x1600.png","https://www.union.ru/upload/iblock/964/ljrym0rnjtes95t4tu332mt7d1f41sgi/interer-UNION-STEP-2-3150x1600.png","https://www.union.ru/upload/iblock/602/31ohn37blwxo2m3mqgwv1d2r15hl2oef/19_-interer-UNION-2025-Step-3150x1600.png","https://www.union.ru/upload/iblock/606/6xr4mbud546qrk24zbmmw2lnn2v1o7gh/stellazh-FORTE-04_2.png","https://www.union.ru/upload/iblock/013/d6kfnum6ae5nz2fih56o4cxw6asvdjfc/Forte-zonirovanie-04_00-3150x1600.png","https://www.union.ru/upload/iblock/3ff/pllskt2q800hm0wvelx140dxqsqpuzdx/peregorodka-Quadro-05_1-3150x1600.png"}',
    '{"lock":"{ font-size: 20pt; padding: 10px; line-height: 48px; color: #fff; background-col","opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/alto-15288'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'shelves';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LUMINA', 'LUMINA', 'polka-navesnaya-lumina-16246',
    'Полки LUMINA гармонично дополнят любой современный интерьер и придадут ему особую элегантность. Конструкция из прочного алюминиевого каркаса и безопасного стекла толщиной 6 мм способна выдержать нагрузку до 15 кг. Уникальная, запатентованная система крепления полки к стене обеспечивает надёжную фиксацию без видимого крепежа. Палитра из 7 цветов алюминиевого профиля позволит подобрать нужное стилевое решение, а дополнительная подсветка привлечет внимание к композиции из полок. Дополнительно можно установить подсветку, которая устанавливается сверху и снизу кронштейна по всей длине, что обеспечивает равномерное освещение полок.', 'Полки LUMINA гармонично дополнят любой современный интерьер и придадут ему особую элегантность. Конструкция из прочного алюминиевого каркаса и безопасного стекла толщиной 6 мм способна выдержать нагрузку до 15 кг. Уникальная, запатентованная система крепления полки к стене обеспечивает надёжную фиксацию без видимого крепежа. Палитра из 7 цветов алюминиевого профиля позволит подобрать нужное стилевое решение, а дополнительная подсветка привлечет внимание к композиции из полок. Дополнительно можно установить подсветку, которая устанавливается сверху и снизу кронштейна по всей длине, что обеспечивает равномерное освещение полок.',
    750, target_cat, '{"https://www.union.ru/upload/iblock/5d7/cgr00e0azgi936dx71nl2yfj2g1i53z4/_-04-_.jpg","https://www.union.ru/upload/iblock/0f1/esg91mc1u33veh8rrowicknffc9d6fel/_-04-_.jpg","https://www.union.ru/upload/iblock/d17/1d229yscidnhh4lnu3h6wavyxi04a3qk/COVER-FILO_60-Vento-V20.jpg","https://www.union.ru/upload/iblock/258/o38tdhymrji7252zup79c23b59d10pcq/_-UNION-step-3.jpg","https://www.union.ru/upload/iblock/7ae/le3wnyx7pewlefup1xc21y5pscwlszma/LUMINA-01.jpg","https://www.union.ru/upload/iblock/c14/pa3nc3fh2jehw1oya0qbq0eorxm7h2bq/_-LUMINA-_.JPG","https://www.union.ru/upload/iblock/131/rtegu2u9i03m6jmf2r0k4bmh5o1hwxq3/_-LUMINA-_-2.jpg","https://www.union.ru/upload/iblock/864/rsi3hxoo2f44spjs044j4c4lg860chcj/_-_-LUMINA-1.jpg"}',
    '{"opening_angle":"2","frame":"полки"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/polka-navesnaya-lumina-16246'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'shelves';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'VIRGOLA', 'VIRGOLA', 'polka-virgola',
    'The structure is hardened aluminum. The shelf frame is cast (bottom and side are monolith). The glass is painted glossy / frosted. Unique wall mounting. Complete with LED backlight. A large selection of finishes. Dimensions: 100/120/140/160/180/200 x 28.6 x 7.5 cm (W x D x H). Price for a shelf 100 cm long, glossy glasseva painted in black G38 Nero, profile in AL38 Nero, with backlight – 65,000 ₽.', 'The structure is hardened aluminum. The shelf frame is cast (bottom and side are monolith). The glass is painted glossy / frosted. Unique wall mounting. Complete with LED backlight. A large selection of finishes. Dimensions: 100/120/140/160/180/200 x 28.6 x 7.5 cm (W x D x H). Price for a shelf 100 cm long, glossy glasseva painted in black G38 Nero, profile in AL38 Nero, with backlight – 65,000 ₽.',
    1950, target_cat, '{"https://www.union.ru/upload/iblock/6ac/xxvol12h7uujr80ah5yae5s0is2xb6ba/VIRGOLA_1_00.jpg","https://www.union.ru/upload/iblock/f7b/59qgnuci2k9podrhii5guvd9a9kmlqmm/UNION-_-2025-3150x1600.jpg","https://www.union.ru/upload/iblock/269/cs461jqdbn2lf5bv5512sw50qbi370cn/VIRGOLA_4_01.jpg","https://www.union.ru/upload/iblock/08e/n0uzy0yflr3dk17yzhq1bdfpai613zkg/VIRGOLA_6_04.jpg","https://www.union.ru/upload/iblock/027/n39sklpmziaw0ay9ea5vc8cewrcvop6n/VIRGOLA_3_02.jpg","https://www.union.ru/upload/iblock/c26/hko6k1bpvfor1ryp0nzlfyuzpjdicg1z/VIRGOLA_5_03.jpg"}',
    '{"opening_angle":"2","frame":"is cast (bottom and side are monolith)"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/polka-virgola'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'dining-tables';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'tables'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'VERSUS', 'VERSUS', 'versus',
    'VERSUS is a collection of tables featuring a unique, concise design. The strict edges of the aluminum profile perfectly harmonize with the granite and create a unique visual effect that emphasizes the impeccable style of the interior. The table is fully collapsible, made of hardened aluminum with invisible joints., which are made by injection molding. High-quality materials, attention to detail and aesthetic appearance allow it to perfectly combine with other pieces of furniture from the UNION LUX collection, creating a single space. Thanks to the ability to combine aluminum and polished porcelain stoneware, VERSUS will fit into anyfrom a minimalist office to a cozy living room!', 'VERSUS is a collection of tables featuring a unique, concise design. The strict edges of the aluminum profile perfectly harmonize with the granite and create a unique visual effect that emphasizes the impeccable style of the interior. The table is fully collapsible, made of hardened aluminum with invisible joints., which are made by injection molding. High-quality materials, attention to detail and aesthetic appearance allow it to perfectly combine with other pieces of furniture from the UNION LUX collection, creating a single space. Thanks to the ability to combine aluminum and polished porcelain stoneware, VERSUS will fit into anyfrom a minimalist office to a cozy living room!',
    21870, target_cat, '{"https://www.union.ru/upload/iblock/ec6/md1v2jektwg80vtzdrhv38yr3kh22wbc/Стол VERSUS-01 2400ч1600.png","https://www.union.ru/upload/iblock/5a5/1r6pwyclzs7poml7pjw7q414mwb2tgcl/Стол%20VERSUS-01%203150x1600.png","https://www.union.ru/upload/iblock/9d6/mtxze64bbnjva5mktacu5854811r623l/VERSUS%20разм.png.webp","https://www.union.ru/upload/iblock/ac6/27qulo19svpri9bchekv0wxpojknqh4l/VERSUS%20разм.png.webp","https://www.union.ru/upload/iblock/6f0/qoqi7q6cop8nf60sc6pr9st1f46137t4/VERSUS%20разм.png.webp","https://www.union.ru/upload/iblock/c70/6ehpzsbueu2m5y8f36iojlxx2cpigcrz/VERSUS%20разм.png.webp"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/versus'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'dining-tables';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'tables'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'MILAN table (Made in Italy)', 'MILAN table (Made in Italy)', 'stol-milan-6144',
    'Table MILAN. Size: 90x90, h-74 cm. Table top - tempered tinted glass GT03 Trasparente Bronzo. Base: aluminum, steel - Chrome finish.', 'Table MILAN. Size: 90x90, h-74 cm. Table top - tempered tinted glass GT03 Trasparente Bronzo. Base: aluminum, steel - Chrome finish.',
    4080, target_cat, '{"https://www.union.ru/upload/iblock/05b/ownr44yuuzfcg9mq7f9oor3t5jzon0ee/MILAN-_1-2400_1600.jpg","https://www.union.ru/upload/iblock/133/k7ru37vrhlyxxdzno0n5fd9z91ozfqd2/MILAN-_1.jpg","https://www.union.ru/upload/iblock/a67/0rdcudpto6vs870wsigtciwkb6nyzdf2/_-UNION-step-4.jpg","https://www.union.ru/upload/iblock/d58/dup89rrbae0r0kul2li4gpvpbvg3g0n0/7013-AMB-2.jpg","https://www.union.ru/upload/iblock/cc8/5u9p5uqydwwgq48h6z6y9nlhoech5u4w/_-4.jpg","https://www.union.ru/upload/iblock/40e/hicll129g0cey436fnd68kcll43763yq/METROPOLIS-_-WAVE.jpg","https://www.union.ru/upload/iblock/1b5/eiu06gabhnw3w110wkb0kvgr71whotan/MILAN_1.jpg","https://www.union.ru/upload/iblock/3d9/dh9acken7u6hjzg0nu0oxgmr24arcdeu/_-1100_1100xh740_1.jpg"}',
    '{"lock":"!important; }","opening_angle":"2","material":"HP04 Marmo Bianco","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stol-milan-6144'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'coffee-tables';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'tables'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'LOTUS table (Made in Italy)', 'LOTUS table (Made in Italy)', 'stol-lotus-6145',
    'Table LOTUS. Size: 90x90, h-50 cm. Table top - tempered tinted glass GT03 Trasparente Bronzo. Base: aluminum, steel - Chrome finish.', 'Table LOTUS. Size: 90x90, h-50 cm. Table top - tempered tinted glass GT03 Trasparente Bronzo. Base: aluminum, steel - Chrome finish.',
    3990, target_cat, '{"https://www.union.ru/upload/iblock/b01/3y23iqznsjge2e3j815t0s01j5o1o738/LOTUS-_-2400x1600.jpg","https://www.union.ru/upload/iblock/276/m42ageh07kn9wakfvyxe2lj4zlnvvadf/fe0a555d3a9a379e47f8fc7366e10495a1255d3e.jpg","https://www.union.ru/upload/iblock/281/fd9ds0bd8dnwbjyjfvnxcc9xc9ugzyco/_-UNION-step-3.jpg","https://www.union.ru/upload/iblock/003/1mmma5crr0ykbczm39ye1b81c6plkji6/_-UNION-step-5.jpg","https://www.union.ru/upload/iblock/90c/5tqfpg5lwox43xp92y44y34azv3uvz4s/LOTUS_1-110x50.jpg","https://www.union.ru/upload/iblock/85e/x4m8s48tbfk9f8flc5ck418dtkzo9i5l/ba7ec98d818ed3081858de53554f7f88bcbd048a.jpg","https://www.union.ru/upload/iblock/282/m3331vp58qd8pwg6vf7v2uchftfxrtwy/19.05.2022_1_table_Lotus.png.webp"}',
    '{"lock":"!important; }","opening_angle":"2","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stol-lotus-6145'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'dining-tables';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'tables'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'ALMA', 'ALMA', 'stol-alma',
    'The structure is hardened cast aluminum. The table top is made of safety tempered glass. No visible assembly screws. A large selection of finishes. European components.', 'The structure is hardened cast aluminum. The table top is made of safety tempered glass. No visible assembly screws. A large selection of finishes. European components.',
    7470, target_cat, '{"https://www.union.ru/upload/iblock/eaf/8ul00hwa235mtrkh3wvezsz1uez3arel/_-QUARZ_01-2400x1600.png","https://www.union.ru/upload/iblock/d7b/yikbum0ggtogbfql15blxptcaytp5370/_-QUARZ_01-3150x1600.png","https://www.union.ru/upload/iblock/87d/ltkykgd9qviy4bh9cn68hgwcl822wxzj/QUARZ_razm1.png.webp"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stol-alma'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'coffee-tables';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'tables'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'OPERA table (Made in Italy)', 'OPERA table (Made in Italy)', 'stol-opera-6146',
    'Table OPERA. Size: 60x60, h-50 cm. The table top is a universal composite wear-resistant material HP04 Marmo Bianco. Base: aluminum, steel - finish AL08 Black.', 'Table OPERA. Size: 60x60, h-50 cm. The table top is a universal composite wear-resistant material HP04 Marmo Bianco. Base: aluminum, steel - finish AL08 Black.',
    2460, target_cat, '{"https://www.union.ru/upload/iblock/613/t0z3w99autuprms9hfeadew3d79uwobf/OPERA-_-2400x1600.jpg","https://www.union.ru/upload/iblock/0c6/s179uzub8yxj903hcm3yjccl3f0v9ztl/d6d3195ed3a83bfb9225ad2e6af4a81dac75eafc.jpg","https://www.union.ru/upload/iblock/05b/52rnsfb4133p2r8dbpt968t3xibrefkb/2020_table_Opera-19.05.22.jpg.webp"}',
    '{"lock":"!important; }","opening_angle":"2","material":"HP04 Marmo Bianco","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/stol-opera-6146'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'mirrors';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'ALBA, SL', 'ALBA, SL', 'zerkalo-alba-sl-32497',
    'Правильное использование зеркал в интерьере способно вдохнуть новую жизнь в привычную обстановку и украсить любое помещение, наполнив его светом и воздухом. Необходимым атрибутом для расстановки акцентов и преображения пространства станет большое интерьерное зеркало из коллекции ALBA. Элегантный каркас из алюминия в различных цветовых решениях поможет зеркалу вписаться в любой дизайн.', 'Правильное использование зеркал в интерьере способно вдохнуть новую жизнь в привычную обстановку и украсить любое помещение, наполнив его светом и воздухом. Необходимым атрибутом для расстановки акцентов и преображения пространства станет большое интерьерное зеркало из коллекции ALBA. Элегантный каркас из алюминия в различных цветовых решениях поможет зеркалу вписаться в любой дизайн.',
    990, target_cat, '{"https://www.union.ru/upload/iblock/f43/7ymdilo7ya9aztz3g2z3h12d4ndu7x7x/_-SLIM-03.jpg","https://www.union.ru/upload/iblock/626/gjb8ruix13je4h3m7wwz8e7le2373xgj/_SLIM_03.jpg","https://www.union.ru/upload/iblock/b95/l4j79evsrm389dxwnju7x9shaab9hoa7/_SLIM_04_1.jpg","https://www.union.ru/upload/iblock/2a6/q90ynueg9zz7zxchl9ddi1ajdl3om8gj/Piombo-AL06.jpg","https://www.union.ru/upload/iblock/9a7/qfaz0b9we4ehrgul6gbk82vc3cr4rppa/Dark_Brown_AL07.jpg","https://www.union.ru/upload/iblock/c16/oa8p0j7r5kno4n5wiipngl3kbdywvj4d/Bronze-AL05.jpg","https://www.union.ru/upload/iblock/57e/c45inba98mgahbtturmk81nzgzfkmpl2/Champagne%20AL02.jpg","https://www.union.ru/upload/iblock/206/wyzxzy50avfxfdwf8y66g0660tw9dogm/Soft_Bronze_AL04.jpg"}',
    '{"opening_angle":"2","frame":"из алюминия в различных цветовых решениях поможет зеркалу вписаться в любой диза","model":"SL"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/zerkalo-alba-sl-32497'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'mirrors';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'ALBA, LG', 'ALBA, LG', 'zerkalo-alba-lg-27978',
    'Правильное использование зеркал в интерьере способно вдохнуть новую жизнь в привычную обстановку и украсить любое помещение, наполнив его светом и воздухом. Необходимым атрибутом для расстановки акцентов и преображения пространства станет большое интерьерное зеркало из коллекции ALBA. Элегантный каркас из алюминия в различных цветовых решениях поможет зеркалу вписаться в любой дизайн.', 'Правильное использование зеркал в интерьере способно вдохнуть новую жизнь в привычную обстановку и украсить любое помещение, наполнив его светом и воздухом. Необходимым атрибутом для расстановки акцентов и преображения пространства станет большое интерьерное зеркало из коллекции ALBA. Элегантный каркас из алюминия в различных цветовых решениях поможет зеркалу вписаться в любой дизайн.',
    890, target_cat, '{"https://www.union.ru/upload/iblock/be8/skpbo4kcob2tiyhnlhqhfj7j71qura0d/_-LAGO-03.jpg","https://www.union.ru/upload/iblock/3c3/s2nqqc9sau02ovcw6gckknmy64shc0up/_LAGO_03.jpg","https://www.union.ru/upload/iblock/200/68z7hdg66dwvitbrigs2es0esl7700wd/LAGO_.jpg","https://www.union.ru/upload/iblock/200/s7tvkaz3nmmqwuhw35681tm7hdof1dsc/_LAGO_03.jpg","https://www.union.ru/upload/iblock/2a6/q90ynueg9zz7zxchl9ddi1ajdl3om8gj/Piombo-AL06.jpg","https://www.union.ru/upload/iblock/9a7/qfaz0b9we4ehrgul6gbk82vc3cr4rppa/Dark_Brown_AL07.jpg","https://www.union.ru/upload/iblock/c16/oa8p0j7r5kno4n5wiipngl3kbdywvj4d/Bronze-AL05.jpg","https://www.union.ru/upload/iblock/57e/c45inba98mgahbtturmk81nzgzfkmpl2/Champagne%20AL02.jpg"}',
    '{"opening_angle":"2","frame":"из алюминия в различных цветовых решениях поможет зеркалу вписаться в любой диза","model":"LG"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/zerkalo-alba-lg-27978'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'entrance-doors';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'DELTA PRO 202', 'DELTA PRO 202', 'delta-pro-202-5172',
    'FONDO. Primed coating for painting. L00 Fondo LACCATO. Matte enamels. L01 Bianco L02 Bianco Night L03 Avorio L06 Grigio Seta L19 Olive L20 Grass L11 Tortora L12 Sabbia L17 Mint L18 Sky Blue L13 Rocca L07 Grigio Fume L15 Grafite L14 Ombra L16 Bruno L10 Nero RAL LACCATO GLOSS. Glossy enamels. LG01 Bianco Gloss LG02 Bianco Night Gloss LG03 Avorio Gloss LG06 Grigio Seta Gloss LG19 Olive Gloss LG20 Grass Gloss LG11 Tortora Gloss LG12 Sabbia Gloss LG17 Mint Gloss LG18 Sky Blue Gloss LG13 Rocca Gloss LG07 Grigio Fume Gloss LG15 Grafite Gloss LG14 Ombra Gloss LG16 Bruno Gloss LG10 Nero Gloss RAL Gloss VENEER. Natural veneer, matt varnish. V27 Noce Chiaro V28 Noce Medio V30 Noce Mogano V29 Noce Moca V32 Rovere Ciliegio V33 Rovere Olivo V31 Rovere Bruno V34 Rovere Wenge V17 Rovere Chiaro V27 Rovere', 'FONDO. Primed coating for painting. L00 Fondo LACCATO. Matte enamels. L01 Bianco L02 Bianco Night L03 Avorio L06 Grigio Seta L19 Olive L20 Grass L11 Tortora L12 Sabbia L17 Mint L18 Sky Blue L13 Rocca L07 Grigio Fume L15 Grafite L14 Ombra L16 Bruno L10 Nero RAL LACCATO GLOSS. Glossy enamels. LG01 Bianco Gloss LG02 Bianco Night Gloss LG03 Avorio Gloss LG06 Grigio Seta Gloss LG19 Olive Gloss LG20 Grass Gloss LG11 Tortora Gloss LG12 Sabbia Gloss LG17 Mint Gloss LG18 Sky Blue Gloss LG13 Rocca Gloss LG07 Grigio Fume Gloss LG15 Grafite Gloss LG14 Ombra Gloss LG16 Bruno Gloss LG10 Nero Gloss RAL Gloss VENEER. Natural veneer, matt varnish. V27 Noce Chiaro V28 Noce Medio V30 Noce Mogano V29 Noce Moca V32 Rovere Ciliegio V33 Rovere Olivo V31 Rovere Bruno V34 Rovere Wenge V17 Rovere Chiaro V27 Rovere',
    3320, target_cat, '{"https://www.union.ru/upload/iblock/73f/lx5eyh7fcswaokp3zt9w0ucz9i174g7x/DELTA PRO 202, декоративная панель HPL Pietra Grafite главная.jpg","https://www.union.ru/upload/iblock/7c0/63y17getnrbv1pigzurr4vrz6d2xmq8g/1f22f63636911e14f99fa76872f0dcc662b32435.jpg","https://www.union.ru/upload/iblock/bfe/omb9t3cgrr0ereqj0c2378j0nhd1s77m/DELTA-PRO-202_-_-_-HPL-Pietra-Grafite.jpg","https://www.union.ru/upload/iblock/be2/rr172vrk2mxa02vaqm8888wqjq8dsnsl/3788764ad5ebb60a3b8f4871d18cab142fa99dcc.jpg","https://www.union.ru/upload/iblock/340/2eqjh0guwjcshzi1bowqyt2j7rujl2va/d5c1ce65682470ba9b39c5211fcc7d9254c8eeab.jpg","https://www.union.ru/upload/iblock/692/2n2s3jpk5kw46vfen0k6ph2l5i2r6t26/190a0a392bded69741225095362b50a3ab4a7de4.jpg","https://www.union.ru/upload/iblock/474/cwtcibhmo5lcl7bxnzaxm5vkgzwnotak/ba308b2ee4ea8230e9f704769967bcc013a55a30.jpg","https://www.union.ru/upload/iblock/3be/1vje15799p3waua5ryk5xndgwtm3mgbd/7560bb5b4f37d446feb86bd35300aa0d401b1bdb.jpg"}',
    '{"lock":"options SECUREMME MOTTURA CHAMPION PRO SECUREMME K2 Decorative panels PK/P BOSS","opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/delta-pro-202-5172'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'entrance-doors';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'DELTA PRO 602', 'DELTA PRO 602', 'delta-pro-602-scuro-2672',
    'FONDO. Primed coating for painting. L00 Fondo LACCATO. Matte enamels. L01 Bianco L02 Bianco Night L03 Avorio L06 Grigio Seta L19 Olive L20 Grass L11 Tortora L12 Sabbia L17 Mint L18 Sky Blue L13 Rocca L07 Grigio Fume L15 Grafite L14 Ombra L16 Bruno L10 Nero RAL LACCATO GLOSS. Glossy enamels. LG01 Bianco Gloss LG02 Bianco Night Gloss LG03 Avorio Gloss LG06 Grigio Seta Gloss LG19 Olive Gloss LG20 Grass Gloss LG11 Tortora Gloss LG12 Sabbia Gloss LG17 Mint Gloss LG18 Sky Blue Gloss LG13 Rocca Gloss LG07 Grigio Fume Gloss LG15 Grafite Gloss LG14 Ombra Gloss LG16 Bruno Gloss LG10 Nero Gloss RAL Gloss VENEER. Natural veneer, matt varnish. V27 Noce Chiaro V28 Noce Medio V30 Noce Mogano V29 Noce Moca V32 Rovere Ciliegio V33 Rovere Olivo V31 Rovere Bruno V34 Rovere Wenge V17 Rovere Chiaro V27 Rovere', 'FONDO. Primed coating for painting. L00 Fondo LACCATO. Matte enamels. L01 Bianco L02 Bianco Night L03 Avorio L06 Grigio Seta L19 Olive L20 Grass L11 Tortora L12 Sabbia L17 Mint L18 Sky Blue L13 Rocca L07 Grigio Fume L15 Grafite L14 Ombra L16 Bruno L10 Nero RAL LACCATO GLOSS. Glossy enamels. LG01 Bianco Gloss LG02 Bianco Night Gloss LG03 Avorio Gloss LG06 Grigio Seta Gloss LG19 Olive Gloss LG20 Grass Gloss LG11 Tortora Gloss LG12 Sabbia Gloss LG17 Mint Gloss LG18 Sky Blue Gloss LG13 Rocca Gloss LG07 Grigio Fume Gloss LG15 Grafite Gloss LG14 Ombra Gloss LG16 Bruno Gloss LG10 Nero Gloss RAL Gloss VENEER. Natural veneer, matt varnish. V27 Noce Chiaro V28 Noce Medio V30 Noce Mogano V29 Noce Moca V32 Rovere Ciliegio V33 Rovere Olivo V31 Rovere Bruno V34 Rovere Wenge V17 Rovere Chiaro V27 Rovere',
    2600, target_cat, '{"https://www.union.ru/upload/iblock/ffb/b3qrm0ax9sx41uteor3yczsktytrdufb/849eafb76f623b06441ba1f98bc6d6d501b445dc_2.jpg","https://www.union.ru/upload/iblock/f36/r5d14an4p3vyp0ovxvykvjsh1euz7v3w/849eafb76f623b06441ba1f98bc6d6d501b445dc.jpg","https://www.union.ru/upload/iblock/758/o0f5ca3mmd91ds6jd206bmh8tz99zo9y/96f39b1f9561ab8e1dbfbd7d1cc1db914a7ae0f1.jpg","https://www.union.ru/upload/iblock/886/97f2feetqiq282hso3sbiwfhhul8252i/08a399ff63ba70a6348f720a7dd7121bde593b70.jpg","https://www.union.ru/upload/iblock/edf/i7w7knd9nv6hsfe1exkjpbek8vath64j/b048837b017d9eb94b8a94df746c5acef325c6ec.jpg","https://www.union.ru/upload/iblock/c03/n5rsl48qskjyqg2i0m99dsqykzlryl9c/784bfc55e8cee435ad2f9b63fde82eb9b78c779d.jpg","https://www.union.ru/upload/iblock/4c5/f7e8au7leju0mleo4xv8w259bnb9h619/9454b130938648237b1e806864418506edf1fdcd.jpg","https://www.union.ru/upload/iblock/b33/znxykl1053bjlh4g3ubx2gqjnpwp6rz1/6c738dc9978e6918113766c314a408b990c833d9.png"}',
    '{"lock":"options SECUREMME MOTTURA CHAMPION PRO SECUREMME K2 Decorative panels PK/P BOSS","opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/delta-pro-602-scuro-2672'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'entrance-doors';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'DELTA PRO 1202', 'DELTA PRO 1202', 'delta-pro-1202-2676',
    'LACCATO. Matte enamels. L01 Bianco L02 Bianco Night L03 Avorio L06 Grigio Seta L19 Olive L20 Grass L11 Tortora L12 Sabbia L17 Mint L18 Sky Blue L13 Rocca L07 Grigio Fume L15 Grafite L14 Ombra L16 Bruno L10 Nero RAL LACCATO GLOSS. Glossy enamels. LG01 Bianco Gloss LG02 Bianco Night Gloss LG03 Avorio Gloss LG06 Grigio Seta Gloss LG19 Olive Gloss LG20 Grass Gloss LG11 Tortora Gloss LG12 Sabbia Gloss LG17 Mint Gloss LG18 Sky Blue Gloss LG13 Rocca Gloss LG07 Grigio Fume Gloss LG15 Grafite Gloss LG14 Ombra Gloss LG16 Bruno Gloss LG10 Nero Gloss RAL Gloss VENEER. Natural veneer, matt varnish. V27 Noce Chiaro V28 Noce Medio V30 Noce Mogano V29 Noce Moca V32 Rovere Ciliegio V33 Rovere Olivo V31 Rovere Bruno V34 Rovere Wenge V17 Rovere Chiaro V27 Rovere Americano V10 Rovere Antico V16 Noce Canaletto', 'LACCATO. Matte enamels. L01 Bianco L02 Bianco Night L03 Avorio L06 Grigio Seta L19 Olive L20 Grass L11 Tortora L12 Sabbia L17 Mint L18 Sky Blue L13 Rocca L07 Grigio Fume L15 Grafite L14 Ombra L16 Bruno L10 Nero RAL LACCATO GLOSS. Glossy enamels. LG01 Bianco Gloss LG02 Bianco Night Gloss LG03 Avorio Gloss LG06 Grigio Seta Gloss LG19 Olive Gloss LG20 Grass Gloss LG11 Tortora Gloss LG12 Sabbia Gloss LG17 Mint Gloss LG18 Sky Blue Gloss LG13 Rocca Gloss LG07 Grigio Fume Gloss LG15 Grafite Gloss LG14 Ombra Gloss LG16 Bruno Gloss LG10 Nero Gloss RAL Gloss VENEER. Natural veneer, matt varnish. V27 Noce Chiaro V28 Noce Medio V30 Noce Mogano V29 Noce Moca V32 Rovere Ciliegio V33 Rovere Olivo V31 Rovere Bruno V34 Rovere Wenge V17 Rovere Chiaro V27 Rovere Americano V10 Rovere Antico V16 Noce Canaletto',
    6620, target_cat, '{"https://www.union.ru/upload/iblock/9bc/delta pro.jpg","https://www.union.ru/upload/iblock/920/wq7wswwtukvkwhsz158aqctirsx39p43/a06f0f92bb16f41f9a20605de7ba5ac8fca6a2c7.jpg","https://www.union.ru/upload/iblock/fc5/lpoamx2o26nm4pzh793817qb8yp0ljyh/7e938de03bd0af829d0bb6db33cbf8a9343aecee.jpg","https://www.union.ru/upload/iblock/c35/u6e3sjwdxjznq1ktdcg4g9gf7inmj94b/3a3f9ac2bd87bed0f18585b03173955c296bb154.jpg","https://www.union.ru/upload/iblock/171/rhsxq9dsyb0h88932xgmd2wo044wewbh/5d20f30866ce4b5336bd992593951c649904bf8d.jpg","https://www.union.ru/upload/iblock/8b0/jojewvr2amiy14ncjzukyje1cxnhebqw/4629bdc647e6d70cf685bad58d31b5bfba1da63f.jpg","https://www.union.ru/upload/iblock/b33/znxykl1053bjlh4g3ubx2gqjnpwp6rz1/6c738dc9978e6918113766c314a408b990c833d9.png","https://www.union.ru/upload/iblock/b8c/ifhth140802vx1il0aw7efbe6mbulnww/V36-Rovere-Miele-s.jpg"}',
    '{"lock":"options SECUREMME MOTTURA CHAMPION PRO SECUREMME K2 Decorative panels PK/P BOSS","opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/delta-pro-1202-2676'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboard-shadow';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboards'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'IMPULS Shadow baseboard', 'IMPULS Shadow baseboard', 'tenevoy-plintus-impuls',
    'Визуальное расширение пространства: IMPULS создаёт иллюзию простора, освобождая пространство от лишних деталей и делая комнату визуально больше и светлее. Больше никаких зазоров — мебель не придется дорабатывать, чтобы вплотную придвинуть к стене. Идеальная чистота и легкость уборки: Вас не будет беспокоить пыль в труднодоступных местах, поскольку отсутствие выступающей поверхности сделает уборку быстрой и приятной, оставляя вам больше времени на отдых! Безупречная универсальность: IMPULS сочетается с любыми типами стен (штукатурка, ГКЛ) и финишной отделкой (краска, обои, декоративная штукатурка), а также с любыми напольными покрытиями. Теневой зазор элегантно скроет незначительные неровности отделки, обеспечивая безупречный результат. Почувствуйте магию подсветки:Превратите свой плинтус в', 'Визуальное расширение пространства: IMPULS создаёт иллюзию простора, освобождая пространство от лишних деталей и делая комнату визуально больше и светлее. Больше никаких зазоров — мебель не придется дорабатывать, чтобы вплотную придвинуть к стене. Идеальная чистота и легкость уборки: Вас не будет беспокоить пыль в труднодоступных местах, поскольку отсутствие выступающей поверхности сделает уборку быстрой и приятной, оставляя вам больше времени на отдых! Безупречная универсальность: IMPULS сочетается с любыми типами стен (штукатурка, ГКЛ) и финишной отделкой (краска, обои, декоративная штукатурка), а также с любыми напольными покрытиями. Теневой зазор элегантно скроет незначительные неровности отделки, обеспечивая безупречный результат. Почувствуйте магию подсветки:Превратите свой плинтус в',
    30, target_cat, '{"https://www.union.ru/upload/iblock/5f1/w7xzjqp4isjwsw1s3vzfhr4mfmwk61mk/GHOST-INVIS-2400x1600.png","https://www.union.ru/upload/iblock/221/awlhfdxn0ehaaz0jjzr4mch6gx6jplxn/GHOST-INVIS-2400x1600.png","https://www.union.ru/upload/iblock/d89/8v7xd8y9rkag6ciwzo91yz2ogjpue9nx/GHOST-INVIS-_-2400x1600.png","https://www.union.ru/upload/iblock/14f/7cqv3rhgezcvd6p8s0vqivvjq453u3ld/GHOST-INVIS-_-2400x1600.png","https://www.union.ru/upload/iblock/b1e/r3i3l1jzrcvcy6l504itzw0pv381ptuu/IMPULS%2002-01%202400x1600.png","https://www.union.ru/upload/iblock/176/bzir0lld64hsm1htwjh8mjknwdf0dhx6/IMPULS%2002-02%202400x1600.png","https://www.union.ru/upload/iblock/077/xbvh38xgv2hmm2kplo1elrg7q6rqz9kn/IMPULS%2002-03%202400x1600.png","https://www.union.ru/upload/iblock/69e/ky3mb0mbwxu5i84j13redthkkrtnemn8/IMPULS%2002-04%202400x1600.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/tenevoy-plintus-impuls'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboards';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'MINI – hidden skirting board', 'MINI – hidden skirting board', 'plintus-mini',
    'Скрытый плинтус MINI - это: Простота монтажа. Совместная установка со скрытым коробом. Единая плоскость. Гигиена. Акустическая изоляция. Безграничное разнообразие материалов. Упрощение штукатурных работ. Быстрая Поставка и Легкий Монтаж: плинтус MINI всегда в наличии на складе! Мы доставим ваш заказ в течение 1 рабочего дня. СКАЧАТЬ ИНСТРУКЦИЮ ПО МОНТАЖУ. СКАЧАТЬ ЧЕРТЁЖ ДОРАБОТКИ ПЛИНТУСА MINI И СКРЫТОГО КОРОБА INVISIBLE.', 'Скрытый плинтус MINI - это: Простота монтажа. Совместная установка со скрытым коробом. Единая плоскость. Гигиена. Акустическая изоляция. Безграничное разнообразие материалов. Упрощение штукатурных работ. Быстрая Поставка и Легкий Монтаж: плинтус MINI всегда в наличии на складе! Мы доставим ваш заказ в течение 1 рабочего дня. СКАЧАТЬ ИНСТРУКЦИЮ ПО МОНТАЖУ. СКАЧАТЬ ЧЕРТЁЖ ДОРАБОТКИ ПЛИНТУСА MINI И СКРЫТОГО КОРОБА INVISIBLE.',
    30, target_cat, '{"https://www.union.ru/upload/iblock/311/em7i2u8ouhwl2efsmflwid9txquj3ac6/074-_-MINI-_-_00.jpg","https://www.union.ru/upload/iblock/97d/d88q4u6nipkskfde0k2qpl74r7cif7qo/074-_-MINI-_-_00.jpg","https://www.union.ru/upload/iblock/e05/b3p3l5n3q23b3b3rb1woqvz1u7nda8pv/invisible-02-1.jpg","https://www.union.ru/upload/iblock/0c8/7yro14xzux77pdhwiuqmvm29wqdaldrj/FILO-_.jpg","https://www.union.ru/upload/iblock/204/4dykgyyiykcgrvhpjxfd5j386i13chk5/f4694e7f4d130dff0e7c67b3f890394510d8fd7e.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/plintus-mini'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboards';
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Insert into the MINI baseboard', 'Insert into the MINI baseboard', 'vstavka-v-plintus-mini',
    'Современное и стильное решение, вставка в плинтус скрытого монтажа - идеальный вариант для любых интерьеров. При установке в плинтус не занимает дополнительных сантиметров площади, упрощая расстановку мебели и создавая эффект компланарности со стеной. Устанавливаемый в одной плоскости со стеной плинтус не образует выступов.', 'Современное и стильное решение, вставка в плинтус скрытого монтажа - идеальный вариант для любых интерьеров. При установке в плинтус не занимает дополнительных сантиметров площади, упрощая расстановку мебели и создавая эффект компланарности со стеной. Устанавливаемый в одной плоскости со стеной плинтус не образует выступов.',
    30, target_cat, '{"https://www.union.ru/upload/iblock/311/em7i2u8ouhwl2efsmflwid9txquj3ac6/074-_-MINI-_-_00.jpg","https://www.union.ru/upload/iblock/78d/6s7kkw24x7oiutl98ei0ubkyx3eyi4jc/074_MINI_00.jpg","https://www.union.ru/upload/iblock/b93/l22ayjttyew88457228uyml2ynv5ochk/invisible_02_1.jpg","https://www.union.ru/upload/iblock/337/2omo42bqzkxxk1m0u0uvbojhypw35t9v/FILO_.jpg","https://www.union.ru/upload/iblock/b1b/nrljjlwdg3x2jmbd19wb90zopxc48wy5/f4694e7f4d130dff0e7c67b3f890394510d8fd7e.jpg","https://www.union.ru/upload/iblock/307/grdnv2vmt6vxhfv6g5yh3ho8m581ot0p/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/vstavka-v-plintus-mini'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboard-traditional';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboards'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Flat NP9', 'Flat NP9', 'plintus-np9',
    'Современное и стильное решение, которое усовершенствовало простое изделие. Напольный плинтус - идеальный вариант для любых интерьеров.', 'Современное и стильное решение, которое усовершенствовало простое изделие. Напольный плинтус - идеальный вариант для любых интерьеров.',
    30, target_cat, '{"https://www.union.ru/upload/iblock/838/06siihggt8rpn5iz1nsrrhhopzynfkyu/_-NP9-_.jpg","https://www.union.ru/upload/iblock/7d7/336oexmrvnxhhqae58c2qvj7mkd24i6f/_NP9_.jpg","https://www.union.ru/upload/iblock/084/pht5w8z856f3nsvpqsh778m2bufkvwdl/Plintus-NP9-_1-2400kh1600.png","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg","https://www.union.ru/upload/iblock/5ef/062okwbokx00rh5xcax4bn4f3zmwn8rm/L03_Avorio_RAL_1013.jpg","https://www.union.ru/upload/iblock/409/qw36gy0lwxy60z4z8cc3vzpqb79qok1b/L06_Grigio_Seta_RAL_7044.jpg","https://www.union.ru/upload/iblock/b27/crv91qem8c8s0b2rma3j6at3g0ece66s/L19%20Olive%20NCS%20S%205010-G70Y.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/plintus-np9'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboard-traditional';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboards'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Cascade NA10', 'Cascade NA10', 'plintus-na10',
    'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap', 'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap',
    40, target_cat, '{"https://www.union.ru/upload/iblock/f50/vcqxn1jnbh9yypp7nf8liygarb06am2u/_-NA10-_.jpg","https://www.union.ru/upload/iblock/a51/x8g5kqfdjnalqm9yqkcwzl5bzn70ct0j/_NA10_.jpg","https://www.union.ru/upload/iblock/396/f5gbdx1u8641ycz79ydhsv2ox7pjoy9o/_NA10_.jpg","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg","https://www.union.ru/upload/iblock/5ef/062okwbokx00rh5xcax4bn4f3zmwn8rm/L03_Avorio_RAL_1013.jpg","https://www.union.ru/upload/iblock/409/qw36gy0lwxy60z4z8cc3vzpqb79qok1b/L06_Grigio_Seta_RAL_7044.jpg","https://www.union.ru/upload/iblock/b27/crv91qem8c8s0b2rma3j6at3g0ece66s/L19%20Olive%20NCS%20S%205010-G70Y.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/plintus-na10'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboard-traditional';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboards'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Curly US10', 'Curly US10', 'plintus-us10',
    'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap', 'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap',
    60, target_cat, '{"https://www.union.ru/upload/iblock/b8e/ftp4hr0ohh2oh5ijg1mvu7j4e5nij0c7/_-US10-_.jpg","https://www.union.ru/upload/iblock/682/3w5mymmbkjgsgj464mxk6a9g1eehydhq/_US10_.jpg","https://www.union.ru/upload/iblock/cd7/u1848mpnx70ld9bu4joo5et2b99cq8sr/_US10_.jpg","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg","https://www.union.ru/upload/iblock/5ef/062okwbokx00rh5xcax4bn4f3zmwn8rm/L03_Avorio_RAL_1013.jpg","https://www.union.ru/upload/iblock/409/qw36gy0lwxy60z4z8cc3vzpqb79qok1b/L06_Grigio_Seta_RAL_7044.jpg","https://www.union.ru/upload/iblock/b27/crv91qem8c8s0b2rma3j6at3g0ece66s/L19%20Olive%20NCS%20S%205010-G70Y.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/plintus-us10'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboard-traditional';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboards'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Curly PRIMA', 'Curly PRIMA', 'plintus-prima',
    'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap', 'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap',
    60, target_cat, '{"https://www.union.ru/upload/iblock/f37/mh19s6j2oxffv7i4630sfftb3pxzfkgw/_-PRIMA-New-_.jpg","https://www.union.ru/upload/iblock/926/0vej46pcybyttm6hrbiz9vbw0j1nyygz/_PRIMA_New_.jpg","https://www.union.ru/upload/iblock/4bd/q7zt2512rui2bh0lcyxw9qfj1rzv6j06/_PRIMA_New_.jpg","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg","https://www.union.ru/upload/iblock/5ef/062okwbokx00rh5xcax4bn4f3zmwn8rm/L03_Avorio_RAL_1013.jpg","https://www.union.ru/upload/iblock/409/qw36gy0lwxy60z4z8cc3vzpqb79qok1b/L06_Grigio_Seta_RAL_7044.jpg","https://www.union.ru/upload/iblock/b27/crv91qem8c8s0b2rma3j6at3g0ece66s/L19%20Olive%20NCS%20S%205010-G70Y.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/plintus-prima'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboard-traditional';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'baseboards'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Curly GIOTTO', 'Curly GIOTTO', 'plintus-giotto',
    'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap', 'Prices and product descriptions are for informational purposes only and are not a public offer! It is PROHIBITED to reprint the pages of the website and their screen images, including the information and materials contained on the website, without permission. Illegal use of trademarks, patents, service marks, posted 14.10 of the Administrative Code of the Russian Federation, 180 of the Criminal Code of the Russian Federation. The photos on the website do not allow you to accurately convey the colors of the tinting, painting, texture and finish of the finished products. *Instagram is a banned social network in Russia. Sitemap',
    70, target_cat, '{"https://www.union.ru/upload/iblock/9e5/j0oydk70j1li9uw6su9dgius6rjbnupt/_-Giotto-_.jpg","https://www.union.ru/upload/iblock/b95/9ngngbiiolh40zfp2ho44mej2tj305rv/_Giotto_.jpg","https://www.union.ru/upload/iblock/408/fnikbytwztloyfwb7v25isz2jxf50pgm/_Giotto_.jpg","https://www.union.ru/upload/iblock/ddc/dcgiahpybclpm8juk9mj1w7kfcw87osh/L01_Bianco_RAL_9003.jpg","https://www.union.ru/upload/iblock/6ae/aruixvwijn4ynisfsa9ou7xtsci5svee/L02_Bianco_Night_RAL_9010.jpg","https://www.union.ru/upload/iblock/5ef/062okwbokx00rh5xcax4bn4f3zmwn8rm/L03_Avorio_RAL_1013.jpg","https://www.union.ru/upload/iblock/409/qw36gy0lwxy60z4z8cc3vzpqb79qok1b/L06_Grigio_Seta_RAL_7044.jpg","https://www.union.ru/upload/iblock/b27/crv91qem8c8s0b2rma3j6at3g0ece66s/L19%20Olive%20NCS%20S%205010-G70Y.png"}',
    '{"opening_angle":"2"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/plintus-giotto'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'stoppers';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Verum, Due', 'Verum, Due', 'verum-due-31912',
    'Фабрика VERUM (made in Italy), модель Due. Новый уникальный скрытый магнитный дверной ограничитель. Благодаря минимальной толщине напольного элемента можно поставить в любом месте пола, а не только у стены как традиционные ограничители. Неодимовый усиленный магнит. Не мешает ходьбе. Ограничитель крепиться к полу на саморез. Есть возможность установки на двусторонний скотч - что является идеальным вариантом при наличии теплого пола. Устанавливается в традиционные двери и двери FILO.', 'Фабрика VERUM (made in Italy), модель Due. Новый уникальный скрытый магнитный дверной ограничитель. Благодаря минимальной толщине напольного элемента можно поставить в любом месте пола, а не только у стены как традиционные ограничители. Неодимовый усиленный магнит. Не мешает ходьбе. Ограничитель крепиться к полу на саморез. Есть возможность установки на двусторонний скотч - что является идеальным вариантом при наличии теплого пола. Устанавливается в традиционные двери и двери FILO.',
    120, target_cat, '{"https://www.union.ru/upload/iblock/f17/ck0gek7sx7lb4h89lm5btb37qjo0om8f/VERUM Due главн.jpg","https://www.union.ru/upload/iblock/205/v7d5tvbygr2b1oke6av3u3cu2qxvqyr9/VERUM%20Due%20главн.jpg","https://www.union.ru/upload/iblock/4c1/ntt94v7s6huffxsz0so8l6ucnysmh21i/Due-02%202400x1600.png","https://www.union.ru/upload/iblock/0eb/vqjxkksndjeohssf99mt2ijgojue6ajy/Due-03%202400x1600.png","https://www.union.ru/upload/iblock/52c/awmlotv3oaot0qmkxi898nje9l16hk9o/Due-04%202400x1600.png","https://www.union.ru/upload/iblock/82b/hma3k3uojojduo1qzpcuycv8cxtzzwsz/BLACK.png","https://www.union.ru/upload/iblock/434/yvxen7np8yhkfj3sehnkabksmz56i1bi/WHITE.png","https://www.union.ru/upload/iblock/a95/87cy00vp77vjy7a1yp37u1joaw8l078g/NICKEL.png"}',
    '{"opening_angle":"2","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/verum-due-31912'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'stoppers';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'CD 412', 'CD 412', 'cd-412-1521',
    'COLOMBO DESIGN is rightfully the leader among manufacturers of handles and accessories for entrance and interior doors. This is achieved by the perfection of technology and cooperation with well-known design studios, such as BARTOLI, PININFARINA, CASTILIA, etc. All handles and accessories are provided with a factory warranty of 10 to 30 years.', 'COLOMBO DESIGN is rightfully the leader among manufacturers of handles and accessories for entrance and interior doors. This is achieved by the perfection of technology and cooperation with well-known design studios, such as BARTOLI, PININFARINA, CASTILIA, etc. All handles and accessories are provided with a factory warranty of 10 to 30 years.',
    30, target_cat, '{"https://www.union.ru/upload/iblock/b37/1ae72ff141cb6c7b470f7942ec7d5f113d345b3c.jpg","https://www.union.ru/upload/iblock/381/9m76dl0dv6zpgzevgqfkqhylq81fpdy8/1ae72ff141cb6c7b470f7942ec7d5f113d345b3c.jpg","https://www.union.ru/upload/iblock/ecb/m1jchcvcsl52td26bv7jvi7784xjzidi/CD-412.jpg.webp"}',
    '{"lock":"!important; }","opening_angle":"2","made_in":"Italy","model":"CD 412"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cd-412-1521'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'stoppers';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'CD 112', 'CD 112', 'cd-112-1522',
    'COLOMBO DESIGN is rightfully the leader among manufacturers of handles and accessories for entrance and interior doors. This is achieved by the perfection of technology and cooperation with well-known design studios, such as BARTOLI, PININFARINA, CASTILIA, etc. All handles and accessories are provided with a factory warranty of 10 to 30 years.', 'COLOMBO DESIGN is rightfully the leader among manufacturers of handles and accessories for entrance and interior doors. This is achieved by the perfection of technology and cooperation with well-known design studios, such as BARTOLI, PININFARINA, CASTILIA, etc. All handles and accessories are provided with a factory warranty of 10 to 30 years.',
    60, target_cat, '{"https://www.union.ru/upload/iblock/5d0/Ограничител.jpeg","https://www.union.ru/upload/iblock/11a/wwb31rpwuan9oiio3vq6rmy8b1705rut/CD-112-oroplus_1200x800.jpg","https://www.union.ru/upload/iblock/2f0/wepkam3ruhns09aeo5ac2w5nbw2lk32q/CD_112.jpg.webp"}',
    '{"lock":"!important; }","opening_angle":"2","made_in":"Italy","model":"CD 112"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/cd-112-1522'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'pocket-cassettes';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'EVOKIT pencil case', 'EVOKIT pencil case', 'penal-evokit-39340',
    'Пеналы для одностворчатых раздвижных дверей с наличниками - это по настоящему инновационное решение для создания идеальной эргономики пространства. Пеналы производятся в Италии. Благодаря своей конструкции дверь при открывании уходит внутрь стены, что помогает сэкономить вам полезное пространство в квартире. EVOKIT подходят как для стеклянных, так и для деревянных дверей. Запатентованная система из профилей, направляющей и нейлоновых роликов Easyroll на сферических подшипниках обеспечивают максимально плавное и бесшумное скольжение. Съёмный рельс позволяет заменить дверь или обслуживать механизм, не разбирая стену. Оцинковка по всей металлической поверхности пеналов EVOKIT рассчитана на эксплуатацию дверей даже в помещениях с высокой влажностью.', 'Пеналы для одностворчатых раздвижных дверей с наличниками - это по настоящему инновационное решение для создания идеальной эргономики пространства. Пеналы производятся в Италии. Благодаря своей конструкции дверь при открывании уходит внутрь стены, что помогает сэкономить вам полезное пространство в квартире. EVOKIT подходят как для стеклянных, так и для деревянных дверей. Запатентованная система из профилей, направляющей и нейлоновых роликов Easyroll на сферических подшипниках обеспечивают максимально плавное и бесшумное скольжение. Съёмный рельс позволяет заменить дверь или обслуживать механизм, не разбирая стену. Оцинковка по всей металлической поверхности пеналов EVOKIT рассчитана на эксплуатацию дверей даже в помещениях с высокой влажностью.',
    2190, target_cat, '{"https://www.union.ru/upload/iblock/485/dckugxgm6k7oix9hpyhplppqs1iej8y8/Ermetika-_-EvoKit_2-2400x1600.png","https://www.union.ru/upload/iblock/bc2/8uw880uf5w4bjb0heebnv7z0lqoqy40z/Ermetika-_-EvoKit_2-2400x1600.png","https://www.union.ru/upload/iblock/aa6/gdl44nptoh4l897xns2y1ddbbvecf3g2/Ermetika-_-EvoKit-NEW-_-Telaio_2-2400x1600.png","https://www.union.ru/upload/iblock/c0a/a3fn0dbcmlt7r2t5pxhf2i53jion0b1p/Ermetika-_-EvoKit-2-2400x1600.png","https://www.union.ru/upload/iblock/a92/15hr6q57wrj9gv9yd5qvwfxrol50tl1h/EKSC-_-Evokit-Anta-singola-cartongesso-2400x1600.png"}',
    '{"opening_angle":"2","model":"EVOKIT"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/penal-evokit-39340'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'pocket-cassettes';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'EVOKIT Doppia pencil case', 'EVOKIT Doppia pencil case', 'penal-evokit-doppia-39341',
    'Пеналы для двустворчатых раздвижных дверей с наличниками - это по настоящему инновационное решение для создания идеальной эргономики пространства. Пеналы производятся в Италии. Благодаря своей конструкции дверь при открывании уходит внутрь стены, что помогает сэкономить вам полезное пространство в квартире. EVOKIT подходят как для стеклянных, так и для деревянных дверей. Запатентованная система из профилей, направляющей и нейлоновых роликов Easyroll на сферических подшипниках обеспечивают максимально плавное и бесшумное скольжение. Съёмный рельс позволяет заменить дверь или обслуживать механизм, не разбирая стену. Оцинковка по всей металлической поверхности пеналов EVOKIT рассчитана на эксплуатацию дверей даже в помещениях с высокой влажностью.', 'Пеналы для двустворчатых раздвижных дверей с наличниками - это по настоящему инновационное решение для создания идеальной эргономики пространства. Пеналы производятся в Италии. Благодаря своей конструкции дверь при открывании уходит внутрь стены, что помогает сэкономить вам полезное пространство в квартире. EVOKIT подходят как для стеклянных, так и для деревянных дверей. Запатентованная система из профилей, направляющей и нейлоновых роликов Easyroll на сферических подшипниках обеспечивают максимально плавное и бесшумное скольжение. Съёмный рельс позволяет заменить дверь или обслуживать механизм, не разбирая стену. Оцинковка по всей металлической поверхности пеналов EVOKIT рассчитана на эксплуатацию дверей даже в помещениях с высокой влажностью.',
    4550, target_cat, '{"https://www.union.ru/upload/iblock/410/hq6xqgad9jtzbxhmfpvtvzcm3vv0q42t/Ermetika-_-EvoKit-Anta-Doppia-2400x1600.png","https://www.union.ru/upload/iblock/013/xqp8njd1q4ya214pb1gpk0zglcpuor0u/Ermetika-_-EvoKit-Anta-Doppia-2400x1600.png","https://www.union.ru/upload/iblock/3c5/e42l42qu0lpa27tdj4ygl5v4tkvdsttb/EKDC-_-Evokit-Anta-doppia-cartongesso-2400x1600.png"}',
    '{"opening_angle":"2","model":"EVOKIT Doppia"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/penal-evokit-doppia-39341'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'pocket-cassettes';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'ABSOLUTE pencil case', 'ABSOLUTE pencil case', 'penal-absolute-39338',
    'Пеналы для одностворчатых раздвижных дверей без наличников от UNION откроют для вас совершенно новую эру комфорта. Произведённые в Италии, они сочетают безупречное качество материалов и инновационные технологии, позволяя двери при открывании «исчезать» в стене, освобождая полезную площадь для мебели и предметов интерьера. ABSOLUTE — лаконичное по стилю и универсальное по функционалу решение, которое подходит для стеклянных и деревянных дверей. Запатентованная система из алюминиевых профилей и механизма с нейлоновыми роликами Easyroll на сферических подшипниках обеспечивает плавное и бесшумное скольжение полотна. Этот пенал идеально подойдет и для влажных помещений, поскольку оцинкованная поверхность полностью защищена от коррозии. Съёмная направляющая позволяет легко заменить дверь или про', 'Пеналы для одностворчатых раздвижных дверей без наличников от UNION откроют для вас совершенно новую эру комфорта. Произведённые в Италии, они сочетают безупречное качество материалов и инновационные технологии, позволяя двери при открывании «исчезать» в стене, освобождая полезную площадь для мебели и предметов интерьера. ABSOLUTE — лаконичное по стилю и универсальное по функционалу решение, которое подходит для стеклянных и деревянных дверей. Запатентованная система из алюминиевых профилей и механизма с нейлоновыми роликами Easyroll на сферических подшипниках обеспечивает плавное и бесшумное скольжение полотна. Этот пенал идеально подойдет и для влажных помещений, поскольку оцинкованная поверхность полностью защищена от коррозии. Съёмная направляющая позволяет легко заменить дверь или про',
    3750, target_cat, '{"https://www.union.ru/upload/iblock/680/ev0o9ks3dl27e18yug2cgt28o41jnlvg/ERMETIKA-_-Absolute-Evokit_2-2400x1600.png","https://www.union.ru/upload/iblock/63b/qp1tg2cpt8td8rj6ws2fvp08xsghgnjp/ERMETIKA-_-Absolute-Evokit_2-2400x1600.png","https://www.union.ru/upload/iblock/a69/j3zhvrw3sp1b34quehry3d50eu4vomv8/AESC-_-Absolute-EvoKit-Anta-Singola-2400x1600.png"}',
    '{"opening_angle":"2","model":"ABSOLUTE"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/penal-absolute-39338'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'pocket-cassettes';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'ABSOLUTE Doppia pencil case', 'ABSOLUTE Doppia pencil case', 'penal-absolute-doppia-39342',
    'Пеналы для двустворчатых раздвижных дверей без наличников от UNION откроют для вас совершенно новую эру комфорта. Произведённые в Италии, они сочетают безупречное качество материалов и инновационные технологии, позволяя двери при открывании «исчезать» в стене, освобождая полезную площадь для мебели и предметов интерьера. ABSOLUTE — лаконичное по стилю и универсальное по функционалу решение, которое подходит для стеклянных и деревянных дверей. Запатентованная система из алюминиевых профилей и механизма с нейлоновыми роликами Easyroll на сферических подшипниках обеспечивает плавное и бесшумное скольжение полотна. Этот пенал идеально подойдет и для влажных помещений, поскольку оцинкованная поверхность полностью защищена от коррозии. Съёмная направляющая позволяет легко заменить дверь или пров', 'Пеналы для двустворчатых раздвижных дверей без наличников от UNION откроют для вас совершенно новую эру комфорта. Произведённые в Италии, они сочетают безупречное качество материалов и инновационные технологии, позволяя двери при открывании «исчезать» в стене, освобождая полезную площадь для мебели и предметов интерьера. ABSOLUTE — лаконичное по стилю и универсальное по функционалу решение, которое подходит для стеклянных и деревянных дверей. Запатентованная система из алюминиевых профилей и механизма с нейлоновыми роликами Easyroll на сферических подшипниках обеспечивает плавное и бесшумное скольжение полотна. Этот пенал идеально подойдет и для влажных помещений, поскольку оцинкованная поверхность полностью защищена от коррозии. Съёмная направляющая позволяет легко заменить дверь или пров',
    7350, target_cat, '{"https://www.union.ru/upload/iblock/dd8/dygsxio2wmsfhg2lfyrvscpqqqmy5rg2/Ermetika-_-Absolute-EvoKit-Doppio-2400x1600.png","https://www.union.ru/upload/iblock/58b/0ctu08soi9n1w6eo7ftrbgo5fdemy3nd/Ermetika-_-Absolute-EvoKit-Doppio-2400x1600.png","https://www.union.ru/upload/iblock/080/f8rkjiphvnhkli5htq36f0iouqjcn1if/AEDC-_-Absolute-EvoKit-Anta-Doppia-2400x1600.png"}',
    '{"opening_angle":"2","model":"ABSOLUTE Doppia"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/penal-absolute-doppia-39342'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'hangers';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Hangers without crossbar, made in Italy', 'Hangers without crossbar, made in Italy', 'plechiki-made-in-italy-29073',
    'Плечики (made in Italy) всегда есть в наличии на складе. Итальянские плечики изготовлены из инновационного и экологичного биополимера. Анатомическая форма плечиков обеспечивает идеальную посадку и сохраняет форму одежды. Размер плечиков 43 см. Модель UN-L - без перекладины.', 'Плечики (made in Italy) всегда есть в наличии на складе. Итальянские плечики изготовлены из инновационного и экологичного биополимера. Анатомическая форма плечиков обеспечивает идеальную посадку и сохраняет форму одежды. Размер плечиков 43 см. Модель UN-L - без перекладины.',
    60, target_cat, '{"https://www.union.ru/upload/iblock/e18/gv8nay653t8zg1aeyjaooa15q5xcfs7u/UN_L-2400_1600_2024.png","https://www.union.ru/upload/iblock/3ff/kvwc1zne0pa4igxsx4cpb61nu1kvqt30/UN_L_2400_1600_2024.png","https://www.union.ru/upload/iblock/3fb/cnf0bwha3dsecah2zdr13n3gf554fj17/UN_L_2400_1600_00.png","https://www.union.ru/upload/iblock/339/02lpe70x6ve9xfbux32lo6turzni5hcr/UN_L_01.jpg","https://www.union.ru/upload/iblock/586/kmcd0jvcnt5v243z7pplumzc812u6e2g/image_22_05_23_12_34_1.jpeg","https://www.union.ru/upload/iblock/2a7/l7bk0i5zcnmosd7uwt8jo07rbwhy3zcm/photo_5429274429982100317_y.jpg"}',
    '{"opening_angle":"2","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/plechiki-made-in-italy-29073'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
  SELECT id INTO target_cat FROM public.categories WHERE slug = 'hangers';
  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = 'hardware'; END IF;
  INSERT INTO public.products (
    name_ka, name_en, slug, description_ka, description_en,
    price, category_id, images, specifications,
    is_active, is_new, stock_quantity, source_url
  ) VALUES (
    'Hangers with a crossbar, made in Italy', 'Hangers with a crossbar, made in Italy', 'plechiki-made-in-italy-31872',
    'Итальянские плечики изготовлены из инновационного и экологичного биополимера. Анатомическая форма плечиков обеспечивает идеальную посадку и сохраняет форму одежды. На плечиках с перекладиной нанесено бархатистое покрытие, что исключает соскальзывание брюк. Размер плечиков 43 см. Модель UN-F - с перекладиной.', 'Итальянские плечики изготовлены из инновационного и экологичного биополимера. Анатомическая форма плечиков обеспечивает идеальную посадку и сохраняет форму одежды. На плечиках с перекладиной нанесено бархатистое покрытие, что исключает соскальзывание брюк. Размер плечиков 43 см. Модель UN-F - с перекладиной.',
    80, target_cat, '{"https://www.union.ru/upload/iblock/4fe/fwywpfu1bvhz7nxj97hqdhrs7nsyu3u8/UN_F-2400x1600_2024.png","https://www.union.ru/upload/iblock/4e2/8w7jua0za2ustludz8nyilr2ynsfgoy3/UN_F_2400x1600_2024.png","https://www.union.ru/upload/iblock/792/aw0y2lctaohdiqa3k3o3mqacrp13pclb/UN_F_2400x1600_00.png","https://www.union.ru/upload/iblock/0dc/6j42dhs0jkqfe428n0ov3fdfq89ayexl/UN_F_01.jpg","https://www.union.ru/upload/iblock/099/8j0ikcdi0uaogmo02m4am7wzmjkrt02w/image_22_05_23_12_34_1.jpeg","https://www.union.ru/upload/iblock/43c/fidv6tpviwyrh10h7urt8hp2ygfo7af5/photo_5429274429982100316_y.jpg"}',
    '{"opening_angle":"2","made_in":"Italy"}'::jsonb,
    true, false, 1, 'https://en.union.ru/product/plechiki-made-in-italy-31872'
  ) ON CONFLICT (slug) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    description_en = EXCLUDED.description_en,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    images = EXCLUDED.images,
    specifications = EXCLUDED.specifications,
    source_url = EXCLUDED.source_url;
END $$;

-- 111 products inserted/upserted