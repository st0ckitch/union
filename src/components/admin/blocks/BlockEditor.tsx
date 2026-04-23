import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Block = Tables<'product_content_blocks'>;
export type BlockType = Block['block_type'];
export type BlockScope = Block['scope'];

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  specs_list: 'Specs list (bullet columns)',
  image_gallery: 'Image gallery (interior photos)',
  technical_diagram: 'Technical diagram (labeled callouts)',
  cta_tiles: 'CTA tiles (2–3 cards with icon)',
  variants_carousel: 'Variants carousel (horizontal strip)',
  text_with_image: 'Text + image (side by side)',
  contact_cta: 'Contact CTA (phone/email/form)',
  faq_list: 'FAQ (accordion)',
  rich_text: 'Rich text (HTML)',
};

export const BLOCK_TYPE_OPTIONS = Object.entries(BLOCK_TYPE_LABELS) as [BlockType, string][];

interface Props {
  initial?: Partial<Block>;
  onSave: (d: Partial<Block>) => Promise<void> | void;
  onCancel: () => void;
  isSaving?: boolean;
  lockScope?: BlockScope;           // when editing per-product, scope is locked
  lockProductId?: string | null;    // when editing per-product
  lockCategoryId?: string | null;   // when editing per-category
}

export function BlockEditor({ initial, onSave, onCancel, isSaving, lockScope, lockProductId, lockCategoryId }: Props) {
  const [form, setForm] = useState<any>(() => ({
    scope: lockScope || initial?.scope || 'product',
    block_type: initial?.block_type || 'text_with_image',
    product_id: lockProductId ?? initial?.product_id ?? null,
    category_id: lockCategoryId ?? initial?.category_id ?? null,
    sort_order: initial?.sort_order ?? 0,
    is_active: initial?.is_active ?? true,
    title_ka: initial?.title_ka || '', title_ru: initial?.title_ru || '', title_en: initial?.title_en || '',
    subtitle_ka: initial?.subtitle_ka || '', subtitle_ru: initial?.subtitle_ru || '', subtitle_en: initial?.subtitle_en || '',
    body_ka: initial?.body_ka || '', body_ru: initial?.body_ru || '', body_en: initial?.body_en || '',
    image_url: initial?.image_url || '',
    secondary_image_url: initial?.secondary_image_url || '',
    data: initial?.data || {},
  }));

  useEffect(() => {
    if (lockScope) setForm((f: any) => ({ ...f, scope: lockScope, product_id: lockProductId ?? null, category_id: lockCategoryId ?? null }));
  }, [lockScope, lockProductId, lockCategoryId]);

  const setF = (patch: any) => setForm((f: any) => ({ ...f, ...patch }));
  const setData = (patch: any) => setForm((f: any) => ({ ...f, data: { ...f.data, ...patch } }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      scope: form.scope,
      block_type: form.block_type,
      product_id: form.product_id || null,
      category_id: form.category_id || null,
      sort_order: parseInt(form.sort_order?.toString() || '0') || 0,
      is_active: form.is_active,
      title_ka: form.title_ka || null,
      title_ru: form.title_ru || null,
      title_en: form.title_en || null,
      subtitle_ka: form.subtitle_ka || null,
      subtitle_ru: form.subtitle_ru || null,
      subtitle_en: form.subtitle_en || null,
      body_ka: form.body_ka || null,
      body_ru: form.body_ru || null,
      body_en: form.body_en || null,
      image_url: form.image_url || null,
      secondary_image_url: form.secondary_image_url || null,
      data: form.data || {},
    });
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Type + scope + sort + active */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Block type *</Label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.block_type}
                  onChange={(e) => setF({ block_type: e.target.value, data: {} })}>
            {BLOCK_TYPE_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Sort order</Label>
          <Input type="number" value={form.sort_order} onChange={(e) => setF({ sort_order: e.target.value })} />
        </div>
      </div>

      {!lockScope && (
        <div className="space-y-2">
          <Label>Scope *</Label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.scope}
                  onChange={(e) => setF({ scope: e.target.value })}>
            <option value="global">Global (all products)</option>
            <option value="category">Category — all products in a category</option>
            <option value="product">Single product</option>
          </select>
        </div>
      )}

      {/* Common: title/subtitle */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1"><Label className="text-xs">Title KA</Label><Input value={form.title_ka} onChange={(e) => setF({ title_ka: e.target.value })} /></div>
        <div className="space-y-1"><Label className="text-xs">Title RU</Label><Input value={form.title_ru} onChange={(e) => setF({ title_ru: e.target.value })} /></div>
        <div className="space-y-1"><Label className="text-xs">Title EN</Label><Input value={form.title_en} onChange={(e) => setF({ title_en: e.target.value })} /></div>
      </div>

      {(form.block_type === 'technical_diagram' || form.block_type === 'text_with_image' || form.block_type === 'rich_text') && (
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1"><Label className="text-xs">Subtitle KA</Label><Input value={form.subtitle_ka} onChange={(e) => setF({ subtitle_ka: e.target.value })} /></div>
          <div className="space-y-1"><Label className="text-xs">Subtitle RU</Label><Input value={form.subtitle_ru} onChange={(e) => setF({ subtitle_ru: e.target.value })} /></div>
          <div className="space-y-1"><Label className="text-xs">Subtitle EN</Label><Input value={form.subtitle_en} onChange={(e) => setF({ subtitle_en: e.target.value })} /></div>
        </div>
      )}

      {/* Body — HTML allowed for rich_text, text_with_image, contact_cta */}
      {(form.block_type === 'rich_text' || form.block_type === 'text_with_image' || form.block_type === 'contact_cta') && (
        <>
          <div className="space-y-1"><Label className="text-xs">Body KA (HTML allowed: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;a&gt;)</Label><Textarea rows={4} className="font-mono text-xs" value={form.body_ka} onChange={(e) => setF({ body_ka: e.target.value })} /></div>
          <div className="space-y-1"><Label className="text-xs">Body RU</Label><Textarea rows={4} className="font-mono text-xs" value={form.body_ru} onChange={(e) => setF({ body_ru: e.target.value })} /></div>
          <div className="space-y-1"><Label className="text-xs">Body EN</Label><Textarea rows={4} className="font-mono text-xs" value={form.body_en} onChange={(e) => setF({ body_en: e.target.value })} /></div>
        </>
      )}

      {/* Images */}
      {(form.block_type === 'technical_diagram' || form.block_type === 'text_with_image') && (
        <div className="space-y-1">
          <Label className="text-xs">Image URL {form.block_type === 'technical_diagram' ? '(the cross-section) *' : ''}</Label>
          <Input value={form.image_url} onChange={(e) => setF({ image_url: e.target.value })} />
          {form.image_url && <img src={form.image_url} alt="" className="h-24 rounded border mt-2" />}
        </div>
      )}

      {/* Type-specific payload editors */}
      <div className="border-t pt-4 space-y-3">
        {form.block_type === 'specs_list' && <SpecsListDataEditor data={form.data} onChange={setData} />}
        {form.block_type === 'image_gallery' && <ImageGalleryDataEditor data={form.data} onChange={setData} />}
        {form.block_type === 'technical_diagram' && <DiagramDataEditor data={form.data} onChange={setData} />}
        {form.block_type === 'cta_tiles' && <CtaTilesDataEditor data={form.data} onChange={setData} />}
        {form.block_type === 'variants_carousel' && <VariantsDataEditor data={form.data} onChange={setData} />}
        {form.block_type === 'text_with_image' && <TextWithImageDataEditor data={form.data} onChange={setData} />}
        {form.block_type === 'contact_cta' && <ContactCtaDataEditor data={form.data} onChange={setData} />}
        {form.block_type === 'faq_list' && <FaqDataEditor data={form.data} onChange={setData} />}
        {/* rich_text has no extra data */}
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Switch checked={form.is_active} onCheckedChange={(v) => setF({ is_active: v })} />
        <Label>Active</Label>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Save block
        </Button>
      </div>
    </form>
  );
}

