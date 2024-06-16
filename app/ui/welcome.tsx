import Link from 'next/link';
import Background from './background';

export default function Welcome() {
  return (
    <div className="items-center p-5">
      <h2 className="text-center text-2xl">Welcome to Manando Auto Parts</h2>
      <div className="divider"></div>
      <div className="flex flex-col items-center">
        <p className='pb-5'>Looking to:</p>
        <div className='flex space-x-10 justify-evenly'>
          <Link
            className="rounded-md bg-blue-500 p-2.5 text-white"
            href="/storefront"
          >
            Buy Parts
          </Link>
          <Link
            className="rounded-md bg-blue-500 p-2.5 text-white"
            href="/sell"
          >
            Sell Parts
          </Link>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
