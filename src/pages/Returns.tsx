import { LegalPage } from '@/components/legal/LegalPage';

const Returns = () => (
  <LegalPage
    slug="returns"
    fallback={{
      title_ka: 'დაბრუნება',
      title_ru: 'Возврат',
      title_en: 'Returns',
    }}
  />
);

export default Returns;
