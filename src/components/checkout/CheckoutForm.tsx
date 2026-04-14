import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'სახელი აუცილებელია').max(100),
  customerEmail: z.string().email('არასწორი ელ-ფოსტა'),
  customerPhone: z.string().min(9, 'ტელეფონის ნომერი აუცილებელია').max(20),
  shippingAddress: z.string().min(10, 'მისამართი აუცილებელია').max(500),
  notes: z.string().max(500).optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const { language } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="customerName">
            {language === 'ka' ? 'სახელი და გვარი *' : 'Full Name *'}
          </Label>
          <Input
            id="customerName"
            {...register('customerName')}
            placeholder={language === 'ka' ? 'გიორგი მამულაშვილი' : 'John Doe'}
            className={errors.customerName ? 'border-destructive' : ''}
          />
          {errors.customerName && (
            <p className="text-sm text-destructive">{errors.customerName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerPhone">
            {language === 'ka' ? 'ტელეფონი *' : 'Phone *'}
          </Label>
          <Input
            id="customerPhone"
            type="tel"
            {...register('customerPhone')}
            placeholder="+995 XXX XXX XXX"
            className={errors.customerPhone ? 'border-destructive' : ''}
          />
          {errors.customerPhone && (
            <p className="text-sm text-destructive">{errors.customerPhone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerEmail">
          {language === 'ka' ? 'ელ-ფოსტა *' : 'Email *'}
        </Label>
        <Input
          id="customerEmail"
          type="email"
          {...register('customerEmail')}
          placeholder="example@email.com"
          className={errors.customerEmail ? 'border-destructive' : ''}
        />
        {errors.customerEmail && (
          <p className="text-sm text-destructive">{errors.customerEmail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="shippingAddress">
          {language === 'ka' ? 'მიტანის მისამართი *' : 'Shipping Address *'}
        </Label>
        <Textarea
          id="shippingAddress"
          {...register('shippingAddress')}
          placeholder={language === 'ka' 
            ? 'ქალაქი, ქუჩა, სახლის ნომერი, ბინა...' 
            : 'City, Street, House number, Apartment...'}
          rows={3}
          className={errors.shippingAddress ? 'border-destructive' : ''}
        />
        {errors.shippingAddress && (
          <p className="text-sm text-destructive">{errors.shippingAddress.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">
          {language === 'ka' ? 'დამატებითი ინფორმაცია' : 'Additional Notes'}
        </Label>
        <Textarea
          id="notes"
          {...register('notes')}
          placeholder={language === 'ka' 
            ? 'სპეციალური ინსტრუქციები მიწოდებისთვის...' 
            : 'Special delivery instructions...'}
          rows={2}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === 'ka' ? 'იგზავნება...' : 'Processing...'}
          </>
        ) : (
          language === 'ka' ? 'შეკვეთის გაფორმება' : 'Place Order'
        )}
      </Button>
    </form>
  );
}
