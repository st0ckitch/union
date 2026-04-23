-- ============================================================================
-- Product content blocks — CMS-driven sections below the main product area
-- Mirrors union.ru FILO-60 layout (specs, gallery, diagram, CTA tiles, etc.)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Enums
-- ----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE public.product_block_type AS ENUM (
        'specs_list',
        'image_gallery',
        'technical_diagram',
        'cta_tiles',
        'variants_carousel',
        'text_with_image',
        'contact_cta',
        'faq_list',
        'rich_text'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE public.product_block_scope AS ENUM ('global', 'category', 'product');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ----------------------------------------------------------------------------
-- Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_content_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scope public.product_block_scope NOT NULL DEFAULT 'product',
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    block_type public.product_block_type NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,

    -- Shared content fields (used differently per block type)
    title_ka TEXT,
    title_ru TEXT,
    title_en TEXT,
    subtitle_ka TEXT,
    subtitle_ru TEXT,
    subtitle_en TEXT,
    body_ka TEXT,
    body_ru TEXT,
    body_en TEXT,
    image_url TEXT,
    secondary_image_url TEXT,

    -- Type-specific payload (columns/items/callouts/tiles/etc.)
    data JSONB DEFAULT '{}'::jsonb,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,

    -- Scope integrity: product scope requires product_id, category scope requires category_id
    CONSTRAINT product_scope_has_product CHECK (scope <> 'product' OR product_id IS NOT NULL),
    CONSTRAINT category_scope_has_category CHECK (scope <> 'category' OR category_id IS NOT NULL),
    CONSTRAINT global_scope_has_no_fks CHECK (scope <> 'global' OR (product_id IS NULL AND category_id IS NULL))
);

CREATE INDEX IF NOT EXISTS idx_pcb_scope ON public.product_content_blocks(scope);
CREATE INDEX IF NOT EXISTS idx_pcb_product ON public.product_content_blocks(product_id) WHERE product_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pcb_category ON public.product_content_blocks(category_id) WHERE category_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pcb_active_sort ON public.product_content_blocks(is_active, sort_order);

ALTER TABLE public.product_content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active product blocks"
    ON public.product_content_blocks FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all product blocks"
    ON public.product_content_blocks FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage product blocks"
    ON public.product_content_blocks FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_product_content_blocks_updated_at
    BEFORE UPDATE ON public.product_content_blocks
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Seed: global blocks shown on every product
-- ----------------------------------------------------------------------------

-- "Подготовка проемов" — text + image
INSERT INTO public.product_content_blocks (
    scope, block_type, sort_order, is_active,
    title_ka, title_ru, title_en,
    body_ka, body_ru, body_en,
    image_url, data
) VALUES (
    'global', 'text_with_image', 500, true,
    'ღიობის მომზადება',                                  'Подготовка проемов',                                 'Opening preparation',
    '<p><strong>განისაზღვრეთ ღიობის ზომა</strong> (სიგანე, სიმაღლე). ღიობების მომზადება <em>სტანდარტული ზომებით</em> შეამცირებს კარების ღირებულებას.</p><p><strong>კედლები</strong> უნდა იყოს სუფთა და ვერტიკალურად მორგებული. საბოლოო მოსართავი სამუშაოების შემდეგ.</p><p><strong>იატაკი:</strong> კარი მონტაჟდება იატაკის საბოლოო დონეზე.</p>',
    '<p><strong>Определитесь с размером проёма</strong> (ширина, высота). Подготовка проёмов по <em>стандартным размерам INVISIBLE</em> снизит стоимость дверей.</p><p><strong>Стены</strong> должны быть оштукатурены по вертикальному уровню без отклонений. Подготавливаются в начале чистовой отделки.</p><p><strong>Полы:</strong> Двери устанавливаются на уровне чистового пола. Необходимо:<br>— наличие чистового пола со стяжкой с отметкой уровня чистового пола,<br>— полы должны быть ровными, без перепадов.</p>',
    '<p><strong>Determine the opening size</strong> (width, height). Preparing openings to <em>standard INVISIBLE sizes</em> will reduce door costs.</p><p><strong>Walls</strong> must be plastered to vertical level without deviations. Prepared at the start of finishing work.</p><p><strong>Floors:</strong> Doors are installed at finished floor level. Requirements:<br>— finished floor with screed marked to finish level,<br>— floors must be even, without level changes.</p>',
    'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80',
    '{"image_position":"right"}'::jsonb
);

