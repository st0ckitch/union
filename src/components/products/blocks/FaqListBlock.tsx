import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalizedFromRow, pickI18n, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

interface FaqItem {
  q_ka?: string; q_ru?: string; q_en?: string;
  a_ka?: string; a_ru?: string; a_en?: string;
}

export function FaqListBlock({ block }: Props) {
  const { language } = useLanguage();
  const title = pickLocalizedFromRow(block, 'title', language);
  const data = (block.data as any) || {};
  const items: FaqItem[] = Array.isArray(data.items) ? data.items : [];

  if (items.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container max-w-3xl">
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{title}</h2>}
        <Accordion type="single" collapsible className="w-full">
          {items.map((it, idx) => {
            const q = pickI18n({ ka: it.q_ka, ru: it.q_ru, en: it.q_en }, language);
            const a = pickI18n({ ka: it.a_ka, ru: it.a_ru, en: it.a_en }, language);
            return (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: a }} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
