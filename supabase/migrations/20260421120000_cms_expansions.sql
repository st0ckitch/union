-- ============================================================================
-- CMS expansion: site_features, hmspace_sections, hmspace_projects, legal_pages
-- Extend categories with home_visible / home_sort_order / home_image_url
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. site_features  (home page FeaturesBar)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon TEXT NOT NULL,                       -- Lucide icon name
    title_ka TEXT NOT NULL,
    title_ru TEXT,
    title_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.site_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active site features" ON public.site_features FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all site features" ON public.site_features FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage site features" ON public.site_features FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_site_features_updated_at BEFORE UPDATE ON public.site_features
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_features (icon, title_ka, title_ru, title_en, description_ka, description_ru, description_en, sort_order) VALUES
    ('Truck',      'უფასო მიწოდება', 'Бесплатная доставка',    'Free Delivery',   'თბილისის მასშტაბით',         'По всему Тбилиси',                  'Across Tbilisi',              1),
    ('Shield',     'გარანტია',       'Гарантия',               'Warranty',         '2 წლიანი გარანტია',           '2-летняя гарантия',                 '2 Year Warranty',             2),
    ('CreditCard', 'განვადება',      'Рассрочка',              'Installments',     '0%-იანი განვადება',            'Рассрочка 0%',                      '0% Interest',                 3),
    ('Headphones', '24/7 მხარდაჭერა', 'Поддержка 24/7',         '24/7 Support',     'პროფესიონალური კონსულტაცია', 'Профессиональная консультация',     'Professional Consultation',   4);

-- ----------------------------------------------------------------------------
-- 2. hmspace_sections  (HMspace landing content blocks)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hmspace_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,          -- 'hero', 'about', 'values', 'spotlight', 'stats', 'mission'
    eyebrow_ka TEXT,
    eyebrow_ru TEXT,
    eyebrow_en TEXT,
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
    cta_label_ka TEXT,
    cta_label_ru TEXT,
    cta_label_en TEXT,
    cta_url TEXT,
    cta_secondary_label_ka TEXT,
    cta_secondary_label_ru TEXT,
    cta_secondary_label_en TEXT,
    cta_secondary_url TEXT,
    items JSONB DEFAULT '[]'::jsonb,           -- for repeated sub-items (values, stats, etc.)
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.hmspace_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active hmspace sections" ON public.hmspace_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all hmspace sections" ON public.hmspace_sections FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage hmspace sections" ON public.hmspace_sections FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_hmspace_sections_updated_at BEFORE UPDATE ON public.hmspace_sections
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed: Hero
INSERT INTO public.hmspace_sections (section_key, sort_order, eyebrow_ka, eyebrow_ru, eyebrow_en, title_ka, title_ru, title_en, body_ka, body_ru, body_en, image_url, cta_label_ka, cta_label_ru, cta_label_en, cta_url, cta_secondary_label_ka, cta_secondary_label_ru, cta_secondary_label_en, cta_secondary_url) VALUES
    ('hero', 1,
     'HMspace — პრემიუმ ინტერიერი',           'HMspace — Премиум интерьеры',         'HMspace — Premium Interiors',
     'ინტერიერი, რომელიც ცხოვრებას ცვლის',     'Интерьер, меняющий жизнь',             'Interiors that transform life',
     'უმაღლესი ხარისხის საკონტრაქტო და რეზიდენციული ავეჯი, კარები და მორთულობა, შეკვეთით დამზადებული თქვენი სივრცისთვის.',
     'Первоклассная контрактная и жилая мебель, двери и отделка, изготовленные на заказ для вашего пространства.',
     'Top-tier contract and residential furniture, doors, and finishes, made to order for your space.',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=85',
     'UNION კატალოგი',   'Каталог UNION',     'UNION Catalog',  '/union',
     'დაათვალიერე ბრენდი', 'Узнать о бренде',   'Explore brand',  '#brand');

-- Seed: About
INSERT INTO public.hmspace_sections (section_key, sort_order, eyebrow_ka, eyebrow_ru, eyebrow_en, title_ka, title_ru, title_en, body_ka, body_ru, body_en, image_url, secondary_image_url, items) VALUES
    ('about', 2,
     'HMspace — კომპანიის შესახებ',  'HMspace — О компании',           'HMspace — About',
     '10+ წელი ხარისხიანი ინტერიერის შექმნისა',
     '10+ лет создания качественных интерьеров',
     '10+ years creating quality interiors',
     'HMspace აერთიანებს ქართულ დიზაინს ევროპულ წარმოებასთან. ყოველი პროექტი ჩვენი მიდგომის ანარეკლია — დეტალზე ყურადღება, მასალების ხარისხი, გრძელვადიანი პარტნიორობა.',
     'HMspace сочетает грузинский дизайн с европейским производством. Каждый проект отражает наш подход — внимание к деталям, качество материалов, долгосрочное партнёрство.',
     'HMspace brings together Georgian design and European manufacturing. Every project reflects our approach — attention to detail, material quality, long-term partnership.',
     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
     '[{"value":"35+","label_ka":"წელი ბაზარზე","label_ru":"лет на рынке","label_en":"years on market"},
       {"value":"18","label_ka":"ფილიალი","label_ru":"филиалов","label_en":"branches"}]'::jsonb);

