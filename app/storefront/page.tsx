import React from 'react';
import connectMongo from '../utils/connect-mongo';
import Product, { IProduct } from '../models/product';
import ProductCard from '../ui/storefront/product-card';
import Search from '../ui/search';
import { FunnelIcon } from '@heroicons/react/24/outline';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  let products: IProduct[];
  await connectMongo();
  if (query == undefined || query === '') {
    products = await Product.find();
  }else {
    products = await Product.find({ $text: { $search: query } });
  }

  return (
    <div>
      <div className="py-5">
      <div className="flex items-center justify-center space-x-4 p-5 md:space-x-5 lg:space-x-6">
          <Search placeholder="Search parts..." />
          <FunnelIcon className="h-6 w-6 text-black" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 px-5">
          {products.map((product) => (
            <ProductCard key={product.id.toString()} product={JSON.parse(JSON.stringify(product))} />
          ))}
        </div>
      </div>
    </div>
  );
}
