'use client';

import React from 'react';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/app/providers/cart-store-provider';

export default function CardTable() {
  const { items, removeFromCart } = useCartStore((state) => state);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.id.toString()}>
              <td>
                <Image
                  src={product.imageURL}
                  alt="Image of product"
                  sizes="100vw"
                  style={{
                    width: '10%',
                    height: 'auto',
                  }}
                  width={50}
                  height={50}
                />
              </td>
              <td>{product.name}</td>
              <td>R{product.price}</td>
              <td>
                <button className="rounded-md border p-2 hover:bg-gray-100" onClick={() => {
                    removeFromCart(product.id.toString());
                }}>
                  <span className="sr-only">Delete</span>
                  <TrashIcon className="h-3 w-3 text-black" />
                </button>
              </td>
            </tr>
          ))}
          {items.length == 0 && <tr>No products</tr>}
        </tbody>
      </table>
    </div>
  );
}
