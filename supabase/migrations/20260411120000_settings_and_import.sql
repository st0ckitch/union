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
