import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ChevronRight, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface UnionMobileMenuProps {
  onClose: () => void;
}

const navKeys = ['catalog', 'showrooms', 'forBuyers', 'forDesigners', 'useful', 'sales', 'aboutCompany', 'contacts'] as const;
const navHrefs: Record<typeof navKeys[number], string> = {
  catalog: '/union/catalog',
  showrooms: '/union/showrooms',
  forBuyers: '/union/about',
  forDesigners: '/union/designers',
  useful: '/union/blog',
  sales: '/union/sale',
  aboutCompany: '/union/about',
  contacts: '/union/contact',
};

export function UnionMobileMenu({ onClose }: UnionMobileMenuProps) {
  const { t, language, setLanguage } = useLanguage();
  const { data: settings } = useSiteSettings();
  const phone = settings?.phone || '+7 (495) 110 49 79';
  const email = settings?.email || 'info@union.ru';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 lg:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.25 }}
        className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link to="/union" onClick={onClose} className="text-[18px] font-bold uppercase tracking-[0.04em] text-primary">
            UNION
          </Link>
          <button onClick={onClose} className="p-2 -mr-2 text-foreground" aria-label="Close">
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="py-2">
          {navKeys.map((key) => (
            <Link
              key={key}
              to={navHrefs[key]}
              onClick={onClose}
              className={`flex items-center justify-between px-5 py-3.5 border-b border-border text-[14px] font-semibold uppercase tracking-[0.04em] ${
                key === 'sales' ? 'text-accent-sale' : 'text-primary'
              }`}
            >
              <span>{t(key)}</span>
              <ChevronRight className="h-4 w-4 opacity-40" />
            </Link>
          ))}
        </nav>

        <div className="px-5 py-5 border-b border-border bg-surface">
          <div className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground mb-3">
            {t({ ka: 'ენა', ru: 'Язык', en: 'Language' })}
          </div>
          <div className="flex gap-2">
            {(['ka', 'ru', 'en'] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`flex-1 py-2 text-[12px] uppercase font-semibold tracking-wider border ${
                  language === code
                    ? 'border-primary text-primary bg-white'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-5 space-y-3">
          <a href={`tel:${phone.replace(/\s|\(|\)|-/g, '')}`} className="flex items-center gap-3 text-[14px] text-foreground">
            <Phone className="h-4 w-4 text-primary" strokeWidth={1.75} />
            <span className="font-semibold">{phone}</span>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-3 text-[14px] text-foreground">
            <Mail className="h-4 w-4 text-primary" strokeWidth={1.75} />
            <span>{email}</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
