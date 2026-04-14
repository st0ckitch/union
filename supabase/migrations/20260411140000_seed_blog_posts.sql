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
