import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalizedFromRow, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

export function RichTextBlock({ block }: Props) {
  const { language } = useLanguage();
  const title = pickLocalizedFromRow(block, 'title', language);
  const body = pickLocalizedFromRow(block, 'body', language);

  if (!body && !title) return null;

  return (
    <section className="py-10">
      <div className="container max-w-3xl">
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>}
        {body && (
          <div
            className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-semibold"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </section>
  );
}
