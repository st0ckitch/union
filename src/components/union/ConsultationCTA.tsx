import { Link } from 'react-router-dom';
import { MessageCircle, PlayCircle, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function ConsultationCTA() {
  const { t } = useLanguage();
  return (
    <section className="union-section bg-white">
      <div className="union-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/union/contact"
            className="group flex items-center gap-5 bg-surface hover:bg-surface-muted p-7 transition-colors border border-border"
          >
            <div className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[16px] md:text-[18px] font-medium text-primary">
                {t({ ka: 'კონსულტაცია', ru: 'Консультация', en: 'Consultation' })}
              </h3>
              <p className="text-[13px] text-muted-foreground mt-1">
                {t({ ka: 'პროფესიონალური რჩევა მოდელის არჩევაზე', ru: 'рекомендации по выбору продукта', en: 'professional product advice' })}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-primary opacity-50 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </Link>

          <Link
            to="/union/about"
            className="group flex items-center gap-5 bg-surface hover:bg-surface-muted p-7 transition-colors border border-border"
          >
            <div className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center shrink-0">
              <PlayCircle className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[16px] md:text-[18px] font-medium text-primary">
                {t({ ka: 'გაცნობა', ru: 'Обзор', en: 'Overview' })}
              </h3>
              <p className="text-[13px] text-muted-foreground mt-1">
                {t({ ka: 'გამოძახება რეალურ დროში', ru: 'выезд замерщика в удобное время', en: 'measurement at a convenient time' })}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-primary opacity-50 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
