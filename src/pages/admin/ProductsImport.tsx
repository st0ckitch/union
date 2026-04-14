import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Upload, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Category = Tables<'categories'>;

interface ImportRow {
  name_en: string;
  name_ka?: string;
  slug: string;
  description_en?: string;
  description_ka?: string;
  price: number;
  sale_price?: number | null;
  category_slug: string;
  images?: string[];
  specifications?: Record<string, unknown>;
  source_url?: string;
  is_new?: boolean;
  is_featured?: boolean;
  stock_quantity?: number;
}

function parseCSV(text: string): ImportRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(',');
    const row: any = {};
    headers.forEach((h, i) => {
      const v = (cells[i] ?? '').trim();
      if (h === 'price' || h === 'sale_price' || h === 'stock_quantity') {
        row[h] = v ? Number(v) : undefined;
      } else if (h === 'images') {
        row[h] = v ? v.split('|').filter(Boolean) : [];
      } else if (v) {
        row[h] = v;
      }
    });
    return row as ImportRow;
  });
}

function validateRow(r: ImportRow): string | null {
  if (!r.name_en) return 'missing name_en';
  if (!r.slug) return 'missing slug';
  if (typeof r.price !== 'number' || Number.isNaN(r.price)) return 'invalid price';
  if (!r.category_slug) return 'missing category_slug';
  return null;
}

export default function AdminProductsImport() {
  const queryClient = useQueryClient();
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [createMissingCategories, setCreateMissingCategories] = useState(true);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ inserted: number; failed: number; errors: string[] } | null>(null);

  const { data: categories } = useQuery({
    queryKey: ['admin-categories-import'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data as Category[];
    },
  });

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setResult(null);
    const text = await file.text();
    try {
      if (file.name.endsWith('.json')) {
        const parsed = JSON.parse(text);
        const arr: ImportRow[] = Array.isArray(parsed) ? parsed : parsed.products ?? [];
        setRows(arr);
      } else {
        setRows(parseCSV(text));
      }
    } catch (e: any) {
      toast.error(`Parse error: ${e.message}`);
      setRows([]);
    }
  };

  const runImport = async () => {
    if (rows.length === 0) {
      toast.error('No rows to import');
      return;
    }
    setImporting(true);
    const errors: string[] = [];
    let inserted = 0;

    // Build category slug -> id map, creating missing if allowed
    const catBySlug: Record<string, string> = {};
    (categories ?? []).forEach((c) => (catBySlug[c.slug] = c.id));

    const neededSlugs = Array.from(new Set(rows.map((r) => r.category_slug))).filter((s) => s && !catBySlug[s]);
    if (neededSlugs.length > 0) {
      if (!createMissingCategories) {
        errors.push(`Missing categories: ${neededSlugs.join(', ')}`);
        setResult({ inserted: 0, failed: rows.length, errors });
        setImporting(false);
        return;
      }
      for (const slug of neededSlugs) {
        const { data, error } = await supabase
          .from('categories')
          .insert({
            slug,
            name_ka: slug.replace(/-/g, ' '),
            name_en: slug.replace(/-/g, ' '),
            is_active: true,
          })
          .select()
          .single();
        if (error) {
          errors.push(`Category ${slug}: ${error.message}`);
          continue;
        }
        catBySlug[slug] = data.id;
      }
    }

    for (const r of rows) {
      const err = validateRow(r);
      if (err) {
        errors.push(`${r.slug || '(no slug)'}: ${err}`);
        continue;
      }
      const category_id = catBySlug[r.category_slug];
      if (!category_id) {
        errors.push(`${r.slug}: category ${r.category_slug} not found`);
        continue;
      }
      const { error } = await (supabase as any).from('products').upsert(
        {
          name_ka: r.name_ka ?? r.name_en,
          name_en: r.name_en,
          slug: r.slug,
          description_ka: r.description_ka ?? null,
          description_en: r.description_en ?? null,
          price: r.price,
          sale_price: r.sale_price ?? null,
          category_id,
          images: r.images ?? [],
          is_new: r.is_new ?? false,
          is_featured: r.is_featured ?? false,
          is_active: true,
          stock_quantity: r.stock_quantity ?? 0,
          specifications: r.specifications ?? {},
          source_url: r.source_url ?? null,
        },
        { onConflict: 'slug' }
      );
      if (error) {
        errors.push(`${r.slug}: ${error.message}`);
      } else {
        inserted++;
      }
    }

    setResult({ inserted, failed: rows.length - inserted, errors });
    queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    setImporting(false);
    if (inserted > 0) toast.success(`Imported ${inserted} product(s)`);
    if (errors.length > 0) toast.error(`${errors.length} error(s) — see details below`);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Bulk Import Products</h1>
          <p className="text-sm text-muted-foreground">
            Upload a JSON or CSV file. Required fields: <code>name_en</code>, <code>slug</code>, <code>price</code>, <code>category_slug</code>.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload file</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border border-dashed rounded cursor-pointer hover:bg-accent">
                <Upload className="h-4 w-4" />
                <span>Choose JSON or CSV</span>
                <input
                  type="file"
                  accept=".json,.csv"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>
              {fileName && (
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" /> {fileName} — {rows.length} row(s)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="create_cats"
                checked={createMissingCategories}
                onCheckedChange={setCreateMissingCategories}
              />
              <Label htmlFor="create_cats">Create missing categories automatically</Label>
            </div>

            <Button onClick={runImport} disabled={importing || rows.length === 0}>
              {importing ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing...</>
              ) : (
                <>Import {rows.length} row(s)</>
              )}
            </Button>
          </CardContent>
        </Card>

        {rows.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Preview (first 20)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Valid</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.slice(0, 20).map((r, i) => {
                    const err = validateRow(r);
                    return (
                      <TableRow key={i}>
                        <TableCell>{r.name_en}</TableCell>
                        <TableCell className="font-mono text-xs">{r.slug}</TableCell>
                        <TableCell>{r.category_slug}</TableCell>
                        <TableCell>{r.price}</TableCell>
                        <TableCell>{r.images?.length ?? 0}</TableCell>
                        <TableCell>
                          {err ? (
                            <span className="text-red-600 flex items-center gap-1"><XCircle className="h-4 w-4" />{err}</span>
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">Inserted/updated: <strong>{result.inserted}</strong></p>
              <p className="text-sm mb-4">Failed: <strong>{result.failed}</strong></p>
              {result.errors.length > 0 && (
                <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-64">
                  {result.errors.join('\n')}
                </pre>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
