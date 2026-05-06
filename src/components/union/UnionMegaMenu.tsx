import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMenuItems, type MenuItem } from '@/hooks/useMenuItems';

/* ------------------------------------------------------------------ */
/*  Icon resolver — looks up a lucide icon by string name              */
/* ------------------------------------------------------------------ */
const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;

function getIcon(name: string | null): LucideIcon | null {
  if (!name) return null;
  return iconMap[name] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Hardcoded fallback (used only if DB is empty / unreachable)        */
/* ------------------------------------------------------------------ */
import {
  DoorOpen, DoorClosed, PanelTop, LayoutPanelTop, Sofa, Shirt,
  Archive, BookOpen, Layers, Table2, Armchair, SquareStack, Home,
  Minus, KeyRound, Package, Plane, Percent, Building2,
} from 'lucide-react';

interface FallbackGroup {
  title: { ka: string; ru: string; en: string };
  icon: LucideIcon;
  href: string;
  items?: { name: { ka: string; ru: string; en: string }; href: string; isNew?: boolean }[];
  isNew?: boolean;
}

interface FallbackSidebar {
  icon: LucideIcon | null;
  name: { ka: string; ru: string; en: string };
  href: string;
  isSale?: boolean;
}

const fallbackCol1: FallbackGroup[] = [
  { title: { ka: 'გაშლადი კარები', ru: 'Распашные двери', en: 'Swing Doors' }, icon: DoorOpen, href: '/union/catalog/swing-doors', items: [
    { name: { ka: 'შეფერვის ფარული', ru: 'Скрытые под покраску', en: 'Hidden under painting' }, href: '/union/catalog/swing-doors?type=hidden-paint' },
    { name: { ka: 'ემალი', ru: 'Эмаль', en: 'Enamel' }, href: '/union/catalog/swing-doors?type=enamel' },
    { name: { ka: 'გლანცი', ru: 'Глянец', en: 'Gloss' }, href: '/union/catalog/swing-doors?type=gloss' },
    { name: { ka: 'ნატურალური შპონი', ru: 'Натуральный шпон', en: 'Natural veneer' }, href: '/union/catalog/swing-doors?type=veneer' },
    { name: { ka: 'ქვა და მარმარილო', ru: 'Под камень и мрамор', en: 'Stone & marble' }, href: '/union/catalog/swing-doors?type=stone' },
    { name: { ka: 'ხელმისაწვდომი ხარისხი', ru: 'Доступное качество', en: 'Affordable quality' }, href: '/union/catalog/swing-doors?type=affordable' },
    { name: { ka: 'ალუმინი და მინა', ru: 'Алюминий и стекло', en: 'Aluminum & glass' }, href: '/union/catalog/swing-doors?type=aluminum' },
    { name: { ka: 'დასაკეცი', ru: 'Складные', en: 'Folding' }, href: '/union/catalog/swing-doors?type=folding', isNew: true },
    { name: { ka: 'ხმაიზოლაციური', ru: 'Звукоизоляционные', en: 'Soundproof' }, href: '/union/catalog/swing-doors?type=soundproof', isNew: true },
  ]},
  { title: { ka: 'სრიალა კარები', ru: 'Раздвижные двери', en: 'Sliding Doors' }, icon: DoorClosed, href: '/union/catalog/sliding-doors', items: [
    { name: { ka: 'კედელში (პენალი)', ru: 'В пенал (в стену)', en: 'Pocket (into wall)' }, href: '/union/catalog/sliding-doors?type=pocket' },
    { name: { ka: 'ფარული მექანიზმი', ru: 'Скрытый механизм', en: 'Hidden mechanism' }, href: '/union/catalog/sliding-doors?type=hidden' },
  ]},
  { title: { ka: 'სრიალა ტიხრები', ru: 'Раздвижные перегородки', en: 'Sliding Partitions' }, icon: PanelTop, href: '/union/catalog/sliding-partitions' },
];

const fallbackCol2: FallbackGroup[] = [
  { title: { ka: 'სტაციონარული ტიხრები', ru: 'Стационарные перегородки', en: 'Stationary Partitions' }, icon: LayoutPanelTop, href: '/union/catalog/stationary-partitions' },
  { title: { ka: 'კედლის პანელები', ru: 'Стеновые панели', en: 'Wall Panels' }, icon: SquareStack, href: '/union/catalog/wall-panels' },
  { title: { ka: 'ავეჯი', ru: 'Мебель', en: 'Furniture' }, icon: Sofa, href: '/union/catalog/furniture' },
  { title: { ka: 'გარდერობი, შკაფი', ru: 'Гардеробные, шкафы', en: 'Wardrobes, Cabinets' }, icon: Shirt, href: '/union/catalog/wardrobes' },
  { title: { ka: 'ვიტრინები, კომოდები', ru: 'Витрины, комоды', en: 'Vitrines, Commodes' }, icon: Archive, href: '/union/catalog/vitrines' },
];

const fallbackCol3: FallbackGroup[] = [
  { title: { ka: 'ბიბლიოთეკა, სტელაჟები', ru: 'Библиотеки, стеллажи', en: 'Libraries, Shelving' }, icon: BookOpen, href: '/union/catalog/libraries' },
  { title: { ka: 'თაროები', ru: 'Полки', en: 'Shelves' }, icon: Layers, href: '/union/catalog/shelves', isNew: true },
  { title: { ka: 'მაგიდები', ru: 'Столы', en: 'Tables' }, icon: Table2, href: '/union/catalog/tables' },
  { title: { ka: 'დივნები', ru: 'Диваны', en: 'Sofas' }, icon: Armchair, href: '/union/catalog/sofas' },
  { title: { ka: 'სარკეები', ru: 'Зеркала', en: 'Mirrors' }, icon: SquareStack, href: '/union/catalog/mirrors' },
  { title: { ka: 'შესასვლელი კარები', ru: 'Входные двери', en: 'Entrance Doors' }, icon: Home, href: '/union/catalog/entrance-doors' },
  { title: { ka: 'პლინტუსი', ru: 'Плинтусы', en: 'Baseboards' }, icon: Minus, href: '/union/catalog/skirting' },
  { title: { ka: 'სახელურები, ფურნიტურა', ru: 'Ручки, Фурнитура', en: 'Handles, Hardware' }, icon: KeyRound, href: '/union/catalog/handles' },
];

const fallbackSidebar: FallbackSidebar[] = [
  { icon: Package, name: { ka: 'მარაგშია', ru: 'В наличии', en: 'In Stock' }, href: '/union/catalog?filter=in-stock' },
  { icon: Plane, name: { ka: 'იტალიიდან შეკვეთით', ru: 'На заказ из Италии', en: 'From Italy' }, href: '/union/catalog?filter=order' },
  { icon: Percent, name: { ka: 'აქციები', ru: 'Акции', en: 'Promotions' }, href: '/union/sale' },
  { icon: null, name: { ka: 'SALE', ru: 'SALE', en: 'SALE' }, href: '/union/sale', isSale: true },
  { icon: Building2, name: { ka: 'დეველოპერებს. კონტრაქტი', ru: 'Для застройщиков. Контракт', en: 'For developers. Contract' }, href: '/union/partnership' },
];

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */
interface UnionMegaMenuProps {
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */
function NewBadge() {
  return (
    <sup className="ml-1.5 text-[9px] font-bold text-[#e63946] uppercase tracking-wider align-super">
      NEW
    </sup>
  );
}

/* ---- DB-driven group block ---- */
function DbGroupBlock({
  group,
  children,
  lang,
  onClose,
}: {
  group: MenuItem;
  children: MenuItem[];
  lang: 'ka' | 'ru' | 'en';
  onClose: () => void;
}) {
  const Icon = getIcon(group.icon);
  const title = lang === 'ka' ? group.name_ka : lang === 'en' ? (group.name_en || group.name_ka) : (group.name_ru || group.name_ka);

  return (
    <div className="mb-6">
      <Link to={group.href} onClick={onClose} className="flex items-start gap-3 mb-2 group">
        {Icon && <Icon className="h-5 w-5 text-foreground shrink-0 mt-0.5" strokeWidth={1.4} />}
        <h3 className="font-medium text-[15px] text-foreground group-hover:text-primary transition-colors leading-tight">
          {title}
          {group.is_new && <NewBadge />}
        </h3>
      </Link>
      {children.length > 0 && (
        <ul className="space-y-1.5 pl-8">
          {children.map((it) => {
            const name = lang === 'ka' ? it.name_ka : lang === 'en' ? (it.name_en || it.name_ka) : (it.name_ru || it.name_ka);
            return (
              <li key={it.id}>
                <Link to={it.href} onClick={onClose} className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
                  {name}
                  {it.is_new && <NewBadge />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ---- Fallback group block (same visual, static data) ---- */
function FallbackGroupBlock({
  group,
  lang,
  onClose,
}: {
  group: FallbackGroup;
  lang: 'ka' | 'ru' | 'en';
  onClose: () => void;
}) {
  const Icon = group.icon;
  return (
    <div className="mb-6">
      <Link to={group.href} onClick={onClose} className="flex items-start gap-3 mb-2 group">
        <Icon className="h-5 w-5 text-foreground shrink-0 mt-0.5" strokeWidth={1.4} />
        <h3 className="font-medium text-[15px] text-foreground group-hover:text-primary transition-colors leading-tight">
          {group.title[lang]}
          {group.isNew && <NewBadge />}
        </h3>
      </Link>
      {group.items && group.items.length > 0 && (
        <ul className="space-y-1.5 pl-8">
          {group.items.map((it) => (
            <li key={it.href}>
              <Link to={it.href} onClick={onClose} className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
                {it.name[lang]}
                {it.isNew && <NewBadge />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function UnionMegaMenu({ onClose, onMouseEnter, onMouseLeave }: UnionMegaMenuProps) {
  const { language } = useLanguage();
  const lang = (language === 'ru' || language === 'en' ? language : 'ka') as 'ka' | 'ru' | 'en';

  const { data: dbItems } = useMenuItems();
  const useDb = dbItems && dbItems.length > 0;

  // DB-driven groups
  const megaGroups = useDb ? dbItems.filter((i) => i.section === 'mega_menu' && !i.parent_id) : [];
  const sidebarLinks = useDb ? dbItems.filter((i) => i.section === 'sidebar' && !i.parent_id) : [];
  const childrenOf = (parentId: string) =>
    (dbItems || []).filter((i) => i.parent_id === parentId).sort((a, b) => a.sort_order - b.sort_order);

  const dbColumns = [1, 2, 3].map((col) =>
    megaGroups.filter((g) => g.column_number === col).sort((a, b) => a.sort_order - b.sort_order)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 right-0 top-full bg-white shadow-2xl border-t border-[#e7e7e7] z-50"
    >
      <div className="container">
        <div className="grid grid-cols-12 gap-x-8 py-8">
          {/* Left sidebar — text-only links matching union.ru's `navigator-menu-desktop` */}
          <aside className="col-span-3 xl:col-span-2">
            <nav className="space-y-1">
              <SidebarRow
                key="assortment"
                href="/union/catalog"
                onClose={onClose}
                label={lang === 'ka' ? 'ასორტიმენტი UNION' : lang === 'en' ? 'UNION Assortment' : 'Ассортимент UNION'}
                accent
              />
              {useDb
                ? sidebarLinks.sort((a, b) => a.sort_order - b.sort_order).map((l) => {
                    const name = lang === 'ka' ? l.name_ka : lang === 'en' ? (l.name_en || l.name_ka) : (l.name_ru || l.name_ka);
                    return (
                      <SidebarRow
                        key={l.id}
                        href={l.href}
                        onClose={onClose}
                        label={name}
                        sale={!!l.is_sale}
                      />
                    );
                  })
                : fallbackSidebar.map((l) => (
                    <SidebarRow
                      key={l.name.ru}
                      href={l.href}
                      onClose={onClose}
                      label={l.name[lang]}
                      sale={!!l.isSale}
                    />
                  ))}
            </nav>
          </aside>

          {/* 3-column category grid */}
          <div className="col-span-9 xl:col-span-10 grid grid-cols-3 gap-x-8 max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
            {useDb
              ? dbColumns.map((colGroups, idx) => (
                  <div key={idx}>
                    {colGroups.map((g) => (
                      <DbGroupBlock key={g.id} group={g} children={childrenOf(g.id)} lang={lang} onClose={onClose} />
                    ))}
                  </div>
                ))
              : [fallbackCol1, fallbackCol2, fallbackCol3].map((col, idx) => (
                  <div key={idx}>
                    {col.map((g) => (
                      <FallbackGroupBlock key={g.title.ru} group={g} lang={lang} onClose={onClose} />
                    ))}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Sidebar link row — used by both DB and fallback variants. */
function SidebarRow({
  href, label, onClose, accent, sale,
}: { href: string; label: string; onClose: () => void; accent?: boolean; sale?: boolean }) {
  return (
    <Link
      to={href}
      onClick={onClose}
      className={
        'group flex items-center justify-between py-2 transition-colors ' +
        (accent
          ? 'text-foreground font-semibold border-b border-[#f0f0f0] pb-3 mb-2'
          : sale
          ? 'text-foreground font-bold tracking-wider'
          : 'text-foreground/80 hover:text-foreground')
      }
    >
      <span className="text-[14px]">{label}</span>
      <ChevronRight className="h-4 w-4 opacity-30 group-hover:opacity-70 transition-opacity" />
    </Link>
  );
}
