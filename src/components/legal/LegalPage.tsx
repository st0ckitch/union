import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface LegalPageProps {
  slug: string;
  /** Shown while DB content is still loading and also as fallback if the row doesn't exist. */
  fallback?: {
    title_ka: string;
    title_ru?: string;
    title_en?: string;
    body_ka?: string;
    body_ru?: string;
    body_en?: string;
  };
}

/**
 * Shared legal/info page reader — pulls title + HTML body from public.legal_pages.
 * Body is stored as HTML and rendered with dangerouslySetInnerHTML.
 * Admin controls the content at /admin/legal-pages.
 */
export function LegalPage({ slug, fallback }: LegalPageProps) {
  const { language } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['legal-page', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('legal_pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });

  const pick = (ka?: string | null, ru?: string | null, en?: string | null) => {
    if (language === 'ru') return ru || ka || en || '';
    if (language === 'en') return en || ka || ru || '';
    return ka || ru || en || '';
  };

  const row = data;
  const title = row
    ? pick(row.title_ka, row.title_ru, row.title_en)
    : pick(fallback?.title_ka, fallback?.title_ru, fallback?.title_en);
  const body = row
    ? pick(row.body_ka, row.body_ru, row.body_en)
    : pick(fallback?.body_ka, fallback?.body_ru, fallback?.body_en);

  const breadcrumbItems = [{ label: title }];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-3xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">{title}</h1>

          {isLoading && !row ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div
              className="prose prose-lg max-w-none prose-headings:text-xl prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8 prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: body || '<p class="text-muted-foreground">Content coming soon.</p>' }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
