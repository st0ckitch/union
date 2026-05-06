import { ReactNode } from 'react';

interface CatalogIntroProps {
  /** Big page heading (H1) */
  title: string;
  /** Small italic-style subhead under the title (e.g. "распашные") */
  subhead?: string;
  /** Lead paragraph above the bullet list */
  lead?: ReactNode;
  /** Highlight bullets — each has a label + description */
  bullets?: { label: string; body: string }[];
}

/**
 * Catalog header section — matches union.ru's intro on `/mezhkomnatnye-dveri`:
 * H1 + small grey subhead + lead paragraph + four-bullet USP list.
 */
export function CatalogIntro({ title, subhead, lead, bullets }: CatalogIntroProps) {
  return (
    <header className="pt-6 pb-8 md:pb-12">
      <h1 className="text-[#002b45] text-[32px] md:text-[40px] lg:text-[44px] font-normal leading-tight tracking-[0.03em] m-0">
        {title}
        {subhead && (
          <span className="block text-[18px] md:text-[20px] font-light text-[#5a5a5a] mt-2 tracking-[0.04em]">
            {subhead}
          </span>
        )}
      </h1>

      {(lead || (bullets && bullets.length > 0)) && (
        <div className="mt-6 max-w-[1100px] text-[16px] font-light leading-[1.6] text-[#5a5a5a]">
          {lead && <p className="m-0 mb-4">{lead}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 list-none p-0 m-0">
              {bullets.map((b, i) => (
                <li key={i} className="leading-[1.55]">
                  <strong className="font-medium text-[#002b45] mr-1">{b.label}.</strong>
                  <span>{b.body}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
}
