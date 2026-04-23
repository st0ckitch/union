import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickI18n, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

interface Tile {
  icon?: string;
  title?: any;
  description?: any;
  url?: string;
}

export function CtaTilesBlock({ block }: Props) {
  const { language } = useLanguage();
  const data = (block.data as any) || {};
  const tiles: Tile[] = Array.isArray(data.tiles) ? data.tiles : [];
  if (tiles.length === 0) return null;

  return (
    <section className="py-8">
      <div className="container">
        <div className={`grid gap-4 ${tiles.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {tiles.map((tile, idx) => {
            const IconComp: any = tile.icon && (LucideIcons as any)[tile.icon];
            const title = pickI18n(tile.title, language);
            const desc = pickI18n(tile.description, language);
            const Wrap: any = tile.url ? Link : 'div';
            const wrapProps: any = tile.url ? (tile.url.startsWith('http') ? { to: tile.url, target: '_blank' } : { to: tile.url }) : {};
            return (
              <Wrap key={idx} {...wrapProps} className="group block border border-border rounded-lg p-6 md:p-8 hover:border-primary transition-colors bg-background">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {IconComp ? <IconComp className="h-6 w-6" /> : <span className="font-bold">?</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    {title && <h3 className="font-semibold text-lg mb-1">{title}</h3>}
                    {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
                  </div>
                </div>
              </Wrap>
            );
          })}
        </div>
      </div>
    </section>
  );
}
