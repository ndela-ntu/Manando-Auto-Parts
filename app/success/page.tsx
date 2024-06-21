import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

type Props = {
  type: 'Purchase' | 'Sell';
};

export default function Page({}: Props) {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-10">
      <button className="btn btn-circle btn-success">
        <CheckIcon className="h-6 w-6 text-[#E8E9ED]" />
      </button>
      <p>Success!</p>
      <Link
        className="mt-5 rounded-md bg-[#816C61] p-2.5 text-[#E8E9ED]"
        href="/storefront"
      >
        Continue shopping
      </Link>
    </main>
  );
}
