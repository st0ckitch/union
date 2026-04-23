import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalizedFromRow, pickI18n, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

interface Callout {
  number: number;
  x: number; // % from left
  y: number; // % from top
  label?: any;
}

export function TechnicalDiagramBlock({ block }: Props) {
  const { language } = useLanguage();
  const title = pickLocalizedFromRow(block, 'title', language);
  const subtitle = pickLocalizedFromRow(block, 'subtitle', language);
  const data = (block.data as any) || {};
  const callouts: Callout[] = Array.isArray(data.callouts) ? data.callouts : [];

  if (!block.image_url) return null;

  return (
    <section className="py-12 bg-neutral-950 text-white">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr,320px] gap-8 items-start">
          <div className="relative rounded-lg overflow-hidden bg-neutral-900">
            <img src={block.image_url} alt={title || ''} className="w-full h-auto" />
            {callouts.map((c) => (
              <div
                key={c.number}
                className="absolute w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-lg ring-2 ring-white/30 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
              >
                {c.number}
              </div>
            ))}
          </div>

          <div className="space-y-6 lg:pt-4">
            <div>
              {subtitle && <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-2">{subtitle}</p>}
              {title && <h2 className="text-2xl md:text-3xl font-light">{title}</h2>}
            </div>

            <ol className="space-y-2">
              {callouts.map((c) => (
                <li key={c.number} className="flex items-start gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground text-[11px] font-bold flex items-center justify-center">
                    {c.number}
                  </span>
                  <span className="text-white/80 leading-relaxed">{pickI18n(c.label, language)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
