import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HMFooter() {
  const { t, language } = useLanguage();
  const { data: settings } = useSiteSettings();

  const addr = language === 'ka' ? settings?.address_ka : settings?.address_en;
  const hours = language === 'ka' ? settings?.hours_ka : settings?.hours_en;

  return (
    <>
      {/* Newsletter strip */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-light mb-6">
              {t('newsletterTitle')}
            </h2>
            <form
              className="flex gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                required
              />
              <Button type="submit" className="bg-white text-black hover:bg-neutral-200 tracking-wider">
                {t('subscribe')}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-12 bg-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-3 gap-8">
          {settings?.phone && (
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-neutral-900 shrink-0" />
              <div>
                <p className="text-xs tracking-wider uppercase text-neutral-500">{t('contacts')}</p>
                <p className="text-neutral-900">{settings.phone}</p>
              </div>
            </div>
          )}
          {addr && (
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-neutral-900 shrink-0" />
              <div>
                <p className="text-xs tracking-wider uppercase text-neutral-500">{t('navShowroom')}</p>
                <p className="text-neutral-900">{addr}</p>
              </div>
            </div>
          )}
          {hours && (
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-neutral-900 shrink-0" />
              <div>
                <p className="text-xs tracking-wider uppercase text-neutral-500">{t('workingHours')}</p>
                <p className="text-neutral-900">{hours}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-white mb-5">{t('footerProducts')}</p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/union/catalog" className="hover:text-white">{t('catFurniture')}</Link></li>
                <li><Link to="/union/catalog/swing-doors" className="hover:text-white">{t('catDoors')}</Link></li>
                <li><Link to="#" className="hover:text-white">{t('catKitchen')}</Link></li>
                <li><Link to="#" className="hover:text-white">{t('catBathroom')}</Link></li>
                <li><Link to="#" className="hover:text-white">{t('catLighting')}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-white mb-5">{t('footerAbout')}</p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/union/about" className="hover:text-white">{t('aboutCompany')}</Link></li>
                <li><Link to="/union/showrooms" className="hover:text-white">{t('navShowroom')}</Link></li>
                <li><Link to="/union/blog" className="hover:text-white">{t('news')}</Link></li>
                <li><Link to="/union/careers" className="hover:text-white">{t('career')}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-white mb-5">{t('footerSupport')}</p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/union/contact" className="hover:text-white">{t('contacts')}</Link></li>
                <li><Link to="/union/delivery" className="hover:text-white">{t('services')}</Link></li>
                <li><Link to="/union/warranty" className="hover:text-white">{t('useful')}</Link></li>
                <li><Link to="/union/returns" className="hover:text-white">{t('forBuyer')}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-white mb-5">{t('footerConnect')}</p>
              <div className="flex items-center gap-4">
                {settings?.facebook_url && (
                  <a href={settings.facebook_url} target="_blank" rel="noreferrer" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
                )}
                {settings?.instagram_url && (
                  <a href={settings.instagram_url} target="_blank" rel="noreferrer" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
                )}
                {settings?.youtube_url && (
                  <a href={settings.youtube_url} target="_blank" rel="noreferrer" className="hover:text-white"><Youtube className="h-5 w-5" /></a>
                )}
                {!settings?.facebook_url && !settings?.instagram_url && !settings?.youtube_url && (
                  <>
                    <Facebook className="h-5 w-5 opacity-40" />
                    <Instagram className="h-5 w-5 opacity-40" />
                    <Youtube className="h-5 w-5 opacity-40" />
                  </>
                )}
              </div>
              {settings?.email && (
                <a href={`mailto:${settings.email}`} className="block mt-5 text-sm hover:text-white">
                  {settings.email}
                </a>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <p>{t('allRightsReserved')}</p>
            <div className="flex items-center gap-6">
              <Link to="/union/privacy" className="hover:text-white">{t('privacy')}</Link>
              <Link to="/union" className="hover:text-white">UNION</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
