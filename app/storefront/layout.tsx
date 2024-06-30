import { FunnelIcon } from '@heroicons/react/24/outline';
import { CartStoreProvider } from '../providers/cart-store-provider';
import Search from '../ui/search';
import Header from '../ui/storefront/header';
import { CartProvider } from '../context/cart-context';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartStoreProvider>
      <CartProvider>
        <div className="flex flex-col">
          <Header />
          <div>{children}</div>
        </div>
      </CartProvider>
    </CartStoreProvider>
  );
}
