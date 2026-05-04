import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, ChevronUp, ChevronDown, Download, Info, FileText } from 'lucide-react';

export type DownloadLink = {
  label_ka?: string;
  label_ru?: string;
  label_en?: string;
  url: string;
  icon?: 'download' | 'info' | 'file';
};

interface Props {
  value: DownloadLink[];
  onChange: (next: DownloadLink[]) => void;
}

const PRESETS: { ka: string; ru: string; en: string; icon: DownloadLink['icon'] }[] = [
  { ka: 'სრული ტექნიკური აღწერა',      ru: 'Полное техническое описание',           en: 'Full technical description', icon: 'info' },
  { ka: 'DWG ტექნიკური ინფორმაცია',    ru: 'Скачать техническую информацию в DWG',  en: 'Download DWG',               icon: 'download' },
  { ka: 'კატალოგი',                    ru: 'Скачать каталог',                       en: 'Download catalog',           icon: 'download' },
];

const iconFor = (i?: string) => {
  if (i === 'info') return <Info className="h-3.5 w-3.5" />;
  if (i === 'file') return <FileText className="h-3.5 w-3.5" />;
  return <Download className="h-3.5 w-3.5" />;
};

/**
 * Edits an array of labelled URLs stored in `products.download_links`. Mirrors
 * the row of "Полное техническое описание / Скачать DWG / Скачать каталог"
 * action links shown on union.ru product pages.
 */
export function DownloadLinksEditor({ value, onChange }: Props) {
  const links = value || [];

  const update = (idx: number, patch: Partial<DownloadLink>) => {
    onChange(links.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  };

  const add = (preset?: typeof PRESETS[number]) => {
    const link: DownloadLink = preset
      ? { label_ka: preset.ka, label_ru: preset.ru, label_en: preset.en, icon: preset.icon, url: '' }
      : { url: '', icon: 'download' };
    onChange([...links, link]);
  };

  const remove = (idx: number) => onChange(links.filter((_, i) => i !== idx));

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= links.length) return;
    const next = [...links];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-3 border rounded-lg p-4 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div>
          <Label className="font-medium">Resource downloads (Tech sheet / DWG / Catalog)</Label>
          <p className="text-xs text-gray-500 mt-0.5">Action links shown under the product configurator.</p>
        </div>
        <span className="text-xs text-gray-500">{links.length} {links.length === 1 ? 'link' : 'links'}</span>
      </div>

      <div className="space-y-2">
        {links.map((link, idx) => (
          <div key={idx} className="bg-white border rounded p-3 space-y-2">
            <div className="flex items-start gap-2">
              <div className="flex flex-col">
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => move(idx, -1)} disabled={idx === 0}>
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => move(idx, 1)} disabled={idx === links.length - 1}>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input
                    placeholder="Label (KA)"
                    value={link.label_ka || ''}
                    onChange={(e) => update(idx, { label_ka: e.target.value })}
                  />
                  <Input
                    placeholder="Label (RU)"
                    value={link.label_ru || ''}
                    onChange={(e) => update(idx, { label_ru: e.target.value })}
                  />
                  <Input
                    placeholder="Label (EN)"
                    value={link.label_en || ''}
                    onChange={(e) => update(idx, { label_en: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr,150px] gap-2">
                  <Input
                    placeholder="URL (https://... or #)"
                    value={link.url || ''}
                    onChange={(e) => update(idx, { url: e.target.value })}
                  />
                  <Select value={link.icon || 'download'} onValueChange={(v) => update(idx, { icon: v as DownloadLink['icon'] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="download"><span className="flex items-center gap-2">{iconFor('download')} download</span></SelectItem>
                      <SelectItem value="info"><span className="flex items-center gap-2">{iconFor('info')} info</span></SelectItem>
                      <SelectItem value="file"><span className="flex items-center gap-2">{iconFor('file')} file</span></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="button" variant="ghost" size="icon" className="text-red-600 h-8 w-8" onClick={() => remove(idx)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t">
        <Button type="button" size="sm" variant="outline" onClick={() => add()}>
          <Plus className="h-3 w-3 mr-1" /> Add empty link
        </Button>
        {PRESETS.map((p, i) => (
          <Button key={i} type="button" size="sm" variant="outline" onClick={() => add(p)}>
            <Plus className="h-3 w-3 mr-1" /> {p.ru}
          </Button>
        ))}
      </div>
    </div>
  );
}