-- Seed: Values (4 items)
INSERT INTO public.hmspace_sections (section_key, sort_order, eyebrow_ka, eyebrow_ru, eyebrow_en, title_ka, title_ru, title_en, body_ka, body_ru, body_en, items) VALUES
    ('values', 3,
     'HMspace',  'HMspace',   'HMspace',
     'ღირებულებები, რომლებიც ცხოვრებას აყალიბებენ',
     'Ценности, формирующие жизнь',
     'Values that shape living',
     'HMspace აერთიანებს ქართულ დიზაინს ევროპულ წარმოებასთან.',
     'HMspace сочетает грузинский дизайн с европейским производством.',
     'HMspace brings together Georgian design and European manufacturing.',
     '[{"icon":"Sparkles","num":"01","title_ka":"დიზაინის ხელოვნება","title_ru":"Искусство дизайна","title_en":"Design craft","description_ka":"ყოველი დეტალი ჩაფიქრებულია — პროპორცია, მასალა, სინათლე.","description_ru":"Каждая деталь продумана — пропорции, материал, свет.","description_en":"Every detail considered — proportion, material, light."},
       {"icon":"Users","num":"02","title_ka":"ადამიანი პირველ რიგში","title_ru":"Человек прежде всего","title_en":"People first","description_ka":"ჩვენი გუნდი და კლიენტები ერთად ქმნიან სივრცეებს.","description_ru":"Наша команда и клиенты вместе создают пространства.","description_en":"Our team and clients create spaces together."},
       {"icon":"Package","num":"03","title_ka":"ხარისხიანი მასალა","title_ru":"Качественные материалы","title_en":"Quality materials","description_ka":"ვირჩევთ მხოლოდ საიმედო ევროპულ მომწოდებლებს.","description_ru":"Выбираем только надёжных европейских поставщиков.","description_en":"We partner only with trusted European suppliers."},
       {"icon":"Award","num":"04","title_ka":"გრძელვადიანი ღირებულება","title_ru":"Долгосрочная ценность","title_en":"Lasting value","description_ka":"ვამზადებთ ისე, რომ ათწლეულებს გაუძლოს.","description_ru":"Мы создаём, чтобы служило десятилетиями.","description_en":"Built to last decades, not seasons."}]'::jsonb);

-- Seed: Spotlight (UNION)
INSERT INTO public.hmspace_sections (section_key, sort_order, eyebrow_ka, eyebrow_ru, eyebrow_en, title_ka, title_ru, title_en, body_ka, body_ru, body_en, image_url, cta_label_ka, cta_label_ru, cta_label_en, cta_url) VALUES
    ('spotlight', 4,
     'ჩვენი ბრენდი',  'Наш бренд',    'Our brand',
     'UNION',          'UNION',         'UNION',
     NULL, NULL, NULL,
     'ავეჯისა და კარების პრემიუმ კატალოგი — საცხოვრებელი და კომერციული პროექტებისთვის.',
     'Премиум каталог мебели и дверей — для жилых и коммерческих проектов.',
     'Premium catalog of furniture and doors — for residential and commercial projects.',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
     'UNION კატალოგში შესვლა', 'Войти в каталог UNION',  'Enter UNION catalog', '/union');

-- Seed: Stats (4 items)
INSERT INTO public.hmspace_sections (section_key, sort_order, eyebrow_ka, eyebrow_ru, eyebrow_en, title_ka, items) VALUES
    ('stats', 5,
     'HMspace — რიცხვებში',  'HMspace — в цифрах',  'HMspace — by the numbers',
     NULL,
     '[{"value":"35+","label_ka":"წელი ბაზარზე","label_ru":"лет на рынке","label_en":"years on market"},
       {"value":"1,200+","label_ka":"პროექტი","label_ru":"проектов","label_en":"projects"},
       {"value":"18","label_ka":"ფილიალი","label_ru":"филиалов","label_en":"branches"},
       {"value":"5K+","label_ka":"კლიენტი","label_ru":"клиентов","label_en":"clients"}]'::jsonb);

