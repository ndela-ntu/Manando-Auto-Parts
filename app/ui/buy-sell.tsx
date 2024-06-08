import React from "react";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";
import { BanknotesIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";


type Props = {
  cardType: "Shop" | "Sell";
};

export default function BuyOrSellCard({ cardType }: Props) {
  return (
    <div>
      <Link href={`${cardType === "Shop" ? "/storefront" : "/sell"}`}>
        {cardType === "Shop" ? (
          <div className="border border-[#cae4f7] rounded-lg bg-sky-100 flex flex-col items-center justify-self-center p-10">
            <ShoppingCartIcon className="h-32 w-32 text-gray-500" />
            <span>Shop</span>
          </div>
        ) : (
          <div className="border border-[#cae4f7] rounded-lg bg-sky-100 flex flex-col items-center justify-self-center p-10">
            <BanknotesIcon className="h-32 w-32 text-gray-500" />
            <span>Sell</span>
          </div>
        )}
      </Link>
    </div>
  );
}
