import { AddressStoreProvider } from '@/app/providers/address-store-provider';
import { CustomerStoreProvider } from '@/app/providers/customer-store-provider';
import CheckoutForm from '@/app/ui/storefront/checkout-form';
import React from 'react';

type Props = {};

export default function Page({}: Props) {
  return (
    <AddressStoreProvider>
      <CustomerStoreProvider>
        <CheckoutForm />
      </CustomerStoreProvider>
    </AddressStoreProvider>
  );
}
