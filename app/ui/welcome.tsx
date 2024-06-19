import Link from 'next/link';
import Background from './background';
import Image from 'next/image';

export default function Welcome() {
  return (
    <div className="w-full items-center">
      <div className="stack w-full items-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="p-5 text-center text-3xl text-[#E8E9ED] md:text-4xl lg:text-5xl">
            Welcome to Manando Auto Parts
          </h2>
          <p className="text-[#E8E9ED] px-10 text-center">We buy and sell used/second hand car parts</p>
        </div>
        <div className="static h-[200px] w-full overflow-hidden md:h-[300px]">
          <Image
            src="/car.png"
            alt="Image of car"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="py-5 text-xl text-[#E8E9ED]">Looking to:</p>
        <div className="flex justify-evenly space-x-10">
          <Link
            className="rounded-md bg-[#816C61] p-2.5 text-[#E8E9ED]"
            href="/storefront"
          >
            Buy Parts
          </Link>
          <Link
            className="rounded-md bg-[#816C61] p-2.5 text-[#E8E9ED]"
            href="/sell"
          >
            Sell Parts
          </Link>
        </div>
      </div>
    </div>
  );
}
