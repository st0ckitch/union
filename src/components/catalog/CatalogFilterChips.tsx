import { cn } from '@/lib/utils';

export interface FilterChip {
  /** URL slug to write into the `?f=` query string */
  slug: string;
  label: string;
}

interface CatalogFilterChipsProps {
  chips: FilterChip[];
  /** Currently active slug, or undefined for "Все" */
  active?: string;
  /** Called with slug or undefined when user clicks a chip */
  onChange: (slug?: string) => void;
  /** Optional label for the "all" reset chip — defaults to "Все" */
  allLabel?: string;
}

/**
 * Horizontal filter chip row — matches union.ru's category page filter
 * strip. Pure pills: no background fill, just label that toggles to gold
 * (#e3ae46) and underlines when active. Mobile: horizontal scroll.
 */
export function CatalogFilterChips({
  chips,
  active,
  onChange,
  allLabel = 'Все',
}: CatalogFilterChipsProps) {
  const items = [{ slug: '__all__', label: allLabel }, ...chips];

  return (
    <nav
      aria-label="Filters"
      className="border-b border-[#e3e5ef] mb-8 md:mb-12"
    >
      <ul
        className="flex items-stretch gap-x-7 gap-y-2 overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 list-none m-0 p-0"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((chip) => {
          const isActive =
            chip.slug === '__all__' ? !active : active === chip.slug;
          const handle = () => onChange(chip.slug === '__all__' ? undefined : chip.slug);
          return (
            <li key={chip.slug}>
              <button
                type="button"
                onClick={handle}
                className={cn(
                  'block py-3 text-[15px] font-light tracking-[0.02em] transition-colors border-b-2 -mb-px',
                  isActive
                    ? 'text-[hsl(var(--accent))] border-[hsl(var(--accent))] font-medium'
                    : 'text-[#5a5a5a] border-transparent hover:text-[hsl(var(--accent))]'
                )}
              >
                {chip.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
