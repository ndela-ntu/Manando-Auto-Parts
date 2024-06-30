import Product from '@/app/models/product';
import connectMongo from '@/app/utils/connect-mongo';
import { Head } from 'next/document';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  await connectMongo();
  const product = await Product.findById(id);

  return {
    title: `${product.name} | Manando Auto Parts`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://manando-auto-parts.vercel.app/storefront/${id}`,
      images: [
        {
          url: product.imageURL,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  await connectMongo();
  const product = await Product.findById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Image
          src={product.imageURL}
          alt={product.name}
          width={500}
          height={300}
          sizes="100vw"
          style={{
            width: '50%',
            height: 'auto',
          }}
        />
      </div>
    </>
  );
}
