'use client';

import { IProduct } from '@/app/models/product';
import { useCartStore } from '@/app/providers/cart-store-provider';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  product: IProduct;
};

export default function ProductCard({ product }: Props) {
  const { items, addToCart } = useCartStore((state) => state);

  return (
    <div className="card card-compact w-[100%] bg-base-100 shadow-xl">
      <figure className="h-[100%]">
          <Image
            src={product.imageURL}
            alt="Image of product"
            sizes="100vw"
            style={{
              width: '50%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{product.name}</h2>
          <h2>R{product.price}</h2>
        </div>
        <p className="">{product.description}</p>
        <div className="card-actions justify-center">
          <button
            className="btn bg-blue-500 text-white"
            onClick={() => {
              if (!items.includes(product)) {
                addToCart(product);
              }
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
