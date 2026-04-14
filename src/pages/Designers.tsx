import { CheckCircle, Percent, Users, Palette, Headphones, Truck } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Designers = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'დიზაინერებისთვის' : 'For Designers' },
  ];

  const benefits = [
    {
      icon: Percent,
      title: language === 'ka' ? 'სპეციალური ფასები' : 'Special Pricing',
      description: language === 'ka' 
        ? 'დიზაინერებისა და არქიტექტორებისთვის ექსკლუზიური ფასდაკლებები'
        : 'Exclusive discounts for designers and architects',
    },
    {
      icon: Users,
      title: language === 'ka' ? 'პირადი მენეჯერი' : 'Personal Manager',
      description: language === 'ka' 
        ? 'თქვენ გყავთ პერსონალური მენეჯერი ყველა პროექტისთვის'
        : 'You have a personal manager for all projects',
    },
    {
      icon: Palette,
      title: language === 'ka' ? 'ექსკლუზიური კოლექციები' : 'Exclusive Collections',
      description: language === 'ka' 
        ? 'წვდომა ახალ კოლექციებზე გაყიდვის დაწყებამდე'
        : 'Access to new collections before public launch',
    },
    {
      icon: Headphones,
      title: language === 'ka' ? 'ტექნიკური მხარდაჭერა' : 'Technical Support',
      description: language === 'ka' 
        ? 'პროფესიონალური კონსულტაცია და ტექნიკური დახმარება'
        : 'Professional consultation and technical assistance',
    },
    {
      icon: Truck,
      title: language === 'ka' ? 'პრიორიტეტული მიწოდება' : 'Priority Delivery',
      description: language === 'ka' 
        ? 'თქვენი შეკვეთები პრიორიტეტულად მუშავდება'
        : 'Your orders are processed with priority',
    },
    {
      icon: CheckCircle,
      title: language === 'ka' ? 'გარანტირებული ხარისხი' : 'Guaranteed Quality',
      description: language === 'ka' 
        ? 'ყველა პროდუქტი გარანტირებულია და სერტიფიცირებული'
        : 'All products are guaranteed and certified',
    },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'ka' ? 'პარტნიორობა დიზაინერებისთვის' : 'Designer Partnership Program'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'ka' 
              ? 'შემოგვიერთდით პარტნიორობის პროგრამაში და მიიღეთ ექსკლუზიური შეთავაზებები, სპეციალური ფასები და პერსონალური მომსახურება.'
              : 'Join our partnership program and get exclusive offers, special pricing, and personalized service.'}
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'ka' ? 'პარტნიორობის უპირატესობები' : 'Partnership Benefits'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-12">
          <div className="max-w-lg mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-center mb-2">
                  {language === 'ka' ? 'გახდი პარტნიორი' : 'Become a Partner'}
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  {language === 'ka' 
                    ? 'დატოვეთ თქვენი საკონტაქტო ინფორმაცია და დაგიკავშირდებით'
                    : 'Leave your contact information and we will get in touch'}
                </p>
                <ConsultationForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Designers;
