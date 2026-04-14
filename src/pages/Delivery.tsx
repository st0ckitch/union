import { Truck, Clock, MapPin, CreditCard } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Delivery = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'მიწოდება' : 'Delivery' },
  ];

  const deliveryOptions = [
    {
      icon: MapPin,
      title: language === 'ka' ? 'თბილისი' : 'Tbilisi',
      description: language === 'ka' ? 'უფასო მიწოდება' : 'Free delivery',
      time: language === 'ka' ? '1-3 სამუშაო დღე' : '1-3 business days',
    },
    {
      icon: MapPin,
      title: language === 'ka' ? 'რეგიონები' : 'Regions',
      description: language === 'ka' ? '30₾-დან' : 'From 30₾',
      time: language === 'ka' ? '3-7 სამუშაო დღე' : '3-7 business days',
    },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {language === 'ka' ? 'მიწოდების პირობები' : 'Delivery Information'}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {deliveryOptions.map((option, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{option.title}</h3>
                      <p className="text-xl font-bold text-primary">{option.description}</p>
                      <p className="text-muted-foreground">{option.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                {language === 'ka' ? 'მიწოდების პროცესი' : 'Delivery Process'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'შეკვეთის გაფორმების შემდეგ, ჩვენი მენეჯერი დაგიკავშირდებათ მიწოდების თარიღისა და დროის შესათანხმებლად. მიწოდება ხდება სამუშაო დღეებში, 10:00-დან 19:00 საათამდე.'
                  : 'After placing an order, our manager will contact you to arrange the delivery date and time. Delivery is made on business days, from 10:00 to 19:00.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {language === 'ka' ? 'ვადები' : 'Timelines'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'მარაგში არსებული პროდუქციის მიწოდება ხდება 1-3 სამუშაო დღეში. სპეციალური შეკვეთის შემთხვევაში, ვადა შეიძლება გახანგრძლივდეს 2-6 კვირამდე.'
                  : 'Products in stock are delivered within 1-3 business days. For special orders, the timeline may extend to 2-6 weeks.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                {language === 'ka' ? 'გადახდა' : 'Payment'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'გადახდა შესაძლებელია ნაღდი ანგარიშსწორებით ან ბარათით მიწოდებისას. ასევე ხელმისაწვდომია 0%-იანი განვადება პარტნიორ ბანკებში.'
                  : 'Payment can be made in cash or by card upon delivery. 0% installments are also available at partner banks.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Delivery;
