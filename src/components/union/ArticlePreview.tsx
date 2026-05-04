import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function ArticlePreview() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Modern doors"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Scroll up button */}
            <button className="absolute bottom-4 left-4 w-10 h-10 bg-[#333] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronUp className="h-5 w-5 text-white" />
            </button>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-6 leading-relaxed">
              {t('whyChooseStandardDoors')}
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t('articleDesc')}
            </p>

            <div className="flex items-center gap-4">
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="rounded-none px-8 border-foreground text-foreground hover:bg-foreground hover:text-background tracking-widest"
              >
                <Link to="/union/blog/standard-doors">
                  {t('moreDetails')}
                </Link>
              </Button>

              {/* Navigation arrows */}
              <div className="flex items-center gap-2 ml-auto">
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <ChevronLeft className="h-6 w-6" strokeWidth={1} />
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <ChevronRight className="h-6 w-6" strokeWidth={1} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
