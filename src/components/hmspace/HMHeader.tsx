import { Link } from 'react-router-dom';
import { Globe, MapPin, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'navHome', href: '/' },
  { key: 'navAbout', href: '#about' },
  { key: 'navBrand', href: '#brand' },
  { key: 'unionNav', href: '/union' },
  { key: 'navProjects', href: '#values' },
  { key: 'navContact', href: '#contact' },
] as const;

export function HMHeader() {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4">
      <div className="max-w-[1280px] mx-auto">
        <div
          className={cn(
            'glass-pill flex items-center gap-4 md:gap-8 px-4 md:px-8 h-14 md:h-16 transition-all duration-300',
            scrolled ? 'rounded-full' : 'rounded-full',
          )}
          style={{ borderRadius: 9999 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <span className="font-serif text-xl md:text-2xl tracking-tight text-neutral-900">
              HM<span className="text-neutral-500">space</span>.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide text-neutral-700 mx-auto">
            {navItems.map((item) => {
              const isUnion = item.key === 'unionNav';
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={cn(
                    'hover:text-neutral-900 transition-colors font-medium',
                    isUnion && 'text-neutral-900',
                  )}
                >
                  {item.key === 'unionNav' ? 'UNION' : t(item.key)}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => setLanguage(language === 'ka' ? 'en' : 'ka')}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase font-medium">{language === 'ka' ? 'GE' : language === 'en' ? 'EN' : 'RU'}</span>
            </button>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-xs text-neutral-600">
              <MapPin className="h-4 w-4" />
              <span>Tbilisi</span>
            </span>
            <Link
              to="/union/catalog"
              className="ml-2 px-4 md:px-5 h-10 rounded-full bg-neutral-900 text-white text-xs md:text-sm font-semibold tracking-[0.15em] hover:bg-black transition-colors flex items-center whitespace-nowrap"
            >
              UNION
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            className="lg:hidden ml-auto text-neutral-800"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 glass-panel rounded-3xl px-6 py-5">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className="text-sm text-neutral-800 hover:text-neutral-900 py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.key === 'unionNav' ? 'UNION' : t(item.key)}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-3 mt-2 border-t border-neutral-200">
                <button onClick={() => setLanguage('ka')} className={cn('text-xs uppercase', language === 'ka' && 'font-bold text-neutral-900')}>GE</button>
                <button onClick={() => setLanguage('en')} className={cn('text-xs uppercase', language === 'en' && 'font-bold text-neutral-900')}>EN</button>
                <Link
                  to="/union/catalog"
                  className="ml-auto px-4 h-9 rounded-full bg-neutral-900 text-white text-xs font-semibold tracking-[0.15em] flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  UNION
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
