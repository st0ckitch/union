import { Shield, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

const Warranty = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'გარანტია' : 'Warranty' },
  ];

  const warrantyFeatures = [
    language === 'ka' ? '2 წლიანი გარანტია ყველა პროდუქტზე' : '2 year warranty on all products',
    language === 'ka' ? 'უფასო რემონტი გარანტიის პერიოდში' : 'Free repair during warranty period',
    language === 'ka' ? 'ორიგინალი სათადარიგო ნაწილები' : 'Original spare parts',
    language === 'ka' ? 'პროფესიონალური მონტაჟის გუნდი' : 'Professional installation team',
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-3xl mx-auto py-8">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">
              {language === 'ka' ? 'გარანტია' : 'Warranty'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === 'ka' 
                ? 'ჩვენ გთავაზობთ 2 წლიან გარანტიას ყველა პროდუქტზე'
                : 'We offer a 2-year warranty on all products'}
            </p>
          </div>

          <div className="bg-secondary rounded-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {language === 'ka' ? 'რა მოიცავს გარანტია:' : 'Warranty Coverage:'}
            </h2>
            <ul className="space-y-4">
              {warrantyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? 'გარანტიის პირობები' : 'Warranty Terms'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'გარანტია ძალაშია, თუ პროდუქტი გამოყენებულია მისი დანიშნულების მიხედვით და დაცულია ექსპლუატაციის წესები. გარანტია არ ვრცელდება მექანიკურ დაზიანებებზე და არასწორი გამოყენების შედეგებზე.'
                  : 'The warranty is valid if the product is used according to its intended purpose and operating rules are followed. The warranty does not cover mechanical damage and consequences of improper use.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? 'გარანტიის გააქტიურება' : 'Warranty Activation'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'გარანტია ავტომატურად ძალაში შედის შეკვეთის მიღების დღიდან. შეინახეთ შესყიდვის დოკუმენტი გარანტიის პერიოდში.'
                  : 'The warranty automatically becomes effective from the date of order receipt. Keep the purchase document during the warranty period.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Warranty;
