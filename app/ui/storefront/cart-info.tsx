'use client';

import React from 'react';
import { lusitana } from '@/app/ui/fonts';
import CartTable from '@/app/ui/storefront/cart-table';
import SummaryTable from '@/app/ui/storefront/summary-table';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/cart-context';

export default function CartInfo() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-10 h-screen text-[#E8E9ED]'>
        <p>Cart is currently empty.</p>
        <Link className='bg-[#816C61] p-2.5 mt-5 rounded-md text-[#E8E9ED]' href="/storefront">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="p-5 h-screen text-[#E8E9ED]">
      <div className="flex flex-col space-y-10">
        <div>
          <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Items
          </h1>
          <CartTable />
        </div>
        <div>
          <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Summary
          </h1>
          <SummaryTable />
        </div>
      </div>
      <Link
        className="fixed bottom-1 right-1"
        href="/storefront/checkout/checkout-details"
      >
        <div className="flex items-center justify-center rounded-xl bg-[#816C61] p-2.5">
          <span className="text-[#E8E9ED]">Continue</span>
          <div className="px-2">
            <ArrowRightIcon className="h-6 w-6 text-[#E8E9ED]" />
          </div>
        </div>
      </Link>
    </div>
  );
}
