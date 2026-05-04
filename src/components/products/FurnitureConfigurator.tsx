import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { pickLocalized } from '@/hooks/useDoorConfigurator';
import { toast } from 'sonner';

interface Module {
  id: string;
  parent_product_id: string;
  code: string | null;
  name_ka: string;
  name_ru: string | null;
  name_en: string | null;
  description_ka: string | null;
  description_ru: string | null;
  description_en: string | null;
  dimensions_text: string | null;
  base_price: number;
  image_url: string | null;
  sort_order: number | null;
  is_active: boolean | null;
}

interface OtdelkaOption { id: string; name_ka?: string | null; label_ka?: string; label_ru?: string | null; label_en?: string | null; price_modifier?: number | null; }
interface GlassOption   { id: string; name_ka: string; name_ru: string | null; name_en: string | null; price_modifier: number | null; }
interface LightingOption{ id: string; name_ka: string; name_ru: string | null; name_en: string | null; price_modifier: number | null; }

interface Props {
  parentProductId: string;
  parentProductName: string;
  parentImage?: string;
}

interface ModuleSelection {
  moduleId: string;
  quantity: number;
  finishId: string | null;
  glassId:  string | null;
  lightId:  string | null;
}

/**
 * FORMINA-style modular configurator for wardrobes / kitchens / shelving.
 * Customer picks from a grid of M01..M15 modules, each with its own configured
 * finish/glass/lighting and quantity. "Add full configuration to cart" creates
 * one cart entry per selected module — matches union.ru behaviour.
 */
