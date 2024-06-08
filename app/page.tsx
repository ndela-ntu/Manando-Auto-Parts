import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import BuyOrSellCard from './ui/buy-sell';

export default function Page() {
  return (
    <div className="flex items-center justify-center space-x-10">
      <BuyOrSellCard cardType="Shop" />
      <BuyOrSellCard cardType="Sell" />
    </div>
  );
}
