import { Briefcase, Heart, Users, TrendingUp } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Careers = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კარიერა' : 'Careers' },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: language === 'ka' ? 'კარიერული ზრდა' : 'Career Growth',
      description: language === 'ka' 
        ? 'შესაძლებლობა პროფესიული განვითარებისა და წინსვლისთვის'
        : 'Opportunity for professional development and advancement',
    },
    {
      icon: Users,
      title: language === 'ka' ? 'გუნდური მუშაობა' : 'Team Work',
      description: language === 'ka' 
        ? 'მეგობრული და პროფესიონალური გუნდი'
        : 'Friendly and professional team',
    },
    {
      icon: Heart,
      title: language === 'ka' ? 'სოციალური პაკეტი' : 'Social Package',
      description: language === 'ka' 
        ? 'ჯანმრთელობის დაზღვევა და სხვა ბენეფიტები'
        : 'Health insurance and other benefits',
    },
  ];

  const openPositions = [
    {
      title: language === 'ka' ? 'გაყიდვების მენეჯერი' : 'Sales Manager',
      location: language === 'ka' ? 'თბილისი' : 'Tbilisi',
      type: language === 'ka' ? 'სრული განაკვეთი' : 'Full-time',
    },
    {
      title: language === 'ka' ? 'ინტერიერის დიზაინერი' : 'Interior Designer',
      location: language === 'ka' ? 'თბილისი' : 'Tbilisi',
      type: language === 'ka' ? 'სრული განაკვეთი' : 'Full-time',
    },
    {
      title: language === 'ka' ? 'მონტაჟის სპეციალისტი' : 'Installation Specialist',
      location: language === 'ka' ? 'თბილისი, ბათუმი' : 'Tbilisi, Batumi',
      type: language === 'ka' ? 'სრული განაკვეთი' : 'Full-time',
    },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-12">
            <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">
              {language === 'ka' ? 'კარიერა იუნიონში' : 'Careers at UNION'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === 'ka' 
                ? 'შემოგვიერთდი პროფესიონალთა გუნდს'
                : 'Join our team of professionals'}
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Open Positions */}
          <h2 className="text-2xl font-bold mb-6">
            {language === 'ka' ? 'ღია ვაკანსიები' : 'Open Positions'}
          </h2>
          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{position.title}</h3>
                    <p className="text-muted-foreground">
                      {position.location} • {position.type}
                    </p>
                  </div>
                  <Button variant="outline">
                    {language === 'ka' ? 'განაცხადი' : 'Apply'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              {language === 'ka' 
                ? 'ვერ იპოვეთ შესაბამისი ვაკანსია? გამოგვიგზავნეთ თქვენი CV:'
                : "Didn't find a suitable position? Send us your CV:"}
            </p>
            <Button asChild>
              <a href="mailto:hr@union.ge">hr@union.ge</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
