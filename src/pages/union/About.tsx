import { motion } from 'framer-motion';
import { Award, Users, Building, Clock, CheckCircle } from 'lucide-react';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

const stats = [
  { icon: Clock, value: '35+', label: { ka: 'წლიანი გამოცდილება', en: 'Years Experience' } },
  { icon: Building, value: '3', label: { ka: 'შოურუმი', en: 'Showrooms' } },
  { icon: Users, value: '10,000+', label: { ka: 'კმაყოფილი მომხმარებელი', en: 'Happy Customers' } },
  { icon: Award, value: '100%', label: { ka: 'იტალიური ხარისხი', en: 'Italian Quality' } },
];

const values = [
  { title: { ka: 'ხარისხი', en: 'Quality' }, description: { ka: 'მხოლოდ უმაღლესი ხარისხის იტალიური პროდუქცია', en: 'Only the highest quality Italian products' } },
  { title: { ka: 'სერვისი', en: 'Service' }, description: { ka: 'პროფესიონალური მომსახურება ყველა ეტაპზე', en: 'Professional service at every stage' } },
  { title: { ka: 'გარანტია', en: 'Warranty' }, description: { ka: '2 წლიანი გარანტია ყველა პროდუქტზე', en: '2-year warranty on all products' } },
  { title: { ka: 'გამოცდილება', en: 'Experience' }, description: { ka: '35 წელზე მეტი გამოცდილება ინდუსტრიაში', en: 'Over 35 years of industry experience' } },
];

const UnionAbout = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კომპანიის შესახებ' : 'About Us' },
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
          <div className="union-eyebrow mb-3">UNION</div>
          <h1 className="union-section-title mb-4">
            {language === 'ka' ? 'კომპანიის შესახებ' : language === 'ru' ? 'О компании' : 'About the company'}
          </h1>
          <p className="text-[15px] leading-[1.7] text-muted-foreground">
            {language === 'ka'
              ? 'პრემიუმ კარებისა და ავეჯის ლიდერი. 35 წელზე მეტი გამოცდილებით ჩვენ ვთავაზობთ უმაღლესი ხარისხის იტალიურ პროდუქციას.'
              : language === 'ru'
                ? 'Лидер рынка премиальных дверей и мебели. С более чем 35-летним опытом мы предлагаем продукцию итальянского качества.'
                : 'A leader in premium doors and furniture. With over 35 years of experience we deliver the highest quality Italian products.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-border bg-surface">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 md:p-8 text-center ${
                index < stats.length - 1 ? 'md:border-r border-border' : ''
              } ${index < 2 ? 'border-b md:border-b-0 border-border' : ''}`}
            >
              <stat.icon className="h-7 w-7 mx-auto mb-3 text-primary" strokeWidth={1.25} />
              <p className="text-[28px] font-bold text-primary leading-none mb-2">{stat.value}</p>
              <p className="text-[13px] text-muted-foreground">{stat.label[language] || stat.label.en}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 py-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="union-section-title mb-5">
              {language === 'ka' ? 'ჩვენი ისტორია' : language === 'ru' ? 'Наша история' : 'Our Story'}
            </h2>
            <p className="text-[15px] leading-[1.7] text-muted-foreground mb-4">
              {language === 'ka'
                ? 'UNION დაარსდა 1990 წელს და მას შემდეგ ლიდერობს პრემიუმ კარების ბაზარზე. ჩვენ ვთანამშრომლობთ საუკეთესო იტალიურ მწარმოებლებთან.'
                : language === 'ru'
                  ? 'UNION была основана в 1990 году и с тех пор задаёт стандарт на рынке премиальных дверей. Мы сотрудничаем с лучшими итальянскими производителями.'
                  : 'UNION was founded in 1990 and has since set the standard in the premium doors market. We partner with the finest Italian manufacturers.'}
            </p>
            <p className="text-[15px] leading-[1.7] text-muted-foreground">
              {language === 'ka'
                ? 'ჩვენი მისიაა შევქმნათ სივრცეები, რომლებიც ასახავენ მომხმარებლის ინდივიდუალურ სტილს.'
                : language === 'ru'
                  ? 'Наша миссия — создавать пространства, в которых отражается индивидуальный стиль клиента.'
                  : 'Our mission is to create spaces that reflect each customer’s individual style.'}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/3] overflow-hidden bg-surface">
              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80"
                alt="UNION showroom"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="py-12 border-t border-border">
          <h2 className="union-section-title mb-10">
            {language === 'ka' ? 'ჩვენი ღირებულებები' : language === 'ru' ? 'Наши ценности' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border bg-surface">
            {values.map((value, index) => (
              <motion.div
                key={value.title.en}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-6 md:p-8 ${index < values.length - 1 ? 'md:border-r border-border' : ''} ${
                  index < 2 ? 'border-b md:border-b-0 border-border' : ''
                }`}
              >
                <CheckCircle className="h-6 w-6 text-primary mb-4" strokeWidth={1.25} />
                <h3 className="text-[16px] font-semibold text-primary mb-2">{value.title[language] || value.title.en}</h3>
                <p className="text-[13px] text-muted-foreground leading-snug">{value.description[language] || value.description.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </UnionLayout>
  );
};

export default UnionAbout;
