import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalizedFromRow, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

export function TextWithImageBlock({ block }: Props) {
  const { language } = useLanguage();
  const title = pickLocalizedFromRow(block, 'title', language);
  const subtitle = pickLocalizedFromRow(block, 'subtitle', language);
  const body = pickLocalizedFromRow(block, 'body', language);
  const data = (block.data as any) || {};
  const imagePosition: 'left' | 'right' = data.image_position === 'left' ? 'left' : 'right';

  const image = block.image_url && (
    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
      <img src={block.image_url} alt={title || ''} className="w-full h-full object-cover" />
    </div>
  );

  const text = (
    <div>
      {subtitle && <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">{subtitle}</p>}
      {title && <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">{title}</h2>}
      {body && (
        <div
          className="prose prose-sm md:prose max-w-none prose-p:text-muted-foreground prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </div>
  );

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {imagePosition === 'left' ? (
            <>
              {image}
              {text}
            </>
          ) : (
            <>
              {text}
              {image}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
