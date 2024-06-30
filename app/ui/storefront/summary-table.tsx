'use client';

import { useCart } from '@/app/context/cart-context';
import React from 'react';

export default function SummaryTable() {
  const { cart } = useCart();

  const total = cart.reduce(
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
