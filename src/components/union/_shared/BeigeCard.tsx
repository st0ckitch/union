import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BeigeCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const BeigeCard = forwardRef<HTMLDivElement, BeigeCardProps>(
  ({ className, hoverable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-surface p-6 md:p-8 transition-colors',
        hoverable && 'hover:bg-surface-muted',
        className
      )}
      {...props}
    />
  )
);
BeigeCard.displayName = 'BeigeCard';
