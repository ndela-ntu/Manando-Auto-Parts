import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import BuyOrSellCard from './ui/buy-sell';
import Welcome from './ui/welcome';
import Main from './ui/main';
import MainNavbar from './ui/main-nav-bar';
import ContactDetails from './ui/contact-details';

export default function Page() {
  return (
    <div className='h-full'>
      <header className="bg-blue sticky left-0 right-0 top-0 z-10 flex w-full flex-row items-center justify-between space-y-5 bg-[#002134] p-5 py-2 text-[#E8E9ED]">
        <AcmeLogo />
        <MainNavbar />
      </header>
      <main className="flex flex-col items-center justify-center">
        <Welcome />
        <Main />
      </main>
      <footer>
        <ContactDetails />
      </footer>
    </div>
  );
}
