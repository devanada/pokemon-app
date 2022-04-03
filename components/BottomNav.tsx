import React from "react";
import Image from "next/image";
import Link from "next/link";

const BottomNav = () => {
  return (
    <nav className="sticky bottom-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 bg-black z-50">
      <div className="container flex justify-center mx-auto">
        <Link href="/">
          <a>
            <Image src="/PokeBall.ico" alt="PokeBall" width={60} height={60} />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
