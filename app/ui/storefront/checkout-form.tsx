'use client';

import mongoose from 'mongoose';
import { AddressState, PersonalDetailsState, createAddress, createPersonalDetails } from '@/app/lib/actions';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

type Props = {};

export default function CheckoutForm({}: Props) {
  const [address, setAddress] = useState<{
    success: boolean;
    addressId: string;
  }>({
    success: false,
    addressId: ''
  });
  return (
    <div className="flex flex-row justify-around">
      <div className="flex w-full flex-col">
        <Address
          address={(status, addressId) => {
            /*if (status && addressId) {
              setAddress((prevState) => ({
                ...prevState,
                success: status,
                addressId: addressId,
              }));
            }*/
          }}
        />
        <PersonalDetails
          saveDisabled={!address.success}
          addressId={address.addressId}
        />
        <Payment buttonsDisabled={!address.success} />
      </div>
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
  };
  const createPersonalDetailsWithAddressId = createPersonalDetails.bind(null, addressId);
  const [state, dispatch] = useFormState<PersonalDetailsState, FormData>(
    createPersonalDetailsWithAddressId,
    initialState,
  );

  return (
    <form action={dispatch}>
      <div className="flex flex-col p-10">
        <h2 className="text-2xl">Personal Details</h2>
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
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="">
            Email
          </label>
          <input type="email" name="email" id="email" placeholder="Email" />
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
          />
        </div>
        <button className="btn mt-5" type="submit" disabled={saveDisabled}>
          Save
        </button>
      </div>
    </form>
  );
}

function Address({
  address,
}: {
  address: (status: boolean, addressId: string) => void;
}) {
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

  useEffect(() => {
    if (state.isSuccess && state.addressId) {
      address(state.isSuccess, state.addressId);
    }
  }, [address, state]);

  return (
    <form action={dispatch}>
      <div className="flex flex-col p-10">
        <h2 className="text-2xl">Address</h2>
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
          />
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
          />
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
          />
        </div>
        <button className="btn mt-5" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

function Payment({ buttonsDisabled }: { buttonsDisabled: boolean }) {
  const [paymentType, setPaymentType] = useState<'Cash' | 'Card' | null>(null);

  return (
    <form>
      <div className="flex flex-col p-10">
        <h2 className="text-2xl">Payment</h2>
        <div className="flex flex-row justify-center sm:justify-between">
          {paymentType == null && (
            <button
              className="btn"
              onClick={() => {
                setPaymentType('Cash');
              }}
              disabled={buttonsDisabled}
            >
              <BanknotesIcon className="h-6 w-6 text-gray-500" />
              Cash
            </button>
          )}
          {paymentType === 'Cash' && (
            <div>
              <h3>We will receive payment on delivery.</h3>
            </div>
          )}
          {paymentType == null && (
            <button
              className="btn"
              onClick={() => {
                setPaymentType('Card');
              }}
              disabled={buttonsDisabled}
            >
              <CreditCardIcon className="h-6 w-6 text-gray-500" />
              Card
            </button>
          )}
          {paymentType === 'Card' && (
            <div>
              <h3>Card payments coming soon!</h3>
              <button
                className="btn"
                onClick={() => {
                  setPaymentType(null);
                }}
              >
                Okay
              </button>
            </div>
          )}
        </div>
        {paymentType !== null && paymentType !== 'Card' && (
          <button className="btn mt-5" type="submit">
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
