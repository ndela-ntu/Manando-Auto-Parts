import Link from 'next/link';
import React from 'react';

type Props = {};

export default function Page({}: Props) {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <p>Successfully purchased product. Will be delivered soon!</p>
      <Link href='/storefront'>Continue shopping</Link>
    </main>
  );
}
