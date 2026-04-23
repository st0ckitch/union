import { useMemo, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDoorConfigurator, pickLocalized, OtdelkaOption, KorobkaOption, ModelOption } from '@/hooks/useDoorConfigurator';
import { Loader2 } from 'lucide-react';

interface Props {
  productId: string;
  basePrice: number;
  flags: { hasOtdelka: boolean; hasKorobka: boolean; hasModel: boolean };
  /** Called when any selection changes — parent can update its cart payload. */
  onSelectionChange?: (selection: ConfiguratorSelection) => void;
}

export interface ConfiguratorSelection {
  otdelka?: OtdelkaOption;
  korobka?: KorobkaOption;
  model?: ModelOption;
  priceModifier: number;   // sum of selected modifiers
  finalPrice: number;      // basePrice + priceModifier
  summary: string;         // human-readable summary
}

export function DoorConfigurator({ productId, basePrice, flags, onSelectionChange }: Props) {
  const { language } = useLanguage();
  const { data, isLoading } = useDoorConfigurator(productId, flags);

  const [otdelkaId, setOtdelkaId] = useState<string | null>(null);
  const [korobkaId, setKorobkaId] = useState<string | null>(null);
  const [modelId, setModelId] = useState<string | null>(null);

  // Default to first option of each active dimension
  useEffect(() => {
    if (!data) return;
    if (flags.hasOtdelka && !otdelkaId && data.otdelkaOptions[0]) setOtdelkaId(data.otdelkaOptions[0].id);
    if (flags.hasKorobka && !korobkaId && data.korobkaOptions[0]) setKorobkaId(data.korobkaOptions[0].id);
    if (flags.hasModel   && !modelId   && data.modelOptions[0])   setModelId(data.modelOptions[0].id);
  }, [data, flags, otdelkaId, korobkaId, modelId]);

  const selectedOtdelka = data?.otdelkaOptions.find(o => o.id === otdelkaId);
  const selectedKorobka = data?.korobkaOptions.find(o => o.id === korobkaId);
  const selectedModel   = data?.modelOptions.find(o => o.id === modelId);

  const priceModifier =
    (selectedOtdelka?.price_modifier || 0) +
    (selectedKorobka?.price_modifier || 0) +
    (selectedModel?.price_modifier || 0);
  const finalPrice = basePrice + priceModifier;

  // Group otdelka options by their group
  const otdelkaByGroup = useMemo(() => {
    if (!data) return new Map();
    const map = new Map<string, OtdelkaOption[]>();
    data.otdelkaOptions.forEach(o => {
      const arr = map.get(o.group_id) || [];
      arr.push(o);
      map.set(o.group_id, arr);
    });
    return map;
  }, [data]);

  // Bubble the current selection up
  useEffect(() => {
    if (!onSelectionChange) return;
    const parts: string[] = [];
    if (selectedModel)   parts.push(pickLocalized(selectedModel, 'name', language));
    if (selectedOtdelka) parts.push(pickLocalized(selectedOtdelka, 'label', language));
    if (selectedKorobka) parts.push(pickLocalized(selectedKorobka, 'name', language));
    onSelectionChange({
      otdelka: selectedOtdelka,
      korobka: selectedKorobka,
      model: selectedModel,
      priceModifier,
      finalPrice,
      summary: parts.join(' / '),
    });
  }, [selectedOtdelka, selectedKorobka, selectedModel, priceModifier, finalPrice, onSelectionChange, language]);

  if (!flags.hasOtdelka && !flags.hasKorobka && !flags.hasModel) return null;
  if (isLoading) {
    return (
      <div className="py-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading configurator…
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="space-y-8 border-t border-b py-6">
      {/* Model selector */}
      {flags.hasModel && data.modelOptions.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {language === 'ru' ? 'Модель' : language === 'en' ? 'Model' : 'მოდელი'}
            </h3>
            {selectedModel && <span className="text-sm text-foreground">{pickLocalized(selectedModel, 'name', language)}</span>}
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
      )}

      {/* Otdelka — grouped swatches */}
      {flags.hasOtdelka && data.otdelkaOptions.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {language === 'ru' ? 'Отделка' : language === 'en' ? 'Finish' : 'მორთულობა'}
            </h3>
            {selectedOtdelka && <span className="text-sm text-foreground">{selectedOtdelka.code} — {pickLocalized(selectedOtdelka, 'label', language)}</span>}
          </div>
          <div className="space-y-4">
            {data.otdelkaGroups.map(g => {
              const opts = otdelkaByGroup.get(g.id) || [];
              if (opts.length === 0) return null;
              return (
                <div key={g.id}>
                  <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-2">{pickLocalized(g, 'name', language)}</p>
                  <div className="flex flex-wrap gap-2">
                    {opts.map((o: OtdelkaOption) => {
                      const active = o.id === otdelkaId;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => setOtdelkaId(o.id)}
                          title={`${o.code ? o.code + ' — ' : ''}${pickLocalized(o, 'label', language)}`}
                          className={`relative w-14 h-14 rounded border-2 overflow-hidden transition ${active ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-gray-300'}`}
                        >
                          {o.swatch_image_url ? (
                            <img src={o.swatch_image_url} alt={o.label_ka} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[9px] text-gray-500 p-1 text-center leading-tight">{o.code || '?'}</div>
                          )}
                          {active && <div className="absolute inset-0 ring-2 ring-primary ring-inset pointer-events-none" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Korobka — frame tiles */}
      {flags.hasKorobka && data.korobkaOptions.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {language === 'ru' ? 'Короб' : language === 'en' ? 'Frame' : 'ჩარჩო'}
            </h3>
            {selectedKorobka && <span className="text-sm text-foreground">{pickLocalized(selectedKorobka, 'name', language)}</span>}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.korobkaOptions.map(o => {
              const active = o.id === korobkaId;
              const desc = pickLocalized(o, 'description', language);
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setKorobkaId(o.id)}
                  className={`text-left border rounded overflow-hidden transition ${active ? 'ring-2 ring-primary border-primary' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  {o.image_url ? (
                    <img src={o.image_url} alt={o.name_ka} className="w-full aspect-video object-cover" />
                  ) : (
                    <div className="w-full aspect-video bg-gray-100" />
                  )}
                  <div className="p-2">
                    <p className="text-sm font-semibold">{pickLocalized(o, 'name', language)}</p>
                    {desc && <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{desc}</p>}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Price summary */}
      {priceModifier !== 0 && (
        <div className="text-sm text-muted-foreground border-t pt-3">
          {language === 'ru' ? 'Итого с опциями' : language === 'en' ? 'Total with options' : 'ჯამი ოფციებით'}:{' '}
          <span className="font-semibold text-foreground">₾{finalPrice.toLocaleString()}</span>
          {' '}
          <span className="text-xs">({priceModifier > 0 ? '+' : ''}{priceModifier.toLocaleString()} ₾)</span>
        </div>
      )}
    </div>
  );
}
