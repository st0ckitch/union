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

  return (
    <UnionLayout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid lg:grid-cols-2 gap-12 py-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold mb-6">
              {language === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ka' 
                ? 'გაქვთ კითხვები? ჩვენი გუნდი მზადაა დაგეხმაროთ.'
                : 'Have questions? Our team is ready to help.'}
            </p>

            <div className="space-y-6">
              <a href="tel:+995322000000" className="flex items-center gap-4 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">+995 32 2 00 00 00</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ka' ? 'ტელეფონი' : 'Phone'}
                  </p>
                </div>
              </a>

              <a href="mailto:info@union.ge" className="flex items-center gap-4 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">info@union.ge</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ka' ? 'ელ.ფოსტა' : 'Email'}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {language === 'ka' ? 'თბილისი, საქართველო' : 'Tbilisi, Georgia'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ka' ? 'მისამართი' : 'Address'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {language === 'ka' ? 'ორშ-შაბ: 10:00 - 19:00' : 'Mon-Sat: 10:00 - 19:00'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ka' ? 'სამუშაო საათები' : 'Working Hours'}
                  </p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="mt-8 bg-[#25D366] hover:bg-[#25D366]/90">
              <a href="https://wa.me/995322000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">
                {language === 'ka' ? 'მოგვწერეთ' : 'Send us a message'}
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
