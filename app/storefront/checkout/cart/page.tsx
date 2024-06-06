import React from 'react';
import { lusitana } from '@/app/ui/fonts';
import CartTable from '@/app/ui/storefront/cart-table';
import SummaryTable from '@/app/ui/storefront/summary-table';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/app/providers/cart-store-provider';

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="p-5">
      <div className="flex flex-col space-y-10">
        <Link href="/storefront" className="pt-5">
          <ArrowLeftIcon className="h-6 w-6 text-black" />
        </Link>
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
        <div className="flex items-center justify-center rounded-xl bg-blue-500 p-2.5">
          <span className="text-white">Continue</span>
          <div className="px-2">
            <ArrowRightIcon className="h-6 w-6 text-white" />
          </div>
        </div>
      </Link>
    </div>
  );
}
