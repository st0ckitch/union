import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ContactForm } from '@/components/forms/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CONTACT_INFO } from '@/lib/constants';

const Contact = () => {
  const { language, t } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კონტაქტი' : 'Contact' },
  ];

  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid lg:grid-cols-2 gap-12 py-8">
          {/* Contact Form */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ka' 
                ? 'გამოგვიგზავნეთ შეტყობინება და მალე დაგიკავშირდებით' 
                : 'Send us a message and we will get back to you soon'}
            </p>

            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">
                  {language === 'ka' ? 'საკონტაქტო ინფორმაცია' : 'Contact Information'}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'ka' ? 'მისამართი' : 'Address'}
                      </p>
                      <p className="text-muted-foreground">
                        {t(CONTACT_INFO.address)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'ka' ? 'ტელეფონი' : 'Phone'}
                      </p>
                      <a 
                        href={`tel:${CONTACT_INFO.phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'ka' ? 'ელ-ფოსტა' : 'Email'}
                      </p>
                      <a 
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'ka' ? 'სამუშაო საათები' : 'Working Hours'}
                      </p>
                      <p className="text-muted-foreground">
                        {t(CONTACT_INFO.workingHours)}
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a]" asChild>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {language === 'ka' ? 'WhatsApp-ით დაკავშირება' : 'Chat on WhatsApp'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
