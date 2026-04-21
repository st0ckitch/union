import { LegalPage } from '@/components/legal/LegalPage';

const Warranty = () => (
  <LegalPage
    slug="warranty"
    fallback={{
      title_ka: 'გარანტია',
      title_ru: 'Гарантия',
      title_en: 'Warranty',
    }}
  />
);

export default Warranty;
