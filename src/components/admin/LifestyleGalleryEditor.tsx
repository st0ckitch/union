import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  value: string[];
  onChange: (next: string[]) => void;
}

/**
 * Edits an array of image URLs stored in `products.lifestyle_gallery_image_urls`.
 * Renders below the configurator on the public product page as a "В интерьере"
 * (interior-context) photo strip.
 */
export function LifestyleGalleryEditor({ value, onChange }: Props) {
  const urls = value || [];

  const update = (idx: number, url: string) =>
    onChange(urls.map((u, i) => (i === idx ? url : u)));

  const add = () => onChange([...urls, '']);
  const remove = (idx: number) => onChange(urls.filter((_, i) => i !== idx));

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= urls.length) return;
    const next = [...urls];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-3 border rounded-lg p-4 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div>
          <Label className="font-medium">Lifestyle gallery</Label>
          <p className="text-xs text-gray-500 mt-0.5">Interior-context photos shown below the configurator.</p>
        </div>
        <span className="text-xs text-gray-500">{urls.length} {urls.length === 1 ? 'image' : 'images'}</span>
      </div>

      <div className="space-y-2">
        {urls.map((url, idx) => (
          <div key={idx} className="flex items-start gap-2 bg-white border rounded p-2">
            <div className="flex flex-col">
              <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => move(idx, -1)} disabled={idx === 0}>
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => move(idx, 1)} disabled={idx === urls.length - 1}>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
            {url && (
              <img src={url} alt="" className="w-20 h-20 object-cover rounded border" />
            )}
            <Input
              placeholder="https://..."
              value={url}
              onChange={(e) => update(idx, e.target.value)}
              className="flex-1"
            />
            <Button type="button" variant="ghost" size="icon" className="text-red-600 h-9 w-9" onClick={() => remove(idx)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" size="sm" variant="outline" onClick={add}>
        <Plus className="h-3 w-3 mr-1" /> Add image URL
      </Button>
    </div>
  );
}
