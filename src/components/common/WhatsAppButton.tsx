import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export function WhatsAppButton() {
  const message = encodeURIComponent('გამარჯობა! მაინტერესებს თქვენი პროდუქცია.');
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="WhatsApp-ით დაკავშირება"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
