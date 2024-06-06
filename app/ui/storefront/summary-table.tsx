'use client';

import { useCartStore } from '@/app/providers/cart-store-provider';
import React from 'react';

export default function SummaryTable() {
  const { items } = useCartStore((state) => state);

  const total = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0,
  );

  return (
    <div className="flex flex-row">
      <h2>Subtotal:</h2>
      <h2>R{total}</h2>
    </div>
  );
}
