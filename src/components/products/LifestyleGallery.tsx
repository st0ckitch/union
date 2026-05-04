import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  images: string[];
  title?: string;
}

/**
 * Lifestyle photo gallery rendered below the configurator on product pages —
 * mirrors union.ru's "interior context" photo strip. Click an image to open
 * a fullscreen lightbox.
 */
export function LifestyleGallery({ images, title }: Props) {
  const { language } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const heading = title ?? (
    language === 'ru' ? 'В интерьере'
    : language === 'en' ? 'In the interior'
    : 'ინტერიერში'
  );

  return (
    <section className="py-8 border-t">
      <h2 className="text-xl md:text-2xl font-semibold mb-5">{heading}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i)}
            className="block aspect-[4/3] overflow-hidden bg-neutral-100 group"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img src={images[lightbox]} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </section>
  );
}
