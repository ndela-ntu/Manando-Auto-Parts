import { CartStoreProvider } from '../providers/cart-store-provider';
import Header from '../ui/storefront/header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartStoreProvider>
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </CartStoreProvider>
  );
}
