import { useMemo, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  useDoorConfigurator,
  pickLocalized,
  OtdelkaOption,
  KorobkaOption,
  ModelOption,
  GlassOption,
  LockOption,
  PanelOption,
  DIMENSIONS_BY_TYPE,
  DimensionKey,
} from '@/hooks/useDoorConfigurator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  productId: string;
  basePrice: number;
  /** Drives which dimensions render and in what order. Defaults to 'generic'. */
  categoryType?: string | null;
  /** Boolean toggles for each dimension — fetched from products.has_*_variants */
  flags: {
    hasOtdelka: boolean;
    hasKorobka: boolean;
    hasModel:   boolean;
    hasGlass:   boolean;
    hasLock:    boolean;
    hasPanel:   boolean;
  };
  /** Called when any selection changes — parent can update its cart payload. */
  onSelectionChange?: (selection: ConfiguratorSelection) => void;
}

export interface ConfiguratorSelection {
  otdelka?: OtdelkaOption;
  korobka?: KorobkaOption;
  model?:   ModelOption;
  glass?:   GlassOption;
  lock?:    LockOption;
  panel?:   PanelOption;
  priceModifier: number;
  finalPrice:    number;
  summary:       string;
}

// Tab labels per dimension
const TAB_LABELS: Record<DimensionKey, { ru: string; en: string; ka: string }> = {
  otdelka: { ru: 'ОТДЕЛКИ', en: 'FINISHES', ka: 'მორთულობა' },
  korobka: { ru: 'КОРОБА',  en: 'FRAMES',   ka: 'ჩარჩოები' },
  model:   { ru: 'МОДЕЛЬ',  en: 'MODEL',    ka: 'მოდელი' },
  glass:   { ru: 'СТЕКЛО',  en: 'GLASS',    ka: 'მინა' },
  lock:    { ru: 'ЗАМОК',   en: 'LOCK',     ka: 'საკეტი' },
  panel:   { ru: 'ПАНЕЛЬ',  en: 'PANEL',    ka: 'პანელი' },
};

const HEADING_TEXT = {
  intro:    { ru: 'Скрытая дверь под покраску или отделку.', en: 'Hidden door for painting or finishing.', ka: 'ფარული კარი საღებავის ან დასრულების ქვეშ.' },
  variants: { ru: 'Варианты',          en: 'Variants',         ka: 'ვარიანტები' },
  more:     { ru: 'Подробнее',         en: 'More',             ka: 'მეტი' },
  others:   { ru: 'Другие материалы и отделки:', en: 'Other materials and finishes:', ka: 'სხვა მასალები და მორთულობები:' },
};

const t = (m: any, language: string) => {
  if (language === 'ru') return m.ru;
  if (language === 'en') return m.en;
  return m.ka;
};

