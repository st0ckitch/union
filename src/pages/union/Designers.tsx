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
      <div className="union-container pt-6 pb-16">
        <Breadcrumb items={breadcrumbItems} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 max-w-3xl"
        >
          <div className="union-eyebrow mb-3">
            {language === 'ka' ? 'პარტნიორობა' : language === 'ru' ? 'Партнёрство' : 'Partnership'}
          </div>
          <h1 className="union-section-title mb-4">
            {language === 'ka' ? 'პროგრამა დიზაინერებისთვის' : language === 'ru' ? 'Программа для дизайнеров' : 'Designer Program'}
          </h1>
          <p className="text-[15px] leading-[1.7] text-muted-foreground">
            {language === 'ka'
              ? 'გახდით UNION-ის პარტნიორი და ისარგებლეთ ექსკლუზიური პირობებით თქვენი პროექტებისთვის.'
              : language === 'ru'
                ? 'Станьте партнёром UNION и пользуйтесь эксклюзивными условиями для своих проектов.'
                : 'Become a UNION partner and enjoy exclusive terms for your projects.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border bg-surface">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title.en}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 md:p-8 ${index < benefits.length - 1 ? 'md:border-r border-border' : ''} ${
                index < 2 ? 'border-b md:border-b-0 border-border' : ''
              }`}
            >
              <benefit.icon className="h-6 w-6 text-primary mb-4" strokeWidth={1.25} />
              <h3 className="text-[16px] font-semibold text-primary mb-2">{benefit.title[language] || benefit.title.en}</h3>
              <p className="text-[13px] text-muted-foreground leading-snug">{benefit.description[language] || benefit.description.en}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 py-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="union-section-title mb-6">
              {language === 'ka' ? 'როგორ გახდეთ პარტნიორი' : language === 'ru' ? 'Как стать партнёром' : 'How to Become a Partner'}
            </h2>
            <ul className="space-y-4">
              {[
                { ka: 'შეავსეთ განაცხადის ფორმა', ru: 'Заполните форму заявки', en: 'Fill out the application form' },
                { ka: 'ჩვენი მენეჯერი დაგიკავშირდებათ', ru: 'Менеджер свяжется с вами', en: 'Our manager will contact you' },
                { ka: 'გაიარეთ ვერიფიკაცია', ru: 'Пройдите верификацию', en: 'Complete verification' },
                { ka: 'მიიღეთ პარტნიორის სტატუსი', ru: 'Получите статус партнёра', en: 'Get partner status' },
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-[14px]">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" strokeWidth={1.25} />
                  <span>{step[language] || step.en}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-surface border border-border p-8">
              <h2 className="text-[20px] font-medium text-primary mb-6">
                {language === 'ka' ? 'მოითხოვეთ კონსულტაცია' : language === 'ru' ? 'Запросить консультацию' : 'Request Consultation'}
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
