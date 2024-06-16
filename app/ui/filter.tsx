'use client';

import { FunnelIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categories } from '../models/categories';

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (category?: string) => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem?.blur();
    }
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('filterBy', category);
    } else {
      params.delete('filterBy');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div
        tabIndex={0}
        role="button"
        className="btn rounded-md bg-blue-500 p-2.5"
      >
        <FunnelIcon className="h-6 w-6 text-white" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li
          onClick={() => {
            handleFilter(undefined);
          }}
        >
          ALL
        </li>
        <div className="divider p-0"></div>
        {categories.map((category, i) => (
          <div>
            <li key={i}
              onClick={() => {
                handleFilter(category);
              }}
            >
              {category.split('_').join(' ')}
            </li>
            <div className="divider p-0"></div>
          </div>
        ))}
      </ul>
    </div>
  );
}
