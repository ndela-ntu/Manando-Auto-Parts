'use client';

import React from 'react';
import Image from 'next/image';
import { IProduct } from '@/app/models/product';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/app/providers/cart-store-provider';

export default function SummaryTable() {
  const { items, removeFromCart } = useCartStore((state) => state);

  const total = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0,
  );

  return (
    <div className="flex justify-between">
      <h2>Subtotal:</h2>
      <h2>R{total}</h2>
    </div>
  );
}
