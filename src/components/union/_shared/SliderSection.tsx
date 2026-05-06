import { useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface SliderItem {
  id: string | number;
  href: string;
  image: string;
  title: ReactNode;
}

interface SliderSectionProps {
  /** Plain string for the title; styled with .union-section-title */
  title: ReactNode;
  items: SliderItem[];
  /** Optional below-grid CTA, e.g. "В КАТАЛОГ" */
  bottomCta?: { label: ReactNode; href: string };
  /** When true, item title uses `<p>` (no h3) — for stars / video tiles */
  titleAsParagraph?: boolean;
  /** Aspect ratio of the image area, eg "570/380" */
  aspect?: string;
  /** Whether items link via <a> (false = plain divs, useful for video tiles) */
  asLinks?: boolean;
}

/**
 * Reusable horizontal slider — mirrors union.ru's `.products-slider` /
 * `.trends-slider` / `.stars-slider` pattern. Square corners, no borders,
 * scale-on-hover image, light-weight title below.
 */
export function SliderSection({
  title,
  items,
  bottomCta,
  titleAsParagraph,
  aspect = '570/380',
  asLinks = true,
}: SliderSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.66;
    scrollRef.current.scrollBy({ left: dir === 'prev' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="union-container">
        <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
          <h2 className="union-section-title m-0">{title}</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('prev')}
              aria-label="Previous"
              className="text-black hover:text-[hsl(var(--accent))] transition-colors"
            >
              <svg width="77" height="18" viewBox="0 0 77 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.338 -0.94834L11.7529 -0.549764L4.05316 6.75398L2.2695 8.45299L10.2233 8.45299L77 8.45298L77 9.0272L77 9.60142L10.2233 9.60143L2.2695 9.60143L4.05316 11.3004L11.9184 18.7609L11.5 19.1595L11.0851 19.5547L2.49999 11.4085L2.19678e-05 9.02721L2.49999 6.64589L10.9196 -1.34354L11.338 -0.94834Z" fill="currentColor"/>
              </svg>
            </button>
            <button
              onClick={() => scroll('next')}
              aria-label="Next"
              className="text-black hover:text-[hsl(var(--accent))] transition-colors"
            >
              <svg width="77" height="18" viewBox="0 0 77 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M65.662 18.9483L65.2471 18.5498L72.9468 11.246L74.7305 9.54702H66.7767H0V8.9728V8.39858H66.7767H74.7305L72.9468 6.69957L65.0816 -0.760914L65.5 -1.15949L65.9149 -1.55469L74.5 6.59148L77 8.9728L74.5 11.3541L66.0804 19.3435L65.662 18.9483Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Edge-aligned slider — left edge follows union-container, content can extend right */}
      <div
        ref={scrollRef}
        className="union-edge-left flex gap-[30px] overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => {
          const Wrap = (asLinks ? Link : 'div') as any;
          const wrapProps = asLinks ? { to: item.href, className: 'block group' } : { className: 'block group' };
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="flex-shrink-0"
              style={{ width: 'min(570px, 80vw)' }}
            >
              <Wrap {...wrapProps}>
                <div
                  className="relative overflow-hidden bg-[#fafafa] mb-6"
                  style={{ aspectRatio: aspect }}
                >
                  {/* "scale" image clone for depth (matches union.ru elImgFirst behaviour) */}
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                  />
                  <img
                    src={item.image}
                    alt={typeof item.title === 'string' ? item.title : ''}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="relative w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                {titleAsParagraph ? (
                  <p className="union-card-title m-0">{item.title}</p>
                ) : (
                  <h3 className="union-card-title m-0">{item.title}</h3>
                )}
              </Wrap>
            </motion.div>
          );
        })}
        <div className="flex-shrink-0" style={{ width: 'max(15px, calc((100vw - 1700px) / 2))' }} />
      </div>

      {bottomCta && (
        <div className="union-container">
          <div className="flex justify-center mt-12 md:mt-16">
            <Link to={bottomCta.href} className="union-btn-dark">
              {bottomCta.label}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
