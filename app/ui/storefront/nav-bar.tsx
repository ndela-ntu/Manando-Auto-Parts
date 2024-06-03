'use client';

import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './cart-icon';
import { Bars3Icon, UserIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [showNavList, setShowNavList] = useState(false);

  const toggleNavList = () => setShowNavList(!showNavList);

  return (
    <nav className="flex w-full items-center justify-center md:p-2.5 lg:p-5 xl:p-5">
      <ul className="flex justify-end w-full sm:space-x-5 lg:space-x-5 sm:p-1 lg:p-5">
        <li className="sm:px-2 lg:px-2">
          <Link href="/dashboard">
            <div className="flex items-center justify-center bg-white rounded-full p-2.5">
              <span className="hidden md:block">Dashboard</span>
              <UserIcon className="h-6 w-6 text-gray-500" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
