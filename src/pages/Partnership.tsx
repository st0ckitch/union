import { Handshake, Store, TrendingUp, HeartHandshake } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Partnership = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'პარტნიორობა' : 'Partnership' },
  ];

  const partnershipTypes = [
    {
      icon: Store,
      title: language === 'ka' ? 'დილერობა' : 'Dealership',
      description: language === 'ka' 
        ? 'გახდით იუნიონის ოფიციალური დილერი თქვენს რეგიონში'
        : 'Become an official UNION dealer in your region',
    },
    {
      icon: TrendingUp,
      title: language === 'ka' ? 'სამშენებლო კომპანიები' : 'Construction Companies',
      description: language === 'ka' 
        ? 'სპეციალური პირობები სამშენებლო და დეველოპერული კომპანიებისთვის'
        : 'Special terms for construction and development companies',
    },
    {
      icon: HeartHandshake,
      title: language === 'ka' ? 'არქიტექტორები და დიზაინერები' : 'Architects & Designers',
      description: language === 'ka' 
        ? 'პარტნიორობის პროგრამა არქიტექტორებისა და ინტერიერის დიზაინერებისთვის'
        : 'Partnership program for architects and interior designers',
    },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-12">
            <Handshake className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">
              {language === 'ka' ? 'პარტნიორობა' : 'Partnership'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === 'ka' 
                ? 'გახდით იუნიონის ბიზნეს პარტნიორი და ისარგებლეთ ექსკლუზიური პირობებით'
                : 'Become a UNION business partner and enjoy exclusive terms'}
            </p>
          </div>

          {/* Partnership Types */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {partnershipTypes.map((type, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <type.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-2">
                {language === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us'}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {language === 'ka' 
                  ? 'დატოვეთ თქვენი საკონტაქტო ინფორმაცია და დაგიკავშირდებით'
                  : 'Leave your contact information and we will get in touch'}
              </p>
              <div className="max-w-md mx-auto">
                <ConsultationForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Partnership;