-- "Остались вопросы?" — contact CTA
INSERT INTO public.product_content_blocks (
    scope, block_type, sort_order, is_active,
    title_ka, title_ru, title_en,
    body_ka, body_ru, body_en,
    data
) VALUES (
    'global', 'contact_cta', 600, true,
    'გაქვთ კითხვები?',                         'Остались вопросы?',                                 'Still have questions?',
    'შეუკვეთეთ უკუზარი ან მოგვწერეთ ონლაინ-ჩატში. ჩვენი კონსულტანტი დაგეხმარებათ სწორი არჩევანის გაკეთებაში თქვენი ინტერიერისთვის.',
    'Закажите обратный звонок или напишите в онлайн-чат. Наш консультант поможет подобрать оптимальное решение для вашего интерьера.',
    'Request a callback or write in the online chat. Our consultant will help you find the optimal solution for your interior.',
    '{"show_phone":true,"show_email":true,"show_whatsapp":true,"show_callback_form":true}'::jsonb
);

-- ----------------------------------------------------------------------------
-- Seed: demo blocks for any existing product whose slug starts with 'filo'
-- Admin can edit/delete these freely — they're just examples that match union.ru
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    p RECORD;
BEGIN
    FOR p IN SELECT id, slug FROM public.products WHERE slug LIKE 'filo%' LOOP
        -- specs_list
        INSERT INTO public.product_content_blocks (
            scope, product_id, block_type, sort_order, is_active,
            title_ka, title_ru, title_en,
            data
        ) VALUES (
            'product', p.id, 'specs_list', 10, true,
            'ტექნიკური მახასიათებლები',  'Технические характеристики',  'Technical specifications',
            jsonb_build_object(
                'columns', jsonb_build_array(
                    jsonb_build_object(
                        'heading', jsonb_build_object('ka','ფოთოლი FILO-60','ru','Полотно FILO-60','en','FILO-60 panel'),
                        'items', jsonb_build_array(
                            jsonb_build_object('ka','სისქე 6 სმ. კარკასი — ორმაგი ფიცარი.',              'ru','Толщина 6 см. Каркас — двойной брус.',                             'en','Thickness 6 cm. Frame — double beam.'),
                            jsonb_build_object('ka','მორთულობა — გრუნტი / ემალი / გლანცი / ხოჭო / HPL / სარკე.','ru','Отделка — грунт / эмаль / глянец / шпон / HPL / зеркало.', 'en','Finish — primer / enamel / gloss / veneer / HPL / mirror.'),
                            jsonb_build_object('ka','ჩამჩები — ფარული INVISTA ან OTLAV made in Italy.',   'ru','Петли — скрытые INVISTA или OTLAV made in Italy.',                 'en','Hinges — concealed INVISTA or OTLAV made in Italy.'),
                            jsonb_build_object('ka','საკეტი — მაგნიტური AGB, made in Italy.',             'ru','Замок — магнитный AGB, made in Italy.',                            'en','Lock — magnetic AGB, made in Italy.'),
                            jsonb_build_object('ka','მაქსიმალური ზომები — 100 × 350 სმ.',                'ru','Максимальные размеры — 100 × 350 см.',                              'en','Maximum dimensions — 100 × 350 cm.'),
                            jsonb_build_object('ka','ოფციები — ალუმინის მოლდინგი ფოთოლზე.',              'ru','Опции — алюминиевый молдинг на полотне.',                           'en','Options — aluminum molding on the panel.')
                        )
                    ),
                    jsonb_build_object(
                        'heading', jsonb_build_object('ka','ფარული ჩარჩო INVISIBLE','ru','Скрытый короб INVISIBLE','en','Hidden frame INVISIBLE'),
                        'items', jsonb_build_array(
                            jsonb_build_object('ka','გაძლიერებული, გამოწრთული ალუმინი.',                  'ru','Усиленный, закалённый алюминий.',                                  'en','Reinforced, tempered aluminum.'),
                            jsonb_build_object('ka','ცრუ-ჩარჩო — დამატებითი სიმტკიცე.',                  'ru','Фальшкороб — дополнительная жёсткость.',                           'en','False frame — additional rigidity.'),
                            jsonb_build_object('ka','მხარდამჭერები 10 ც. (made in Italy), მონტაჟის მოხერხებულობა.','ru','Суппорты 10 шт. (made in Italy), удобство монтажа.',        'en','Supports 10 pcs. (made in Italy), easy installation.'),
                            jsonb_build_object('ka','არმირებული ბადე სტიუკატურის გასქდომის საწინააღმდეგოდ.','ru','Армирующая сетка от растрескивания штукатурки.',                  'en','Reinforcing mesh against plaster cracking.'),
                            jsonb_build_object('ka','კედელთან კომპლანარობა გახსნისას „ღიობიდან“ და „ღიობში".','ru','Компланарность со стеной при открывании «из проёма» и «в проём».','en','Flush with wall when opening outward and inward.')
                        )
                    ),
                    jsonb_build_object(
                        'heading', jsonb_build_object('ka','მონტაჟი','ru','Монтаж','en','Installation'),
                        'items', jsonb_build_array(
                            jsonb_build_object('ka','„მაიაკები" გაპოჭონის მონტაჟისთვის.',                 'ru','«Маяки» для монтажа гипсокартона.',                                'en','"Beacons" for drywall installation.'),
                            jsonb_build_object('ka','გაღების კუთხე 180°.',                              'ru','Открывание 180°.',                                                   'en','180° opening angle.'),
                            jsonb_build_object('ka','DEVENTER უპლოტნიტელი (made in Germany).',           'ru','Уплотнитель DEVENTER (made in Germany).',                          'en','DEVENTER seal (made in Germany).'),
                            jsonb_build_object('ka','მორთულობა — ალუმინი დაუფარავი.',                   'ru','Отделка — алюминий без покрытия.',                                  'en','Finish — uncoated aluminum.'),
                            jsonb_build_object('ka','ოფციები: ანოდირება ვერცხლისფერი ალუმინი / შავი მატი, ფხვნილოვანი ღებვა.','ru','Опции: анодировка Серебристый алюминий / Чёрный матовый, порошковая покраска.','en','Options: Silver aluminum / Matte black anodizing, powder coating.')
                        )
                    )
                )
            )
        );

        -- cta_tiles — "Преимущества UNION" / "Обмер"
        INSERT INTO public.product_content_blocks (
            scope, product_id, block_type, sort_order, is_active,
            data
        ) VALUES (
            'product', p.id, 'cta_tiles', 30, true,
            jsonb_build_object(
                'tiles', jsonb_build_array(
                    jsonb_build_object(
                        'icon','Award',
                        'title', jsonb_build_object('ka','UNION კარების უპირატესობები','ru','Преимущества дверей UNION','en','UNION door advantages'),
                        'description', jsonb_build_object('ka','რატომ ჩვენ','ru','Почему мы','en','Why us'),
                        'url','/union/about'
                    ),
                    jsonb_build_object(
                        'icon','Ruler',
                        'title', jsonb_build_object('ka','უფასო გაზომვა','ru','Обмер','en','Free measuring'),
                        'description', jsonb_build_object('ka','შეუკვეთეთ უფასო გაზომვის სერვისი','ru','Закажите услугу бесплатного обмера','en','Book a free on-site measurement'),
                        'url','/union/contact'
                    )
                )
            )
        );

        -- variants_carousel — placeholder (admin fills later)
        INSERT INTO public.product_content_blocks (
            scope, product_id, block_type, sort_order, is_active,
            title_ka, title_ru, title_en,
            data
        ) VALUES (
            'product', p.id, 'variants_carousel', 40, true,
            'შესრულების ვარიანტები',  'Варианты исполнения',  'Execution variants',
            jsonb_build_object(
                'items', jsonb_build_array(
                    jsonb_build_object('image','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 'title', jsonb_build_object('ka','გასაშლელი კარი','ru','Распашная дверь','en','Swing door')),
                    jsonb_build_object('image','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',  'title', jsonb_build_object('ka','სრიალა კარი','ru','Раздвижная дверь','en','Sliding door')),
                    jsonb_build_object('image','https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', 'title', jsonb_build_object('ka','„სუფთა კედლის" კარი','ru','Дверь «под чистую стену»','en','Flush-to-wall door')),
                    jsonb_build_object('image','https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', 'title', jsonb_build_object('ka','პივოტი','ru','Поворотная','en','Pivot'))
                )
            )
        );

        -- technical_diagram — labeled cross-section placeholder
        INSERT INTO public.product_content_blocks (
            scope, product_id, block_type, sort_order, is_active,
            title_ka, title_ru, title_en,
            subtitle_ka, subtitle_ru, subtitle_en,
            image_url, data
        ) VALUES (
            'product', p.id, 'technical_diagram', 20, true,
            'ფარული ჩარჩო INVISIBLE LUX',  'Скрытый короб INVISIBLE LUX',  'Hidden frame INVISIBLE LUX',
            'Patent UNION',                'Patent UNION',                  'Patent UNION',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85',
            jsonb_build_object(
                'callouts', jsonb_build_array(
                    jsonb_build_object('number',1,'x',72,'y',18, 'label', jsonb_build_object('ka','ფოთოლი','ru','Полотно','en','Panel')),
                    jsonb_build_object('number',2,'x',72,'y',26, 'label', jsonb_build_object('ka','პრემიერ','ru','Пример','en','Primer')),
                    jsonb_build_object('number',3,'x',72,'y',34, 'label', jsonb_build_object('ka','გერმოშოვი','ru','Гермошов','en','Air seal')),
                    jsonb_build_object('number',4,'x',72,'y',42, 'label', jsonb_build_object('ka','SHLEGEL უპლოტნიტელი','ru','Уплотнитель SHLEGEL','en','SHLEGEL seal')),
                    jsonb_build_object('number',5,'x',72,'y',50, 'label', jsonb_build_object('ka','ძირითადი ჩარჩო','ru','Основной короб','en','Main frame')),
                    jsonb_build_object('number',6,'x',72,'y',58, 'label', jsonb_build_object('ka','სუპორტი 10 ც.','ru','Суппорт, 10 шт.','en','Support, 10 pcs')),
                    jsonb_build_object('number',7,'x',72,'y',66, 'label', jsonb_build_object('ka','ცრუ-ჩარჩო','ru','Фальшкороб','en','False frame')),
                    jsonb_build_object('number',8,'x',72,'y',74, 'label', jsonb_build_object('ka','არმირებული ბადე','ru','Армирующая сетка','en','Reinforcing mesh')),
                    jsonb_build_object('number',9,'x',72,'y',82, 'label', jsonb_build_object('ka','მონტაჟის მაიაკები','ru','Монтажные маяки','en','Mounting beacons')),
                    jsonb_build_object('number',10,'x',72,'y',90, 'label', jsonb_build_object('ka','შტუკატურკა','ru','Штукатурка','en','Plaster'))
                )
            )
        );
    END LOOP;
END $$;
