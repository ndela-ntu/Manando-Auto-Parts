import { FunnelIcon } from '@heroicons/react/24/outline';
import { CartStoreProvider } from '../providers/cart-store-provider';
import Search from '../ui/search';
import Header from '../ui/storefront/header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div>{children}</div>
    </div>
  );
}
