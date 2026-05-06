import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ContactForm } from '@/components/forms/ContactForm';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const UnionContact = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კონტაქტი' : 'Contact' },
  ];

  const items = [
    { Icon: Phone, value: '+995 32 2 00 00 00', label: { ka: 'ტელეფონი', ru: 'Телефон', en: 'Phone' }, href: 'tel:+995322000000' },
    { Icon: Mail, value: 'info@union.ge', label: { ka: 'ელ.ფოსტა', ru: 'Эл. почта', en: 'Email' }, href: 'mailto:info@union.ge' },
    { Icon: MapPin, value: language === 'ka' ? 'თბილისი, საქართველო' : language === 'ru' ? 'Тбилиси, Грузия' : 'Tbilisi, Georgia', label: { ka: 'მისამართი', ru: 'Адрес', en: 'Address' } },
    { Icon: Clock, value: language === 'ka' ? 'ორშ-შაბ: 10:00 - 19:00' : language === 'ru' ? 'Пн-Сб: 10:00 - 19:00' : 'Mon-Sat: 10:00 - 19:00', label: { ka: 'სამუშაო საათები', ru: 'Часы работы', en: 'Working hours' } },
  ];

  return (
    <UnionLayout>
      <div className="union-container pt-6 pb-16">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 py-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="union-section-title mb-4">
              {language === 'ka' ? 'დაგვიკავშირდით' : language === 'ru' ? 'Свяжитесь с нами' : 'Contact Us'}
            </h1>
            <p className="text-[15px] text-muted-foreground leading-[1.7] mb-8 max-w-md">
              {language === 'ka'
                ? 'გაქვთ კითხვები? ჩვენი გუნდი მზადაა დაგეხმაროთ.'
                : language === 'ru'
                  ? 'Есть вопросы? Наша команда готова помочь.'
                  : 'Have questions? Our team is ready to help.'}
            </p>

            <div className="border border-border bg-surface">
              {items.map(({ Icon, value, label, href }, idx) => {
                const inner = (
                  <div className={`flex items-center gap-5 p-5 ${idx < items.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="w-11 h-11 rounded-full bg-white border border-border flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-foreground">{value}</p>
                      <p className="text-[12px] uppercase tracking-[0.06em] text-muted-foreground mt-0.5">{label[language] || label.en}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={idx} href={href} className="block hover:bg-surface-muted transition-colors">{inner}</a>
                ) : (
                  <div key={idx}>{inner}</div>
                );
              })}
            </div>

            <a
              href="https://wa.me/995322000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white h-12 px-7 text-[12px] font-bold uppercase tracking-[0.06em] transition-colors"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-surface border border-border p-8">
              <h2 className="union-section-title mb-6">
                {language === 'ka' ? 'მოგვწერეთ' : language === 'ru' ? 'Напишите нам' : 'Send us a message'}
              </h2>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </UnionLayout>
  );
};

export default UnionContact;
