'use client';

import mongoose from 'mongoose';
import {
  AddressState,
  PersonalDetailsState,
  createAddress,
  createPersonalDetails,
  createInvoice,
} from '@/app/lib/actions';
import {
  ArrowLeftIcon,
  BanknotesIcon,
  CheckIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import {
  AddressStoreProvider,
  useAddressStore,
} from '@/app/providers/address-store-provider';
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useCartStore } from '@/app/providers/cart-store-provider';
import { lusitana } from '@/app/ui/fonts';
import { useCustomerStore } from '@/app/providers/customer-store-provider';

type Props = {};

export default function CheckoutForm({}: Props) {
  const { success, addressId } = useAddressStore((state) => state);
  const { items } = useCartStore((state) => state);

  if (items.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-10 text-white">
        <p>Cart is currently empty.</p>
        <Link
          className="mt-5 rounded-md bg-[#816C61] p-2.5 text-[#E8E9ED]"
          href="/storefront"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col px-10">
      <Address />
      <PersonalDetails saveDisabled={!success} addressId={addressId} />
      <Payment buttonsDisabled={!success} />
    </div>
  );
}

function PersonalDetails({
  saveDisabled,
  addressId,
}: {
  saveDisabled: boolean;
  addressId: string;
}) {
  const initialState = {
    message: null,
    errors: {},
    isSuccess: false,
    customer: undefined,
  };
  const createPersonalDetailsWithAddressId = createPersonalDetails.bind(
    null,
    addressId,
  );
  const [state, dispatch] = useFormState<PersonalDetailsState, FormData>(
    createPersonalDetailsWithAddressId,
    initialState,
  );

  const { addCustomer } = useCustomerStore((state) => state);

  useEffect(() => {
    if (state.isSuccess && state.customer) {
      addCustomer(state.customer);
    }
  }, [addCustomer, state]);

  if (state.isSuccess) {
    return (
      <div className="flex flex-col py-10 text-[#E8E9ED]">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Personal Details
        </h1>
        <button className="btn btn-circle btn-success">
          <CheckIcon className="h-6 w-6 text-[#E8E9ED]" />
        </button>
      </div>
    );
  }

  return (
    <form action={dispatch}>
      <div className="flex flex-col py-10 text-[#E8E9ED]">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Personal Details
        </h1>
        <div className="flex flex-col">
          <label htmlFor="fullNames" className="">
            Full Names
          </label>
          <input
            type="text"
            name="fullNames"
            id="fullNames"
            placeholder="Full names"
            required
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

        <button
          className="btn mt-5 bg-[#816C61] text-[#E8E9ED]"
          type="submit"
          disabled={saveDisabled}
        >
          Save
        </button>
      </div>
    </form>
  );
}

function Address() {
  const initialState = {
    message: null,
    errors: {},
    isSuccess: false,
    addressId: '',
  };
  const [state, dispatch] = useFormState<AddressState, FormData>(
    createAddress,
    initialState,
  );
  const { addAddress } = useAddressStore((state) => state);

  useEffect(() => {
    if (state.isSuccess && state.addressId) {
      addAddress({
        success: state.isSuccess,
        addressId: state.addressId,
      });
    }
  }, [addAddress, state]);

  if (state.isSuccess) {
    return (
      <div className="flex flex-col py-10 text-[#E8E9ED]">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Address
        </h1>
        <button className="btn btn-circle btn-success">
          <CheckIcon className="h-6 w-6 text-[#E8E9ED]" />
        </button>
      </div>
    );
  }

  return (
    <form action={dispatch}>
      <div className="flex flex-col py-10 text-[#E8E9ED]">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Address
        </h1>
        <div className="flex flex-col">
          <label htmlFor="address" className="">
            Street Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            required
            className="input input-bordered w-full max-w-xs"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.streetAddress &&
              state.errors.streetAddress.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            required
            className="input input-bordered w-full max-w-xs"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.city &&
              state.errors.city.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="postalCode" className="">
            Postal code
          </label>
          <input
            type="number"
            name="postalCode"
            id="postalCode"
            placeholder="Postal Code"
            required
            className="input input-bordered w-full max-w-xs"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.postalCode &&
              state.errors.postalCode.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <button className="btn mt-5 bg-[#816C61] text-[#E8E9ED]" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

function Payment({ buttonsDisabled }: { buttonsDisabled: boolean }) {
  const [paymentType, setPaymentType] = useState<'Cash' | 'Card' | undefined>(
    undefined,
  );
  const { items } = useCartStore((state) => state);
  const { customer } = useCustomerStore((state) => state);

  const createInvoiceWithIds = createInvoice.bind(
    null,
    items.map((item) => item.id),
    customer.id,
    paymentType,
  );

  return (
    <form action={createInvoiceWithIds}>
      <div className="flex flex-col py-10 text-[#E8E9ED]">
        <div className="flex flex-row items-center space-x-4">
          <ArrowLeftCircleIcon
            className="h-8 w-8 text-[#E8E9ED]"
            onClick={() => {
              setPaymentType(undefined);
            }}
          />
          <h2 className="text-2xl">Payment</h2>
        </div>
        <div className="flex flex-row justify-center sm:justify-between">
          {paymentType == undefined && (
            <button
              className="btn bg-[#816C61] text-[#E8E9ED]"
              onClick={() => {
                setPaymentType('Cash');
              }}
              disabled={buttonsDisabled}
            >
              <BanknotesIcon className="h-6 w-6 text-[#E8E9ED]" />
              Cash
            </button>
          )}
          {paymentType === 'Cash' && (
            <div>
              <h3>We will receive payment on delivery.</h3>
            </div>
          )}
          {paymentType == undefined && (
            <button
              className="btn bg-[#816C61] text-[#E8E9ED]"
              onClick={() => {
                setPaymentType('Card');
              }}
              disabled={buttonsDisabled}
            >
              <CreditCardIcon className="h-6 w-6 text-[#E8E9ED]" />
              Card
            </button>
          )}
          {paymentType === 'Card' && (
            <div>
              <h3>Card payments coming soon!</h3>
              <button
                className="btn"
                onClick={() => {
                  setPaymentType(undefined);
                }}
              >
                Okay
              </button>
            </div>
          )}
        </div>
        {paymentType !== undefined && paymentType !== 'Card' && (
          <button className="btn mt-5" type="submit">
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
