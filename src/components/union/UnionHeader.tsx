import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, Phone, User, ChevronDown, X, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { UnionMegaMenu } from './UnionMegaMenu';
import { UnionMobileMenu } from './UnionMobileMenu';
import { UnionLogoOfficial } from './UnionLogo';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV = [
  { key: 'catalog',      to: '/union/catalog',     hasDropdown: true,  isCatalog: true },
  { key: 'showrooms',    to: '/union/showrooms',   hasDropdown: false },
  { key: 'forBuyers',    to: '/union/about',       hasDropdown: true },
  { key: 'forDesigners', to: '/union/designers',   hasDropdown: false },
  { key: 'useful',       to: '/union/blog',        hasDropdown: true },
  { key: 'sales',        to: '/union/sale',        hasDropdown: false, isSale: true },
  { key: 'aboutCompany', to: '/union/about',       hasDropdown: true },
  { key: 'contacts',     to: '/union/contact',     hasDropdown: false },
] as const;

export function UnionHeader() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();

  const openMega = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setShowMegaMenu(true);
  };

  const closeMegaDelayed = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setShowMegaMenu(false), 160);
  };

  const { items, toggleCart } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { data: settings } = useSiteSettings();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const phone = settings?.phone || '+7 (495) 110 49 79';

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* === Utility row === */}
      <div className="hidden md:block bg-surface text-[12px] text-foreground/80 border-b border-border">
        <div className="union-container flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <span className="hidden lg:inline">
              {t({ ka: 'კარები და ავეჯი ერთ სტილში', ru: 'Двери и мебель в одном стиле', en: 'Doors and furniture in one style' })}
            </span>
            <Link to="/union/showrooms" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
              {t({ ka: 'შოურუმები', ru: 'Шоурумы', en: 'Showrooms' })}
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link to="#" className="hover:text-primary transition-colors">
              {t({ ka: 'შესვლა / რეგისტრაცია', ru: 'Войти / Регистрация', en: 'Sign in / Register' })}
            </Link>
            <a href={`tel:${phone.replace(/\s|\(|\)|-/g, '')}`} className="flex items-center gap-1.5 font-semibold hover:text-primary transition-colors">
              <Phone className="h-3.5 w-3.5" strokeWidth={2} />
              {phone}
            </a>
            <div className="flex items-center gap-0.5 text-[11px]">
              {(['ka', 'ru', 'en'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={cn(
                    'px-1.5 py-0.5 uppercase font-semibold tracking-wider transition-colors',
                    language === code
                      ? 'text-primary border-b border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === Main row: logo + actions === */}
      <div className="bg-white">
        <div className="union-container flex items-center justify-between gap-4 py-4">
          <button
            type="button"
            className="lg:hidden p-2 -ml-2 text-foreground"
            onClick={() => setShowMobileMenu(true)}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <Link to="/union" className="flex items-center text-primary">
            <UnionLogoOfficial className="h-9 md:h-11 lg:h-12" />
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <div className="hidden md:block relative">
              {showSearch ? (
                <div className="flex items-center gap-1">
                  <Input
                    type="search"
                    placeholder={t('search')}
                    className="w-56 h-10 rounded-none border-border focus-visible:ring-primary"
                    autoFocus
                  />
                  <button onClick={() => setShowSearch(false)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Close search">
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)} className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Search">
                  <Search className="h-5 w-5" strokeWidth={1.5} />
                </button>
              )}
            </div>

            <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Account">
              <User className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <button onClick={toggleCart} className="relative p-2 text-foreground hover:text-primary transition-colors" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent-sale text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* === Nav row === */}
      <nav className="hidden lg:block border-y border-border bg-white">
        <div className="union-container">
          <ul className="flex items-stretch justify-center gap-1">
            {NAV.map((item) => {
              const isActive =
                location.pathname === item.to ||
                (item.to !== '/union' && location.pathname.startsWith(item.to));
              const wrapperProps = item.isCatalog
                ? { onMouseEnter: openMega, onMouseLeave: closeMegaDelayed }
                : {};
              return (
                <li key={item.key} className="relative" {...wrapperProps}>
                  <Link
                    to={item.to}
                    className={cn(
                      'flex items-center gap-1 px-4 py-4 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors',
                      item.isSale && 'text-accent-sale hover:text-accent-sale-hover',
                      !item.isSale && 'text-primary hover:text-accent-sale',
                      isActive && !item.isSale && 'border-b-2 border-primary'
                    )}
                  >
                    {t(item.key)}
                    {item.hasDropdown && <ChevronDown className="h-3 w-3" strokeWidth={2} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <AnimatePresence>
          {showMegaMenu && (
            <UnionMegaMenu
              onClose={() => setShowMegaMenu(false)}
              onMouseEnter={openMega}
              onMouseLeave={closeMegaDelayed}
            />
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {showMobileMenu && (
          <UnionMobileMenu onClose={() => setShowMobileMenu(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
