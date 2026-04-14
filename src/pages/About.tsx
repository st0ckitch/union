import { Target, Users, Award, Building } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'ჩვენს შესახებ' : 'About Us' },
  ];

  const stats = [
    { value: '15+', label: language === 'ka' ? 'წელი გამოცდილება' : 'Years Experience' },
    { value: '10,000+', label: language === 'ka' ? 'კმაყოფილი მომხმარებელი' : 'Happy Customers' },
    { value: '5,000+', label: language === 'ka' ? 'დასრულებული პროექტი' : 'Completed Projects' },
    { value: '3', label: language === 'ka' ? 'შოურუმი' : 'Showrooms' },
  ];

  const values = [
    {
      icon: Target,
      title: language === 'ka' ? 'ხარისხი' : 'Quality',
      description: language === 'ka' 
        ? 'ჩვენ ვთანამშრომლობთ მსოფლიოს წამყვან მწარმოებლებთან და გთავაზობთ უმაღლესი ხარისხის პროდუქციას.'
        : 'We partner with world-leading manufacturers to offer the highest quality products.',
    },
    {
      icon: Users,
      title: language === 'ka' ? 'მომსახურება' : 'Service',
      description: language === 'ka' 
        ? 'პროფესიონალური კონსულტაცია, მონტაჟი და გარანტიით უზრუნველყოფა.'
        : 'Professional consultation, installation, and warranty support.',
    },
    {
      icon: Award,
      title: language === 'ka' ? 'ინოვაცია' : 'Innovation',
      description: language === 'ka' 
        ? 'მუდმივად ვნერგავთ ახალ ტექნოლოგიებს და დიზაინის ტრენდებს.'
        : 'Constantly implementing new technologies and design trends.',
    },
    {
      icon: Building,
      title: language === 'ka' ? 'გამოცდილება' : 'Experience',
      description: language === 'ka' 
        ? '15 წელზე მეტი გამოცდილება ინტერიერის დიზაინსა და მშენებლობაში.'
        : 'Over 15 years of experience in interior design and construction.',
    },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'ka' ? 'ჩვენს შესახებ' : 'About Us'}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {language === 'ka' 
                ? 'იუნიონი არის საქართველოში წამყვანი კომპანია კარების, ავეჯისა და ინტერიერის აქსესუარების სფეროში. 15 წელზე მეტია ვთანამშრომლობთ იტალიურ და ევროპულ ბრენდებთან, რათა თქვენს სახლში შევიტანოთ უმაღლესი ხარისხი და თანამედროვე დიზაინი.'
                : 'UNION is a leading company in Georgia in the field of doors, furniture, and interior accessories. For over 15 years, we have been partnering with Italian and European brands to bring the highest quality and modern design to your home.'}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary text-primary-foreground rounded-2xl mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'ka' ? 'ჩვენი ღირებულებები' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {language === 'ka' ? 'ჩვენი ისტორია' : 'Our History'}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {language === 'ka' 
                    ? 'იუნიონი დაარსდა 2008 წელს თბილისში, მცირე ოჯახური ბიზნესის სახით. დამფუძნებლებმა მიზნად დაისახეს საქართველოში შემოეტანათ ევროპული ხარისხის კარები და ავეჯი.'
                    : 'UNION was founded in 2008 in Tbilisi as a small family business. The founders aimed to bring European quality doors and furniture to Georgia.'}
                </p>
                <p>
                  {language === 'ka' 
                    ? 'წლების განმავლობაში კომპანია იზრდებოდა და ვითარდებოდა. 2015 წელს გაიხსნა პირველი სრულფასოვანი შოურუმი, ხოლო 2020 წელს - მეორე ფილიალი ბათუმში.'
                    : 'Over the years, the company grew and developed. In 2015, the first full-scale showroom opened, and in 2020 - the second branch in Batumi.'}
                </p>
                <p>
                  {language === 'ka' 
                    ? 'დღეს იუნიონი წარმოადგენს წამყვანი იტალიური და ევროპული ბრენდების ოფიციალურ დისტრიბუტორს საქართველოში და მომსახურებას უწევს ათასობით მომხმარებელს.'
                    : 'Today, UNION is the official distributor of leading Italian and European brands in Georgia and serves thousands of customers.'}
                </p>
              </div>
            </div>
            <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="UNION Office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
