import { useState } from 'react';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { pickLocalizedFromRow, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

export function ContactCtaBlock({ block }: Props) {
  const { language } = useLanguage();
  const { data: settings } = useSiteSettings();
  const title = pickLocalizedFromRow(block, 'title', language);
  const body = pickLocalizedFromRow(block, 'body', language);
  const data = (block.data as any) || {};

  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSending(true);
    try {
      const { error } = await supabase.from('consultations').insert([{
        name: form.name,
        phone: form.phone,
        message: form.message || null,
        status: 'new',
      }]);
      if (error) throw error;
      toast.success(language === 'ru' ? 'Заявка отправлена' : language === 'en' ? 'Request sent' : 'მოთხოვნა გაიგზავნა');
      setForm({ name: '', phone: '', message: '' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  const phoneHref = data.phone || settings?.phone;
  const emailHref = data.email || settings?.email;
  const waHref = data.whatsapp || settings?.whatsapp_number;

  return (
    <section className="py-16 bg-neutral-950 text-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {body && <p className="text-white/70 leading-relaxed mb-8">{body}</p>}

            <div className="space-y-3">
              {data.show_phone !== false && phoneHref && (
                <a href={`tel:${phoneHref}`} className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><Phone className="h-4 w-4" /></div>
                  {phoneHref}
                </a>
              )}
              {data.show_email !== false && emailHref && (
                <a href={`mailto:${emailHref}`} className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><Mail className="h-4 w-4" /></div>
                  {emailHref}
                </a>
              )}
              {data.show_whatsapp !== false && waHref && (
                <a href={`https://wa.me/${String(waHref).replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><MessageCircle className="h-4 w-4" /></div>
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          {data.show_callback_form !== false && (
            <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={language === 'ru' ? 'Имя' : language === 'en' ? 'Name' : 'სახელი'}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={language === 'ru' ? 'Телефон' : language === 'en' ? 'Phone' : 'ტელეფონი'}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={language === 'ru' ? 'Сообщение (необязательно)' : language === 'en' ? 'Message (optional)' : 'შეტყობინება (არასავალდებულო)'}
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <Button type="submit" disabled={sending} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {sending ? (language === 'ru' ? 'Отправка…' : language === 'en' ? 'Sending…' : 'იგზავნება…')
                         : (language === 'ru' ? 'Отправить' : language === 'en' ? 'Send' : 'გაგზავნა')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
