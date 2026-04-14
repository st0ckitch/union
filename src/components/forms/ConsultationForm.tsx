import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const consultationSchema = z.object({
  name: z.string().min(2, 'სახელი აუცილებელია').max(100),
  phone: z.string().min(9, 'ტელეფონის ნომერი აუცილებელია').max(20),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

interface ConsultationFormProps {
  onSuccess?: () => void;
}

export function ConsultationForm({ onSuccess }: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('consultations')
        .insert({
          name: data.name,
          phone: data.phone,
        });

      if (error) throw error;

      toast({
        title: language === 'ka' ? 'მოთხოვნა გაგზავნილია!' : 'Request sent!',
        description: language === 'ka' 
          ? 'მალე დაგიკავშირდებით' 
          : 'We will contact you soon',
      });
      reset();
      onSuccess?.();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="consult-name">
          {language === 'ka' ? 'სახელი' : 'Name'}
        </Label>
        <Input
          id="consult-name"
          {...register('name')}
          placeholder={language === 'ka' ? 'თქვენი სახელი' : 'Your name'}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="consult-phone">
          {language === 'ka' ? 'ტელეფონი' : 'Phone'}
        </Label>
        <Input
          id="consult-phone"
          type="tel"
          {...register('phone')}
          placeholder="+995 XXX XXX XXX"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === 'ka' ? 'იგზავნება...' : 'Sending...'}
          </>
        ) : (
          <>
            <Phone className="mr-2 h-4 w-4" />
            {language === 'ka' ? 'დამირეკეთ' : 'Call me back'}
          </>
        )}
      </Button>
    </form>
  );
}
