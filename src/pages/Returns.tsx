import { RotateCcw, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

const Returns = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'დაბრუნება' : 'Returns' },
  ];

  const canReturn = [
    language === 'ka' ? 'პროდუქტი ორიგინალ შეფუთვაში' : 'Product in original packaging',
    language === 'ka' ? '14 დღის განმავლობაში' : 'Within 14 days',
    language === 'ka' ? 'გამოუყენებელი პროდუქტი' : 'Unused product',
    language === 'ka' ? 'ქარხნული დეფექტის შემთხვევაში' : 'In case of factory defect',
  ];

  const cannotReturn = [
    language === 'ka' ? 'სპეციალური შეკვეთით დამზადებული პროდუქტი' : 'Custom-made products',
    language === 'ka' ? 'გახსნილი ან გამოყენებული პროდუქტი' : 'Opened or used products',
    language === 'ka' ? 'მექანიკური დაზიანების შემთხვევაში' : 'Products with mechanical damage',
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-3xl mx-auto py-8">
          <div className="text-center mb-12">
            <RotateCcw className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">
              {language === 'ka' ? 'დაბრუნების პოლიტიკა' : 'Returns Policy'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === 'ka' 
                ? 'პროდუქტის დაბრუნება შესაძლებელია 14 დღის განმავლობაში'
                : 'Products can be returned within 14 days'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-success/10 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                {language === 'ka' ? 'შეგიძლიათ დააბრუნოთ' : 'You Can Return'}
              </h2>
              <ul className="space-y-3">
                {canReturn.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-destructive/10 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                {language === 'ka' ? 'ვერ დააბრუნებთ' : 'Cannot Return'}
              </h2>
              <ul className="space-y-3">
                {cannotReturn.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {language === 'ka' ? 'დაბრუნების პროცესი' : 'Return Process'}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>
                  {language === 'ka' 
                    ? 'დაგვიკავშირდით ტელეფონით ან ელ-ფოსტით' 
                    : 'Contact us by phone or email'}
                </li>
                <li>
                  {language === 'ka' 
                    ? 'მოამზადეთ პროდუქტი ორიგინალ შეფუთვაში' 
                    : 'Prepare the product in original packaging'}
                </li>
                <li>
                  {language === 'ka' 
                    ? 'ჩვენი კურიერი წამოიღებს პროდუქტს' 
                    : 'Our courier will pick up the product'}
                </li>
                <li>
                  {language === 'ka' 
                    ? 'თანხა დაგიბრუნდებათ 5-7 სამუშაო დღეში' 
                    : 'Refund will be processed within 5-7 business days'}
                </li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Returns;
