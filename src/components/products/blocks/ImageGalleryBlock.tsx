import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalizedFromRow, pickI18n, ContentBlock } from '@/hooks/useProductContentBlocks';

interface Props { block: ContentBlock }

interface GalleryImage {
  url: string;
  caption_ka?: string;
  caption_ru?: string;
  caption_en?: string;
  video_url?: string;
}

export function ImageGalleryBlock({ block }: Props) {
  const { language } = useLanguage();
  const title = pickLocalizedFromRow(block, 'title', language);
  const data = (block.data as any) || {};
  const images: GalleryImage[] = Array.isArray(data.images) ? data.images : [];
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container">
        {title && <h2 className="text-xl md:text-2xl font-bold mb-6">{title}</h2>}
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {images.map((img, idx) => {
            const caption = pickI18n({ ka: img.caption_ka, ru: img.caption_ru, en: img.caption_en }, language);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setLightbox(img.video_url || img.url)}
                className="relative flex-shrink-0 w-64 md:w-80 aspect-[4/3] rounded-lg overflow-hidden group snap-start bg-secondary"
              >
                <img src={img.url} alt={caption || ''} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {img.video_url && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-7 w-7 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
                {caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                    <p className="text-xs text-white font-medium">{caption}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-white/70" onClick={() => setLightbox(null)}>
            <X className="h-8 w-8" />
          </button>
          {lightbox.match(/\.(mp4|webm|ogg)$/i) || lightbox.includes('youtube') || lightbox.includes('vimeo') ? (
            <iframe src={lightbox} className="w-full max-w-5xl aspect-video" allow="autoplay; encrypted-media" allowFullScreen />
          ) : (
            <img src={lightbox} alt="" className="max-w-full max-h-full object-contain" />
          )}
        </div>
      )}
    </section>
  );
}
