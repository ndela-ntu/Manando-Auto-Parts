import React from 'react';
import { lusitana } from '@/app/ui/fonts';
import CartTable from '@/app/ui/storefront/cart-table';
import SummaryTable from '@/app/ui/storefront/summary-table';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import CartInfo from '@/app/ui/storefront/cart-info';

type Props = {};

export default function Page({}: Props) {
  return <CartInfo />;
}
