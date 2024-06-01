import connectMongo from '@/app/utils/connect-mongo';
import { notFound } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import Product from '@/app/models/product';
import EditProductForm from '@/app/ui/dashboard/edit-product-form';

export default async function Page({ params }: { params: { id: string } }) {
  await connectMongo();
  const product = await Product.findById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="px-12 py-4">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Create Product
      </h1>
      <EditProductForm product={product} />
    </div>
  );
}
