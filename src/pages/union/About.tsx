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
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl font-bold mb-4">UNION</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'ka' 
              ? 'პრემიუმ კარებისა და ავეჯის ლიდერი საქართველოში. 35 წელზე მეტი გამოცდილებით ჩვენ ვთავაზობთ უმაღლესი ხარისხის იტალიურ პროდუქციას.'
              : 'The leader in premium doors and furniture in Georgia. With over 35 years of experience, we offer the highest quality Italian products.'}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-secondary rounded-lg"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label[language]}</p>
            </motion.div>
          ))}
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 py-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">
              {language === 'ka' ? 'ჩვენი ისტორია' : 'Our Story'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'ka'
                ? 'UNION დაარსდა 1990 წელს და მას შემდეგ ლიდერობს პრემიუმ კარებისა და ავეჯის ბაზარზე საქართველოში. ჩვენ ვთანამშრომლობთ საუკეთესო იტალიურ მწარმოებლებთან და ვთავაზობთ მომხმარებელს უმაღლესი ხარისხის პროდუქციას.'
                : 'UNION was founded in 1990 and has since led the premium doors and furniture market in Georgia. We partner with the best Italian manufacturers and offer customers the highest quality products.'}
            </p>
            <p className="text-muted-foreground">
              {language === 'ka'
                ? 'ჩვენი მისიაა შევქმნათ სივრცეები, რომლებიც ასახავენ მომხმარებლის ინდივიდუალურ სტილს და ხარისხისადმი მოთხოვნილებას.'
                : 'Our mission is to create spaces that reflect the individual style and quality requirements of our customers.'}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80"
              alt="UNION showroom"
              className="rounded-lg w-full object-cover aspect-video"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {language === 'ka' ? 'ჩვენი ღირებულებები' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card rounded-lg shadow-sm"
              >
                <CheckCircle className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">{value.title[language]}</h3>
                <p className="text-sm text-muted-foreground">{value.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </UnionLayout>
  );
};

export default UnionAbout;
