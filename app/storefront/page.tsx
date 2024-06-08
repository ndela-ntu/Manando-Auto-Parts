import React from 'react';
import connectMongo from '../utils/connect-mongo';
import Product, { IProduct } from '../models/product';
import ProductCard from '../ui/storefront/product-card';
import Search from '../ui/search';

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
    <div className="p-5">
      <div className="py-5">
        <Search placeholder="Search parts..." />
        <div className="grid grid-cols-1 gap-5 p-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id.toString()} product={JSON.parse(JSON.stringify(product))} />
          ))}
        </div>
      </div>
    </div>
  );
}
