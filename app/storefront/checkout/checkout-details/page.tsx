import { AddressStoreProvider } from '@/app/providers/address-store-provider';
import { CustomerStoreProvider } from '@/app/providers/customer-store-provider';
import CheckoutForm from '@/app/ui/storefront/checkout-form';
import { Metadata } from 'next';
import React from 'react';

type Props = {};

export const metadata: Metadata = {
  title: 'Checkout | Manando Auto Parts',
  description: 'This is page is to enter the checkout details',
  icons: {
    icon: '/favicon.ico'
  }
}


export default function Page({}: Props) {
  return (
    <AddressStoreProvider>
      <CustomerStoreProvider>
        <CheckoutForm />
      </CustomerStoreProvider>
    </AddressStoreProvider>
  );
}
