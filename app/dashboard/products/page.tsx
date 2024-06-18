import Product, { IProduct } from '@/app/models/product';
import ProductsTable from '@/app/ui/dashboard/products-table';
import { lusitana } from '@/app/ui/fonts';
import connectMongo from '@/app/utils/connect-mongo';
import Link from 'next/link';

export default async function Page() {
  await connectMongo();
  const products: IProduct[] = await Product.find();

  return (
    <>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Products
      </h1>
      <div className="py-5">
        <ProductsTable products={JSON.parse(JSON.stringify(products))} />
      </div>
      <Link
        href="/dashboard/products/create"
        className="mt-4 rounded-md bg-[#816C61] px-4 py-2 text-sm text-[#E8E9ED] transition-colors hover:bg-blue-400"
      >
        Add new product
      </Link>
    </>
  );
}
