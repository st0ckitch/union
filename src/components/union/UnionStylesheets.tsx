import { useEffect } from 'react';

/**
 * Loads union.ru's real production CSS bundle, scoped to /union/* routes
 * via mount/unmount of <link> tags on the document head.
 *
 * The CSS files were extracted from a "Save Page As" capture of
 * www.union.ru/mezhkomnatnye-dveri so we get exact pixel parity.
 */
const SHEETS = [
  '/vendor/union/bootstrap.min.css',
  '/vendor/union/swiper-bundle.min.css',
  '/vendor/union/template.css',
  '/vendor/union/catalog-page.css',
];

export function UnionStylesheets() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    for (const href of SHEETS) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.union = 'true';
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      for (const link of links) link.remove();
    };
  }, []);
  return null;
}