-- Seed: Mission
INSERT INTO public.hmspace_sections (section_key, sort_order, eyebrow_ka, eyebrow_ru, eyebrow_en, title_ka, title_ru, title_en, body_ka, body_ru, body_en, image_url) VALUES
    ('mission', 6,
     'HMspace',  'HMspace',  'HMspace',
     'ჩვენი მისია — თქვენი ადგილი იდეალური იყოს',
     'Наша миссия — сделать ваше пространство идеальным',
     'Our mission — make your space perfect',
     'ჩვენ ვქმნით ინტერიერებს, რომელიც არა მარტო მშვენიერია, არამედ ფუნქციონალური — გაერთიანებულია ესთეტიკა, ხარისხი და დეტალებზე ყურადღება.',
     'Мы создаём интерьеры, которые не просто красивы, но функциональны — объединяя эстетику, качество и внимание к деталям.',
     'We craft interiors that are not just beautiful but functional — uniting aesthetics, quality, and a focus on details.',
     'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=85');

-- ----------------------------------------------------------------------------
-- 3. hmspace_projects  (featured projects gallery)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hmspace_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ka TEXT NOT NULL,
    title_ru TEXT,
    title_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    location TEXT,
    year TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.hmspace_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active projects" ON public.hmspace_projects FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all projects" ON public.hmspace_projects FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage projects" ON public.hmspace_projects FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_hmspace_projects_updated_at BEFORE UPDATE ON public.hmspace_projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.hmspace_projects (title_ka, title_ru, title_en, description_ka, description_ru, description_en, image_url, location, year, sort_order, is_featured) VALUES
    ('თბილისის ცენტრი — საცხოვრებელი',  'Центр Тбилиси — резиденция',      'Tbilisi Centre — Residence',
     'ლუქსი საცხოვრებელი ქართული ესთეტიკისა და თანამედროვე ფორმების შერწყმით.',
     'Роскошное жилое пространство, объединяющее грузинскую эстетику и современные формы.',
     'Luxury residence blending Georgian aesthetics with contemporary forms.',
     'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
     'Tbilisi', '2024', 1, true),
    ('ვაკე — ბუტიკ-სასტუმრო',           'Ваке — бутик-отель',             'Vake — Boutique Hotel',
     'სრული ინტერიერი — მიღება, ნომრები, კაფე.',
     'Полный интерьер — ресепшн, номера, кафе.',
     'Full interior — reception, rooms, café.',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
     'Tbilisi', '2023', 2, true),
    ('ბათუმი — სანაპიროს ვილა',           'Батуми — вилла на побережье',   'Batumi — Coastal Villa',
     'საოჯახო ვილა მინიმალისტური ესტეტიკით.',
     'Семейная вилла с минималистичной эстетикой.',
     'Family villa with minimalist aesthetics.',
     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
     'Batumi', '2023', 3, false);

