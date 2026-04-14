import { ReactNode } from 'react';
import { UnionHeader } from './UnionHeader';
import { UnionFooter } from './UnionFooter';
import { CartDrawer } from '../cart/CartDrawer';
import { WhatsAppButton } from '../common/WhatsAppButton';

interface UnionLayoutProps {
  children: ReactNode;
}

export function UnionLayout({ children }: UnionLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <UnionHeader />
      <main className="flex-1">
        {children}
      </main>
      <UnionFooter />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}
