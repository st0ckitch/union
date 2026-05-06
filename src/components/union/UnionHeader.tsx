import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, User, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UnionMegaMenu } from './UnionMegaMenu';
import { UnionMobileMenu } from './UnionMobileMenu';
import { UnionLogoOfficial } from './UnionLogo';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const PHONE = '8 499 110 49 70';

export function UnionHeader() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const closeTimer = useRef<number | null>(null);

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
  const { language, setLanguage } = useLanguage();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Tagline + auth labels (multilingual; mirrors union.ru top bar)
  const tagline = language === 'ru'
    ? 'Двери и мебель в едином стиле®'
    : language === 'en'
    ? 'Doors & furniture in a single style®'
    : 'კარები და ავეჯი ერთიანი სტილით®';
  const loginLabel = language === 'ru' ? 'Войти/Регистрация' : language === 'en' ? 'Sign In / Register' : 'შესვლა / რეგისტრაცია';

  // Main nav labels (mirrors union.ru КАТАЛОГ ШОУРУМЫ ПОКУПАТЕЛЯМ ДИЗАЙНЕРАМ ПОЛЕЗНОЕ АКЦИИ% О КОМПАНИИ КОНТАКТЫ)
  const navLabels = {
    catalog:    language === 'ru' ? 'КАТАЛОГ'      : language === 'en' ? 'CATALOG'    : 'კატალოგი',
    showrooms:  language === 'ru' ? 'ШОУРУМЫ'      : language === 'en' ? 'SHOWROOMS'  : 'შოურუმები',
    forBuyers:  language === 'ru' ? 'ПОКУПАТЕЛЯМ'  : language === 'en' ? 'FOR BUYERS' : 'მყიდველებს',
    forDesign:  language === 'ru' ? 'ДИЗАЙНЕРАМ'   : language === 'en' ? 'DESIGNERS'  : 'დიზაინერებს',
    useful:     language === 'ru' ? 'ПОЛЕЗНОЕ'     : language === 'en' ? 'USEFUL'     : 'სასარგებლო',
    sale:       language === 'ru' ? 'АКЦИИ'        : language === 'en' ? 'SALE'       : 'აქციები',
    aboutUs:    language === 'ru' ? 'О КОМПАНИИ'   : language === 'en' ? 'ABOUT'      : 'კომპანია',
    contacts:   language === 'ru' ? 'КОНТАКТЫ'     : language === 'en' ? 'CONTACTS'   : 'კონტაქტი',
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* ─────────── Top promo bar (slim gray) — mirrors union.ru `top-block` ─────────── */}
      <div className="hidden lg:block bg-[#f5f5f5] border-b border-[#e7e7e7]">
        <div className="container">
          <div className="flex items-center justify-between text-[12px] text-[#666] py-1.5">
            <span className="tracking-wide">{tagline}</span>
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <User className="h-3.5 w-3.5" />
                <span>{loginLabel}</span>
              </button>
              <button
                onClick={toggleCart}
                className="relative flex items-center hover:text-foreground transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2 text-[12px]">
                <button
                  onClick={() => setLanguage('en')}
                  className={cn('uppercase transition-colors', language === 'en' ? 'text-foreground font-semibold' : 'hover:text-foreground')}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={cn('uppercase transition-colors', language === 'ru' ? 'text-foreground font-semibold' : 'hover:text-foreground')}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage('ka')}
                  className={cn('uppercase transition-colors', language === 'ka' ? 'text-foreground font-semibold' : 'hover:text-foreground')}
                >
                  GE
                </button>
              </div>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-foreground font-medium tracking-tight hover:underline">
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────── Main header (logo + nav) ─────────── */}
      <div className="border-b border-[#e7e7e7]">
        <div className="container">
          <div className="flex items-center justify-between gap-4 py-3 lg:py-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden -ml-2"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo — official 35-year UNION lockup, larger size to match union.ru */}
            <Link to="/union" className="flex items-center text-neutral-900 shrink-0">
              <UnionLogoOfficial className="h-12 md:h-14 lg:h-16" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-1 text-[13px] font-medium tracking-wide">
              {/* КАТАЛОГ — bold, with hamburger icon */}
              <div
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMegaDelayed}
              >
                <button
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 transition-colors',
                    showMegaMenu ? 'text-primary' : 'text-foreground hover:text-primary'
                  )}
                >
                  {showMegaMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  <span className="font-semibold">{navLabels.catalog}</span>
                </button>
              </div>

              <Link to="/union/showrooms" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                {navLabels.showrooms}
              </Link>

              <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors">
                {navLabels.forBuyers}
                <ChevronDown className="h-3 w-3" />
              </button>

              <Link to="/union/designers" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                {navLabels.forDesign}
              </Link>

              <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors">
                {navLabels.useful}
                <ChevronDown className="h-3 w-3" />
              </button>

              {/* АКЦИИ % — sale link with red percent */}
              <Link to="/union/sale" className="flex items-center px-3 py-2 text-foreground hover:opacity-80 transition-opacity">
                {navLabels.sale}
                <span className="ml-1 text-[#e63946] font-bold">%</span>
              </Link>

              <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors">
                {navLabels.aboutUs}
                <ChevronDown className="h-3 w-3" />
              </button>

              <Link to="/union/contact" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                {navLabels.contacts}
              </Link>
            </nav>

            {/* Mobile cart icon (top promo bar is desktop-only) */}
            <button
              onClick={toggleCart}
              className="lg:hidden relative flex items-center px-2"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-width mega menu (rendered outside the container so it can span 100% width) */}
      <AnimatePresence>
        {showMegaMenu && (
          <UnionMegaMenu
            onClose={() => setShowMegaMenu(false)}
            onMouseEnter={openMega}
            onMouseLeave={closeMegaDelayed}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <UnionMobileMenu onClose={() => setShowMobileMenu(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
