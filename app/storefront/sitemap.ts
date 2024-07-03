import Product, { IProduct } from '@/app/models/product';
import { MetadataRoute } from 'next';

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const products: IProduct[] = await Product.find();
  const toReturn = products.map((product) => ({
    id: product.id.toString(),
  }));
  return toReturn;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const products = await Product.find();
  return products.map((product) => ({
    url: `https://www.manando.co.za/storefront/${product._id.toString()}`,
    lastModified: product.createdAt,
  }));
}
