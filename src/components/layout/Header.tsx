import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_NAME, NAV_LINKS, CATEGORIES, CONTACT_INFO, UI_TEXT } from '@/lib/constants';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { totalItems, openCart } = useCart();
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="header-top py-2">
        <div className="container flex items-center justify-between text-sm">
          <div className="hidden md:flex items-center gap-6">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <span className="opacity-80">{t(CONTACT_INFO.workingHours)}</span>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setLanguage(language === 'ka' ? 'ru' : 'ka')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {language === 'ka' ? 'RU' : 'GE'}
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background border-b shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                {SITE_NAME}
              </h1>
            </Link>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder={t(UI_TEXT.searchPlaceholder)}
                  className="w-full pl-10 pr-4 h-11 bg-secondary border-0"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Mobile search toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Consultation button */}
              <Button
                variant="outline"
                className="hidden lg:flex gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link to="/contact">
                  <Phone className="h-4 w-4" />
                  {t(UI_TEXT.consultation)}
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile search */}
          {isSearchOpen && (
            <div className="mt-4 md:hidden">
              <div className="relative">
                <Input
                  type="search"
                  placeholder={t(UI_TEXT.searchPlaceholder)}
                  className="w-full pl-10 pr-4 h-11 bg-secondary border-0"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:block border-t bg-background">
          <div className="container">
            <ul className="flex items-center">
              <li>
                <Link
                  to={NAV_LINKS.home.path}
                  className="block px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  {t(NAV_LINKS.home)}
                </Link>
              </li>
              
              {/* Catalog dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('catalog')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium hover:text-primary transition-colors">
                  {t(NAV_LINKS.catalog)}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", activeMegaMenu === 'catalog' && "rotate-180")} />
                </button>
                
                {activeMegaMenu === 'catalog' && (
                  <MegaMenu onClose={() => setActiveMegaMenu(null)} />
                )}
              </li>

              <li>
                <Link
                  to={NAV_LINKS.about.path}
                  className="block px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  {t(NAV_LINKS.about)}
                </Link>
              </li>
              <li>
                <Link
                  to={NAV_LINKS.showrooms.path}
                  className="block px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  {t(NAV_LINKS.showrooms)}
                </Link>
              </li>
              <li>
                <Link
                  to={NAV_LINKS.designers.path}
                  className="block px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  {t(NAV_LINKS.designers)}
                </Link>
              </li>
              <li>
                <Link
                  to={NAV_LINKS.sale.path}
                  className="block px-4 py-3 text-sm font-medium text-sale hover:opacity-80 transition-colors"
                >
                  {t(NAV_LINKS.sale)}
                </Link>
              </li>
              <li>
                <Link
                  to={NAV_LINKS.blog.path}
                  className="block px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  {t(NAV_LINKS.blog)}
                </Link>
              </li>
              <li>
                <Link
                  to={NAV_LINKS.contact.path}
                  className="block px-4 py-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  {t(NAV_LINKS.contact)}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