// ============================================================================
// Per-block-type data editors
// ============================================================================

function I18nTriple({ value, onChange, placeholder = '' }: { value: any; onChange: (v: any) => void; placeholder?: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Input placeholder={`KA ${placeholder}`} value={value?.ka || ''} onChange={(e) => onChange({ ...value, ka: e.target.value })} />
      <Input placeholder={`RU ${placeholder}`} value={value?.ru || ''} onChange={(e) => onChange({ ...value, ru: e.target.value })} />
      <Input placeholder={`EN ${placeholder}`} value={value?.en || ''} onChange={(e) => onChange({ ...value, en: e.target.value })} />
    </div>
  );
}

function SpecsListDataEditor({ data, onChange }: any) {
  const columns = Array.isArray(data?.columns) ? data.columns : [];
  const setColumns = (next: any[]) => onChange({ columns: next });
  const updateCol = (i: number, patch: any) => setColumns(columns.map((c: any, idx: number) => idx === i ? { ...c, ...patch } : c));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Columns</Label>
        <Button type="button" size="sm" variant="outline" onClick={() => setColumns([...columns, { heading: {}, items: [] }])}><Plus className="h-3 w-3 mr-1" />Add column</Button>
      </div>
      {columns.map((col: any, i: number) => (
        <div key={i} className="border rounded-lg p-3 space-y-2 bg-gray-50 relative">
          <button type="button" onClick={() => setColumns(columns.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 text-red-600"><Trash2 className="h-3 w-3" /></button>
          <Label className="text-xs">Heading</Label>
          <I18nTriple value={col.heading} onChange={(v) => updateCol(i, { heading: v })} />
          <Label className="text-xs mt-2">Items</Label>
          {(col.items || []).map((item: any, j: number) => (
            <div key={j} className="flex gap-1">
              <div className="flex-1"><I18nTriple value={item} onChange={(v) => updateCol(i, { items: col.items.map((it: any, idx: number) => idx === j ? v : it) })} /></div>
              <Button type="button" variant="ghost" size="icon" className="text-red-600" onClick={() => updateCol(i, { items: col.items.filter((_: any, idx: number) => idx !== j) })}><Trash2 className="h-3 w-3" /></Button>
            </div>
          ))}
          <Button type="button" size="sm" variant="outline" onClick={() => updateCol(i, { items: [...(col.items || []), {}] })}><Plus className="h-3 w-3 mr-1" />Add item</Button>
        </div>
      ))}
    </div>
  );
}

function ImageGalleryDataEditor({ data, onChange }: any) {
  const images = Array.isArray(data?.images) ? data.images : [];
  const set = (next: any[]) => onChange({ images: next });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between"><Label>Images</Label>
        <Button type="button" size="sm" variant="outline" onClick={() => set([...images, { url: '' }])}><Plus className="h-3 w-3 mr-1" />Add image</Button>
      </div>
      {images.map((img: any, i: number) => (
        <div key={i} className="border rounded p-3 space-y-2 bg-gray-50 relative">
          <button type="button" onClick={() => set(images.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 text-red-600"><Trash2 className="h-3 w-3" /></button>
          <Input placeholder="Image URL" value={img.url || ''} onChange={(e) => set(images.map((x: any, idx: number) => idx === i ? { ...x, url: e.target.value } : x))} />
          <Input placeholder="Video URL (optional — turns this tile into a play button)" value={img.video_url || ''} onChange={(e) => set(images.map((x: any, idx: number) => idx === i ? { ...x, video_url: e.target.value } : x))} />
          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="Caption KA" value={img.caption_ka || ''} onChange={(e) => set(images.map((x: any, idx: number) => idx === i ? { ...x, caption_ka: e.target.value } : x))} />
            <Input placeholder="Caption RU" value={img.caption_ru || ''} onChange={(e) => set(images.map((x: any, idx: number) => idx === i ? { ...x, caption_ru: e.target.value } : x))} />
            <Input placeholder="Caption EN" value={img.caption_en || ''} onChange={(e) => set(images.map((x: any, idx: number) => idx === i ? { ...x, caption_en: e.target.value } : x))} />
          </div>
          {img.url && <img src={img.url} alt="" className="h-16 rounded" />}
        </div>
      ))}
    </div>
  );
}

function DiagramDataEditor({ data, onChange }: any) {
  const callouts = Array.isArray(data?.callouts) ? data.callouts : [];
  const set = (next: any[]) => onChange({ callouts: next });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Numbered callouts (x, y in %)</Label>
        <Button type="button" size="sm" variant="outline" onClick={() => set([...callouts, { number: callouts.length + 1, x: 50, y: 50 }])}><Plus className="h-3 w-3 mr-1" />Add callout</Button>
      </div>
      {callouts.map((c: any, i: number) => (
        <div key={i} className="border rounded p-3 space-y-2 bg-gray-50 relative">
          <button type="button" onClick={() => set(callouts.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 text-red-600"><Trash2 className="h-3 w-3" /></button>
          <div className="grid grid-cols-3 gap-2">
            <Input type="number" placeholder="№" value={c.number ?? ''} onChange={(e) => set(callouts.map((x: any, idx: number) => idx === i ? { ...x, number: parseInt(e.target.value) || 0 } : x))} />
            <Input type="number" placeholder="x %" value={c.x ?? ''} onChange={(e) => set(callouts.map((x: any, idx: number) => idx === i ? { ...x, x: parseFloat(e.target.value) || 0 } : x))} />
            <Input type="number" placeholder="y %" value={c.y ?? ''} onChange={(e) => set(callouts.map((x: any, idx: number) => idx === i ? { ...x, y: parseFloat(e.target.value) || 0 } : x))} />
          </div>
          <I18nTriple value={c.label} onChange={(v) => set(callouts.map((x: any, idx: number) => idx === i ? { ...x, label: v } : x))} placeholder="label" />
        </div>
      ))}
    </div>
  );
}

function CtaTilesDataEditor({ data, onChange }: any) {
  const tiles = Array.isArray(data?.tiles) ? data.tiles : [];
  const set = (next: any[]) => onChange({ tiles: next });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Tiles (up to 4)</Label>
        <Button type="button" size="sm" variant="outline" onClick={() => set([...tiles, {}])}><Plus className="h-3 w-3 mr-1" />Add tile</Button>
      </div>
      {tiles.map((t: any, i: number) => (
        <div key={i} className="border rounded p-3 space-y-2 bg-gray-50 relative">
          <button type="button" onClick={() => set(tiles.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 text-red-600"><Trash2 className="h-3 w-3" /></button>
          <Input placeholder="Lucide icon name (e.g. Award, Ruler, Package)" value={t.icon || ''} onChange={(e) => set(tiles.map((x: any, idx: number) => idx === i ? { ...x, icon: e.target.value } : x))} />
          <div className="space-y-1"><Label className="text-xs">Title</Label><I18nTriple value={t.title} onChange={(v) => set(tiles.map((x: any, idx: number) => idx === i ? { ...x, title: v } : x))} /></div>
          <div className="space-y-1"><Label className="text-xs">Description</Label><I18nTriple value={t.description} onChange={(v) => set(tiles.map((x: any, idx: number) => idx === i ? { ...x, description: v } : x))} /></div>
          <Input placeholder="URL" value={t.url || ''} onChange={(e) => set(tiles.map((x: any, idx: number) => idx === i ? { ...x, url: e.target.value } : x))} />
        </div>
      ))}
    </div>
  );
}

function VariantsDataEditor({ data, onChange }: any) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const set = (next: any[]) => onChange({ items: next });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between"><Label>Variant items</Label>
        <Button type="button" size="sm" variant="outline" onClick={() => set([...items, {}])}><Plus className="h-3 w-3 mr-1" />Add item</Button>
      </div>
      {items.map((it: any, i: number) => (
        <div key={i} className="border rounded p-3 space-y-2 bg-gray-50 relative">
          <button type="button" onClick={() => set(items.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 text-red-600"><Trash2 className="h-3 w-3" /></button>
          <Input placeholder="Image URL" value={it.image || ''} onChange={(e) => set(items.map((x: any, idx: number) => idx === i ? { ...x, image: e.target.value } : x))} />
          <div className="space-y-1"><Label className="text-xs">Title</Label><I18nTriple value={it.title} onChange={(v) => set(items.map((x: any, idx: number) => idx === i ? { ...x, title: v } : x))} /></div>
          <Input placeholder="Link URL (optional)" value={it.href || ''} onChange={(e) => set(items.map((x: any, idx: number) => idx === i ? { ...x, href: e.target.value } : x))} />
        </div>
      ))}
    </div>
  );
}

function TextWithImageDataEditor({ data, onChange }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-xs">Image position</Label>
      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={data?.image_position || 'right'}
              onChange={(e) => onChange({ image_position: e.target.value })}>
        <option value="right">Image on right, text on left</option>
        <option value="left">Image on left, text on right</option>
      </select>
    </div>
  );
}

function ContactCtaDataEditor({ data, onChange }: any) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">Leave phone/email/whatsapp empty to inherit from Site Settings.</p>
      <Input placeholder="Phone override (optional)" value={data?.phone || ''} onChange={(e) => onChange({ phone: e.target.value })} />
      <Input placeholder="Email override (optional)" value={data?.email || ''} onChange={(e) => onChange({ email: e.target.value })} />
      <Input placeholder="WhatsApp number override (optional)" value={data?.whatsapp || ''} onChange={(e) => onChange({ whatsapp: e.target.value })} />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2"><Switch checked={data?.show_phone !== false} onCheckedChange={(v) => onChange({ show_phone: v })} /><Label>Show phone</Label></div>
        <div className="flex items-center gap-2"><Switch checked={data?.show_email !== false} onCheckedChange={(v) => onChange({ show_email: v })} /><Label>Show email</Label></div>
        <div className="flex items-center gap-2"><Switch checked={data?.show_whatsapp !== false} onCheckedChange={(v) => onChange({ show_whatsapp: v })} /><Label>Show WhatsApp</Label></div>
        <div className="flex items-center gap-2"><Switch checked={data?.show_callback_form !== false} onCheckedChange={(v) => onChange({ show_callback_form: v })} /><Label>Show callback form</Label></div>
      </div>
    </div>
  );
}

function FaqDataEditor({ data, onChange }: any) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const set = (next: any[]) => onChange({ items: next });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between"><Label>FAQ items</Label>
        <Button type="button" size="sm" variant="outline" onClick={() => set([...items, {}])}><Plus className="h-3 w-3 mr-1" />Add Q/A</Button>
      </div>
      {items.map((it: any, i: number) => (
        <div key={i} className="border rounded p-3 space-y-2 bg-gray-50 relative">
          <button type="button" onClick={() => set(items.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 text-red-600"><Trash2 className="h-3 w-3" /></button>
          <Label className="text-xs">Question</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="Q KA" value={it.q_ka || ''} onChange={(e) => set(items.map((x: any, idx: number) => idx === i ? { ...x, q_ka: e.target.value } : x))} />
            <Input placeholder="Q RU" value={it.q_ru || ''} onChange={(e) => set(items.map((x: any, idx: number) => idx === i ? { ...x, q_ru: e.target.value } : x))} />
            <Input placeholder="Q EN" value={it.q_en || ''} onChange={(e) => set(items.map((x: any, idx: number) => idx === i ? { ...x, q_en: e.target.value } : x))} />
          </div>
          <Label className="text-xs">Answer (HTML allowed)</Label>
          <div className="grid grid-cols-3 gap-2">
            <Textarea rows={2} className="font-mono text-xs" placeholder="A KA" value={it.a_ka || ''} onChange={(e) => set(items.map((x: any, idx: number) => idx === i ? { ...x, a_ka: e.target.value } : x))} />
            <Textarea rows={2} className="font-mono text-xs" placeholder="A RU" value={it.a_ru || ''} onChange={(e) => set(items.map((x: any, idx: number) => idx === i ? { ...x, a_ru: e.target.value } : x))} />
            <Textarea rows={2} className="font-mono text-xs" placeholder="A EN" value={it.a_en || ''} onChange={(e) => set(items.map((x: any, idx: number) => idx === i ? { ...x, a_en: e.target.value } : x))} />
          </div>
        </div>
      ))}
    </div>
  );
}
