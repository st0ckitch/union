import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  showArrows?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  rightSlot?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  eyebrow,
  showArrows,
  onPrev,
  onNext,
  rightSlot,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between gap-6 mb-8', className)}>
      <div>
        {eyebrow && <div className="union-eyebrow mb-2">{eyebrow}</div>}
        <h2 className="union-section-title">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        {rightSlot}
        {showArrows && (
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="w-10 h-10 border border-border text-foreground hover:bg-primary hover:border-primary hover:text-white transition-colors flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="w-10 h-10 border border-border text-foreground hover:bg-primary hover:border-primary hover:text-white transition-colors flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
