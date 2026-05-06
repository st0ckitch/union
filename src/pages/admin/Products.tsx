import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { ProductConfiguratorTab } from '@/components/admin/ProductConfiguratorTab';
import { ProductBlocksEditor } from '@/components/admin/ProductBlocksEditor';
import { SpecificationsEditor, SpecsObject } from '@/components/admin/SpecificationsEditor';
import { SpecSectionsEditor, SpecSection } from '@/components/admin/SpecSectionsEditor';
import { DownloadLinksEditor, DownloadLink } from '@/components/admin/DownloadLinksEditor';
import { LifestyleGalleryEditor } from '@/components/admin/LifestyleGalleryEditor';
import { deleteRow } from '@/lib/adminMutations';
import { useAdminT } from '@/lib/adminI18n';

type Product = Tables<'products'>;
type Category = Tables<'categories'>;

export default function AdminProducts() {
  const t = useAdminT();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name_ka: '',
    name_en: '',
    name_ru: '',
    slug: '',
    description_ka: '',
    description_en: '',
    description_ru: '',
    price: '',
    sale_price: '',
    category_id: '',
    is_active: true,
    is_featured: false,
    is_new: false,
    stock_quantity: '0',
    images: [] as string[],
    has_otdelka_variants: false,
    has_korobka_variants: false,
    has_model_variants: false,
    has_glass_variants: false,
    has_lock_variants: false,
    has_panel_variants: false,
    has_modules: false,
    configuration_styles: [] as string[],
    specifications: {} as SpecsObject,
    spec_sections: [] as SpecSection[],
    download_links: [] as DownloadLink[],
    // Phase A — universal product attributes
    category_type: 'generic',
    country_of_origin: '',
    designer_credit: '',
    stock_status: '',
    delivery_days: '',
    delivery_text_ka: '',
    delivery_text_ru: '',
    delivery_text_en: '',
    video_url: '',
    video_provider: '',
    lifestyle_gallery_image_urls: [] as string[],
    price_from: false,
    // Phase B — filter facets
    finish: [] as string[],
    frame_type: '',
    collection_slug: '',
    style_tags: [] as string[],
  });
  const [selectedOtdelka, setSelectedOtdelka] = useState<string[]>([]);
  const [selectedKorobka, setSelectedKorobka] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedGlass, setSelectedGlass] = useState<string[]>([]);
  const [selectedLocks, setSelectedLocks] = useState<string[]>([]);
  const [selectedPanels, setSelectedPanels] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name_ka)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name_ka');
      if (error) throw error;
      return data as Category[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('products').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success(t('Product created'));
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('products').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success(t('Product updated'));
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRow('products', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success(t('Product deleted'));
    },
    onError: (error: any) => toast.error(error.message)
  });

  const resetForm = () => {
    setFormData({
      name_ka: '',
      name_en: '',
      name_ru: '',
      slug: '',
      description_ka: '',
      description_en: '',
      description_ru: '',
      price: '',
      sale_price: '',
      category_id: '',
      is_active: true,
      is_featured: false,
      is_new: false,
      stock_quantity: '0',
      images: [],
      has_otdelka_variants: false,
      has_korobka_variants: false,
      has_model_variants: false,
      has_glass_variants: false,
      has_lock_variants: false,
      has_panel_variants: false,
      has_modules: false,
      configuration_styles: [],
      specifications: {},
      spec_sections: [],
      download_links: [],
      category_type: 'generic',
      country_of_origin: '',
      designer_credit: '',
      stock_status: '',
      delivery_days: '',
      delivery_text_ka: '',
      delivery_text_ru: '',
      delivery_text_en: '',
      video_url: '',
      video_provider: '',
      lifestyle_gallery_image_urls: [],
      price_from: false,
      finish: [],
      frame_type: '',
      collection_slug: '',
      style_tags: [],
    });
    setSelectedOtdelka([]);
    setSelectedKorobka([]);
    setSelectedModels([]);
    setSelectedGlass([]);
    setSelectedLocks([]);
    setSelectedPanels([]);
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEdit = async (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name_ka: product.name_ka || '',
      name_en: product.name_en || '',
      name_ru: (product as any).name_ru || '',
      slug: product.slug || '',
      description_ka: product.description_ka || '',
      description_en: product.description_en || '',
      description_ru: (product as any).description_ru || '',
      price: product.price?.toString() || '',
      sale_price: product.sale_price?.toString() || '',
      category_id: product.category_id || '',
      is_active: product.is_active ?? true,
      is_featured: product.is_featured ?? false,
      is_new: product.is_new ?? false,
      stock_quantity: product.stock_quantity?.toString() || '0',
      images: product.images || [],
      has_otdelka_variants: product.has_otdelka_variants ?? false,
      has_korobka_variants: product.has_korobka_variants ?? false,
      has_model_variants: product.has_model_variants ?? false,
      has_glass_variants: (product as any).has_glass_variants ?? false,
      has_lock_variants: (product as any).has_lock_variants ?? false,
      has_panel_variants: (product as any).has_panel_variants ?? false,
      has_modules: (product as any).has_modules ?? false,
      configuration_styles: Array.isArray((product as any).configuration_styles) ? (product as any).configuration_styles : [],
      specifications: (product.specifications && typeof product.specifications === 'object' && !Array.isArray(product.specifications))
        ? Object.fromEntries(Object.entries(product.specifications as object).map(([k, v]) => [k, String(v ?? '')]))
        : {},
      spec_sections: Array.isArray((product as any).spec_sections) ? (product as any).spec_sections as SpecSection[] : [],
      download_links: Array.isArray((product as any).download_links) ? (product as any).download_links as DownloadLink[] : [],
      category_type: (product as any).category_type || 'generic',
      country_of_origin: (product as any).country_of_origin || '',
      designer_credit: (product as any).designer_credit || '',
      stock_status: (product as any).stock_status || '',
      delivery_days: (product as any).delivery_days?.toString() || '',
      delivery_text_ka: (product as any).delivery_text_ka || '',
      delivery_text_ru: (product as any).delivery_text_ru || '',
      delivery_text_en: (product as any).delivery_text_en || '',
      video_url: (product as any).video_url || '',
      video_provider: (product as any).video_provider || '',
      lifestyle_gallery_image_urls: Array.isArray((product as any).lifestyle_gallery_image_urls) ? (product as any).lifestyle_gallery_image_urls : [],
      price_from: (product as any).price_from ?? false,
      finish: Array.isArray((product as any).finish) ? (product as any).finish : [],
      frame_type: (product as any).frame_type || '',
      collection_slug: (product as any).collection_slug || '',
      style_tags: Array.isArray((product as any).style_tags) ? (product as any).style_tags : [],
    });

    // Load existing configurator selections (all 6 dimensions in parallel)
    const [o, k, m, g, l, pn] = await Promise.all([
      supabase.from('product_otdelka_options').select('otdelka_option_id').eq('product_id', product.id),
      supabase.from('product_korobka_options').select('korobka_option_id').eq('product_id', product.id),
      supabase.from('product_model_options').select('model_option_id').eq('product_id', product.id),
      supabase.from('product_glass_options').select('glass_option_id').eq('product_id', product.id),
      supabase.from('product_lock_options').select('lock_option_id').eq('product_id', product.id),
      supabase.from('product_panel_options').select('panel_option_id').eq('product_id', product.id),
    ]);
    setSelectedOtdelka((o.data || []).map((r: any) => r.otdelka_option_id));
    setSelectedKorobka((k.data || []).map((r: any) => r.korobka_option_id));
    setSelectedModels((m.data || []).map((r: any) => r.model_option_id));
    setSelectedGlass((g.data || []).map((r: any) => r.glass_option_id));
    setSelectedLocks((l.data || []).map((r: any) => r.lock_option_id));
    setSelectedPanels((pn.data || []).map((r: any) => r.panel_option_id));

    setIsDialogOpen(true);
  };

  /** Replaces pivot rows for a product with exactly the given option IDs. */
  const syncPivot = async (
    table: string,
    fk: string,
    productId: string,
    optionIds: string[],
  ) => {
    await (supabase.from(table as any).delete() as any).eq('product_id', productId);
    if (optionIds.length > 0) {
      const rows = optionIds.map((id, idx) => ({ product_id: productId, [fk]: id, sort_order: idx } as any));
      const { error } = await supabase.from(table as any).insert(rows as any);
      if (error) throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name_ka: formData.name_ka,
      name_en: formData.name_en || null,
      name_ru: formData.name_ru || null,
      slug: formData.slug || formData.name_ka.toLowerCase().replace(/\s+/g, '-'),
      description_ka: formData.description_ka || null,
      description_en: formData.description_en || null,
      description_ru: formData.description_ru || null,
      price: parseFloat(formData.price) || 0,
      sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
      category_id: formData.category_id || null,
      is_active: formData.is_active,
      is_featured: formData.is_featured,
      is_new: formData.is_new,
      stock_quantity: parseInt(formData.stock_quantity) || 0,
      images: formData.images,
      has_otdelka_variants: formData.has_otdelka_variants,
      has_korobka_variants: formData.has_korobka_variants,
      has_glass_variants: formData.has_glass_variants,
      has_lock_variants: formData.has_lock_variants,
      has_panel_variants: formData.has_panel_variants,
      has_modules: formData.has_modules,
      configuration_styles: formData.configuration_styles || [],
      has_model_variants: formData.has_model_variants,
      specifications: formData.specifications || {},
      spec_sections: formData.spec_sections || [],
      download_links: formData.download_links || [],
      category_type: formData.category_type || 'generic',
      country_of_origin: formData.country_of_origin || null,
      designer_credit: formData.designer_credit || null,
      stock_status: formData.stock_status || null,
      delivery_days: formData.delivery_days ? parseInt(formData.delivery_days) : null,
      delivery_text_ka: formData.delivery_text_ka || null,
      delivery_text_ru: formData.delivery_text_ru || null,
      delivery_text_en: formData.delivery_text_en || null,
      video_url: formData.video_url || null,
      video_provider: formData.video_provider || null,
      lifestyle_gallery_image_urls: formData.lifestyle_gallery_image_urls || [],
      price_from: formData.price_from,
      finish: formData.finish || [],
      frame_type: formData.frame_type || null,
      collection_slug: formData.collection_slug || null,
      style_tags: formData.style_tags || [],
    };

    try {
      let productId: string | null = null;
      if (editingProduct) {
        const { error } = await supabase.from('products').update(data).eq('id', editingProduct.id);
        if (error) throw error;
        productId = editingProduct.id;
      } else {
        const { data: inserted, error } = await supabase.from('products').insert([data]).select('id').single();
        if (error) throw error;
        productId = inserted.id;
      }

      if (productId) {
        await syncPivot('product_otdelka_options', 'otdelka_option_id', productId, formData.has_otdelka_variants ? selectedOtdelka : []);
        await syncPivot('product_korobka_options', 'korobka_option_id', productId, formData.has_korobka_variants ? selectedKorobka : []);
        await syncPivot('product_model_options',   'model_option_id',   productId, formData.has_model_variants   ? selectedModels  : []);
        await syncPivot('product_glass_options',   'glass_option_id',   productId, formData.has_glass_variants   ? selectedGlass   : []);
        await syncPivot('product_lock_options',    'lock_option_id',    productId, formData.has_lock_variants    ? selectedLocks   : []);
        await syncPivot('product_panel_options',   'panel_option_id',   productId, formData.has_panel_variants   ? selectedPanels  : []);
      }

      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success(editingProduct ? t('Product updated') : t('Product created'));
      resetForm();
    } catch (err: any) {
      toast.error(err.message || t('Save failed'));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Products')}</h1>
            <p className="text-gray-500 mt-1">{t('Manage your product catalog')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                {t('Add Product')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? t('Edit Product') : t('Add Product')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Name (Georgian) *')}</Label>
                    <Input
                      value={formData.name_ka}
                      onChange={(e) => setFormData({ ...formData, name_ka: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Name (Russian)')}</Label>
                    <Input
                      value={formData.name_ru}
                      onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Name (English)')}</Label>
                    <Input
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('Slug')}</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-name"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Description (Georgian)')}</Label>
                    <Textarea
                      value={formData.description_ka}
                      onChange={(e) => setFormData({ ...formData, description_ka: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Description (Russian)')}</Label>
                    <Textarea
                      value={formData.description_ru}
                      onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Description (English)')}</Label>
                    <Textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Price *')}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Sale Price')}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.sale_price}
                      onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Stock')}</Label>
                    <Input
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('Category')}</Label>
                  <Select
                    value={formData.category_id || '__none__'}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value === '__none__' ? '' : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('Select category')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">{t('— No category —')}</SelectItem>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name_ka}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_featured} onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })} />
                    <Label>Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_new} onCheckedChange={(checked) => setFormData({ ...formData, is_new: checked })} />
                    <Label>New</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.price_from} onCheckedChange={(checked) => setFormData({ ...formData, price_from: checked })} />
                    <Label title="Show 'от' / 'from' prefix on price">Price from</Label>
                  </div>
                </div>

                {/* === Phase A: universal product attributes === */}
                <div className="border rounded-lg p-4 bg-gray-50/50 space-y-4">
                  <div>
                    <Label className="font-medium">Category type & display attributes</Label>
                    <p className="text-xs text-gray-500 mt-0.5">Drives which configurator dimensions render on the product page.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label>Category type</Label>
                      <Select
                        value={formData.category_type}
                        onValueChange={(v) => setFormData({ ...formData, category_type: v })}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="generic">Generic</SelectItem>
                          <SelectItem value="hinged_door">Hinged door</SelectItem>
                          <SelectItem value="sliding_door">Sliding door</SelectItem>
                          <SelectItem value="entrance_door">Entrance door</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="hardware">Hardware</SelectItem>
                          <SelectItem value="wall_panel">Wall panel</SelectItem>
                          <SelectItem value="baseboard">Baseboard</SelectItem>
                          <SelectItem value="partition">Partition</SelectItem>
                          <SelectItem value="mirror">Mirror</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Stock status</Label>
                      <Select
                        value={formData.stock_status || '__none__'}
                        onValueChange={(v) => setFormData({ ...formData, stock_status: v === '__none__' ? '' : v })}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">— Auto (from stock_quantity) —</SelectItem>
                          <SelectItem value="in_stock">In stock</SelectItem>
                          <SelectItem value="to_order">To order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Country of origin</Label>
                      <Input
                        value={formData.country_of_origin}
                        onChange={(e) => setFormData({ ...formData, country_of_origin: e.target.value })}
                        placeholder="Italy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Designer credit</Label>
                      <Input
                        value={formData.designer_credit}
                        onChange={(e) => setFormData({ ...formData, designer_credit: e.target.value })}
                        placeholder="e.g. DECOMA DESIGN"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Delivery days</Label>
                      <Input
                        type="number"
                        value={formData.delivery_days}
                        onChange={(e) => setFormData({ ...formData, delivery_days: e.target.value })}
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label>Delivery text (KA)</Label>
                      <Input
                        value={formData.delivery_text_ka}
                        onChange={(e) => setFormData({ ...formData, delivery_text_ka: e.target.value })}
                        placeholder="30 დღეში"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Delivery text (RU)</Label>
                      <Input
                        value={formData.delivery_text_ru}
                        onChange={(e) => setFormData({ ...formData, delivery_text_ru: e.target.value })}
                        placeholder="За 30 дней"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Delivery text (EN)</Label>
                      <Input
                        value={formData.delivery_text_en}
                        onChange={(e) => setFormData({ ...formData, delivery_text_en: e.target.value })}
                        placeholder="In 30 days"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr,180px] gap-3">
                    <div className="space-y-2">
                      <Label>Video URL</Label>
                      <Input
                        value={formData.video_url}
                        onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Provider</Label>
                      <Select
                        value={formData.video_provider || '__auto__'}
                        onValueChange={(v) => setFormData({ ...formData, video_provider: v === '__auto__' ? '' : v })}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__auto__">— Auto-detect —</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="vimeo">Vimeo</SelectItem>
                          <SelectItem value="yandex">Yandex / Dzen</SelectItem>
                          <SelectItem value="mp4">Direct mp4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Furniture-specific: modules toggle + manage link (Phase D) */}
                  {formData.category_type === 'furniture' && (
                    <div className="border-t pt-3 space-y-3">
                      <div className="flex items-center gap-3">
                        <Switch checked={formData.has_modules} onCheckedChange={(v) => setFormData({ ...formData, has_modules: v })} />
                        <div>
                          <Label className="font-medium">Has modules</Label>
                          <p className="text-xs text-gray-500">Renders the FORMINA-style module configurator on the product page.</p>
                        </div>
                      </div>
                      {formData.has_modules && editingProduct && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                          <Link
                            to={`/admin/furniture-modules?product=${editingProduct.id}`}
                            target="_blank"
                            className="text-primary underline"
                          >
                            Manage modules for this product →
                          </Link>
                        </div>
                      )}
                      {formData.has_modules && !editingProduct && (
                        <p className="text-xs text-amber-600">{t('Save the product first, then re-open to manage modules.')}</p>
                      )}
                      <div className="space-y-2">
                        <Label>Configuration styles (CSV)</Label>
                        <Input
                          value={formData.configuration_styles.join(',')}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              configuration_styles: e.target.value.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
                            })
                          }
                          placeholder="straight, angular, u_shape"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <LifestyleGalleryEditor
                  value={formData.lifestyle_gallery_image_urls}
                  onChange={(next) => setFormData({ ...formData, lifestyle_gallery_image_urls: next })}
                />

                {/* === Phase B: filter facets === */}
                <div className="border rounded-lg p-4 bg-gray-50/50 space-y-3">
                  <div>
                    <Label className="font-medium">Filter facets</Label>
                    <p className="text-xs text-gray-500 mt-0.5">Drives the catalog-page filter sidebar. Comma-separated values.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Finish (CSV)</Label>
                      <Input
                        value={formData.finish.join(',')}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            finish: e.target.value.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
                          })
                        }
                        placeholder="laccato, fondo, veneer, hpl, aluminium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Frame type</Label>
                      <Select
                        value={formData.frame_type || '__none__'}
                        onValueChange={(v) => setFormData({ ...formData, frame_type: v === '__none__' ? '' : v })}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">— None —</SelectItem>
                          <SelectItem value="invisible">INVISIBLE (hidden)</SelectItem>
                          <SelectItem value="planar">PLANAR (flush)</SelectItem>
                          <SelectItem value="deco">DECO (decorative)</SelectItem>
                          <SelectItem value="uniwood">UNIWOOD (wooden)</SelectItem>
                          <SelectItem value="unidoor">UNIDOOR (classic)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Collection slug</Label>
                      <Input
                        value={formData.collection_slug}
                        onChange={(e) => setFormData({ ...formData, collection_slug: e.target.value.trim().toLowerCase() })}
                        placeholder="filo-60, corda-60, stratus..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Style tags (CSV)</Label>
                      <Input
                        value={formData.style_tags.join(',')}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            style_tags: e.target.value.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
                          })
                        }
                        placeholder="modern, classic, scandinavian"
                      />
                    </div>
                  </div>
                </div>

                <SpecificationsEditor
                  value={formData.specifications}
                  onChange={(next) => setFormData({ ...formData, specifications: next })}
                />

                <SpecSectionsEditor
                  value={formData.spec_sections}
                  onChange={(next) => setFormData({ ...formData, spec_sections: next })}
                />

                <DownloadLinksEditor
                  value={formData.download_links}
                  onChange={(next) => setFormData({ ...formData, download_links: next })}
                />

                <ProductConfiguratorTab
                  hasOtdelka={formData.has_otdelka_variants}
                  setHasOtdelka={(v) => setFormData({ ...formData, has_otdelka_variants: v })}
                  hasKorobka={formData.has_korobka_variants}
                  setHasKorobka={(v) => setFormData({ ...formData, has_korobka_variants: v })}
                  hasModel={formData.has_model_variants}
                  setHasModel={(v) => setFormData({ ...formData, has_model_variants: v })}
                  hasGlass={formData.has_glass_variants}
                  setHasGlass={(v) => setFormData({ ...formData, has_glass_variants: v })}
                  hasLock={formData.has_lock_variants}
                  setHasLock={(v) => setFormData({ ...formData, has_lock_variants: v })}
                  hasPanel={formData.has_panel_variants}
                  setHasPanel={(v) => setFormData({ ...formData, has_panel_variants: v })}
                  selectedOtdelka={selectedOtdelka}
                  setSelectedOtdelka={setSelectedOtdelka}
                  selectedKorobka={selectedKorobka}
                  setSelectedKorobka={setSelectedKorobka}
                  selectedModels={selectedModels}
                  setSelectedModels={setSelectedModels}
                  selectedGlass={selectedGlass}
                  setSelectedGlass={setSelectedGlass}
                  selectedLocks={selectedLocks}
                  setSelectedLocks={setSelectedLocks}
                  selectedPanels={selectedPanels}
                  setSelectedPanels={setSelectedPanels}
                />

                {editingProduct && (
                  <ProductBlocksEditor
                    productId={editingProduct.id}
                    categoryId={editingProduct.category_id}
                  />
                )}

                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>{t('Cancel')}</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingProduct ? t('Update') : t('Create')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('Name')}</TableHead>
                    <TableHead>{t('Category')}</TableHead>
                    <TableHead>{t('Price')}</TableHead>
                    <TableHead>{t('Stock')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead className="w-[100px]">{t('Actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((product: any) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name_ka}</TableCell>
                      <TableCell>{product.categories?.name_ka || '-'}</TableCell>
                      <TableCell>
                        {product.sale_price ? (
                          <span>
                            <span className="line-through text-gray-400 mr-2">₾{product.price}</span>
                            <span className="text-red-600">₾{product.sale_price}</span>
                          </span>
                        ) : (
                          <span>₾{product.price}</span>
                        )}
                      </TableCell>
                      <TableCell>{product.stock_quantity}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {product.is_active ? t('Active') : t('Inactive')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteMutation.mutate(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {t('No products yet')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
