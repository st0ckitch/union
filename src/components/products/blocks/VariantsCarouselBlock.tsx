import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalizedFromRow, pickI18n, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

interface VariantItem {
  image: string;
  title?: any;
  href?: string;
}

export function VariantsCarouselBlock({ block }: Props) {
  const { language } = useLanguage();
  const title = pickLocalizedFromRow(block, 'title', language);
  const data = (block.data as any) || {};
  const items: VariantItem[] = Array.isArray(data.items) ? data.items : [];
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-end justify-between mb-6">
          {title && <h2 className="text-xl md:text-2xl font-bold">{title}</h2>}
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-border hover:bg-secondary flex items-center justify-center"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-border hover:bg-secondary flex items-center justify-center"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {items.map((it, idx) => {
            const label = pickI18n(it.title, language);
            const Wrap: any = it.href ? Link : 'div';
            const props: any = it.href ? { to: it.href } : {};
            return (
              <Wrap key={idx} {...props} className="flex-shrink-0 w-56 md:w-64 snap-start group block">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
                  <img src={it.image} alt={label || ''} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                {label && <p className="mt-3 text-sm font-medium text-center">{label}</p>}
              </Wrap>
            );
          })}
        </div>
      </div>
    </section>
  );
}