-- ----------------------------------------------------------------------------
-- 4. legal_pages  (Privacy / Terms / Delivery / Warranty / Returns)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.legal_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,              -- 'privacy', 'terms', 'delivery', 'warranty', 'returns'
    title_ka TEXT NOT NULL,
    title_ru TEXT,
    title_en TEXT,
    body_ka TEXT,                            -- HTML/rich text
    body_ru TEXT,
    body_en TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.legal_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active legal pages" ON public.legal_pages FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all legal pages" ON public.legal_pages FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage legal pages" ON public.legal_pages FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_legal_pages_updated_at BEFORE UPDATE ON public.legal_pages
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.legal_pages (slug, sort_order, title_ka, title_ru, title_en, body_ka, body_ru, body_en) VALUES
    ('privacy', 1,
     'კონფიდენციალურობის პოლიტიკა', 'Политика конфиденциальности', 'Privacy Policy',
     '<h2>1. ზოგადი დებულებები</h2><p>ეს კონფიდენციალურობის პოლიტიკა აღწერს, თუ როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს პერსონალურ ინფორმაციას.</p><h2>2. ინფორმაციის შეგროვება</h2><p>ჩვენ ვაგროვებთ ინფორმაციას, რომელსაც თქვენ გვაწვდით პირდაპირ: სახელი, ელ-ფოსტა, ტელეფონის ნომერი და მიწოდების მისამართი.</p><h2>3. ინფორმაციის გამოყენება</h2><p>თქვენი ინფორმაცია გამოიყენება შეკვეთების დამუშავებისთვის, მომხმარებელთა მხარდაჭერისთვის და მარკეტინგული კომუნიკაციისთვის.</p><h2>4. ინფორმაციის დაცვა</h2><p>ჩვენ ვიყენებთ ინდუსტრიის სტანდარტულ უსაფრთხოების ზომებს თქვენი პერსონალური ინფორმაციის დასაცავად.</p><h2>5. კონტაქტი</h2><p>კონფიდენციალურობასთან დაკავშირებული კითხვებისთვის, გთხოვთ დაგვიკავშირდეთ: info@hmspace.ge</p>',
     '<h2>1. Общие положения</h2><p>Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу персональную информацию.</p><h2>2. Сбор информации</h2><p>Мы собираем информацию, которую вы предоставляете напрямую: имя, электронная почта, номер телефона и адрес доставки.</p><h2>3. Использование информации</h2><p>Ваша информация используется для обработки заказов, поддержки клиентов и маркетинговой коммуникации.</p><h2>4. Защита информации</h2><p>Мы применяем отраслевые стандарты безопасности для защиты вашей персональной информации.</p><h2>5. Контакт</h2><p>По вопросам конфиденциальности свяжитесь с нами: info@hmspace.ge</p>',
     '<h2>1. General Provisions</h2><p>This Privacy Policy describes how we collect, use, and protect your personal information.</p><h2>2. Information Collection</h2><p>We collect information you provide directly: name, email, phone number, and delivery address.</p><h2>3. Use of Information</h2><p>Your information is used for order processing, customer support, and marketing communications.</p><h2>4. Information Protection</h2><p>We use industry-standard security measures to protect your personal information.</p><h2>5. Contact</h2><p>For privacy-related questions, please contact us: info@hmspace.ge</p>'),
    ('terms', 2,
     'წესები და პირობები', 'Условия использования', 'Terms & Conditions',
     '<h2>1. ზოგადი პირობები</h2><p>ვებგვერდით სარგებლობა ნიშნავს, რომ თქვენ ეთანხმებით ამ წესებს.</p><h2>2. შეკვეთები</h2><p>შეკვეთის გაფორმებისას თქვენ ადასტურებთ მოწოდებული ინფორმაციის სისწორეს.</p><h2>3. გადახდა</h2><p>ჩვენ ვიღებთ ბარათულ გადახდას, გადარიცხვას და ნაღდ ფულს მიწოდებისას.</p><h2>4. პასუხისმგებლობა</h2><p>ჩვენ ვცდილობთ ინფორმაციის სიზუსტეს, მაგრამ არ ვიღებთ პასუხისმგებლობას შეცდომებისთვის.</p>',
     '<h2>1. Общие условия</h2><p>Использование сайта означает согласие с этими условиями.</p><h2>2. Заказы</h2><p>При оформлении заказа вы подтверждаете корректность предоставленной информации.</p><h2>3. Оплата</h2><p>Мы принимаем оплату картой, переводом и наличными при доставке.</p><h2>4. Ответственность</h2><p>Мы стремимся к точности, но не несём ответственности за ошибки.</p>',
     '<h2>1. General Terms</h2><p>Using the site means you agree to these terms.</p><h2>2. Orders</h2><p>When placing an order you confirm the accuracy of provided information.</p><h2>3. Payment</h2><p>We accept card, bank transfer, and cash on delivery.</p><h2>4. Liability</h2><p>We strive for accuracy but are not liable for errors.</p>'),
    ('delivery', 3,
     'მიწოდება', 'Доставка', 'Delivery',
     '<h2>თბილისი</h2><p>უფასო მიწოდება თბილისში ყველა შეკვეთისთვის.</p><h2>რეგიონები</h2><p>მიწოდება მთელი საქართველოს მასშტაბით — ფასი დამოკიდებულია მანძილსა და პროდუქციის მოცულობაზე.</p><h2>ვადები</h2><p>მარაგში არსებული პროდუქცია — 1-3 სამუშაო დღე. შეკვეთით დამზადებული — 2-6 კვირა.</p>',
     '<h2>Тбилиси</h2><p>Бесплатная доставка по Тбилиси для всех заказов.</p><h2>Регионы</h2><p>Доставка по всей Грузии — стоимость зависит от расстояния и объёма.</p><h2>Сроки</h2><p>Товар в наличии — 1-3 рабочих дня. Под заказ — 2-6 недель.</p>',
     '<h2>Tbilisi</h2><p>Free delivery within Tbilisi for all orders.</p><h2>Regions</h2><p>Delivery across Georgia — price depends on distance and volume.</p><h2>Timing</h2><p>In-stock items — 1-3 business days. Made-to-order — 2-6 weeks.</p>'),
    ('warranty', 4,
     'გარანტია', 'Гарантия', 'Warranty',
     '<h2>2 წლიანი გარანტია</h2><p>ყველა პროდუქციაზე ვრცელდება 2 წლის გარანტია საქარხნო დეფექტებზე.</p><h2>გარანტიის პირობები</h2><p>გარანტია მოქმედებს ნორმალური გამოყენების პირობებში.</p><h2>მომსახურება</h2><p>ბრენდული ავეჯისთვის — ავტორიზებული სერვის-ცენტრები.</p>',
     '<h2>2-летняя гарантия</h2><p>На всю продукцию распространяется 2-летняя гарантия от заводских дефектов.</p><h2>Условия гарантии</h2><p>Гарантия действует при нормальной эксплуатации.</p><h2>Обслуживание</h2><p>Для брендовой мебели — авторизованные сервисные центры.</p>',
     '<h2>2-Year Warranty</h2><p>All products carry a 2-year warranty against factory defects.</p><h2>Warranty Terms</h2><p>Valid under normal use.</p><h2>Service</h2><p>For branded furniture — authorized service centers.</p>'),
    ('returns', 5,
     'დაბრუნება', 'Возврат', 'Returns',
     '<h2>14 დღიანი დაბრუნება</h2><p>მიღებიდან 14 დღის განმავლობაში შეგიძლიათ დააბრუნოთ პროდუქცია.</p><h2>პირობები</h2><p>პროდუქცია უნდა იყოს ორიგინალ შეფუთვაში, გამოუყენებელი.</p><h2>პროცესი</h2><p>დაგვიკავშირდით info@hmspace.ge და შევთავაზებთ დაბრუნების ინსტრუქციას.</p>',
     '<h2>Возврат в течение 14 дней</h2><p>Вы можете вернуть товар в течение 14 дней с момента получения.</p><h2>Условия</h2><p>Товар должен быть в оригинальной упаковке, неиспользованный.</p><h2>Процесс</h2><p>Свяжитесь с нами info@hmspace.ge, и мы предоставим инструкцию по возврату.</p>',
     '<h2>14-Day Returns</h2><p>You may return items within 14 days of receipt.</p><h2>Conditions</h2><p>Items must be in original packaging, unused.</p><h2>Process</h2><p>Contact info@hmspace.ge and we will provide return instructions.</p>');

