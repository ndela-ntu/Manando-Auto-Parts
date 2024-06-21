import React from 'react';
import AcmeLogo from '../ui/acme-logo';
import MainNavbar from '../ui/main-nav-bar';
import SellForm from '../ui/sell-form';

type Props = {};

export default function Page({}: Props) {
  return (
    <div className='h-screen'>
      <header className="bg-blue sticky left-0 right-0 top-0 z-10 flex w-full flex-row items-center justify-between space-y-5 bg-[#002134] p-5 py-2 text-[#E8E9ED]">
        <AcmeLogo />
        <MainNavbar />
      </header>
      <main className="flex flex-col items-center justify-center">
       <SellForm />
      </main>
    </div>
  );
}
