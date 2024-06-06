'use client';

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { IProduct } from '@/app/models/product';
import { updateProduct } from '@/app/lib/actions';

type Props = {
  product: IProduct;
};

export default function EditProductForm({ product }: Props) {
  const formStatus = useFormStatus();

  const [file, setFile] = useState<File | null>(null);

  const initialState = { message: null, errors: {} };
  const editProductWithProduct = updateProduct.bind(null, product);
  const [state, dispatch] = useFormState(editProductWithProduct, initialState);

  return (
    <form
      action={(formData) => {
        if (file) {
          formData.append('imageEdited', 'true');
        } else {
          formData.append('imageEdited', 'false');
        }
        dispatch(formData);
      }}
    >
      <div className="mt-5 flex flex-col rounded-md border border-black p-8">
        <div className="mb-4 flex flex-col">
          <div className="relative flex h-80 items-center justify-center rounded-sm border border-black">
            <Image
              src={file ? URL.createObjectURL(file) : product.imageURL}
              alt="Image of item"
              sizes="20vw"
              style={{
                width: '30%',
                height: 'auto',
              }}
              width={150}
              height={150}
            />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              aria-describedby="url-error"
              className="file-input file-input-bordered file-input-sm absolute left-2/4 top-2/4 w-full max-w-xs -translate-x-2/4 -translate-y-2/4 place-content-center"
              onChange={(e) => {
                setFile(e.target.files![0]);
              }}
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image &&
              state.errors.image.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
          <label htmlFor="name" className="form-control">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            defaultValue={product.name}
            className="input input-bordered w-full max-w-xs"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="description" className="form-control">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            className="textarea textarea-bordered"
            defaultValue={product.description}
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="price" className="form-control">
            Price:
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            className="input input-bordered"
            defaultValue={product.price}
          />
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="quantity" className="">
            Quantity:
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            className="input input-bordered"
            defaultValue={product.quantity}
          />
          <div id="quantity-error" aria-live="polite" aria-atomic="true">
            {state.errors?.quantity &&
              state.errors.quantity.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4 flex w-full flex-col">
          <label htmlFor="category" className="form-control">
            Category
          </label>
          <select
            defaultValue={product.category}
            id="category"
            name="category"
            className="select select-bordered w-full max-w-xs"
          >
            <option value="INTERIOR">Interior</option>
            <option value="EXTERIOR">Exterior</option>
          </select>
          <div id="category" aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <button
          className="btn h-10 rounded-md bg-[#2563EB] text-sm text-white transition-colors hover:bg-[#326AE2]"
          disabled={formStatus.pending}
          type="submit"
        >
          {formStatus.pending ? 'Saving' : 'Save'}
        </button>
      </div>
    </form>
  );
}