-- ----------------------------------------------------------------------------
-- 5. Extend categories with home-grid visibility, sort, image
-- ----------------------------------------------------------------------------
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS home_visible BOOLEAN DEFAULT false;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS home_sort_order INTEGER DEFAULT 0;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS home_image_url TEXT;
CREATE INDEX IF NOT EXISTS idx_categories_home_visible ON public.categories(home_visible) WHERE home_visible = true;

-- Seed home visibility for existing top-level categories (matches prior hardcoded grid)
UPDATE public.categories SET home_visible = true, home_sort_order = 1,
    home_image_url = COALESCE(home_image_url, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80')
    WHERE slug = 'doors';
UPDATE public.categories SET home_visible = true, home_sort_order = 2,
    home_image_url = COALESCE(home_image_url, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80')
    WHERE slug = 'furniture';
UPDATE public.categories SET home_visible = true, home_sort_order = 3,
    home_image_url = COALESCE(home_image_url, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80')
    WHERE slug = 'accessories';
UPDATE public.categories SET home_visible = true, home_sort_order = 4,
    home_image_url = COALESCE(home_image_url, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80')
    WHERE slug = 'wall-panels';

-- ----------------------------------------------------------------------------
-- 6. Seed home hero banners (section='main_hero') — matches prior HERO_SLIDES
-- ----------------------------------------------------------------------------
INSERT INTO public.banners (title_ka, title_en, subtitle_ka, subtitle_en, button_text_ka, button_text_en, image_url, link_url, section, sort_order, is_active) VALUES
    ('პრემიუმ კარები',           'Premium Doors',         'იტალიური ხარისხი თქვენს სახლში',       'Italian Quality for Your Home', 'კატალოგის ნახვა', 'View Catalog', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80', '/union/catalog/doors',       'main_hero', 1, true),
    ('თანამედროვე ავეჯი',        'Modern Furniture',      'დიზაინი და ფუნქციონალობა',             'Design and Functionality',       'აღმოაჩინე',       'Discover',     'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80', '/union/catalog/furniture',   'main_hero', 2, true),
    ('სეზონური ფასდაკლება',      'Seasonal Sale',         '50%-მდე ფასდაკლება',                   'Up to 50% Off',                  'შეთავაზებები',   'View Offers',  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80', '/union/sale',                 'main_hero', 3, true);
