'use client';

import { useState } from 'react';
import Image from 'next/image';
import { lusitana } from './fonts';
import { useFormState } from 'react-dom';
import { createSellItem } from '../lib/actions';

export default function SellForm() {
  const initialState = {
    message: null,
    errors: {},
  };

  const [state, dispatch] = useFormState(createSellItem, initialState);

  return (
    <form action={dispatch}>
      <div className="flex w-full flex-col items-center justify-center p-10 text-white">
        <div>
          <label className={`${lusitana.className}`} htmlFor="image">
            Image file
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            aria-describedby="url-error"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs place-content-center"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image &&
              state.errors.image.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <div className="flex flex-col">
            <label htmlFor="fullNames" className="form-control">
              Full Names
            </label>
            <input
              type="text"
              placeholder="Full Names"
              name="fullNames"
              id="fullNames"
              className="input input-bordered w-full max-w-xs"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.fullNames &&
                state.errors.fullNames.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Full names"
              required
              className="input input-bordered w-full max-w-xs"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.phoneNumber &&
                state.errors.phoneNumber.map((error: string, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <button
          className="btn mt-5 w-full bg-[#816C61] text-[#E8E9ED]"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}
