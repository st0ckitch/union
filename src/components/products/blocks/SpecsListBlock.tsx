import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalizedFromRow, pickI18n, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

interface SpecColumn {
  heading?: { ka?: string; ru?: string; en?: string };
  items?: Array<{ ka?: string; ru?: string; en?: string }>;
}

export function SpecsListBlock({ block }: Props) {
  const { language } = useLanguage();
  const title = pickLocalizedFromRow(block, 'title', language);
  const data = (block.data as any) || {};
  const columns: SpecColumn[] = Array.isArray(data.columns) ? data.columns : [];

  if (columns.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container">
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-8">{title}</h2>}
        <div className="bg-secondary/40 rounded-lg p-6 md:p-10">
          <div className={`grid gap-8 md:gap-12 ${columns.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
            {columns.map((col, idx) => {
              const heading = pickI18n(col.heading, language);
              return (
                <div key={idx}>
                  {heading && <h3 className="font-semibold text-lg mb-4">{heading}</h3>}
                  <ul className="space-y-3">
                    {(col.items || []).map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{pickI18n(item, language)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
