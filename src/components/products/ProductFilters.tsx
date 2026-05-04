import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';

interface Category {
  id: string;
  name_ka: string;
  name_en: string | null;
  name_ru?: string | null;
  slug: string;
}

export interface FacetCounts {
  finish: Record<string, number>;
  frame_type: Record<string, number>;
  collection: Record<string, number>;
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  maxPrice: number;
  showNewOnly: boolean;
  onNewOnlyChange: (value: boolean) => void;
  showSaleOnly: boolean;
  onSaleOnlyChange: (value: boolean) => void;
  // Phase B — extended dimensions
  selectedFinishes: string[];
  onFinishChange: (finishCode: string) => void;
  selectedFrameTypes: string[];
  onFrameTypeChange: (frameCode: string) => void;
  selectedCollections: string[];
  onCollectionChange: (slug: string) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  facets: FacetCounts;
  onClearAll?: () => void;
}

const FINISH_LABELS: Record<string, { ka: string; ru: string; en: string }> = {
  fondo:         { ka: 'FONDO გრუნტი',          ru: 'FONDO грунт',           en: 'FONDO primer' },
  laccato:       { ka: 'LACCATO მატი ემალი',    ru: 'LACCATO матовая эмаль', en: 'LACCATO matte enamel' },
  laccato_gloss: { ka: 'LACCATO GLOSS გლანცი',  ru: 'LACCATO GLOSS глянец',  en: 'LACCATO GLOSS glossy' },
  veneer:        { ka: 'VENEER შპონი',          ru: 'VENEER шпон',           en: 'VENEER veneer' },
  eco_veneer:    { ka: 'ECO VENEER',            ru: 'ECO VENEER',            en: 'ECO VENEER' },
  hpl:           { ka: 'HPL დეკორი',            ru: 'HPL декор',             en: 'HPL composite' },
  aluminium:     { ka: 'ალუმინი',                ru: 'Алюминий',              en: 'Aluminium' },
  mirror:        { ka: 'სარკე',                  ru: 'Зеркало',               en: 'Mirror' },
};

const FRAME_LABELS: Record<string, { ka: string; ru: string; en: string }> = {
  invisible: { ka: 'INVISIBLE (ფარული)',  ru: 'INVISIBLE (скрытый)',    en: 'INVISIBLE (hidden)' },
  planar:    { ka: 'PLANAR',                ru: 'PLANAR (планар)',         en: 'PLANAR' },
  deco:      { ka: 'DECO (დეკორატიული)',  ru: 'DECO (декоративный)',     en: 'DECO (decorative)' },
  uniwood:   { ka: 'UNIWOOD (ხის)',          ru: 'UNIWOOD (деревянный)',    en: 'UNIWOOD (wooden)' },
  unidoor:   { ka: 'UNIDOOR (კლასიკური)', ru: 'UNIDOOR (классический)',  en: 'UNIDOOR (classic)' },
};

