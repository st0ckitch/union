import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useLanguage } from '@/contexts/LanguageContext';

const accents = [
  { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', label: 'ANTONIO LUPI' },
  { img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80', label: 'VALCUCINE' },
  { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', label: 'LISTONE GIORDANO' },
  { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', label: 'ANTRAX' },
  { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', label: 'OIKOS' },
  { img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', label: 'SAPIENSTONE' },
];

export function HMMainAccents() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-neutral-900">
            {t('mainAccents')}
          </h2>
        </div>

        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselContent className="-ml-4">
            {accents.map((item, idx) => (
              <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <div className="group relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs tracking-[0.3em] text-white/70 uppercase mb-2">Brand</p>
                    <p className="text-2xl text-white font-serif">{item.label}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
}
