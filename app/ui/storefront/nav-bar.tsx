'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartIcon from './cart-icon';
import {
  Bars3Icon,
  DocumentTextIcon,
  PhoneIcon,
  ShoppingCartIcon,
  UserIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/cart-context';
import { IProduct } from '@/app/models/product';

const Navbar = () => {
  const [localCart, setLocalCart] = useState<IProduct[]>([]);
  const [showNavList, setShowNavList] = useState(false);
  const { cart } = useCart();

  const toggleNavList = () => setShowNavList(!showNavList);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart])

  return (
    <div>
      <nav className="z-10 flex flex-row items-center justify-center md:p-2.5 lg:p-5 xl:p-5">
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
          {localCart.length === 0 ? (
            <button
              onClick={() => {
                if (document !== null) {
                  (
                    document.getElementById('cart_modal')! as HTMLDialogElement
                  ).showModal();
                }
              }}
              className="flex rounded-full bg-white p-2.5"
            >
              <ShoppingCartIcon className="h-6 w-6 text-black" />
              <span className="px-2 text-black">{localCart.length}</span>
            </button>
          ) : (
            <li>
              <Link href="/storefront/checkout/cart">
                <div className="flex items-center justify-center rounded-full bg-white p-2.5">
                  <ShoppingCartIcon className="h-6 w-6 text-black" />
                  <span className="px-2 text-black">{localCart.length}</span>
                </div>
              </Link>
            </li>
          )}
        </ul>

        <button
          itemType="button"
          onClick={toggleNavList}
          aria-label="toggle navigation"
          className="block p-2.5 md:hidden"
        >
          {showNavList ? (
            <XCircleIcon className="h-6 w-6 text-[#E8E9ED]" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-[#E8E9ED]" />
          )}
        </button>

        <ul
          className={
            showNavList
              ? 'fixed left-0 top-0 h-full w-[70%] bg-[#816C61] py-5 duration-300 ease-in-out md:hidden'
              : 'fixed bottom-0 left-[-100%] top-0 w-[70%] duration-300 ease-in-out'
          }
        >
          <li className="sm:px-2 lg:px-2">
            <Link href="/contact-us">
              <div className="flex items-center justify-between p-2.5">
                <span className=" text-[#E8E9ED]">Contact Us</span>
                <PhoneIcon className="h-6 w-6 text-[#E8E9ED]" />
              </div>
            </Link>
          </li>
          <li className="sm:px-2 lg:px-2">
            <Link href="/about-us">
              <div className="flex items-center justify-between p-2.5">
                <span className="text-[#E8E9ED]">About Us</span>
                <DocumentTextIcon className="h-6 w-6 text-[#E8E9ED]" />
              </div>
            </Link>
          </li>
          <li className="sm:px-2 lg:px-2">
            <Link href="/dashboard">
              <div className="flex items-center justify-between p-2.5">
                <span className="text-[#E8E9ED]">Dashboard</span>
                <UserIcon className="h-6 w-6 text-[#E8E9ED]" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <dialog id="cart_modal" className="modal">
        <div className="modal-box flex items-center justify-center">
          <p className="text-black">Your cart is currently empty!</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Navbar;
