import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface CallbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional product context — appended to the message so the staff knows what page the visitor was on. */
  productContext?: { name: string; slug?: string; price?: number };
}

const COPY = {
  title:    { ru: 'Заказать обратный звонок', en: 'Request a callback',     ka: 'უკავშირდით' },
  subtitle: { ru: 'Оставьте контакты — мы перезвоним в течение часа в рабочее время.',
              en: 'Leave your details — we will call you back within an hour during business hours.',
              ka: 'დაგვიტოვეთ ნომერი — სამუშაო საათებში დაგიკავშირდებით ერთ საათში.' },
  name:     { ru: 'Имя',     en: 'Name',     ka: 'სახელი' },
  phone:    { ru: 'Телефон', en: 'Phone',    ka: 'ტელეფონი' },
  message:  { ru: 'Сообщение (необязательно)', en: 'Message (optional)', ka: 'შეტყობინება (არასავალდებულო)' },
  submit:   { ru: 'Отправить заявку', en: 'Send request', ka: 'გაგზავნა' },
  cancel:   { ru: 'Отмена', en: 'Cancel', ka: 'გაუქმება' },
  success:  { ru: 'Спасибо!', en: 'Thank you!', ka: 'მადლობა!' },
  willCall: { ru: 'Мы свяжемся с вами в ближайшее время.',
              en: 'We will contact you shortly.',
              ka: 'მალე დაგიკავშირდებით.' },
  close:    { ru: 'Закрыть', en: 'Close', ka: 'დახურვა' },
};

export function CallbackModal({ open, onOpenChange, productContext }: CallbackModalProps) {
  const { language } = useLanguage();
  const t = (k: keyof typeof COPY) => COPY[k][language as 'ru' | 'en' | 'ka'] || COPY[k].ka;

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const productLine = productContext
        ? `Product: ${productContext.name}${productContext.slug ? ` (/union/product/${productContext.slug})` : ''}${productContext.price ? ` — ${productContext.price} ₾` : ''}\n\n`
        : '';
      const { error } = await supabase.from('consultations').insert({
        name: form.name,
        phone: form.phone,
        message: `${productLine}${form.message}`.trim() || null,
        status: 'new',
      } as any);
      if (error) throw error;
      setSuccess(true);
      toast.success(t('success'));
    } catch (err: any) {
      toast.error(err?.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: '', phone: '', message: '' });
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(v) : close())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="text-base mb-1">{t('success')}</p>
            <p className="text-sm text-muted-foreground mb-5">{t('willCall')}</p>
            <Button onClick={close}>{t('close')}</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">{t('subtitle')}</p>

            {productContext && (
              <div className="bg-neutral-50 rounded p-3 text-sm">
                <span className="text-muted-foreground">{language === 'ru' ? 'Товар:' : language === 'en' ? 'Product:' : 'პროდუქტი:'}</span>{' '}
                <span className="font-medium">{productContext.name}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="cb-name">{t('name')} *</Label>
              <Input id="cb-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cb-phone">{t('phone')} *</Label>
              <Input id="cb-phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cb-message">{t('message')}</Label>
              <Textarea id="cb-message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={close}>{t('cancel')}</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> ...</> : t('submit')}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
