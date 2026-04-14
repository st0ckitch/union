import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

const Privacy = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კონფიდენციალურობა' : 'Privacy Policy' },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-3xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">
            {language === 'ka' ? 'კონფიდენციალურობის პოლიტიკა' : 'Privacy Policy'}
          </h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '1. ზოგადი დებულებები' : '1. General Provisions'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'ეს კონფიდენციალურობის პოლიტიკა აღწერს, თუ როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს პერსონალურ ინფორმაციას, როდესაც იყენებთ ჩვენს ვებგვერდს და სერვისებს.'
                  : 'This Privacy Policy describes how we collect, use, and protect your personal information when you use our website and services.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '2. ინფორმაციის შეგროვება' : '2. Information Collection'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'ჩვენ ვაგროვებთ ინფორმაციას, რომელსაც თქვენ გვაწვდით პირდაპირ: სახელი, ელ-ფოსტა, ტელეფონის ნომერი და მიწოდების მისამართი შეკვეთის გაფორმებისას.'
                  : 'We collect information you provide directly: name, email, phone number, and delivery address when placing an order.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '3. ინფორმაციის გამოყენება' : '3. Use of Information'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'თქვენი ინფორმაცია გამოიყენება შეკვეთების დამუშავებისთვის, მომხმარებელთა მხარდაჭერისთვის და მარკეტინგული კომუნიკაციისთვის (თქვენი თანხმობით).'
                  : 'Your information is used for order processing, customer support, and marketing communications (with your consent).'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '4. ინფორმაციის დაცვა' : '4. Information Protection'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'ჩვენ ვიყენებთ ინდუსტრიის სტანდარტულ უსაფრთხოების ზომებს თქვენი პერსონალური ინფორმაციის დასაცავად.'
                  : 'We use industry-standard security measures to protect your personal information.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ka' ? '5. კონტაქტი' : '5. Contact'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka' 
                  ? 'კონფიდენციალურობასთან დაკავშირებული კითხვებისთვის, გთხოვთ დაგვიკავშირდეთ: info@union.ge'
                  : 'For privacy-related questions, please contact us at: info@union.ge'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
