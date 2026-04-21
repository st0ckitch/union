import { LegalPage } from '@/components/legal/LegalPage';

const Delivery = () => (
  <LegalPage
    slug="delivery"
    fallback={{
      title_ka: 'მიწოდება',
      title_ru: 'Доставка',
      title_en: 'Delivery',
    }}
  />
);

export default Delivery;
