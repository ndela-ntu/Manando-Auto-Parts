'use client';

import { useCart } from '@/app/context/cart-context';
import { IProduct } from '@/app/models/product';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  product: IProduct;
};

export default function ProductCard({ product }: Props) {
  const { cart, addItem, removeItem, clearCart } = useCart();

  return (
    <div className="card card-compact w-[100%] bg-[#E8E9ED] shadow-xl">
      <Link href={`/storefront/${product.id.toString()}`}>
        <figure className="h-[100%]">
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={() => {
              /* if (document !== null) {
              (
                document.getElementById(
                  `modal-${product.id}`,
                )! as HTMLDialogElement
              ).showModal();
            } */
            }}
          >
            <Image
              src={product.imageURL}
              alt="Image of product"
              sizes="100vw"
              style={{
                width: '50%',
                height: 'auto',
              }}
              width={500}
              height={300}
            />
          </div>
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <h2 className="font-semibold">R{product.price}</h2>
      </div>
      <div className="divider"></div>
      <div className="card-actions justify-end p-1">
        <button
          className="btn btn-circle bg-[#816C61] text-[#E8E9ED]"
          onClick={() => {
            if (!cart.find((item) => item.id === product.id)) {
              addItem(product);
            } else {
              removeItem(product.id.toString());
            }
          }}
        >
          {cart.find((item) => item.id === product.id) ? (
            <TrashIcon className="h-6 w-6 text-[#E8E9ED]" />
          ) : (
            <ShoppingCartIcon className="h-6 w-6 text-[#E8E9ED]" />
          )}
        </button>
      </div>

      {/* <dialog
        key={product.id.toString()}
        id={`modal-${product.id}`}
        className="modal"
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Image
            key={product.id.toString()}
            src={product.imageURL}
            alt="Image of product"
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}
    </div>
  );
}
