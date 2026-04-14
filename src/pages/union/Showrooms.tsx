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
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold mb-8">
          {language === 'ka' ? 'შოურუმები' : 'Showrooms'}
        </h1>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : showrooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'ka' ? 'შოურუმები მალე დაემატება' : 'Showrooms coming soon'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showrooms.map((showroom, index) => (
              <motion.div
                key={showroom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-sm overflow-hidden"
              >
                {showroom.image_url && (
                  <img
                    src={showroom.image_url}
                    alt={language === 'ka' ? showroom.name_ka : showroom.name_en}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    {language === 'ka' ? showroom.name_ka : (showroom.name_en || showroom.name_ka)}
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span>{language === 'ka' ? showroom.address_ka : (showroom.address_en || showroom.address_ka)}</span>
                    </div>
                    {showroom.phone && (
                      <a href={`tel:${showroom.phone}`} className="flex items-center gap-3 hover:text-primary">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{showroom.phone}</span>
                      </a>
                    )}
                    {showroom.email && (
                      <a href={`mailto:${showroom.email}`} className="flex items-center gap-3 hover:text-primary">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{showroom.email}</span>
                      </a>
                    )}
                    {(showroom.working_hours_ka || showroom.working_hours_en) && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{language === 'ka' ? showroom.working_hours_ka : (showroom.working_hours_en || showroom.working_hours_ka)}</span>
                      </div>
                    )}
                  </div>
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
