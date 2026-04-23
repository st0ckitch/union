-- =============================================================================
-- ALL MIGRATIONS — concatenated in order. Paste into Supabase SQL Editor once.
-- Generated from supabase/migrations/*.sql
-- =============================================================================


-- ============================================================
-- FILE: 20260120154345_4b6538f7-953a-4e51-893d-24e150154d10.sql
-- ============================================================
-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create enum for order status
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');

-- Create enum for consultation status
CREATE TYPE public.consultation_status AS ENUM ('new', 'contacted', 'completed', 'cancelled');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT,
    slug TEXT NOT NULL UNIQUE,
    description_ka TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT,
    slug TEXT NOT NULL UNIQUE,
    description_ka TEXT,
    description_en TEXT,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    images TEXT[] DEFAULT '{}',
    is_new BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    specifications JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status order_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create consultations table
CREATE TABLE public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    status consultation_status DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create banners table (for hero slider)
CREATE TABLE public.banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ka TEXT NOT NULL,
    title_en TEXT,
    subtitle_ka TEXT,
    subtitle_en TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    button_text_ka TEXT,
    button_text_en TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ka TEXT NOT NULL,
    title_en TEXT,
    slug TEXT NOT NULL UNIQUE,
    content_ka TEXT NOT NULL,
    content_en TEXT,
    excerpt_ka TEXT,
    excerpt_en TEXT,
    featured_image TEXT,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    author_title TEXT,
    content_ka TEXT NOT NULL,
    content_en TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create showrooms table
CREATE TABLE public.showrooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT,
    address_ka TEXT NOT NULL,
    address_en TEXT,
    phone TEXT,
    email TEXT,
    working_hours_ka TEXT,
    working_hours_en TEXT,
    map_embed_url TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showrooms ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON public.consultations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON public.banners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User roles policies (only admins can manage roles)
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Categories policies (public read, admin write)
CREATE POLICY "Anyone can view active categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all categories" ON public.categories FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all products" ON public.products FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Orders policies
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage orders" ON public.orders FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Order items policies
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all order items" ON public.order_items FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage order items" ON public.order_items FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Consultations policies
CREATE POLICY "Anyone can submit consultation" ON public.consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view consultations" ON public.consultations FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage consultations" ON public.consultations FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Banners policies (public read, admin write)
CREATE POLICY "Anyone can view active banners" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage banners" ON public.banners FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Blog posts policies (public read published, admin write)
CREATE POLICY "Anyone can view published posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can view all posts" ON public.blog_posts FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage posts" ON public.blog_posts FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials policies (public read, admin write)
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Showrooms policies (public read, admin write)
CREATE POLICY "Anyone can view active showrooms" ON public.showrooms FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage showrooms" ON public.showrooms FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_products_featured ON public.products(is_featured);
CREATE INDEX idx_products_new ON public.products(is_new);
CREATE INDEX idx_categories_parent ON public.categories(parent_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- FILE: 20260120154407_09a0b1d8-799c-4b26-8d49-a6b0256fd4ef.sql
-- ============================================================
-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;
DROP POLICY IF EXISTS "Anyone can submit consultation" ON public.consultations;

-- Create more secure policies that still allow anonymous access but with rate limiting potential
-- Orders: Allow inserts but require all mandatory fields
CREATE POLICY "Anyone can create orders with valid data" ON public.orders 
FOR INSERT WITH CHECK (
    customer_name IS NOT NULL AND 
    customer_email IS NOT NULL AND 
    customer_phone IS NOT NULL AND 
    shipping_address IS NOT NULL AND
    total_amount > 0
);

-- Order items: Only allow insert if the order exists and was just created (within last 5 minutes)
CREATE POLICY "Anyone can create order items for recent orders" ON public.order_items 
FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND orders.created_at > now() - interval '5 minutes'
    )
);

-- Consultations: Allow insert with valid data
CREATE POLICY "Anyone can submit consultation with valid data" ON public.consultations 
FOR INSERT WITH CHECK (
    name IS NOT NULL AND 
    phone IS NOT NULL
);

-- ============================================================
-- FILE: 20260411120000_settings_and_import.sql
-- ============================================================
-- Site settings singleton table
CREATE TABLE public.site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    logo_url TEXT,
    phone TEXT,
    email TEXT,
    address_ka TEXT,
    address_en TEXT,
    hours_ka TEXT,
    hours_en TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    pinterest_url TEXT,
    tiktok_url TEXT,
    whatsapp_number TEXT,
    google_map_embed TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default row
INSERT INTO public.site_settings (id, phone, email, address_ka, address_en, hours_ka, hours_en)
VALUES (
    1,
    '+995 32 2 00 00 00',
    'info@hmspace.ge',
    'თბილისი, საქართველო',
    'Tbilisi, Georgia',
    'ორშაბათი - შაბათი 10:00 - 19:00',
    'Monday - Saturday 10:00 - 19:00'
)
ON CONFLICT (id) DO NOTHING;

-- Extend banners with section column
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS section TEXT DEFAULT 'union_hero';
CREATE INDEX IF NOT EXISTS idx_banners_section ON public.banners(section);

-- Extend products with source_url and english specs
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specifications_en JSONB DEFAULT '{}';


-- ============================================================
-- FILE: 20260411130000_seed_union_products.sql
-- ============================================================
-- Seed: UNION categories and 108 curated English products
-- Auto-generated from scripts/data/*.json

INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('swing-doors', 'Interior Doors', 'Interior Doors', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;
INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('sliding-doors', 'Sliding Doors', 'Sliding Doors', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;
INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('entrance-doors', 'Entrance Doors', 'Entrance Doors', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;
INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('sliding-partitions', 'Partitions', 'Partitions', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;
INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('wardrobes', 'Wardrobes & Cabinets', 'Wardrobes & Cabinets', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;
INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('furniture', 'Furniture', 'Furniture', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;
INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('handles', 'Handles & Hardware', 'Handles & Hardware', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;
INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('vitrines', 'Vitrines & Commodes', 'Vitrines & Commodes', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;
INSERT INTO public.categories (slug, name_ka, name_en, is_active) VALUES ('hidden-doors', 'Hidden Doors (Invisible)', 'Hidden Doors (Invisible)', true) ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en;

INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'FILO-60', 'FILO-60', 'swing-doors-filo-60', 'FILO-60 — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 462, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/swing-doors/filo-60/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'UNIFLEX-3D', 'UNIFLEX-3D', 'swing-doors-uniflex-3d', 'UNIFLEX-3D — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 488, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/swing-doors/uniflex-3d/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STRATUS', 'STRATUS', 'swing-doors-stratus', 'STRATUS — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 494, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/swing-doors/stratus/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'ALTO', 'ALTO', 'swing-doors-alto', 'ALTO — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 605, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/swing-doors/alto/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'LINEA', 'LINEA', 'swing-doors-linea', 'LINEA — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 680, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/swing-doors/linea/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'CUBIC', 'CUBIC', 'swing-doors-cubic', 'CUBIC — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 609, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/swing-doors/cubic/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'VETRO', 'VETRO', 'swing-doors-vetro', 'VETRO — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 785, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/swing-doors/vetro/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'SOLID', 'SOLID', 'swing-doors-solid', 'SOLID — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 790, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/swing-doors/solid/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'MIRA', 'MIRA', 'swing-doors-mira', 'MIRA — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 784, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/swing-doors/mira/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'ARIA', 'ARIA', 'swing-doors-aria', 'ARIA — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 866, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/swing-doors/aria/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'ESTE', 'ESTE', 'swing-doors-este', 'ESTE — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 993, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/swing-doors/este/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'OPEN', 'OPEN', 'swing-doors-open', 'OPEN — premium swing doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 930, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/swing-doors/open/' FROM public.categories c WHERE c.slug = 'swing-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-01', 'Slide-01', 'sliding-doors-slide-01', 'Slide-01 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 471, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/sliding-doors/slide-01/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-02', 'Slide-02', 'sliding-doors-slide-02', 'Slide-02 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 549, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/sliding-doors/slide-02/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-03', 'Slide-03', 'sliding-doors-slide-03', 'Slide-03 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 585, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/sliding-doors/slide-03/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-04', 'Slide-04', 'sliding-doors-slide-04', 'Slide-04 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 585, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/sliding-doors/slide-04/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-05', 'Slide-05', 'sliding-doors-slide-05', 'Slide-05 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 628, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/sliding-doors/slide-05/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-06', 'Slide-06', 'sliding-doors-slide-06', 'Slide-06 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 585, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/sliding-doors/slide-06/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-07', 'Slide-07', 'sliding-doors-slide-07', 'Slide-07 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 651, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/sliding-doors/slide-07/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-08', 'Slide-08', 'sliding-doors-slide-08', 'Slide-08 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 813, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/sliding-doors/slide-08/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-09', 'Slide-09', 'sliding-doors-slide-09', 'Slide-09 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 704, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/sliding-doors/slide-09/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-10', 'Slide-10', 'sliding-doors-slide-10', 'Slide-10 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 799, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/sliding-doors/slide-10/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-11', 'Slide-11', 'sliding-doors-slide-11', 'Slide-11 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 841, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/sliding-doors/slide-11/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Slide-12', 'Slide-12', 'sliding-doors-slide-12', 'Slide-12 — premium sliding doors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 1009, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/sliding-doors/slide-12/' FROM public.categories c WHERE c.slug = 'sliding-doors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-1', 'PARTI-1', 'sliding-partitions-parti-1', 'PARTI-1 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 486, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/sliding-partitions/parti-1/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-2', 'PARTI-2', 'sliding-partitions-parti-2', 'PARTI-2 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 438, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/sliding-partitions/parti-2/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-3', 'PARTI-3', 'sliding-partitions-parti-3', 'PARTI-3 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 472, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/sliding-partitions/parti-3/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-4', 'PARTI-4', 'sliding-partitions-parti-4', 'PARTI-4 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 557, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/sliding-partitions/parti-4/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-5', 'PARTI-5', 'sliding-partitions-parti-5', 'PARTI-5 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 694, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/sliding-partitions/parti-5/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-6', 'PARTI-6', 'sliding-partitions-parti-6', 'PARTI-6 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 708, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/sliding-partitions/parti-6/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-7', 'PARTI-7', 'sliding-partitions-parti-7', 'PARTI-7 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 630, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/sliding-partitions/parti-7/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-8', 'PARTI-8', 'sliding-partitions-parti-8', 'PARTI-8 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 653, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/sliding-partitions/parti-8/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-9', 'PARTI-9', 'sliding-partitions-parti-9', 'PARTI-9 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 780, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/sliding-partitions/parti-9/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-10', 'PARTI-10', 'sliding-partitions-parti-10', 'PARTI-10 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 760, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/sliding-partitions/parti-10/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-11', 'PARTI-11', 'sliding-partitions-parti-11', 'PARTI-11 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 986, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/sliding-partitions/parti-11/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'PARTI-12', 'PARTI-12', 'sliding-partitions-parti-12', 'PARTI-12 — premium sliding partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 1028, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/sliding-partitions/parti-12/' FROM public.categories c WHERE c.slug = 'sliding-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-A', 'STAT-A', 'stationary-partitions-stat-a', 'STAT-A — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 302, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/stationary-partitions/stat-a/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-B', 'STAT-B', 'stationary-partitions-stat-b', 'STAT-B — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 516, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/stationary-partitions/stat-b/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-C', 'STAT-C', 'stationary-partitions-stat-c', 'STAT-C — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 402, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/stationary-partitions/stat-c/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-D', 'STAT-D', 'stationary-partitions-stat-d', 'STAT-D — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 457, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/stationary-partitions/stat-d/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-E', 'STAT-E', 'stationary-partitions-stat-e', 'STAT-E — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 639, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/stationary-partitions/stat-e/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-F', 'STAT-F', 'stationary-partitions-stat-f', 'STAT-F — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 604, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/stationary-partitions/stat-f/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-G', 'STAT-G', 'stationary-partitions-stat-g', 'STAT-G — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 682, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/stationary-partitions/stat-g/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-H', 'STAT-H', 'stationary-partitions-stat-h', 'STAT-H — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 711, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/stationary-partitions/stat-h/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-I', 'STAT-I', 'stationary-partitions-stat-i', 'STAT-I — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 886, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/stationary-partitions/stat-i/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-J', 'STAT-J', 'stationary-partitions-stat-j', 'STAT-J — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 918, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/stationary-partitions/stat-j/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-K', 'STAT-K', 'stationary-partitions-stat-k', 'STAT-K — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 829, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/stationary-partitions/stat-k/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'STAT-L', 'STAT-L', 'stationary-partitions-stat-l', 'STAT-L — premium stationary partitions from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 977, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/stationary-partitions/stat-l/' FROM public.categories c WHERE c.slug = 'stationary-partitions' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Oak', 'Panel-Oak', 'wall-panels-panel-oak', 'Panel-Oak — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 426, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/wall-panels/panel-oak/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Walnut', 'Panel-Walnut', 'wall-panels-panel-walnut', 'Panel-Walnut — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 427, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/wall-panels/panel-walnut/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Ash', 'Panel-Ash', 'wall-panels-panel-ash', 'Panel-Ash — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 410, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/wall-panels/panel-ash/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Teak', 'Panel-Teak', 'wall-panels-panel-teak', 'Panel-Teak — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 603, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/wall-panels/panel-teak/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Maple', 'Panel-Maple', 'wall-panels-panel-maple', 'Panel-Maple — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 542, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/wall-panels/panel-maple/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Ebony', 'Panel-Ebony', 'wall-panels-panel-ebony', 'Panel-Ebony — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 591, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/wall-panels/panel-ebony/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Cherry', 'Panel-Cherry', 'wall-panels-panel-cherry', 'Panel-Cherry — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 668, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/wall-panels/panel-cherry/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Birch', 'Panel-Birch', 'wall-panels-panel-birch', 'Panel-Birch — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 779, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/wall-panels/panel-birch/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Pine', 'Panel-Pine', 'wall-panels-panel-pine', 'Panel-Pine — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 812, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/wall-panels/panel-pine/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Mahogany', 'Panel-Mahogany', 'wall-panels-panel-mahogany', 'Panel-Mahogany — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 900, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/wall-panels/panel-mahogany/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Beech', 'Panel-Beech', 'wall-panels-panel-beech', 'Panel-Beech — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 843, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/wall-panels/panel-beech/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Panel-Zebrano', 'Panel-Zebrano', 'wall-panels-panel-zebrano', 'Panel-Zebrano — premium wall panels from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 946, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/wall-panels/panel-zebrano/' FROM public.categories c WHERE c.slug = 'wall-panels' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-One', 'Ward-One', 'wardrobes-ward-one', 'Ward-One — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 454, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/wardrobes/ward-one/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Two', 'Ward-Two', 'wardrobes-ward-two', 'Ward-Two — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 521, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/wardrobes/ward-two/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Three', 'Ward-Three', 'wardrobes-ward-three', 'Ward-Three — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 453, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/wardrobes/ward-three/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Four', 'Ward-Four', 'wardrobes-ward-four', 'Ward-Four — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 616, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/wardrobes/ward-four/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Five', 'Ward-Five', 'wardrobes-ward-five', 'Ward-Five — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 588, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/wardrobes/ward-five/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Six', 'Ward-Six', 'wardrobes-ward-six', 'Ward-Six — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 706, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/wardrobes/ward-six/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Seven', 'Ward-Seven', 'wardrobes-ward-seven', 'Ward-Seven — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 707, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/wardrobes/ward-seven/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Eight', 'Ward-Eight', 'wardrobes-ward-eight', 'Ward-Eight — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 800, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/wardrobes/ward-eight/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Nine', 'Ward-Nine', 'wardrobes-ward-nine', 'Ward-Nine — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 879, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/wardrobes/ward-nine/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Ten', 'Ward-Ten', 'wardrobes-ward-ten', 'Ward-Ten — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 915, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/wardrobes/ward-ten/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Eleven', 'Ward-Eleven', 'wardrobes-ward-eleven', 'Ward-Eleven — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 876, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/wardrobes/ward-eleven/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Ward-Twelve', 'Ward-Twelve', 'wardrobes-ward-twelve', 'Ward-Twelve — premium wardrobes from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 1004, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/wardrobes/ward-twelve/' FROM public.categories c WHERE c.slug = 'wardrobes' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Lux', 'Table-Lux', 'tables-table-lux', 'Table-Lux — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 352, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/tables/table-lux/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Pro', 'Table-Pro', 'tables-table-pro', 'Table-Pro — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 358, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/tables/table-pro/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Mini', 'Table-Mini', 'tables-table-mini', 'Table-Mini — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 477, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/tables/table-mini/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Max', 'Table-Max', 'tables-table-max', 'Table-Max — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 494, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/tables/table-max/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Flex', 'Table-Flex', 'tables-table-flex', 'Table-Flex — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 632, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/tables/table-flex/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Oak', 'Table-Oak', 'tables-table-oak', 'Table-Oak — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 629, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/tables/table-oak/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Glass', 'Table-Glass', 'tables-table-glass', 'Table-Glass — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 615, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/tables/table-glass/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Round', 'Table-Round', 'tables-table-round', 'Table-Round — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 727, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/tables/table-round/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Square', 'Table-Square', 'tables-table-square', 'Table-Square — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 788, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/tables/table-square/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Rect', 'Table-Rect', 'tables-table-rect', 'Table-Rect — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 782, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/tables/table-rect/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Oval', 'Table-Oval', 'tables-table-oval', 'Table-Oval — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 815, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/tables/table-oval/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Table-Wide', 'Table-Wide', 'tables-table-wide', 'Table-Wide — premium tables from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 950, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/tables/table-wide/' FROM public.categories c WHERE c.slug = 'tables' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Arc', 'Mirror-Arc', 'mirrors-mirror-arc', 'Mirror-Arc — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 402, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/mirrors/mirror-arc/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Sun', 'Mirror-Sun', 'mirrors-mirror-sun', 'Mirror-Sun — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 441, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/mirrors/mirror-sun/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Moon', 'Mirror-Moon', 'mirrors-mirror-moon', 'Mirror-Moon — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 588, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/mirrors/mirror-moon/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Square', 'Mirror-Square', 'mirrors-mirror-square', 'Mirror-Square — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 584, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/mirrors/mirror-square/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Round', 'Mirror-Round', 'mirrors-mirror-round', 'Mirror-Round — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 634, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/mirrors/mirror-round/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Oval', 'Mirror-Oval', 'mirrors-mirror-oval', 'Mirror-Oval — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 564, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/mirrors/mirror-oval/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Rect', 'Mirror-Rect', 'mirrors-mirror-rect', 'Mirror-Rect — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 718, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/mirrors/mirror-rect/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-LED', 'Mirror-LED', 'mirrors-mirror-led', 'Mirror-LED — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 728, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/mirrors/mirror-led/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Frame', 'Mirror-Frame', 'mirrors-mirror-frame', 'Mirror-Frame — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 790, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/mirrors/mirror-frame/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Gold', 'Mirror-Gold', 'mirrors-mirror-gold', 'Mirror-Gold — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 836, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/mirrors/mirror-gold/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Silver', 'Mirror-Silver', 'mirrors-mirror-silver', 'Mirror-Silver — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 807, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/mirrors/mirror-silver/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Mirror-Matte', 'Mirror-Matte', 'mirrors-mirror-matte', 'Mirror-Matte — premium mirrors from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 977, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/mirrors/mirror-matte/' FROM public.categories c WHERE c.slug = 'mirrors' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Brass', 'Handle-Brass', 'handles-handle-brass', 'Handle-Brass — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 325, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, true, true, 10, 'https://en.union.ru/catalog/handles/handle-brass/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Chrome', 'Handle-Chrome', 'handles-handle-chrome', 'Handle-Chrome — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 476, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 11, 'https://en.union.ru/catalog/handles/handle-chrome/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Matte', 'Handle-Matte', 'handles-handle-matte', 'Handle-Matte — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 453, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, true, false, true, 12, 'https://en.union.ru/catalog/handles/handle-matte/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Gold', 'Handle-Gold', 'handles-handle-gold', 'Handle-Gold — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 488, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 13, 'https://en.union.ru/catalog/handles/handle-gold/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Silver', 'Handle-Silver', 'handles-handle-silver', 'Handle-Silver — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 509, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 14, 'https://en.union.ru/catalog/handles/handle-silver/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Black', 'Handle-Black', 'handles-handle-black', 'Handle-Black — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 585, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 15, 'https://en.union.ru/catalog/handles/handle-black/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Copper', 'Handle-Copper', 'handles-handle-copper', 'Handle-Copper — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 793, c.id, ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 16, 'https://en.union.ru/catalog/handles/handle-copper/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Nickel', 'Handle-Nickel', 'handles-handle-nickel', 'Handle-Nickel — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 697, c.id, ARRAY['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 17, 'https://en.union.ru/catalog/handles/handle-nickel/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Steel', 'Handle-Steel', 'handles-handle-steel', 'Handle-Steel — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 811, c.id, ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 18, 'https://en.union.ru/catalog/handles/handle-steel/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Bronze', 'Handle-Bronze', 'handles-handle-bronze', 'Handle-Bronze — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 767, c.id, ARRAY['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 19, 'https://en.union.ru/catalog/handles/handle-bronze/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Classic', 'Handle-Classic', 'handles-handle-classic', 'Handle-Classic — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 977, c.id, ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 20, 'https://en.union.ru/catalog/handles/handle-classic/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;
INSERT INTO public.products (name_ka, name_en, slug, description_en, price, category_id, images, specifications, is_new, is_featured, is_active, stock_quantity, source_url) SELECT 'Handle-Modern', 'Handle-Modern', 'handles-handle-modern', 'Handle-Modern — premium handles from the UNION collection. Italian craftsmanship, curated finishes, custom sizing available.', 976, c.id, ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80'], '{"material": "Solid wood", "finish": "Matte", "made_in": "Italy"}'::jsonb, false, false, true, 21, 'https://en.union.ru/catalog/handles/handle-modern/' FROM public.categories c WHERE c.slug = 'handles' ON CONFLICT (slug) DO UPDATE SET name_en=EXCLUDED.name_en, price=EXCLUDED.price, images=EXCLUDED.images;


-- ============================================================
-- FILE: 20260411140000_seed_blog_posts.sql
-- ============================================================
-- Seed: 3 dummy blog posts (safe to re-run; uses slug as conflict target)

INSERT INTO public.blog_posts (title_ka, title_en, slug, excerpt_ka, excerpt_en, content_ka, content_en, featured_image, is_published, published_at)
VALUES
(
    'როგორ ავირჩიოთ სწორი ზომის კარი',
    'How to pick the right door size',
    'how-to-pick-door-size',
    'პრაქტიკული სახელმძღვანელო სტანდარტული და ინდივიდუალური ზომის კარების არჩევისთვის.',
    'A practical guide to picking standard vs custom door sizes for your project.',
    '# How to pick the right door size\n\nChoosing the right door size is one of the first decisions in any renovation project. This short guide walks through the two main paths — standard sizing and fully custom — and when each makes sense.\n\n## Standard sizes\n\nStandard sizes are faster to install, cheaper, and widely available. If your opening fits a standard height and width, start there.\n\n## Custom sizes\n\nFor non-standard openings, oversized apartments, or architecturally unique spaces, custom sizing is the right call. Expect a longer lead time but a tailored fit.',
    '# როგორ ავირჩიოთ სწორი ზომის კარი\n\nსწორი ზომის კარის არჩევა ერთ-ერთი პირველი გადაწყვეტილებაა ნებისმიერ რენოვაციაში. ეს მოკლე სახელმძღვანელო გაჩვენებთ, როდის უნდა აირჩიოთ სტანდარტული და როდის ინდივიდუალური ზომა.',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    true,
    now() - interval '7 days'
),
(
    'ფარული კარების უპირატესობები',
    'The benefits of hidden doors',
    'benefits-of-hidden-doors',
    'რატომ ირჩევენ დიზაინერები ფარული კარების სისტემას თანამედროვე ინტერიერში.',
    'Why designers keep choosing hidden door systems for modern interiors.',
    '# The benefits of hidden doors\n\nHidden doors blend into the wall, creating a clean, minimal look. This article covers the main scenarios where they shine — from minimal lofts to long hallways — and the installation details that make the difference.',
    '# ფარული კარების უპირატესობები\n\nფარული კარები ერწყმის კედელს და ქმნის სუფთა, მინიმალისტურ იერს.',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
    true,
    now() - interval '3 days'
),
(
    '5 შეცდომა გარდერობის დაგეგმვისას',
    '5 mistakes when planning a wardrobe',
    'wardrobe-planning-mistakes',
    'ხშირი შეცდომები, რომლებიც ხელს უშლის კომფორტული გარდერობის შექმნას.',
    'Common pitfalls that prevent you from creating a truly comfortable wardrobe.',
    '# 5 mistakes when planning a wardrobe\n\nPlanning a wardrobe looks easy until you start living with it. This post goes through the five most common mistakes we see — under-estimating hanging space, ignoring ventilation, skipping internal lighting, mismatching door mechanisms, and forgetting about accessibility — and how to avoid them.',
    '# 5 შეცდომა გარდერობის დაგეგმვისას\n\nგარდერობის დაგეგმვა მარტივი ჩანს, სანამ არ დაიწყებთ მასში ცხოვრებას. ეს სტატია მიმოიხილავს ხუთ ყველაზე გავრცელებულ შეცდომას და თავიდან აცილების გზებს.',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85',
    true,
    now()
)
ON CONFLICT (slug) DO UPDATE SET
    title_en = EXCLUDED.title_en,
    excerpt_en = EXCLUDED.excerpt_en,
    featured_image = EXCLUDED.featured_image,
    is_published = EXCLUDED.is_published,
    published_at = EXCLUDED.published_at;


-- ============================================================
-- FILE: 20260411150000_bootstrap_admin.sql
-- ============================================================
-- Bootstrap: create an admin user you can log in with immediately.
-- Safe to re-run: both inserts use ON CONFLICT guards.
--
-- Credentials created:
--   email:    admin@hmspace.ge
--   password: HMspace2026!
--
-- After applying, change the password from the Supabase dashboard
-- (Authentication → Users) or through the app's password-reset flow.

-- Supabase auth.users uses bcrypt hashes in encrypted_password.
-- pgcrypto is already available in every Supabase project.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_user_id uuid;
  v_email   text := 'admin@hmspace.ge';
  v_password text := 'HMspace2026!';
BEGIN
  -- 1. If the user already exists, reuse its id; otherwise create it.
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_email;

  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      v_email,
      crypt(v_password, gen_salt('bf')),
      now(),
      NULL,
      NULL,
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      '{}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    -- Mirror into auth.identities so Supabase treats this as a
    -- fully-initialised email/password identity.
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', v_email),
      'email',
      v_user_id::text,
      now(),
      now(),
      now()
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- 2. Grant the admin role.
  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;


-- ============================================================
-- FILE: 20260414100000_menu_items.sql
-- ============================================================
-- Menu items table for dynamic mega menu management
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
    section TEXT NOT NULL DEFAULT 'mega_menu',  -- 'mega_menu' or 'sidebar'
    column_number INT,                          -- 1, 2, 3 for mega menu top-level groups
    name_ka TEXT NOT NULL,
    name_ru TEXT NOT NULL DEFAULT '',
    name_en TEXT NOT NULL DEFAULT '',
    href TEXT NOT NULL DEFAULT '#',
    icon TEXT,                                  -- lucide icon name e.g. 'DoorOpen'
    is_new BOOLEAN DEFAULT false,
    is_sale BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active menu items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage menu items" ON public.menu_items FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Allow public inserts/updates/deletes while PUBLIC_ADMIN mode is on
CREATE POLICY "Public menu write" ON public.menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public menu update" ON public.menu_items FOR UPDATE USING (true);
CREATE POLICY "Public menu delete" ON public.menu_items FOR DELETE USING (true);

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- Seed the current hardcoded mega-menu into the table
-- ============================================================

-- === COLUMN 1 ===

-- Swing Doors (group)
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000001', 'mega_menu', 1, 'გაშლადი კარები', 'Распашные двери', 'Swing Doors', '/union/catalog/swing-doors', 'DoorOpen', 10);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'შეფერვის ფარული', 'Скрытые под покраску', 'Hidden under painting', '/union/catalog/swing-doors?type=hidden-paint', 1),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ემალი', 'Эмаль', 'Enamel', '/union/catalog/swing-doors?type=enamel', 2),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'გლანცი', 'Глянец', 'Gloss', '/union/catalog/swing-doors?type=gloss', 3),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ნატურალური შპონი', 'Натуральный шпон', 'Natural veneer', '/union/catalog/swing-doors?type=veneer', 4),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ქვა და მარმარილო', 'Под камень и мрамор', 'Stone & marble', '/union/catalog/swing-doors?type=stone', 5),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ხელმისაწვდომი ხარისხი', 'Доступное качество', 'Affordable quality', '/union/catalog/swing-doors?type=affordable', 6),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ალუმინი და მინა', 'Алюминий и стекло', 'Aluminum & glass', '/union/catalog/swing-doors?type=aluminum', 7),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', '3D ზედაპირი', '3D поверхность', '3D surface', '/union/catalog/swing-doors?type=3d', 8),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'დიზაინერული', 'Дизайнерские', 'Designer', '/union/catalog/swing-doors?type=designer', 9),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'კლასიკური ემალი', 'Классические в эмали', 'Classic enamel', '/union/catalog/swing-doors?type=classic-enamel', 10),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'საპოვარელი', 'Поворотные', 'Pivot', '/union/catalog/swing-doors?type=pivot', 11);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'დასაკეცი', 'Складные', 'Folding', '/union/catalog/swing-doors?type=folding', true, 12),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ჩრდილოვანი ნაპრალით', 'С теневым зазором', 'Shadow-gap', '/union/catalog/swing-doors?type=shadow-gap', true, 13),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ხმაიზოლაციური', 'Звукоизоляционные', 'Soundproof', '/union/catalog/swing-doors?type=soundproof', true, 14);

-- Sliding Doors (group)
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000002', 'mega_menu', 1, 'სრიალა კარები', 'Раздвижные двери', 'Sliding Doors', '/union/catalog/sliding-doors', 'DoorClosed', 20);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000002', 'mega_menu', 'კედელში (პენალი)', 'В пенал (в стену)', 'Pocket (into wall)', '/union/catalog/sliding-doors?type=pocket', 1),
('a0000001-0000-0000-0000-000000000002', 'mega_menu', 'ფარული მექანიზმი', 'Скрытый механизм', 'Hidden mechanism', '/union/catalog/sliding-doors?type=hidden', 2);

-- Sliding Partitions (group)
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000003', 'mega_menu', 1, 'სრიალა ტიხრები', 'Раздвижные перегородки', 'Sliding Partitions', '/union/catalog/sliding-partitions', 'PanelTop', 30);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000003', 'mega_menu', 'ხის', 'Деревянные', 'Wooden', '/union/catalog/sliding-partitions?type=wood', 1);

-- === COLUMN 2 ===

-- Stationary Partitions
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000004', 'mega_menu', 2, 'სტაციონარული ტიხრები', 'Стационарные перегородки', 'Stationary Partitions', '/union/catalog/stationary-partitions', 'LayoutPanelTop', 10);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-000000000004', 'mega_menu', 'ალუმინი — ერთი მინა', 'Алюминий — одно стекло', 'Aluminum — single glass', '/union/catalog/stationary-partitions?type=alu-1', true, 1),
('a0000001-0000-0000-0000-000000000004', 'mega_menu', 'ალუმინი — ორი მინა', 'Алюминий — два стекла', 'Aluminum — double glass', '/union/catalog/stationary-partitions?type=alu-2', true, 2);

-- Wall Panels
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000005', 'mega_menu', 2, 'კედლის პანელები', 'Стеновые панели', 'Wall Panels', '/union/catalog/wall-panels', 'SquareStack', 20);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000005', 'mega_menu', 'თანამედროვე', 'Современные', 'Modern', '/union/catalog/wall-panels?type=modern', 1),
('a0000001-0000-0000-0000-000000000005', 'mega_menu', '3D ზედაპირი', '3D поверхность', '3D surface', '/union/catalog/wall-panels?type=3d', 2),
('a0000001-0000-0000-0000-000000000005', 'mega_menu', 'კლასიკა', 'Классика', 'Classic', '/union/catalog/wall-panels?type=classic', 3);

-- Furniture
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000006', 'mega_menu', 2, 'ავეჯი', 'Мебель', 'Furniture', '/union/catalog/furniture', 'Sofa', 30);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'შესასვლელი', 'Прихожие', 'Hallways', '/union/catalog/furniture?type=hallway', 1),
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'სასტუმრო', 'Гостиные', 'Living rooms', '/union/catalog/furniture?type=living', 2),
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'სასადილო', 'Столовые', 'Dining rooms', '/union/catalog/furniture?type=dining', 3),
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'საძინებელი', 'Спальни', 'Bedrooms', '/union/catalog/furniture?type=bedroom', 4),
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'კაბინეტი', 'Кабинеты', 'Studies', '/union/catalog/furniture?type=study', 5);

-- Wardrobes, Cabinets
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000007', 'mega_menu', 2, 'გარდერობი, შკაფი', 'Гардеробные, шкафы', 'Wardrobes, Cabinets', '/union/catalog/wardrobes', 'Shirt', 40);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-000000000007', 'mega_menu', 'გარდერობი', 'Гардеробные', 'Wardrobes', '/union/catalog/wardrobes?type=wardrobe', true, 1),
('a0000001-0000-0000-0000-000000000007', 'mega_menu', 'შკაფი', 'Шкафы', 'Cabinets', '/union/catalog/wardrobes?type=cabinet', true, 2);

-- Vitrines, Commodes
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000008', 'mega_menu', 2, 'ვიტრინები, კომოდები', 'Витрины, комоды', 'Vitrines, Commodes', '/union/catalog/vitrines', 'Archive', 50);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-000000000008', 'mega_menu', 'კომოდები', 'Комоды', 'Commodes', '/union/catalog/vitrines?type=commode', true, 1),
('a0000001-0000-0000-0000-000000000008', 'mega_menu', 'კომოდები — ალუმინი + მინა', 'Комоды — алюминий + стекло', 'Commodes — alu + glass', '/union/catalog/vitrines?type=commode-alu', true, 2);

-- === COLUMN 3 ===

-- Libraries, Shelving
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000009', 'mega_menu', 3, 'ბიბლიოთეკა, სტელაჟები', 'Библиотеки, стеллажи', 'Libraries, Shelving', '/union/catalog/libraries', 'BookOpen', 10);

-- Shelves
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, is_new, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000a', 'mega_menu', 3, 'თაროები', 'Полки', 'Shelves', '/union/catalog/shelves', 'Layers', true, 20);

-- Tables
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000b', 'mega_menu', 3, 'მაგიდები', 'Столы', 'Tables', '/union/catalog/tables', 'Table2', 30);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-00000000000b', 'mega_menu', 'სადილი, სამზარეულოს', 'Обеденные, кухонные', 'Dining, kitchen', '/union/catalog/tables?type=dining', true, 1),
('a0000001-0000-0000-0000-00000000000b', 'mega_menu', 'ჟურნალის', 'Журнальные', 'Coffee', '/union/catalog/tables?type=coffee', false, 2);

-- Sofas
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000c', 'mega_menu', 3, 'დივნები', 'Диваны', 'Sofas', '/union/catalog/sofas', 'Armchair', 40);

-- Mirrors
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000d', 'mega_menu', 3, 'სარკეები', 'Зеркала', 'Mirrors', '/union/catalog/mirrors', 'SquareStack', 50);

-- Entrance Doors
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000e', 'mega_menu', 3, 'შესასვლელი კარები', 'Входные двери', 'Entrance Doors', '/union/catalog/entrance-doors', 'Home', 60);

-- Baseboards
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000f', 'mega_menu', 3, 'პლინტუსი', 'Плинтусы', 'Baseboards', '/union/catalog/skirting', 'Minus', 70);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-00000000000f', 'mega_menu', 'ჩრდილოვანი', 'Теневой', 'Shadow', '/union/catalog/skirting?type=shadow', true, 1),
('a0000001-0000-0000-0000-00000000000f', 'mega_menu', 'ფარული', 'Скрытый', 'Hidden', '/union/catalog/skirting?type=hidden', false, 2),
('a0000001-0000-0000-0000-00000000000f', 'mega_menu', 'ტრადიციული', 'Традиционный', 'Traditional', '/union/catalog/skirting?type=traditional', false, 3);

-- Handles, Hardware
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000010', 'mega_menu', 3, 'სახელურები, ფურნიტურა', 'Ручки, Фурнитура', 'Handles, Hardware', '/union/catalog/handles', 'KeyRound', 80);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000010', 'mega_menu', 'სახელურები კარებისთვის', 'Ручки для дверей', 'Door handles', '/union/catalog/handles?type=door', 1),
('a0000001-0000-0000-0000-000000000010', 'mega_menu', 'შემზღუდველები', 'Ограничители', 'Stoppers', '/union/catalog/handles?type=stopper', 2),
('a0000001-0000-0000-0000-000000000010', 'mega_menu', 'პენალები', 'Пеналы', 'Cassettes', '/union/catalog/handles?type=cassette', 3);

-- === SIDEBAR ===

INSERT INTO public.menu_items (section, name_ka, name_ru, name_en, href, icon, sort_order) VALUES
('sidebar', 'მარაგშია', 'В наличии', 'In Stock', '/union/catalog?filter=in-stock', 'Package', 10),
('sidebar', 'იტალიიდან შეკვეთით', 'На заказ из Италии', 'From Italy', '/union/catalog?filter=order', 'Plane', 20),
('sidebar', 'აქციები', 'Акции', 'Promotions', '/union/sale', 'Percent', 30);

INSERT INTO public.menu_items (section, name_ka, name_ru, name_en, href, is_sale, sort_order) VALUES
('sidebar', 'SALE', 'SALE', 'SALE', '/union/sale', true, 40);

INSERT INTO public.menu_items (section, name_ka, name_ru, name_en, href, icon, sort_order) VALUES
('sidebar', 'დეველოპერებს. კონტრაქტი', 'Для застройщиков. Контракт', 'For developers. Contract', '/union/partnership', 'Building2', 50);


-- ============================================================
-- FILE: 20260421120000_cms_expansions.sql
-- ============================================================
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


-- ============================================================
-- FILE: 20260421130000_door_configurator.sql
-- ============================================================
-- ============================================================================
-- Door configurator: otdelka (finishes), korobka (frames), modeli (style variants)
-- Modelled after union.ru FILO-60 / skrytye dveri pages
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Global pool: otdelka groups (VENEER, LACCATO, HPL, ALUMINIUM, etc.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_otdelka_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,                              -- e.g. 'veneer', 'laccato', 'hpl'
    name_ka TEXT NOT NULL,
    name_ru TEXT,
    name_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.door_otdelka_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active otdelka groups" ON public.door_otdelka_groups FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all otdelka groups" ON public.door_otdelka_groups FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage otdelka groups" ON public.door_otdelka_groups FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_otdelka_groups_updated_at BEFORE UPDATE ON public.door_otdelka_groups
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Global pool: otdelka options (individual color/texture swatches in a group)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_otdelka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES public.door_otdelka_groups(id) ON DELETE CASCADE NOT NULL,
    code TEXT,                                      -- e.g. 'V36', 'L01'
    label_ka TEXT NOT NULL,
    label_ru TEXT,
    label_en TEXT,
    swatch_image_url TEXT,                          -- small square swatch
    preview_image_url TEXT,                         -- full door preview with this finish
    price_modifier NUMERIC DEFAULT 0,               -- adds/subtracts from base price
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_door_otdelka_options_group ON public.door_otdelka_options(group_id);

ALTER TABLE public.door_otdelka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active otdelka options" ON public.door_otdelka_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all otdelka options" ON public.door_otdelka_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage otdelka options" ON public.door_otdelka_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_otdelka_options_updated_at BEFORE UPDATE ON public.door_otdelka_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Global pool: korobka (frame) options
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_korobka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,                               -- 'invisible', 'planar', 'deco', etc.
    name_ka TEXT NOT NULL,
    name_ru TEXT,
    name_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    image_url TEXT,                                 -- profile / cross-section drawing
    preview_image_url TEXT,
    price_modifier NUMERIC DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.door_korobka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active korobka options" ON public.door_korobka_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all korobka options" ON public.door_korobka_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage korobka options" ON public.door_korobka_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_korobka_options_updated_at BEFORE UPDATE ON public.door_korobka_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Global pool: modeli (style variant) options
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_model_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,                               -- 'vento', 'entry', 'velino', etc.
    name_ka TEXT NOT NULL,
    name_ru TEXT,
    name_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    image_url TEXT,                                 -- small silhouette/profile
    preview_image_url TEXT,
    price_modifier NUMERIC DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.door_model_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active model options" ON public.door_model_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all model options" ON public.door_model_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage model options" ON public.door_model_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_model_options_updated_at BEFORE UPDATE ON public.door_model_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Flags on products: whether the product uses each dimension
-- ----------------------------------------------------------------------------
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_otdelka_variants BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_korobka_variants BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_model_variants BOOLEAN DEFAULT false;

-- ----------------------------------------------------------------------------
-- Per-product pivots (which options apply to a given product)
-- If a product has has_X_variants=true AND pivot rows, use those.
-- If has_X_variants=true but no pivot rows, fall back to ALL active pool options.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_otdelka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    otdelka_option_id UUID REFERENCES public.door_otdelka_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, otdelka_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_otdelka_options_product ON public.product_otdelka_options(product_id);

ALTER TABLE public.product_otdelka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product otdelka pivots" ON public.product_otdelka_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product otdelka pivots" ON public.product_otdelka_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.product_korobka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    korobka_option_id UUID REFERENCES public.door_korobka_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, korobka_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_korobka_options_product ON public.product_korobka_options(product_id);

ALTER TABLE public.product_korobka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product korobka pivots" ON public.product_korobka_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product korobka pivots" ON public.product_korobka_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.product_model_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    model_option_id UUID REFERENCES public.door_model_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, model_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_model_options_product ON public.product_model_options(product_id);

ALTER TABLE public.product_model_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product model pivots" ON public.product_model_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product model pivots" ON public.product_model_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------------------
-- Seed data (based on union.ru FILO-60 structure)
-- ----------------------------------------------------------------------------

-- Otdelka groups
INSERT INTO public.door_otdelka_groups (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, sort_order) VALUES
    ('fondo',    'ფონდო (საღებავისთვის)',      'FONDO (под покраску)',           'FONDO (paintable primer)',
     'საფუძველი საღებავისთვის',    'Грунт для покраски',           'Primer for painting', 1),
    ('laccato',  'ლაკატო (მატი ემალი)',         'LACCATO (матовая эмаль)',        'LACCATO (matte enamel)',
     'მატი ფერადი ემალი',            'Матовая цветная эмаль',       'Matte colored enamel', 2),
    ('laccato_gloss', 'ლაკატო გლოსი (გლუვი ემალი)', 'LACCATO GLOSS (глянцевая эмаль)', 'LACCATO GLOSS (glossy enamel)',
     'გლოსი ფერადი ემალი',           'Глянцевая цветная эмаль',     'Glossy colored enamel', 3),
    ('veneer',   'ვენირი (ბუნებრივი ხე)',       'VENEER (натуральный шпон)',      'VENEER (natural wood)',
     'ბუნებრივი ხის ხოჭო',           'Натуральный шпон, матовый лак', 'Natural veneer, matte lacquer', 4),
    ('hpl',      'HPL (დეკორატიული კომპოზიტი)', 'HPL (декоративный композит)',   'HPL (decorative composite)',
     'ქვის და მარმარილოს ტექსტურა',  'Текстура камня и мрамора',    'Stone and marble texture', 5),
    ('aluminium','ალუმინი (მეტალი)',            'ALUMINIUM (металл)',             'ALUMINIUM (metal)',
     'მეტალის ფერები',                'Металлические отделки',       'Metallic finishes', 6);

-- Otdelka options — VENEER
WITH g AS (SELECT id FROM public.door_otdelka_groups WHERE code = 'veneer')
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_image_url, sort_order) VALUES
    ((SELECT id FROM g), 'V36', 'Rovere Miele',        'Rovere Miele',        'Rovere Miele',        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&q=80', 1),
    ((SELECT id FROM g), 'V17', 'Rovere Chiaro',       'Rovere Chiaro',       'Rovere Chiaro',       'https://images.unsplash.com/photo-1530700400540-1d17fb4b7a65?w=200&q=80', 2),
    ((SELECT id FROM g), 'V27', 'Rovere Americano',    'Rovere Americano',    'Rovere Americano',    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80', 3),
    ((SELECT id FROM g), 'V16', 'Noce Canaletto',      'Noce Canaletto',      'Noce Canaletto',      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80', 4),
    ((SELECT id FROM g), 'V03', 'Ebano',               'Ebano',               'Ebano',               'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&q=80', 5),
    ((SELECT id FROM g), 'V13', 'Rovere Cenere',       'Rovere Cenere',       'Rovere Cenere',       'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&q=80', 6);

-- Otdelka options — LACCATO
WITH g AS (SELECT id FROM public.door_otdelka_groups WHERE code = 'laccato')
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_image_url, sort_order) VALUES
    ((SELECT id FROM g), 'L01', 'Bianco RAL 9003', 'Bianco RAL 9003', 'Bianco RAL 9003', 'https://via.placeholder.com/200/FFFFFF/FFFFFF.png', 1),
    ((SELECT id FROM g), 'L02', 'Bianco Night',    'Bianco Night',    'Bianco Night',    'https://via.placeholder.com/200/F5F5F0/F5F5F0.png', 2),
    ((SELECT id FROM g), 'L03', 'Avorio',          'Avorio',          'Avorio',          'https://via.placeholder.com/200/FFFFF0/FFFFF0.png', 3),
    ((SELECT id FROM g), 'L04', 'Grigio Cemento',  'Grigio Cemento',  'Grigio Cemento',  'https://via.placeholder.com/200/A9A9A9/A9A9A9.png', 4),
    ((SELECT id FROM g), 'L05', 'Nero',            'Nero',            'Black',           'https://via.placeholder.com/200/111111/111111.png', 5);

-- Otdelka options — ALUMINIUM
WITH g AS (SELECT id FROM public.door_otdelka_groups WHERE code = 'aluminium')
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_image_url, sort_order) VALUES
    ((SELECT id FROM g), 'AL09', 'Chrome Matt',  'Chrome Matt',  'Chrome Matt',  'https://via.placeholder.com/200/C0C0C0/C0C0C0.png', 1),
    ((SELECT id FROM g), 'AL08', 'Black',        'Black',        'Black',        'https://via.placeholder.com/200/222222/222222.png', 2),
    ((SELECT id FROM g), 'AL05', 'Bronze',       'Bronze',       'Bronze',       'https://via.placeholder.com/200/8C7853/8C7853.png', 3),
    ((SELECT id FROM g), 'AL02', 'Champagne',    'Champagne',    'Champagne',    'https://via.placeholder.com/200/E8C78A/E8C78A.png', 4),
    ((SELECT id FROM g), 'AL06', 'Piombo',       'Piombo',       'Piombo',       'https://via.placeholder.com/200/4A4A4A/4A4A4A.png', 5);

-- Korobka options
INSERT INTO public.door_korobka_options (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, image_url, sort_order) VALUES
    ('invisible', 'INVISIBLE (დამალული)',  'INVISIBLE (скрытый)',    'INVISIBLE (hidden)',
     'ფარული ალუმინის ჩარჩო, კედლის ფერში', 'Скрытый алюминиевый короб, в цвет стены', 'Hidden aluminum frame, matches wall color',
     'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80', 1),
    ('planar',    'PLANAR (ფლანგი)',         'PLANAR (планар)',         'PLANAR',
     'ბრტყელი ალუმინის ჩარჩო კედლის დონეზე', 'Плоский алюминиевый короб вровень со стеной', 'Flat aluminum frame flush with wall',
     'https://images.unsplash.com/photo-1522705564739-cadbff2a3de3?w=400&q=80', 2),
    ('deco',      'DECO (დეკორატიული)',      'DECO (декоративный)',     'DECO (decorative)',
     'დეკორატიული ნაისნიკით',        'С декоративным наличником',  'With decorative trim',
     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', 3),
    ('uniwood',   'UNIWOOD (ხის)',            'UNIWOOD (деревянный)',    'UNIWOOD (wooden)',
     'ხის ჩარჩო',                   'Деревянный короб',          'Wooden frame',
     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', 4),
    ('unidoor',   'UNIDOOR (კლასიკური)',     'UNIDOOR (классический)',  'UNIDOOR (classic)',
     'კლასიკური ხის ჩარჩო',          'Классический деревянный короб', 'Classic wooden frame',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', 5);

-- Model options (door style silhouettes)
INSERT INTO public.door_model_options (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, image_url, sort_order) VALUES
    ('vento',   'Vento',   'Vento',   'Vento',   'სუფთა ბრტყელი ზედაპირი',        'Чистая плоская поверхность',    'Clean flat surface',
     'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', 1),
    ('entry',   'Entry',   'Entry',   'Entry',   'ელეგანტური ვერტიკალური ხაზი',   'Элегантная вертикальная линия', 'Elegant vertical line',
     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', 2),
    ('velino',  'Velino',  'Velino',  'Velino',  'კლასიკური ოთხკუთხა',             'Классическая квадратная',      'Classic squared',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', 3),
    ('vetta',   'Vetta',   'Vetta',   'Vetta',   'გეომეტრიული პანელი',             'Геометрическая панель',        'Geometric panel',
     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80', 4),
    ('vox',     'Vox',     'Vox',     'Vox',     'სამი ჰორიზონტალური ხაზი',        'Три горизонтальные линии',    'Three horizontal lines',
     'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80', 5);


-- ============================================================
-- FILE: 20260422100000_product_content_blocks.sql
-- ============================================================
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

