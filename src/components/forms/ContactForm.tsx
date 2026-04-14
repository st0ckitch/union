import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const contactSchema = z.object({
  name: z.string().min(2, 'სახელი აუცილებელია').max(100),
  phone: z.string().min(9, 'ტელეფონის ნომერი აუცილებელია').max(20),
  email: z.string().email('არასწორი ელ-ფოსტა').optional().or(z.literal('')),
  message: z.string().min(10, 'შეტყობინება უნდა იყოს მინიმუმ 10 სიმბოლო').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('consultations')
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          message: data.message,
        });

      if (error) throw error;

      toast({
        title: language === 'ka' ? 'შეტყობინება გაგზავნილია!' : 'Message sent!',
        description: language === 'ka' 
          ? 'მალე დაგიკავშირდებით' 
          : 'We will contact you soon',
      });
      reset();
    } catch (error) {
      toast({
        title: language === 'ka' ? 'შეცდომა' : 'Error',
        description: language === 'ka' 
          ? 'გთხოვთ სცადოთ თავიდან' 
          : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          {language === 'ka' ? 'სახელი *' : 'Name *'}
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder={language === 'ka' ? 'თქვენი სახელი' : 'Your name'}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          {language === 'ka' ? 'ტელეფონი *' : 'Phone *'}
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="+995 XXX XXX XXX"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          {language === 'ka' ? 'ელ-ფოსტა' : 'Email'}
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="example@email.com"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          {language === 'ka' ? 'შეტყობინება *' : 'Message *'}
        </Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder={language === 'ka' ? 'თქვენი შეტყობინება...' : 'Your message...'}
          rows={5}
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === 'ka' ? 'იგზავნება...' : 'Sending...'}
          </>
        ) : (
          language === 'ka' ? 'გაგზავნა' : 'Send'
        )}
      </Button>
    </form>
  );
}
