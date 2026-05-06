import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * union.ru breadcrumb: 14px, padding-top 10px, item separator is a chevron-right
 * arrow rendered inline. Active item color is #777, links inherit body gray with
 * gold hover.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-[14px] text-foreground pt-[10px]">
      <ol className="flex flex-wrap items-center gap-x-[10px] gap-y-2 m-0 p-0 list-none">
        <li className="inline-flex items-center">
          <Link to="/union" className="hover:text-[hsl(var(--accent))] transition-colors">
            {'Главная'}
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="inline-flex items-center gap-x-[10px]">
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="text-[#ccc]"
            >
              <path d="M0.5 1L4.5 4L0.5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
            </svg>
            {item.path ? (
              <Link to={item.path} className="hover:text-[hsl(var(--accent))] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#777]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
