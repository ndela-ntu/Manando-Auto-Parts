import { IProduct } from '@/app/models/product';
import React from 'react';
import Image from 'next/image';
import { DeleteProduct, EditProduct } from './buttons';
import Link from 'next/link';

type Props = {
  products: IProduct[];
};

export default function ProductsTable({ products }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id.toString()}>
              <td>
                <Image
                  src={product.imageURL}
                  alt="Image of product"
                  width={50}
                  height={50}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <div className="flex flex-row space-x-2">
                  <EditProduct id={product.id.toString()} />
                  <DeleteProduct id={product.id.toString()} publicId={product.imagePublicId} />
                </div>
              </td>
            </tr>
          ))}
          {products.length == 0 && <tr>No products</tr>}
        </tbody>
      </table>
      
    </div>
  );
}
