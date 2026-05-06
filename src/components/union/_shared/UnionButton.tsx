import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const unionButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-deep',
        secondary:
          'border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
        accent:
          'bg-accent-sale text-white hover:bg-accent-sale-hover',
        accentInverse:
          'bg-white text-accent-sale hover:bg-accent-sale hover:text-white border border-white',
        ghost:
          'bg-transparent text-primary hover:text-primary-deep',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-14 px-8',
        block: 'h-14 w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface UnionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof unionButtonVariants> {}

export const UnionButton = forwardRef<HTMLButtonElement, UnionButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(unionButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
UnionButton.displayName = 'UnionButton';

export { unionButtonVariants };
