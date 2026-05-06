import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { UnionMegaMenu } from './UnionMegaMenu';
import { UnionMobileMenu } from './UnionMobileMenu';
import { UnionLogoOfficial } from './UnionLogo';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV = [
  { key: 'showrooms',    to: '/union/showrooms' },
  { key: 'forBuyers',    to: '/union/about' },
  { key: 'forDesigners', to: '/union/designers' },
  { key: 'useful',       to: '/union/blog' },
  { key: 'aboutCompany', to: '/union/about' },
  { key: 'contacts',     to: '/union/contact' },
] as const;

export function UnionHeader() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();

  const openMega = () => {
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null; }
    setShowMegaMenu(true);
  };
  const closeMegaDelayed = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setShowMegaMenu(false), 200);
  };

  const { items, toggleCart } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { data: settings } = useSiteSettings();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const phone = settings?.phone || '8 800 550 52 24';

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* === Top utility row === */}
      <div className="union-show-md bg-surface text-[14px] text-foreground">
        <div className="union-container flex items-center justify-end gap-6 py-2.5">
          <h1 className="mr-auto text-[14px] font-normal text-[#b5b3b3] tracking-[0.02em]">
            {t({ ka: 'კარები და ავეჯი ერთიანი სტილით', ru: 'Двери и мебель в едином стиле', en: 'Doors and furniture in a unified style' })}
            <span className="ml-1 text-[12px] align-super">®</span>
          </h1>

          <Link to="#" className="flex items-center gap-1 hover:text-[hsl(var(--accent))] transition-colors">
            <User className="h-4 w-4" strokeWidth={1.5} />
            <span>{t({ ka: 'შესვლა / რეგისტრაცია', ru: 'Войти/Регистрация', en: 'Sign in / Register' })}</span>
          </Link>

          <button onClick={toggleCart} className="relative flex items-center hover:text-[hsl(var(--accent))] transition-colors" aria-label="Cart">
            <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1.5 text-[14px]">
            {(['en', 'ru', 'ka'] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={cn(
                  'transition-colors uppercase',
                  language === code
                    ? 'text-[#5a5a5a] font-medium'
                    : 'text-[#b5b3b3] hover:text-[hsl(var(--accent))]'
                )}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href={`tel:${phone.replace(/\s|\(|\)|-/g, '')}`}
            className="font-medium hover:text-[hsl(var(--accent))] transition-colors"
          >
            {phone}
          </a>
        </div>
      </div>

      {/* === Main row: logo + nav === */}
      <div className="bg-white border-b border-[#e3e5ef]">
        <div className="union-container flex items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="union-show-lg-only-mobile p-2 -ml-2 text-foreground"
              onClick={() => setShowMobileMenu(true)}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>

            <Link to="/union" className="block">
              <UnionLogoOfficial className="h-10 md:h-12" />
            </Link>
          </div>

          {/* Desktop nav — right aligned, plain black, gold hover */}
          <nav
            className="union-show-lg-flex items-center gap-7"
            onMouseLeave={closeMegaDelayed}
          >
            <button
              onMouseEnter={openMega}
              onClick={() => setShowMegaMenu(v => !v)}
              className={cn(
                'flex items-center gap-2 text-[16px] font-normal text-black hover:text-[hsl(var(--accent))] transition-colors',
                showMegaMenu && 'text-[hsl(var(--accent))]'
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
              {t('catalog')}
            </button>

            {NAV.map((item) => {
              const isActive =
                location.pathname === item.to ||
                (item.to !== '/union' && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  className={cn(
                    'text-[16px] font-normal transition-colors',
                    isActive
                      ? 'text-[hsl(var(--accent))]'
                      : 'text-black hover:text-[hsl(var(--accent))]'
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}

            <Link
              to="/union/sale"
              className="text-[16px] font-medium text-[hsl(var(--accent))] hover:opacity-80 transition-opacity"
            >
              {t('sales')}
            </Link>

            <button
              onClick={() => setShowSearch(v => !v)}
              className="text-foreground hover:text-[hsl(var(--accent))] transition-colors"
              aria-label="Search"
            >
              {showSearch ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Search className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </nav>

          {/* Mobile cart icon */}
          <button onClick={toggleCart} className="union-show-lg-only-mobile relative p-2 text-foreground" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

        {showSearch && (
          <div className="border-t border-[#e3e5ef]">
            <div className="union-container py-3">
              <div className="flex items-center gap-3">
                <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="search"
                  placeholder={t('search')}
                  className="flex-1 h-10 bg-transparent border-none outline-none text-[15px] placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showMegaMenu && (
            <UnionMegaMenu
              onClose={() => setShowMegaMenu(false)}
              onMouseEnter={openMega}
              onMouseLeave={closeMegaDelayed}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showMobileMenu && (
          <UnionMobileMenu onClose={() => setShowMobileMenu(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
