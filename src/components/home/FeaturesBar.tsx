import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Truck, Shield, CreditCard, Headphones, Star, Award, Package, Users, Sparkles, Heart, Clock, MapPin, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { Truck, Shield, CreditCard, Headphones, Star, Award, Package, Users, Sparkles, Heart, Clock, MapPin };

const FALLBACK = [
  { id: 'f1', icon: 'Truck',      title_ka: 'უფასო მიწოდება',   title_ru: 'Бесплатная доставка',    title_en: 'Free Delivery',     description_ka: 'თბილისის მასშტაბით',           description_ru: 'По всему Тбилиси',         description_en: 'Across Tbilisi' },
  { id: 'f2', icon: 'Shield',     title_ka: 'გარანტია',         title_ru: 'Гарантия',               title_en: 'Warranty',          description_ka: '2 წლიანი გარანტია',              description_ru: '2-летняя гарантия',        description_en: '2 Year Warranty' },
  { id: 'f3', icon: 'CreditCard', title_ka: 'განვადება',        title_ru: 'Рассрочка',              title_en: 'Installments',      description_ka: '0%-იანი განვადება',              description_ru: 'Рассрочка 0%',             description_en: '0% Interest' },
  { id: 'f4', icon: 'Headphones', title_ka: '24/7 მხარდაჭერა',  title_ru: 'Поддержка 24/7',         title_en: '24/7 Support',      description_ka: 'პროფესიონალური კონსულტაცია',     description_ru: 'Проф. консультация',       description_en: 'Professional Consultation' },
];

export function FeaturesBar() {
  const { language } = useLanguage();

  const { data: features } = useQuery({
    queryKey: ['site-features'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_features').select('*').eq('is_active', true).order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const items = (features && features.length > 0) ? features : FALLBACK;

  const pickTitle = (f: any) => language === 'ru' ? (f.title_ru || f.title_ka) : language === 'en' ? (f.title_en || f.title_ka) : f.title_ka;
  const pickDesc  = (f: any) => language === 'ru' ? (f.description_ru || f.description_ka) : language === 'en' ? (f.description_en || f.description_ka) : f.description_ka;

  return (
    <section className="bg-secondary py-8">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((feature) => {
            const Icon = iconMap[feature.icon] || Truck;
            return (
              <div key={feature.id} className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{pickTitle(feature)}</h3>
                  <p className="text-sm text-muted-foreground">{pickDesc(feature)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
