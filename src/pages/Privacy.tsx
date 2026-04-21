import { LegalPage } from '@/components/legal/LegalPage';

const Privacy = () => (
  <LegalPage
    slug="privacy"
    fallback={{
      title_ka: 'კონფიდენციალურობის პოლიტიკა',
      title_ru: 'Политика конфиденциальности',
      title_en: 'Privacy Policy',
    }}
  />
);

export default Privacy;
