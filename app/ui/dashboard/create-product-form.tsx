'use client';

import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/app/lib/actions';

export default function CreateProductForm() {
  const formStatus = useFormStatus();

  const [file, setFile] = useState<File | undefined>(undefined);

  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(createProduct, initialState);

  return (
    <form action={dispatch}>
      <div className="mt-5 flex flex-col rounded-md border border-black p-8">
        <div className="mb-4 flex flex-col">
          <div className="relative flex h-80 items-center justify-center rounded-sm border border-black">
            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                width={200}
                height={200}
                alt="Image of item"
              />
            ) : (
              <div className="flex h-[200px] w-[200px] items-center justify-center"></div>
            )}
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
          <div className="mb-4 flex flex-col">
            <label htmlFor="name" className="form-control">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
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
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="description" className="form-control">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="textarea textarea-bordered"
            placeholder="Description"
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
        <div className="flex flex-row space-x-4">
          <div className="mb-4 flex w-full flex-col">
            <label htmlFor="price" className="form-control">
              Price
            </label>
            <input
              type="text"
              placeholder="Price"
              name="price"
              id="price"
              className="input input-bordered w-full max-w-xs"
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
          <div className="mb-4 flex w-full flex-col">
            <label htmlFor="quantity" className="form-control">
              Quantity
            </label>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              id="quantity"
              className="input input-bordered w-full max-w-xs"
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
        </div>
        <div className="mb-4 flex w-full flex-col">
          <label htmlFor="category" className="form-control">
            Category
          </label>
          <select
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
          {formStatus.pending ? 'Saving..' : 'Save'}
        </button>
      </div>
    </form>
  );
}
