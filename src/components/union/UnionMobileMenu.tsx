import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ChevronRight, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UnionMobileMenuProps {
  onClose: () => void;
}

const menuItems = [
  { name: 'კატალოგი', href: '/union/catalog', hasSubmenu: true },
  { name: 'SALE %', href: '/union/sale', highlight: true },
  { name: 'მარაგშია', href: '/union/catalog?filter=in-stock' },
  { name: 'იტალიიდან შეკვეთით', href: '/union/catalog?filter=italy' },
  { name: 'შოურუმები', href: '/union/showrooms' },
  { name: 'დიზაინერებს', href: '/union/designers' },
  { name: 'ბლოგი', href: '/union/blog' },
  { name: 'კომპანია', href: '/union/about' },
  { name: 'კონტაქტი', href: '/union/contact' },
];

const categories = [
  { name: 'გაშლადი კარები', slug: 'swing-doors' },
  { name: 'სრიალა კარები', slug: 'sliding-doors' },
  { name: 'სრიალა ტიხრები', slug: 'sliding-partitions' },
  { name: 'კედლის პანელები', slug: 'wall-panels' },
  { name: 'ავეჯი', slug: 'furniture', isNew: true },
  { name: 'მაგიდები', slug: 'tables', isNew: true },
  { name: 'დივნები', slug: 'sofas' },
  { name: 'აქსესუარები', slug: 'accessories' },
];

export function UnionMobileMenu({ onClose }: UnionMobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 lg:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-background overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-foreground text-background">
          <Link to="/union" onClick={onClose} className="text-2xl font-bold">
            UNION
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-background hover:bg-white/10">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Menu items */}
        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  item.highlight 
                    ? 'text-sale font-bold bg-sale/10' 
                    : 'hover:bg-muted'
                }`}
              >
                <span>{item.name}</span>
                {item.hasSubmenu && <ChevronRight className="h-5 w-5" />}
              </Link>
            ))}
          </nav>

          {/* Categories */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
              კატეგორიები
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/union/catalog/${cat.slug}`}
                  onClick={onClose}
                  className="p-2 text-sm rounded-lg hover:bg-muted transition-colors flex items-center gap-1"
                >
                  {cat.name}
                  {cat.isNew && <span className="badge-new text-[9px] px-1">NEW</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-6 pt-6 border-t border-border space-y-3">
            <a href="tel:+995322000000" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Phone className="h-5 w-5 text-primary" />
              <span>+995 32 2 00 00 00</span>
            </a>
            <a href="mailto:info@union.ge" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Mail className="h-5 w-5 text-primary" />
              <span>info@union.ge</span>
            </a>
          </div>

          {/* Back to HMspace */}
          <div className="mt-6 pt-6 border-t border-border">
            <Link
              to="/"
              onClick={onClose}
              className="block text-center p-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              ← HMspace-ზე დაბრუნება
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
