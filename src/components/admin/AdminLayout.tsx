import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminT } from '@/lib/adminI18n';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Image,
  FileText,
  MessageSquare,
  Store,
  Star,
  Settings as SettingsIcon,
  Upload,
  LogOut,
  Loader2,
  ChevronLeft,
  Menu,
  Sparkles,
  Home,
  Landmark,
  ScrollText,
  Camera,
  Palette,
  Box,
  DoorOpen,
  Layers,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AdminErrorBoundary } from './AdminErrorBoundary';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  // Catalog
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/products/import', icon: Upload, label: 'Bulk Import' },
  { href: '/admin/categories', icon: FolderTree, label: 'Categories' },
  { href: '/admin/home-categories', icon: Home, label: 'Home Grid' },
  { href: '/admin/door-otdelka', icon: Palette, label: 'Door Finishes' },
  { href: '/admin/door-korobka', icon: Box, label: 'Door Frames' },
  { href: '/admin/door-models', icon: DoorOpen, label: 'Door Models' },
  { href: '/admin/door-glass', icon: Box, label: 'Door Glass' },
  { href: '/admin/door-locks', icon: Box, label: 'Door Locks' },
  { href: '/admin/door-panels', icon: Box, label: 'Door Panels' },
  { href: '/admin/furniture-modules', icon: Box, label: 'Furniture Modules' },
  { href: '/admin/product-blocks', icon: Layers, label: 'Product Blocks' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  // Navigation / banners
  { href: '/admin/menu-items', icon: Menu, label: 'Menu Items' },
  { href: '/admin/banners', icon: Image, label: 'Banners' },
  { href: '/admin/site-features', icon: Sparkles, label: 'Features Bar' },
  // HMspace
  { href: '/admin/hmspace-sections', icon: Landmark, label: 'HMspace Sections' },
  { href: '/admin/hmspace-projects', icon: Camera, label: 'HMspace Projects' },
  // Content
  { href: '/admin/blog', icon: FileText, label: 'Blog Posts' },
  { href: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/admin/legal-pages', icon: ScrollText, label: 'Legal Pages' },
  // Operations
  { href: '/admin/consultations', icon: MessageSquare, label: 'Consultations' },
  { href: '/admin/showrooms', icon: Store, label: 'Showrooms' },
  { href: '/admin/settings', icon: SettingsIcon, label: 'Settings' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isLoading, isAdmin, signOut } = useAdminAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = useAdminT();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed && (
            <Link to="/admin" className="font-bold text-xl text-primary">
              {t('UNION Admin')}
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(collapsed && "mx-auto")}
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href ||
                (item.href !== '/admin' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100",
                    collapsed && "justify-center"
                  )}
                  title={collapsed ? t(item.label) : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{t(item.label)}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <Separator />

        {/* Language switcher */}
        {!collapsed ? (
          <div className="p-3 border-b">
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
              <Globe className="h-3 w-3" /> {t('Language')}
            </div>
            <div className="flex gap-1">
              {(['ka', 'ru', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-medium rounded transition-colors',
                    language === lang
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-2 border-b">
            <button
              onClick={() => setLanguage(language === 'ka' ? 'ru' : language === 'ru' ? 'en' : 'ka')}
              className="w-full h-9 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-semibold"
              title={t('Language')}
            >
              {language.toUpperCase()}
            </button>
          </div>
        )}

        <div className="p-2">
          <Button
            variant="ghost"
            onClick={signOut}
            className={cn(
              "w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>{t('Sign Out')}</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <AdminErrorBoundary>
            {children}
          </AdminErrorBoundary>
        </div>
      </main>
    </div>
  );
}
