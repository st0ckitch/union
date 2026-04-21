import { LegalPage } from '@/components/legal/LegalPage';

const Terms = () => (
  <LegalPage
    slug="terms"
    fallback={{
      title_ka: 'წესები და პირობები',
      title_ru: 'Условия использования',
      title_en: 'Terms & Conditions',
    }}
  />
);

export default Terms;
