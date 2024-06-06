import { lusitana } from '@/app/ui/fonts';
import CreateProductForm from '@/app/ui/dashboard/create-product-form';

export default function Page() {
  return (
    <div className="px-2 lg:px-12 py-4">
       <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Create Product
      </h1>
      <CreateProductForm />
    </div>
  );
}
