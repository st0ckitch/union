import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const UnionShowrooms = () => {
  const { language } = useLanguage();

  const { data: showrooms = [], isLoading } = useQuery({
    queryKey: ['showrooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('showrooms')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  const breadcrumbItems = [
    { label: language === 'ka' ? 'შოურუმები' : 'Showrooms' },
  ];

  return (
    <UnionLayout>
      <div className="union-container pt-6 pb-16">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="union-section-title mb-10 mt-4">
          {language === 'ka' ? 'შოურუმები' : language === 'ru' ? 'Шоурумы' : 'Showrooms'}
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[16/9] w-full" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : showrooms.length === 0 ? (
          <div className="border border-border bg-surface text-center py-16">
            <p className="text-[14px] text-muted-foreground">
              {language === 'ka' ? 'შოურუმები მალე დაემატება' : language === 'ru' ? 'Шоурумы скоро' : 'Showrooms coming soon'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {showrooms.map((showroom, index) => (
              <motion.div
                key={showroom.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {showroom.image_url && (
                  <div className="aspect-[16/9] overflow-hidden bg-surface mb-5">
                    <img
                      src={showroom.image_url}
                      alt={language === 'ka' ? showroom.name_ka : showroom.name_en}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <h2 className="text-[20px] font-medium text-foreground mb-3">
                  {language === 'ka' ? showroom.name_ka : (showroom.name_en || showroom.name_ka)}
                </h2>
                <div className="space-y-2.5 text-[14px] text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" strokeWidth={1.5} />
                    <span>{language === 'ka' ? showroom.address_ka : (showroom.address_en || showroom.address_ka)}</span>
                  </div>
                  {showroom.phone && (
                    <a href={`tel:${showroom.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Phone className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      <span>{showroom.phone}</span>
                    </a>
                  )}
                  {showroom.email && (
                    <a href={`mailto:${showroom.email}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Mail className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      <span>{showroom.email}</span>
                    </a>
                  )}
                  {(showroom.working_hours_ka || showroom.working_hours_en) && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      <span>{language === 'ka' ? showroom.working_hours_ka : (showroom.working_hours_en || showroom.working_hours_ka)}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </UnionLayout>
  );
};

export default UnionShowrooms;
