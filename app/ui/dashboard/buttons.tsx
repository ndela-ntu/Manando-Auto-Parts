import { deleteProduct } from '@/app/lib/actions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export function EditProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="h-3 w-3 text-black" />
    </Link>
  );
}

export function DeleteProduct({
  id,
  publicId,
}: {
  id: string;
  publicId: string;
}) {
  const deleteProductWithId = deleteProduct.bind(null, id, publicId);

  return (
    <form action={deleteProductWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="h-3 w-3 text-black" />
      </button>
    </form>
  );
}
