import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export type SpecBullet = { ka?: string; ru?: string; en?: string };
export type SpecSection = {
  code?: string;
  title_ka?: string;
  title_ru?: string;
  title_en?: string;
  bullets?: SpecBullet[];
};

interface Props {
  value: SpecSection[];
  onChange: (next: SpecSection[]) => void;
}

const PRESET_TITLES: { code: string; ka: string; ru: string; en: string }[] = [
  { code: 'polotno',  ka: 'Polotno',     ru: 'Полотно',           en: 'Door leaf' },
  { code: 'korobka',  ka: 'ჩარჩო',       ru: 'Скрытый короб',     en: 'Frame' },
  { code: 'hardware', ka: 'მახასიათებლები', ru: 'Характеристики',  en: 'Hardware' },
];

/**
 * Edits an array of titled bullet groups stored in `products.spec_sections`.
 * Each section: title (KA/RU/EN) + ordered bullets (KA/RU/EN). Mirrors the
 * three-column tech-spec layout shown on union.ru product pages.
 */
export function SpecSectionsEditor({ value, onChange }: Props) {
  const sections = value || [];

  const update = (idx: number, patch: Partial<SpecSection>) => {
    const next = sections.map((s, i) => (i === idx ? { ...s, ...patch } : s));
    onChange(next);
  };

  const addSection = (preset?: typeof PRESET_TITLES[number]) => {
    const newSection: SpecSection = preset
      ? { code: preset.code, title_ka: preset.ka, title_ru: preset.ru, title_en: preset.en, bullets: [] }
      : { bullets: [] };
    onChange([...sections, newSection]);
  };

  const removeSection = (idx: number) => onChange(sections.filter((_, i) => i !== idx));

  const moveSection = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  const addBullet = (sIdx: number) => {
    update(sIdx, { bullets: [...(sections[sIdx].bullets || []), {}] });
  };

  const updateBullet = (sIdx: number, bIdx: number, patch: Partial<SpecBullet>) => {
    const bullets = (sections[sIdx].bullets || []).map((b, i) => (i === bIdx ? { ...b, ...patch } : b));
    update(sIdx, { bullets });
  };

  const removeBullet = (sIdx: number, bIdx: number) => {
    const bullets = (sections[sIdx].bullets || []).filter((_, i) => i !== bIdx);
    update(sIdx, { bullets });
  };

  const usedPresets = new Set(sections.map((s) => s.code).filter(Boolean));

  return (
    <div className="space-y-3 border rounded-lg p-4 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div>
          <Label className="font-medium">Spec sections (Polotno / Korobka / Hardware)</Label>
          <p className="text-xs text-gray-500 mt-0.5">Three-column bullet groups shown on the product page.</p>
        </div>
        <span className="text-xs text-gray-500">{sections.length} {sections.length === 1 ? 'section' : 'sections'}</span>
      </div>

      <div className="space-y-3">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="bg-white border rounded p-3 space-y-3">
            <div className="flex items-start gap-2">
              <div className="flex flex-col">
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveSection(sIdx, -1)} disabled={sIdx === 0}>
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveSection(sIdx, 1)} disabled={sIdx === sections.length - 1}>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                <Input
                  placeholder="code (polotno/korobka/hardware)"
                  value={section.code || ''}
                  onChange={(e) => update(sIdx, { code: e.target.value })}
                  className="font-mono text-xs"
                />
                <Input
                  placeholder="Title (KA)"
                  value={section.title_ka || ''}
                  onChange={(e) => update(sIdx, { title_ka: e.target.value })}
                />
                <Input
                  placeholder="Title (RU)"
                  value={section.title_ru || ''}
                  onChange={(e) => update(sIdx, { title_ru: e.target.value })}
                />
                <Input
                  placeholder="Title (EN)"
                  value={section.title_en || ''}
                  onChange={(e) => update(sIdx, { title_en: e.target.value })}
                />
              </div>

              <Button type="button" variant="ghost" size="icon" className="text-red-600 h-8 w-8" onClick={() => removeSection(sIdx)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Bullets */}
            <div className="pl-8 space-y-2">
              {(section.bullets || []).map((bullet, bIdx) => (
                <div key={bIdx} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-2">
                  <Input
                    placeholder="bullet (KA)"
                    value={bullet.ka || ''}
                    onChange={(e) => updateBullet(sIdx, bIdx, { ka: e.target.value })}
                  />
                  <Input
                    placeholder="bullet (RU)"
                    value={bullet.ru || ''}
                    onChange={(e) => updateBullet(sIdx, bIdx, { ru: e.target.value })}
                  />
                  <Input
                    placeholder="bullet (EN)"
                    value={bullet.en || ''}
                    onChange={(e) => updateBullet(sIdx, bIdx, { en: e.target.value })}
                  />
                  <Button type="button" variant="ghost" size="icon" className="text-red-600 h-9 w-9" onClick={() => removeBullet(sIdx, bIdx)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              <Button type="button" size="sm" variant="outline" onClick={() => addBullet(sIdx)}>
                <Plus className="h-3 w-3 mr-1" /> Add bullet
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add buttons */}
      <div className="flex flex-wrap gap-2 pt-2 border-t">
        <Button type="button" size="sm" variant="outline" onClick={() => addSection()}>
          <Plus className="h-3 w-3 mr-1" /> Add empty section
        </Button>
        {PRESET_TITLES.filter((p) => !usedPresets.has(p.code)).map((p) => (
          <Button key={p.code} type="button" size="sm" variant="outline" onClick={() => addSection(p)}>
            <Plus className="h-3 w-3 mr-1" /> {p.ru}
          </Button>
        ))}
      </div>
    </div>
  );
}
