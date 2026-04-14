import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const Showrooms = () => {
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
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold mb-8">
          {language === 'ka' ? 'ჩვენი შოურუმები' : 'Our Showrooms'}
        </h1>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
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
            {showrooms.map((showroom) => {
              const name = language === 'ka' ? showroom.name_ka : (showroom.name_en || showroom.name_ka);
              const address = language === 'ka' ? showroom.address_ka : (showroom.address_en || showroom.address_ka);
              const workingHours = language === 'ka' ? showroom.working_hours_ka : (showroom.working_hours_en || showroom.working_hours_ka);

              return (
                <Card key={showroom.id} className="overflow-hidden">
                  {showroom.image_url && (
                    <img
                      src={showroom.image_url}
                      alt={name}
                      className="w-full aspect-video object-cover"
                    />
                  )}
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{name}</h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>{address}</span>
                      </div>

                      {showroom.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                          <a href={`tel:${showroom.phone}`} className="hover:text-primary transition-colors">
                            {showroom.phone}
                          </a>
                        </div>
                      )}

                      {showroom.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                          <a href={`mailto:${showroom.email}`} className="hover:text-primary transition-colors">
                            {showroom.email}
                          </a>
                        </div>
                      )}

                      {workingHours && (
                        <div className="flex items-start gap-3">
                          <Clock className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>{workingHours}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Showrooms;
