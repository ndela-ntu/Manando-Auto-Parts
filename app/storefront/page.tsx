import React from 'react';
import connectMongo from '../utils/connect-mongo';
import Product, { IProduct } from '../models/product';
import ProductCard from '../ui/storefront/product-card';
import Search from '../ui/search';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { categories } from '../models/categories';
import Filter from '../ui/filter';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    filterBy?: string;
  };
}) {
  const query = searchParams?.query || '';
  const filterBy = searchParams?.filterBy || '';
  
  await connectMongo();
  let products: IProduct[];
  if (
    (query == undefined || query === '') &&
    (filterBy === 'ALL' || filterBy == undefined)
  ) {
    console.log(filterBy);
    products = await Product.find();
  } else if (query) {
    products = await Product.find({ $text: { $search: query } });
  } else if (filterBy) {
    console.log(filterBy);
    products = await Product.find({ category: filterBy });
  } else {
    products = await Product.find();
  }

  return (
      <div className="py-5 min-h-screen">
        <div className="flex items-center justify-center space-x-4 p-5 md:space-x-5 lg:space-x-6">
          <Search placeholder="Search parts..." />
          <Filter />
        </div>
        {products.length === 0 ? (
          <div className="flex items-center justify-center py-5 text-[#E8E9ED]">
            <p>No products found. <a href='tel:+27786020598' className='text-[#0077FF] underline'>Contact us.</a></p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 px-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id.toString()}
                product={JSON.parse(JSON.stringify(product))}
              />
            ))}
          </div>
        )}
      </div>
  );
}
