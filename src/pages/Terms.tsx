import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

const Terms = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'წესები და პირობები' : 'Terms & Conditions' },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-3xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">
            {language === 'ka' ? 'წესები და პირობები' : 'Terms & Conditions'}
          </h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '1. ზოგადი პირობები' : '1. General Terms'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'ვებგვერდის გამოყენებით თქვენ ეთანხმებით ამ წესებსა და პირობებს. თუ არ ეთანხმებით, გთხოვთ არ გამოიყენოთ ჩვენი სერვისები.'
                  : 'By using this website, you agree to these terms and conditions. If you do not agree, please do not use our services.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '2. შეკვეთა და გადახდა' : '2. Orders and Payment'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'შეკვეთის გაფორმების შემდეგ, თქვენ მიიღებთ დადასტურებას ელ-ფოსტით ან ტელეფონით. გადახდა შესაძლებელია ნაღდი ანგარიშსწორებით ან ბარათით მიწოდებისას.'
                  : 'After placing an order, you will receive confirmation by email or phone. Payment can be made in cash or by card upon delivery.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '3. მიწოდება' : '3. Delivery'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'მიწოდების ვადა დამოკიდებულია პროდუქტის ხელმისაწვდომობაზე და თქვენს მდებარეობაზე. სტანდარტული მიწოდება თბილისში უფასოა.'
                  : 'Delivery time depends on product availability and your location. Standard delivery in Tbilisi is free.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '4. პასუხისმგებლობა' : '4. Liability'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'ჩვენ არ ვართ პასუხისმგებელი რაიმე ზიანზე, რომელიც გამოწვეულია პროდუქტის არასწორი გამოყენებით.'
                  : 'We are not liable for any damage caused by improper use of the products.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
