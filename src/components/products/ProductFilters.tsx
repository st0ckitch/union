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
  slug: string;
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
}

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
}: ProductFiltersProps) {
  const { language } = useLanguage();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold text-base">
            {language === 'ka' ? 'კატეგორიები' : 'Categories'}
            <ChevronDown className={`h-4 w-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
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
              <label
                htmlFor={category.id}
                className="text-sm cursor-pointer hover:text-primary transition-colors"
              >
                {language === 'ka' ? category.name_ka : (category.name_en || category.name_ka)}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold text-base">
            {language === 'ka' ? 'ფასი' : 'Price'}
            <ChevronDown className={`h-4 w-4 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
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

      {/* Quick Filters */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Checkbox
            id="new-only"
            checked={showNewOnly}
            onCheckedChange={(checked) => onNewOnlyChange(checked as boolean)}
          />
          <label htmlFor="new-only" className="text-sm cursor-pointer">
            {language === 'ka' ? 'მხოლოდ ახალი' : 'New Only'}
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="sale-only"
            checked={showSaleOnly}
            onCheckedChange={(checked) => onSaleOnlyChange(checked as boolean)}
          />
          <label htmlFor="sale-only" className="text-sm cursor-pointer">
            {language === 'ka' ? 'მხოლოდ ფასდაკლება' : 'On Sale Only'}
          </label>
        </div>
      </div>
    </div>
  );
}
