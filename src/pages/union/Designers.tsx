import { motion } from 'framer-motion';
import { Palette, Users, Percent, Award, CheckCircle } from 'lucide-react';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { useLanguage } from '@/contexts/LanguageContext';

const benefits = [
  { icon: Percent, title: { ka: 'სპეციალური ფასები', en: 'Special Pricing' }, description: { ka: 'ექსკლუზიური ფასდაკლებები დიზაინერებისთვის', en: 'Exclusive discounts for designers' } },
  { icon: Users, title: { ka: 'პერსონალური მენეჯერი', en: 'Personal Manager' }, description: { ka: 'თქვენი პროექტების კურატორი', en: 'Your project curator' } },
  { icon: Palette, title: { ka: 'ექსკლუზიური კოლექციები', en: 'Exclusive Collections' }, description: { ka: 'წვდომა უნიკალურ პროდუქციაზე', en: 'Access to unique products' } },
  { icon: Award, title: { ka: 'სერტიფიკაცია', en: 'Certification' }, description: { ka: 'ოფიციალური პარტნიორის სტატუსი', en: 'Official partner status' } },
];

const UnionDesigners = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'დიზაინერებს' : 'For Designers' },
  ];

  return (
    <UnionLayout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            {language === 'ka' ? 'პროგრამა დიზაინერებისთვის' : 'Designer Program'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'ka' 
              ? 'გახდით UNION-ის პარტნიორი და ისარგებლეთ ექსკლუზიური პირობებით თქვენი პროექტებისთვის.'
              : 'Become a UNION partner and enjoy exclusive terms for your projects.'}
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title.en}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-card rounded-lg shadow-sm text-center"
            >
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{benefit.title[language]}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description[language]}</p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-12 py-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">
              {language === 'ka' ? 'როგორ გახდეთ პარტნიორი' : 'How to Become a Partner'}
            </h2>
            <ul className="space-y-4">
              {[
                { ka: 'შეავსეთ განაცხადის ფორმა', en: 'Fill out the application form' },
                { ka: 'ჩვენი მენეჯერი დაგიკავშირდებათ', en: 'Our manager will contact you' },
                { ka: 'გაიარეთ ვერიფიკაცია', en: 'Complete verification' },
                { ka: 'მიიღეთ პარტნიორის სტატუსი', en: 'Get partner status' },
              ].map((step, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{step[language]}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">
                {language === 'ka' ? 'მოითხოვეთ კონსულტაცია' : 'Request Consultation'}
              </h2>
              <ConsultationForm />
            </div>
          </motion.div>
        </div>
      </div>
    </UnionLayout>
  );
};

export default UnionDesigners;