export function FurnitureConfigurator({ parentProductId, parentProductName, parentImage }: Props) {
  const { language } = useLanguage();
  const { addItem } = useCart();
  const lang = (language as 'ka' | 'ru' | 'en');

  const { data: modules = [], isLoading } = useQuery({
    queryKey: ['furniture-modules', parentProductId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('furniture_modules' as any)
        .select('*')
        .eq('parent_product_id', parentProductId)
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return (data || []) as unknown as Module[];
    },
  });

  // Pull all finishes/glass/lighting from global pool (per-module pivot reduction left for future)
  const { data: finishes = [] } = useQuery({
    queryKey: ['furniture-finishes'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_otdelka_options').select('*').eq('is_active', true).order('sort_order');
      if (error) throw error;
      return data as OtdelkaOption[];
    },
  });
  const { data: glassOptions = [] } = useQuery({
    queryKey: ['furniture-glass'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_glass_options').select('*').eq('is_active', true).order('sort_order');
      if (error) throw error;
      return data as GlassOption[];
    },
  });
  const { data: lightingOptions = [] } = useQuery({
    queryKey: ['furniture-lighting'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_lighting_options' as any).select('*').eq('is_active', true).order('sort_order');
      if (error) throw error;
      return (data || []) as unknown as LightingOption[];
    },
  });

  const [selections, setSelections] = useState<Record<string, ModuleSelection>>({});

  // Default-select first finish/glass/lighting for any newly-added module
  useEffect(() => {
    if (!finishes.length || !glassOptions.length || !lightingOptions.length) return;
    setSelections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((mid) => {
        const s = next[mid];
        if (!s.finishId) s.finishId = finishes[0]?.id ?? null;
        if (!s.glassId)  s.glassId  = glassOptions[0]?.id ?? null;
        if (!s.lightId)  s.lightId  = lightingOptions[0]?.id ?? null;
      });
      return next;
    });
  }, [finishes, glassOptions, lightingOptions]);

  const isSelected = (moduleId: string) => !!selections[moduleId];

  const togglePick = (m: Module) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[m.id]) {
        delete next[m.id];
      } else {
        next[m.id] = {
          moduleId: m.id,
          quantity: 1,
          finishId: finishes[0]?.id ?? null,
          glassId:  glassOptions[0]?.id ?? null,
          lightId:  lightingOptions[0]?.id ?? null,
        };
      }
      return next;
    });
  };

  const updateSel = (moduleId: string, patch: Partial<ModuleSelection>) =>
    setSelections((prev) => ({ ...prev, [moduleId]: { ...prev[moduleId], ...patch } }));

  // Compute per-module + total price
  const findFinish = (id: string | null) => finishes.find(f => f.id === id);
  const findGlass  = (id: string | null) => glassOptions.find(g => g.id === id);
  const findLight  = (id: string | null) => lightingOptions.find(l => l.id === id);

  const modulePrice = (m: Module, sel: ModuleSelection) => {
    const f = findFinish(sel.finishId);
    const g = findGlass(sel.glassId);
    const l = findLight(sel.lightId);
    const unit = Number(m.base_price) + (f?.price_modifier ?? 0) + (g?.price_modifier ?? 0) + (l?.price_modifier ?? 0);
    return unit * sel.quantity;
  };

  const totalPrice = useMemo(() => {
    return Object.values(selections).reduce((acc, sel) => {
      const m = modules.find(x => x.id === sel.moduleId);
      return m ? acc + modulePrice(m, sel) : acc;
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections, modules, finishes, glassOptions, lightingOptions]);

  const addAllToCart = () => {
    const picked = Object.values(selections);
    if (picked.length === 0) {
      toast.error(language === 'ru' ? 'Выберите хотя бы один модуль' : language === 'en' ? 'Pick at least one module' : 'აირჩიეთ მოდული');
      return;
    }
    let added = 0;
    picked.forEach((sel) => {
      const m = modules.find(x => x.id === sel.moduleId);
      if (!m) return;
      const f = findFinish(sel.finishId);
      const g = findGlass(sel.glassId);
      const l = findLight(sel.lightId);
      const fLabel = f ? pickLocalized(f, 'label', language) || pickLocalized(f, 'name', language) : '';
      const gLabel = g ? pickLocalized(g, 'name', language) : '';
      const lLabel = l ? pickLocalized(l, 'name', language) : '';
      const opts = [fLabel, gLabel, lLabel].filter(Boolean).join(' / ');
      const moduleName = pickLocalized(m, 'name', language) || m.name_ka;
      const fullName = `${parentProductName} — ${m.code ? `${m.code} ` : ''}${moduleName}${opts ? ` (${opts})` : ''}`;
      const unitPrice = Number(m.base_price) + (f?.price_modifier ?? 0) + (g?.price_modifier ?? 0) + (l?.price_modifier ?? 0);
      // Add the configured module sel.quantity times — this maps to one cart line per module
      // (CartContext de-dupes by id, so we vary the id with module + selection signature)
      const id = `${m.id}::${sel.finishId ?? ''}::${sel.glassId ?? ''}::${sel.lightId ?? ''}`;
      for (let i = 0; i < sel.quantity; i++) {
        addItem({ id, name: fullName, price: unitPrice, image: m.image_url || parentImage || '' });
      }
      added += 1;
    });
    toast.success(
      language === 'ru' ? `Добавлено ${added} модул${added === 1 ? 'ь' : added < 5 ? 'я' : 'ей'}`
      : language === 'en' ? `Added ${added} module${added === 1 ? '' : 's'}`
      : `დაემატა ${added} მოდული`
    );
    setSelections({});
  };

  if (isLoading) {
    return (
      <div className="py-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading modules…
      </div>
    );
  }
  if (modules.length === 0) return null;

  return (
    <div className="space-y-6 border-t border-b py-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-1">
          {language === 'ru' ? 'Конфигуратор модулей' : language === 'en' ? 'Module configurator' : 'მოდულების კონფიგურატორი'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {language === 'ru'
            ? 'Выберите нужные модули, настройте отделку и добавьте всю конфигурацию в корзину одним кликом.'
            : language === 'en'
            ? 'Pick the modules you need, configure each, and add the full configuration to the cart in one click.'
            : 'აირჩიეთ საჭირო მოდულები და დაამატეთ კონფიგურაცია კალათაში.'}
        </p>
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {modules.map((m) => {
          const picked = isSelected(m.id);
          const moduleName = pickLocalized(m, 'name', language) || m.name_ka;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => togglePick(m)}
              className={`relative text-left border overflow-hidden transition ${picked ? 'ring-2 ring-primary border-primary' : 'border-gray-200 hover:border-gray-400'}`}
            >
              {m.image_url ? (
                <img src={m.image_url} alt={moduleName} className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-gray-100" />
              )}
              <div className="p-2">
                {m.code && <p className="text-xs font-mono text-muted-foreground">{m.code}</p>}
                <p className="text-sm font-medium truncate">{moduleName}</p>
                {m.dimensions_text && <p className="text-xs text-muted-foreground">{m.dimensions_text}</p>}
                <p className="text-sm font-semibold mt-1">{Number(m.base_price).toLocaleString()} ₾</p>
              </div>
              {picked && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Per-module configuration rows */}
      {Object.values(selections).length > 0 && (
        <div className="space-y-3 border-t pt-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {language === 'ru' ? 'Выбранные модули' : language === 'en' ? 'Selected modules' : 'არჩეული მოდულები'}
          </h3>
          {Object.values(selections).map((sel) => {
            const m = modules.find(x => x.id === sel.moduleId);
            if (!m) return null;
            const linePrice = modulePrice(m, sel);
            return (
              <div key={sel.moduleId} className="bg-neutral-50 rounded p-3 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {m.image_url && <img src={m.image_url} alt="" className="w-12 h-12 object-cover" />}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {m.code && <span className="font-mono text-muted-foreground mr-1">{m.code}</span>}
                        {pickLocalized(m, 'name', language)}
                      </p>
                      {m.dimensions_text && <p className="text-xs text-muted-foreground">{m.dimensions_text}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button type="button" variant="outline" size="icon" className="h-7 w-7"
                      onClick={() => updateSel(sel.moduleId, { quantity: Math.max(1, sel.quantity - 1) })}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm tabular-nums">{sel.quantity}</span>
                    <Button type="button" variant="outline" size="icon" className="h-7 w-7"
                      onClick={() => updateSel(sel.moduleId, { quantity: sel.quantity + 1 })}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <select className="border rounded px-2 py-1 bg-white"
                    value={sel.finishId || ''}
                    onChange={(e) => updateSel(sel.moduleId, { finishId: e.target.value || null })}>
                    <option value="">{language === 'ru' ? 'Отделка' : 'Finish'}</option>
                    {finishes.map(f => (
                      <option key={f.id} value={f.id}>
                        {(pickLocalized(f, 'label', language) || pickLocalized(f, 'name', language))}
                        {f.price_modifier ? ` (+${f.price_modifier})` : ''}
                      </option>
                    ))}
                  </select>
                  <select className="border rounded px-2 py-1 bg-white"
                    value={sel.glassId || ''}
                    onChange={(e) => updateSel(sel.moduleId, { glassId: e.target.value || null })}>
                    <option value="">{language === 'ru' ? 'Стекло' : 'Glass'}</option>
                    {glassOptions.map(g => (
                      <option key={g.id} value={g.id}>
                        {pickLocalized(g, 'name', language)}{g.price_modifier ? ` (+${g.price_modifier})` : ''}
                      </option>
                    ))}
                  </select>
                  <select className="border rounded px-2 py-1 bg-white"
                    value={sel.lightId || ''}
                    onChange={(e) => updateSel(sel.moduleId, { lightId: e.target.value || null })}>
                    <option value="">{language === 'ru' ? 'Подсветка' : 'Lighting'}</option>
                    {lightingOptions.map(l => (
                      <option key={l.id} value={l.id}>
                        {pickLocalized(l, 'name', language)}{l.price_modifier ? ` (+${l.price_modifier})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end text-sm font-semibold">
                  {linePrice.toLocaleString()} ₾
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Total + add to cart */}
      <div className="flex items-center justify-between border-t pt-4 gap-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {language === 'ru' ? 'Итого конфигурации' : language === 'en' ? 'Configuration total' : 'ჯამი'}
          </p>
          <p className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₾</p>
        </div>
        <Button size="lg" onClick={addAllToCart} disabled={Object.keys(selections).length === 0}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          {language === 'ru'
            ? 'Добавить конфигурацию в корзину'
            : language === 'en'
            ? 'Add configuration to cart'
            : 'კონფიგურაციის დამატება'}
        </Button>
      </div>
    </div>
  );
}
