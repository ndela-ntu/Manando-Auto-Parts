import React from 'react';
import connectMongo from '../utils/connect-mongo';
import Product from '../models/product';
import ProductCard from '../ui/storefront/product-card';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import CartIcon from '../ui/storefront/cart-icon';

export default async function Page() {
  await connectMongo();
  const products = await Product.find();

  return (
    <div className="p-5">
      <div className="py-5">
        <div className="lg:grid-cols:3 grid gap-2 p-10 sm:grid-cols-1 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <CartIcon />
    </div>
  );
}
