import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLocalized } from '@/hooks/useHMSection';

export function HMProjects() {
  const { t, language } = useLanguage();
  const { data: projects } = useQuery({
    queryKey: ['hmspace-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hmspace_projects')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1320px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-neutral-900" />
              <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-500 font-medium">
                {t('ourProjectsTitle') || 'Projects'}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 leading-[1.1] tracking-tight">
              {t('ourProjectsTitle') || 'Selected projects'}
            </h2>
          </div>
          <Link
            to="/union/designers"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-700 transition-colors w-fit"
          >
            {t('viewMore') || 'View more'} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const title = pickLocalized(p, 'title', language);
            const desc = pickLocalized(p, 'description', language);
            const Wrap: any = p.link_url ? Link : 'div';
            const wrapProps: any = p.link_url ? { to: p.link_url } : {};
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="group"
              >
                <Wrap {...wrapProps} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-neutral-100">
                    <img src={p.image_url} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-1">{title}</h3>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400">
                        {[p.location, p.year].filter(Boolean).join(' — ')}
                      </p>
                    </div>
                    {p.is_featured && (
                      <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 border border-neutral-300 px-2 py-0.5">
                        Featured
                      </span>
                    )}
                  </div>
                  {desc && <p className="text-sm text-neutral-500 mt-3 leading-relaxed line-clamp-2">{desc}</p>}
                </Wrap>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
