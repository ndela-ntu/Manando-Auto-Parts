'use client';

import { useCart } from '@/app/context/cart-context';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CartIcon() {
 const { cart } = useCart();

  return (
    <>
      {cart.length !== 0 && (
        <Link
          className="fixed bottom-1 right-1"
          href="/storefront/checkout/cart"
        >
          <div className="flex items-center justify-center rounded-xl bg-[#816C61] p-2.5">
            <div className="px-2">
              <ShoppingCartIcon className="h-6 w-6 text-[#E8E9ED]" />
            </div>
            <span className="text-[#E8E9ED]">Checkout</span>
            <span className="px-2 text-[#E8E9ED]">{cart.length}</span>
          </div>
        </Link>
      )}
    </>
  );
}
