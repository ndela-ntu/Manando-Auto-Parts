import Product from '@/app/models/product';
import ProductsTable from '@/app/ui/dashboard/products-table';
import { lusitana } from '@/app/ui/fonts';
import connectMongo from '@/app/utils/connect-mongo';
import Link from 'next/link';

export default async function Page() {
  await connectMongo();
  const products = await Product.find();

  return (
    <>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Products
      </h1>
      <div className="py-5">
        <ProductsTable products={products} />
      </div>
      <Link
        href="/dashboard/products/create"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Add new product
      </Link>
    </>
  );
}
