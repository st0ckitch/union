import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  to?: string;
  href?: string;
  image: string;
  imageAlt?: string;
  title: ReactNode;
  meta?: ReactNode;
  aspect?: 'square' | '4-3' | '3-4' | '16-9';
  className?: string;
  badge?: ReactNode;
  onClick?: () => void;
}

const aspectClass: Record<NonNullable<ImageCardProps['aspect']>, string> = {
  square: 'aspect-square',
  '4-3': 'aspect-[4/3]',
  '3-4': 'aspect-[3/4]',
  '16-9': 'aspect-[16/9]',
};

export function ImageCard({
  to,
  href,
  image,
  imageAlt = '',
  title,
  meta,
  aspect = '4-3',
  className,
  badge,
  onClick,
}: ImageCardProps) {
  const inner = (
    <>
      <div className={cn('relative overflow-hidden bg-surface', aspectClass[aspect])}>
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
        {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}
      </div>
      <div className="mt-3">
        <div className="text-[15px] font-medium text-foreground group-hover:text-primary transition-colors">
          {title}
        </div>
        {meta && <div className="mt-1 text-[13px] text-muted-foreground">{meta}</div>}
      </div>
    </>
  );

  const cls = cn('group block', className);

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <div className={cls} onClick={onClick}>
      {inner}
    </div>
  );
}
