import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  // Flags + setters
  hasOtdelka: boolean; setHasOtdelka: (v: boolean) => void;
  hasKorobka: boolean; setHasKorobka: (v: boolean) => void;
  hasModel: boolean;   setHasModel: (v: boolean) => void;

  // Selected option IDs (pivot rows)
  selectedOtdelka: string[]; setSelectedOtdelka: (ids: string[]) => void;
  selectedKorobka: string[]; setSelectedKorobka: (ids: string[]) => void;
  selectedModels: string[];  setSelectedModels: (ids: string[]) => void;
}

/**
 * Inside the product edit dialog: three toggles for otdelka/korobka/modeli
 * variants, each with a checkbox grid over the global option pool so admins
 * pick exactly which options apply to this product.
 */
export function ProductConfiguratorTab(p: Props) {
  const { data: otdelkaGroups } = useQuery({
    queryKey: ['cfg-otdelka-groups'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_otdelka_groups').select('*').order('sort_order');
      if (error) throw error;
      return data;
    }
  });
  const { data: otdelkaOptions } = useQuery({
    queryKey: ['cfg-otdelka-options'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_otdelka_options').select('*').order('sort_order');
      if (error) throw error;
      return data;
    }
  });
  const { data: korobkaOptions } = useQuery({
    queryKey: ['cfg-korobka-options'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_korobka_options').select('*').order('sort_order');
      if (error) throw error;
      return data;
    }
  });
  const { data: modelOptions } = useQuery({
    queryKey: ['cfg-model-options'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_model_options').select('*').order('sort_order');
      if (error) throw error;
      return data;
    }
  });

  const toggleId = (arr: string[], id: string, set: (ids: string[]) => void) =>
    set(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]);

  const selectAll = (ids: string[], set: (ids: string[]) => void) => set(ids);
  const selectNone = (set: (ids: string[]) => void) => set([]);

  return (
    <div className="space-y-6 border-t pt-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Door Configurator</h3>
        <p className="text-xs text-gray-500">Enable variant dimensions and pick which options from the global pool apply to this product. Leave a dimension disabled if this product has no variants on it.</p>
      </div>

      {/* Otdelka */}
      <div className="border rounded-lg p-4 space-y-3 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch checked={p.hasOtdelka} onCheckedChange={p.setHasOtdelka} />
            <div>
              <Label className="font-medium">Has finishes (Otdelka)</Label>
              <p className="text-xs text-gray-500">VENEER / LACCATO / HPL / ALUMINIUM etc. — individual color swatches</p>
            </div>
          </div>
          <Link to="/admin/door-otdelka" target="_blank" className="text-xs text-primary flex items-center gap-1 hover:underline">Manage pool <ExternalLink className="h-3 w-3" /></Link>
        </div>

        {p.hasOtdelka && (
          <div className="space-y-3 pt-2">
            <div className="flex gap-2 text-xs">
              <button type="button" className="underline text-gray-500" onClick={() => selectAll(otdelkaOptions?.map(o => o.id) || [], p.setSelectedOtdelka)}>Select all</button>
              <button type="button" className="underline text-gray-500" onClick={() => selectNone(p.setSelectedOtdelka)}>Clear</button>
              <span className="ml-auto text-gray-500">{p.selectedOtdelka.length} selected</span>
            </div>
            {!otdelkaOptions ? <Loader2 className="h-4 w-4 animate-spin" /> : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {otdelkaGroups?.map(g => {
                  const opts = otdelkaOptions.filter(o => o.group_id === g.id);
                  if (opts.length === 0) return null;
                  return (
                    <div key={g.id}>
                      <p className="text-xs font-semibold text-gray-700 mb-2">{g.name_ka} {g.code && <span className="font-mono text-gray-400">({g.code})</span>}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {opts.map(o => {
                          const selected = p.selectedOtdelka.includes(o.id);
                          return (
                            <label key={o.id} className={`relative cursor-pointer border rounded overflow-hidden ${selected ? 'ring-2 ring-primary border-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                              <input type="checkbox" className="sr-only" checked={selected} onChange={() => toggleId(p.selectedOtdelka, o.id, p.setSelectedOtdelka)} />
                              {o.swatch_image_url ? (
                                <img src={o.swatch_image_url} alt={o.label_ka} className="w-full aspect-square object-cover" />
                              ) : (
                                <div className="w-full aspect-square bg-gray-100" />
                              )}
                              <p className="text-[10px] px-1 py-1 truncate">{o.label_ka}</p>
                              {selected && <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold">✓</div>}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {otdelkaOptions.length === 0 && <p className="text-xs text-gray-500">No swatches in the pool yet. Create them in "Door Finishes" first.</p>}
              </div>
            )}
            <p className="text-[11px] text-gray-500">Tip: leave empty to show all active pool swatches on the product page.</p>
          </div>
        )}
      </div>

      {/* Korobka */}
      <div className="border rounded-lg p-4 space-y-3 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch checked={p.hasKorobka} onCheckedChange={p.setHasKorobka} />
            <div>
              <Label className="font-medium">Has frames (Korobka)</Label>
              <p className="text-xs text-gray-500">INVISIBLE / PLANAR / DECO / UNIWOOD etc.</p>
            </div>
          </div>
          <Link to="/admin/door-korobka" target="_blank" className="text-xs text-primary flex items-center gap-1 hover:underline">Manage pool <ExternalLink className="h-3 w-3" /></Link>
        </div>

        {p.hasKorobka && (
          <div className="space-y-2 pt-2">
            <div className="flex gap-2 text-xs">
              <button type="button" className="underline text-gray-500" onClick={() => selectAll(korobkaOptions?.map(o => o.id) || [], p.setSelectedKorobka)}>Select all</button>
              <button type="button" className="underline text-gray-500" onClick={() => selectNone(p.setSelectedKorobka)}>Clear</button>
              <span className="ml-auto text-gray-500">{p.selectedKorobka.length} selected</span>
            </div>
            {!korobkaOptions ? <Loader2 className="h-4 w-4 animate-spin" /> : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2">
                {korobkaOptions.map(o => {
                  const selected = p.selectedKorobka.includes(o.id);
                  return (
                    <label key={o.id} className={`relative cursor-pointer border rounded overflow-hidden ${selected ? 'ring-2 ring-primary border-primary' : 'border-gray-200'}`}>
                      <input type="checkbox" className="sr-only" checked={selected} onChange={() => toggleId(p.selectedKorobka, o.id, p.setSelectedKorobka)} />
                      {o.image_url ? <img src={o.image_url} alt={o.name_ka} className="w-full aspect-video object-cover" /> : <div className="w-full aspect-video bg-gray-100" />}
                      <p className="text-xs px-2 py-1 font-medium truncate">{o.name_ka}</p>
                      {selected && <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold">✓</div>}
                    </label>
                  );
                })}
                {korobkaOptions.length === 0 && <p className="col-span-full text-xs text-gray-500">No frames in the pool yet.</p>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Models */}
      <div className="border rounded-lg p-4 space-y-3 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch checked={p.hasModel} onCheckedChange={p.setHasModel} />
            <div>
              <Label className="font-medium">Has models (Modeli)</Label>
              <p className="text-xs text-gray-500">Style / profile variants — Vento / Entry / Velino etc.</p>
            </div>
          </div>
          <Link to="/admin/door-models" target="_blank" className="text-xs text-primary flex items-center gap-1 hover:underline">Manage pool <ExternalLink className="h-3 w-3" /></Link>
        </div>

        {p.hasModel && (
          <div className="space-y-2 pt-2">
            <div className="flex gap-2 text-xs">
              <button type="button" className="underline text-gray-500" onClick={() => selectAll(modelOptions?.map(o => o.id) || [], p.setSelectedModels)}>Select all</button>
              <button type="button" className="underline text-gray-500" onClick={() => selectNone(p.setSelectedModels)}>Clear</button>
              <span className="ml-auto text-gray-500">{p.selectedModels.length} selected</span>
            </div>
            {!modelOptions ? <Loader2 className="h-4 w-4 animate-spin" /> : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-2">
                {modelOptions.map(o => {
                  const selected = p.selectedModels.includes(o.id);
                  return (
                    <label key={o.id} className={`relative cursor-pointer border rounded overflow-hidden ${selected ? 'ring-2 ring-primary border-primary' : 'border-gray-200'}`}>
                      <input type="checkbox" className="sr-only" checked={selected} onChange={() => toggleId(p.selectedModels, o.id, p.setSelectedModels)} />
                      {o.image_url ? <img src={o.image_url} alt={o.name_ka} className="w-full aspect-square object-cover" /> : <div className="w-full aspect-square bg-gray-100" />}
                      <p className="text-xs px-2 py-1 font-medium truncate">{o.name_ka}</p>
                      {selected && <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold">✓</div>}
                    </label>
                  );
                })}
                {modelOptions.length === 0 && <p className="col-span-full text-xs text-gray-500">No models in the pool yet.</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
