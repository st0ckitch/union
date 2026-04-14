import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_NAME, FOOTER_LINKS, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{SITE_NAME}</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-sm">
              პრემიუმ ხარისხის კარები, ავეჯი და აქსესუარები. 
              თანამედროვე დიზაინი და უმაღლესი სტანდარტები.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-3 hover:text-accent transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 hover:text-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>{t(CONTACT_INFO.address)}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer links */}
          <div>
            <h3 className="font-bold mb-4">{t(FOOTER_LINKS.company.title)}</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {t(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t(FOOTER_LINKS.support.title)}</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {t(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t(FOOTER_LINKS.legal.title)}</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {t(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} {SITE_NAME}. ყველა უფლება დაცულია.
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
            <span>განვადება TBC ბანკის პარტნიორობით</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
