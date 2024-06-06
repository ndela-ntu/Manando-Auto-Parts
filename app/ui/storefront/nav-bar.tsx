'use client';

import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './cart-icon';
import {
  Bars3Icon,
  DocumentTextIcon,
  PhoneIcon,
  ShoppingCartIcon,
  UserIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useCartStore } from '@/app/providers/cart-store-provider';

const Navbar = ({ withoutCart }: { withoutCart: boolean }) => {
  const { items } = useCartStore((state) => state);
  const [showNavList, setShowNavList] = useState(false);

  const toggleNavList = () => setShowNavList(!showNavList);

  return (
    <nav className="flex flex-row justify-center items-center z-10 md:p-2.5 lg:p-5 xl:p-5">
      <ul className="hidden justify-end sm:space-x-5 sm:p-1 md:flex lg:space-x-5 lg:p-5">
        <li className="sm:px-2 lg:px-2">
          <Link href="/contact-us">
            <div className="flex items-center rounded-full bg-white p-2.5">
              <span className=" text-black">Contact Us</span>
              <PhoneIcon className="h-6 w-6 text-black" />
            </div>
          </Link>
        </li>
        <li className="sm:px-2 lg:px-2">
          <Link href="/about">
            <div className="flex items-center rounded-full bg-white p-2.5">
              <span className="text-black">About Us</span>
              <DocumentTextIcon className="h-6 w-6 text-black" />
            </div>
          </Link>
        </li>
        <li className="sm:px-2 lg:px-2">
          <Link href="/dashboard">
            <div className="flex items-center rounded-full bg-white p-2.5">
              <span className="text-black">Dashboard</span>
              <UserIcon className="h-6 w-6 text-black" />
            </div>
          </Link>
        </li>
      </ul>

      {items.length > 0 && !withoutCart && <li className="block marker:sm:px-2 lg:px-2">
        <Link href="/storefront/checkout/cart">
          <div className="flex items-center justify-center rounded-full bg-white p-2.5">
            <span className="text-black">Cart</span>
            <ShoppingCartIcon className="h-6 w-6 text-black" />
            <span className="px-2 text-black">{items.length}</span>
          </div>
        </Link>
      </li>}

      <button
        itemType="button"
        onClick={toggleNavList}
        aria-label="toggle navigation"
        className="block p-2.5 md:hidden"
      >
        {showNavList ? (
          <XCircleIcon className="h-6 w-6 text-white" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-white" />
        )}
      </button>

      <ul
        className={
          showNavList
            ? 'fixed left-0 top-0 h-full w-[70%] bg-blue-500 py-5 duration-300 ease-in-out md:hidden'
            : 'fixed bottom-0 left-[-100%] top-0 w-[70%] duration-300 ease-in-out'
        }
      >
        <li className="sm:px-2 lg:px-2">
          <Link href="/contact-us">
            <div className="flex items-center justify-between p-2.5">
              <span className=" text-white">Contact Us</span>
              <PhoneIcon className="h-6 w-6 text-white" />
            </div>
          </Link>
        </li>
        <li className="sm:px-2 lg:px-2">
          <Link href="/about-us">
            <div className="flex items-center justify-between p-2.5">
              <span className="text-white">About Us</span>
              <DocumentTextIcon className="h-6 w-6 text-white" />
            </div>
          </Link>
        </li>
        <li className="sm:px-2 lg:px-2">
          <Link href="/dashboard">
            <div className="flex items-center justify-between p-2.5">
              <span className="text-white">Dashboard</span>
              <UserIcon className="h-6 w-6 text-white" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