export function ProductFilters({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
  showNewOnly,
  onNewOnlyChange,
  showSaleOnly,
  onSaleOnlyChange,
  selectedFinishes,
  onFinishChange,
  selectedFrameTypes,
  onFrameTypeChange,
  selectedCollections,
  onCollectionChange,
  inStockOnly,
  onInStockOnlyChange,
  facets,
  onClearAll,
}: ProductFiltersProps) {
  const { language } = useLanguage();
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    finish: true,
    frame: true,
    collection: false,
  });

  const lang = (language as 'ka' | 'ru' | 'en');
  const labelFor = (map: Record<string, { ka: string; ru: string; en: string }>, code: string) =>
    map[code]?.[lang] ?? code;

  const finishCodes = Object.keys(facets.finish || {}).filter((c) => facets.finish[c] > 0);
  const frameCodes  = Object.keys(facets.frame_type || {}).filter((c) => facets.frame_type[c] > 0);
  const collectionCodes = Object.keys(facets.collection || {}).filter((c) => facets.collection[c] > 0);

  const activeCount =
    selectedCategories.length + selectedFinishes.length + selectedFrameTypes.length + selectedCollections.length +
    (showNewOnly ? 1 : 0) + (showSaleOnly ? 1 : 0) + (inStockOnly ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Active filter count + clear */}
      {activeCount > 0 && onClearAll && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{activeCount} {language === 'ru' ? 'активных' : language === 'en' ? 'active' : 'აქტიური'}</span>
          <button type="button" onClick={onClearAll} className="underline hover:text-primary">
            {language === 'ru' ? 'Сбросить' : language === 'en' ? 'Clear all' : 'გასუფთავება'}
          </button>
        </div>
      )}

      {/* Categories */}
      <Collapsible open={openSections.categories} onOpenChange={(v) => setOpenSections({ ...openSections, categories: v })}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold text-base">
            {language === 'ka' ? 'კატეგორიები' : language === 'ru' ? 'Категории' : 'Categories'}
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.categories ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onCategoryChange(category.id)}
              />
              <label htmlFor={category.id} className="text-sm cursor-pointer hover:text-primary transition-colors">
                {language === 'ru' ? (category.name_ru || category.name_ka) : language === 'en' ? (category.name_en || category.name_ka) : category.name_ka}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={(v) => setOpenSections({ ...openSections, price: v })}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold text-base">
            {language === 'ka' ? 'ფასი' : language === 'ru' ? 'Цена' : 'Price'}
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <Slider
            min={0}
            max={maxPrice}
            step={50}
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} ₾</span>
            <span>{priceRange[1]} ₾</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Finish */}
      {finishCodes.length > 0 && (
        <Collapsible open={openSections.finish} onOpenChange={(v) => setOpenSections({ ...openSections, finish: v })}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold text-base">
              {language === 'ka' ? 'მორთულობა' : language === 'ru' ? 'Отделка' : 'Finish'}
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.finish ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            {finishCodes.map((code) => (
              <div key={code} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Checkbox
                    id={`finish-${code}`}
                    checked={selectedFinishes.includes(code)}
                    onCheckedChange={() => onFinishChange(code)}
                  />
                  <label htmlFor={`finish-${code}`} className="text-sm cursor-pointer hover:text-primary truncate">
                    {labelFor(FINISH_LABELS, code)}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{facets.finish[code]}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Frame type */}
      {frameCodes.length > 0 && (
        <Collapsible open={openSections.frame} onOpenChange={(v) => setOpenSections({ ...openSections, frame: v })}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold text-base">
              {language === 'ka' ? 'ჩარჩო' : language === 'ru' ? 'Тип короба' : 'Frame'}
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.frame ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            {frameCodes.map((code) => (
              <div key={code} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Checkbox
                    id={`frame-${code}`}
                    checked={selectedFrameTypes.includes(code)}
                    onCheckedChange={() => onFrameTypeChange(code)}
                  />
                  <label htmlFor={`frame-${code}`} className="text-sm cursor-pointer hover:text-primary truncate">
                    {labelFor(FRAME_LABELS, code)}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{facets.frame_type[code]}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Collections */}
      {collectionCodes.length > 0 && (
        <Collapsible open={openSections.collection} onOpenChange={(v) => setOpenSections({ ...openSections, collection: v })}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold text-base">
              {language === 'ka' ? 'კოლექცია' : language === 'ru' ? 'Коллекция' : 'Collection'}
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.collection ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            {collectionCodes.map((slug) => (
              <div key={slug} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Checkbox
                    id={`coll-${slug}`}
                    checked={selectedCollections.includes(slug)}
                    onCheckedChange={() => onCollectionChange(slug)}
                  />
                  <label htmlFor={`coll-${slug}`} className="text-sm cursor-pointer hover:text-primary truncate uppercase">
                    {slug.replace(/-/g, ' ')}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{facets.collection[slug]}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Quick Filters */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={(c) => onInStockOnlyChange(c as boolean)} />
          <label htmlFor="in-stock" className="text-sm cursor-pointer">
            {language === 'ka' ? 'მარაგშია' : language === 'ru' ? 'В наличии' : 'In stock'}
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="new-only" checked={showNewOnly} onCheckedChange={(c) => onNewOnlyChange(c as boolean)} />
          <label htmlFor="new-only" className="text-sm cursor-pointer">
            {language === 'ka' ? 'მხოლოდ ახალი' : language === 'ru' ? 'Только новинки' : 'New only'}
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="sale-only" checked={showSaleOnly} onCheckedChange={(c) => onSaleOnlyChange(c as boolean)} />
          <label htmlFor="sale-only" className="text-sm cursor-pointer">
            {language === 'ka' ? 'მხოლოდ ფასდაკლება' : language === 'ru' ? 'Со скидкой' : 'On sale only'}
          </label>
        </div>
      </div>
    </div>
  );
}