export function DoorConfigurator({ productId, basePrice, categoryType, flags, onSelectionChange }: Props) {
  const { language } = useLanguage();
  const { data, isLoading } = useDoorConfigurator(productId, flags);

  const [otdelkaId, setOtdelkaId] = useState<string | null>(null);
  const [korobkaId, setKorobkaId] = useState<string | null>(null);
  const [modelId,   setModelId]   = useState<string | null>(null);
  const [glassId,   setGlassId]   = useState<string | null>(null);
  const [lockId,    setLockId]    = useState<string | null>(null);
  const [panelId,   setPanelId]   = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  // Lightbox state — pairs an array of image URLs with the active index
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number; title?: string } | null>(null);

  // Default-select the first option for every active dimension once data loads
  useEffect(() => {
    if (!data) return;
    if (flags.hasOtdelka && !otdelkaId && data.otdelkaOptions[0]) setOtdelkaId(data.otdelkaOptions[0].id);
    if (flags.hasKorobka && !korobkaId && data.korobkaOptions[0]) setKorobkaId(data.korobkaOptions[0].id);
    if (flags.hasModel   && !modelId   && data.modelOptions[0])   setModelId(data.modelOptions[0].id);
    if (flags.hasGlass   && !glassId   && data.glassOptions[0])   setGlassId(data.glassOptions[0].id);
    if (flags.hasLock    && !lockId    && data.lockOptions[0])    setLockId(data.lockOptions[0].id);
    if (flags.hasPanel   && !panelId   && data.panelOptions[0])   setPanelId(data.panelOptions[0].id);
  }, [data, flags, otdelkaId, korobkaId, modelId, glassId, lockId, panelId]);

  const sel = {
    otdelka: data?.otdelkaOptions.find(o => o.id === otdelkaId),
    korobka: data?.korobkaOptions.find(o => o.id === korobkaId),
    model:   data?.modelOptions.find(o => o.id === modelId),
    glass:   data?.glassOptions.find(o => o.id === glassId),
    lock:    data?.lockOptions.find(o => o.id === lockId),
    panel:   data?.panelOptions.find(o => o.id === panelId),
  };

  const priceModifier =
    (sel.otdelka?.price_modifier || 0) +
    (sel.korobka?.price_modifier || 0) +
    (sel.model?.price_modifier   || 0) +
    (sel.glass?.price_modifier   || 0) +
    (sel.lock?.price_modifier    || 0) +
    (sel.panel?.price_modifier   || 0);
  const finalPrice = basePrice + priceModifier;

  const otdelkaByGroup = useMemo(() => {
    if (!data) return new Map<string, OtdelkaOption[]>();
    const map = new Map<string, OtdelkaOption[]>();
    data.otdelkaOptions.forEach(o => {
      const arr = map.get(o.group_id) || [];
      arr.push(o);
      map.set(o.group_id, arr);
    });
    return map;
  }, [data]);

  // Bubble selection up
  useEffect(() => {
    if (!onSelectionChange) return;
    const parts: string[] = [];
    if (sel.model)   parts.push(pickLocalized(sel.model, 'name', language));
    if (sel.otdelka) parts.push(pickLocalized(sel.otdelka, 'label', language));
    if (sel.korobka) parts.push(pickLocalized(sel.korobka, 'name', language));
    if (sel.glass)   parts.push(pickLocalized(sel.glass, 'name', language));
    if (sel.lock)    parts.push(pickLocalized(sel.lock, 'name', language));
    if (sel.panel)   parts.push(pickLocalized(sel.panel, 'name', language));
    onSelectionChange({ ...sel, priceModifier, finalPrice, summary: parts.join(' / ') });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otdelkaId, korobkaId, modelId, glassId, lockId, panelId, priceModifier, finalPrice, language]);

  if (!Object.values(flags).some(Boolean)) return null;
  if (isLoading) {
    return (
      <div className="py-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading configurator…
      </div>
    );
  }
  if (!data) return null;

  const toggleGroup = (id: string) => {
    const next = new Set(expandedGroups);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedGroups(next);
  };

  // Decide which dimensions to render (in order) for this product's category_type.
  const dimensionOrder = (DIMENSIONS_BY_TYPE[categoryType || 'generic'] ?? DIMENSIONS_BY_TYPE.generic);
  const isFlagOn: Record<DimensionKey, boolean> = {
    otdelka: flags.hasOtdelka,
    korobka: flags.hasKorobka,
    model:   flags.hasModel,
    glass:   flags.hasGlass,
    lock:    flags.hasLock,
    panel:   flags.hasPanel,
  };
  // Active dimensions = ordered by category_type, filtered by flag, filtered by data presence.
  const dataLengthFor = (k: DimensionKey) => {
    switch (k) {
      case 'otdelka': return data.otdelkaOptions.length;
      case 'korobka': return data.korobkaOptions.length;
      case 'model':   return data.modelOptions.length;
      case 'glass':   return data.glassOptions.length;
      case 'lock':    return data.lockOptions.length;
      case 'panel':   return data.panelOptions.length;
    }
  };
  const activeDims = dimensionOrder.filter((k) => isFlagOn[k] && dataLengthFor(k) > 0);
  if (activeDims.length === 0) return null;

  // The model dimension stays outside the tabs (matches union.ru — Model picker
  // sits above the tabs as a "carousel" of named variants like Space/Tre/Quattro).
  const tabDims = activeDims.filter((k) => k !== 'model');
  const showModelAbove = activeDims.includes('model');

  // Render helpers ----------------------------------------------------------
  const renderModelGrid = () => (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t(TAB_LABELS.model, language)}
        </h3>
        {sel.model && <span className="text-sm text-foreground">{pickLocalized(sel.model, 'name', language)}</span>}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {data.modelOptions.map(o => {
          const active = o.id === modelId;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setModelId(o.id)}
              className={`relative border rounded overflow-hidden transition-all ${active ? 'ring-2 ring-primary border-primary' : 'border-gray-200 hover:border-gray-400'}`}
            >
              {o.image_url ? (
                <img src={o.image_url} alt={o.name_ka} className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-gray-100" />
              )}
              <div className="px-1 py-1 text-[10px] md:text-xs font-medium truncate">{pickLocalized(o, 'name', language)}</div>
            </button>
          );
        })}
      </div>
    </section>
  );

  const renderOtdelkaTab = () => {
    const renderedGroups = data.otdelkaGroups.filter(g => (otdelkaByGroup.get(g.id) || []).length > 0);
    const othersAfterId = renderedGroups[2]?.id ?? null;
    return (
      <div className="space-y-5">
        {renderedGroups.map((g) => {
          const opts = otdelkaByGroup.get(g.id) || [];
          const isExpanded = expandedGroups.has(g.id);
          const visibleOpts = isExpanded ? opts : opts.slice(0, 6);
          const hasMore = opts.length > 6;
          const showOthersHeader = g.id === othersAfterId;
          return (
            <div key={g.id}>
              {showOthersHeader && <p className="text-sm text-muted-foreground mb-3 mt-2">{t(HEADING_TEXT.others, language)}</p>}
              <p className="text-sm font-semibold text-foreground mb-2">
                {g.code && <span className="font-mono">{g.code.toUpperCase()}.</span>} {pickLocalized(g, 'description', language) || pickLocalized(g, 'name', language)}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {visibleOpts.map((o) => {
                  const active = o.id === otdelkaId;
                  const swatchColor = (o as any).swatch_color as string | null;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setOtdelkaId(o.id)}
                      title={`${o.code ? o.code + ' — ' : ''}${pickLocalized(o, 'label', language)}`}
                      className={`relative w-14 h-14 md:w-16 md:h-16 overflow-hidden transition border ${active ? 'ring-2 ring-primary border-primary' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      {swatchColor ? (
                        <div className="w-full h-full" style={{ background: swatchColor }} />
                      ) : o.swatch_image_url ? (
                        <img src={o.swatch_image_url} alt={o.label_ka} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[9px] text-gray-500 p-1 text-center leading-tight">{o.code || '?'}</div>
                      )}
                    </button>
                  );
                })}
                {hasMore && (
                  <button
                    type="button"
                    onClick={() => toggleGroup(g.id)}
                    className="w-14 h-14 md:w-16 md:h-16 border border-gray-300 hover:border-primary hover:text-primary text-gray-500 flex items-center justify-center transition"
                    aria-label={isExpanded ? 'Show less' : 'Show more'}
                  >
                    <Plus className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
                  </button>
                )}
              </div>
              {sel.otdelka && opts.some(o => o.id === sel.otdelka!.id) && (
                <p className="text-xs text-muted-foreground mt-2">
                  {sel.otdelka.code && <span className="font-mono mr-1">{sel.otdelka.code}</span>}
                  {pickLocalized(sel.otdelka, 'label', language)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Generic tile-grid renderer for korobka / glass / lock / panel
  const openLightboxFor = (o: any) => {
    const gallery: string[] = Array.isArray(o.gallery_image_urls) ? o.gallery_image_urls.filter(Boolean) : [];
    const fallback = o.preview_image_url || o.image_url;
    const images = gallery.length > 0 ? gallery : (fallback ? [fallback] : []);
    if (images.length === 0) return;
    setLightbox({ images, index: 0, title: pickLocalized(o, 'name', language) });
  };

  const renderTileGrid = (
    options: any[],
    selectedId: string | null,
    setId: (id: string) => void,
    selectedItem: any,
  ) => (
    <>
      <div className="flex items-baseline gap-2 mb-3">
        <p className="text-sm font-semibold text-foreground">{t(HEADING_TEXT.variants, language)}/</p>
        {selectedItem && <p className="text-sm text-muted-foreground">{pickLocalized(selectedItem, 'name', language)}</p>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map(o => {
          const active = o.id === selectedId;
          const galleryCount = Array.isArray(o.gallery_image_urls) ? o.gallery_image_urls.filter(Boolean).length : 0;
          return (
            <div key={o.id} className="space-y-2">
              <button
                type="button"
                onClick={() => setId(o.id)}
                className={`block w-full text-left border overflow-hidden transition ${active ? 'ring-2 ring-primary border-primary' : 'border-gray-200 hover:border-gray-400'}`}
              >
                {o.image_url ? (
                  <img src={o.image_url} alt={o.name_ka} className="w-full aspect-square object-cover" />
                ) : (
                  <div className="w-full aspect-square bg-gray-100" />
                )}
              </button>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">{pickLocalized(o, 'name', language)}</p>
                {pickLocalized(o, 'description', language) && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{pickLocalized(o, 'description', language)}</p>
                )}
                {(galleryCount > 0 || o.preview_image_url) && (
                  <button
                    type="button"
                    onClick={() => openLightboxFor(o)}
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {t(HEADING_TEXT.more, language)}
                    {galleryCount > 1 && <span className="text-muted-foreground">({galleryCount})</span>}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const renderTabContent = (k: DimensionKey) => {
    switch (k) {
      case 'otdelka': return renderOtdelkaTab();
      case 'korobka': return renderTileGrid(data.korobkaOptions, korobkaId, setKorobkaId, sel.korobka);
      case 'glass':   return renderTileGrid(data.glassOptions,   glassId,   setGlassId,   sel.glass);
      case 'lock':    return renderTileGrid(data.lockOptions,    lockId,    setLockId,    sel.lock);
      case 'panel':   return renderTileGrid(data.panelOptions,   panelId,   setPanelId,   sel.panel);
      case 'model':   return null;
    }
  };

  return (
    <div className="space-y-5 border-t border-b py-6">
      <p className="text-base text-foreground">{t(HEADING_TEXT.intro, language)}</p>

      {showModelAbove && data.modelOptions.length > 0 && renderModelGrid()}

      {tabDims.length > 0 && (
        <Tabs defaultValue={tabDims[0]} className="w-full">
          <TabsList
            className="w-full rounded-none border-b border-gray-200 bg-transparent p-0 h-auto"
            style={{ display: 'grid', gridTemplateColumns: `repeat(${tabDims.length}, minmax(0, 1fr))` }}
          >
            {tabDims.map((k) => (
              <TabsTrigger
                key={k}
                value={k}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none uppercase text-xs tracking-wider font-semibold py-3"
              >
                {t(TAB_LABELS[k], language)}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabDims.map((k) => (
            <TabsContent key={k} value={k} className="pt-5 mt-0">
              {renderTabContent(k)}
            </TabsContent>
          ))}
        </Tabs>
      )}

      {priceModifier !== 0 && (
        <div className="text-sm text-muted-foreground border-t pt-3">
          {language === 'ru' ? 'Итого с опциями' : language === 'en' ? 'Total with options' : 'ჯამი ოფციებით'}:{' '}
          <span className="font-semibold text-foreground">₾{finalPrice.toLocaleString()}</span>
          {' '}
          <span className="text-xs">({priceModifier > 0 ? '+' : ''}{priceModifier.toLocaleString()} ₾)</span>
        </div>
      )}

      {/* Lightbox slideshow — fired from "More about frame" link on each tile */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          {lightbox.title && (
            <p className="absolute top-6 left-6 text-white/80 text-sm font-medium">{lightbox.title}</p>
          )}

          {lightbox.images.length > 1 && (
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lb) => lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : null);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <img
            src={lightbox.images[lightbox.index]}
            alt={lightbox.title || ''}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.images.length > 1 && (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lb) => lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null);
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {lightbox.images.length > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tabular-nums">
              {lightbox.index + 1} / {lightbox.images.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
