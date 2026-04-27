import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, Phone, User, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UnionMegaMenu } from './UnionMegaMenu';
import { UnionMobileMenu } from './UnionMobileMenu';
import { UnionLogoOfficial } from './UnionLogo';
import { AnimatePresence } from 'framer-motion';

export function UnionHeader() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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
  const { language, setLanguage, t } = useLanguage();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo — official 35-year UNION lockup, language-aware */}
          <Link to="/union" className="flex items-center text-neutral-900">
            <UnionLogoOfficial className="h-10 md:h-12 lg:h-14" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMegaDelayed}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors font-medium text-sm">
                <Menu className="h-4 w-4" />
                {t('catalog')}
              </button>
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

            <Link to="/union/showrooms" className="px-3 py-2 text-foreground hover:text-primary transition-colors text-sm">
              {t('showrooms')}
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors text-sm">
                {t('forBuyers')}
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            <Link to="/union/designers" className="px-3 py-2 text-foreground hover:text-primary transition-colors text-sm">
              {t('forDesigners')}
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors text-sm">
                {t('useful')}
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            <Link to="/union/sale" className="px-3 py-2 text-[000] font-bold hover:opacity-80 transition-opacity text-sm">
              {t('sales')}
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors text-sm">
                {t('aboutCompany')}
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            <Link to="/union/contact" className="px-3 py-2 text-foreground hover:text-primary transition-colors text-sm">
              {t('contacts')}
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 text-sm border-r border-border pr-3 mr-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs ${language === 'en' ? 'bg-muted font-medium' : 'hover:bg-muted/50'}`}
                title="English version"
              >
                EN
              </button>
              <a
                href="https://union.ru/"
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 rounded text-xs hover:bg-muted/50"
                title="Russian — opens union.ru"
              >
                RU
              </a>
              <button
                onClick={() => setLanguage('ka')}
                className={`px-2 py-1 rounded text-xs ${language === 'ka' ? 'bg-muted font-medium' : 'hover:bg-muted/50'}`}
                title="Georgian version"
              >
                GE
              </button>
            </div>

            {/* Search */}
            <div className="relative hidden md:block">
              {showSearch ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder={t('search')}
                    className="w-48"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSearch(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* User */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <UnionMobileMenu onClose={() => setShowMobileMenu(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
