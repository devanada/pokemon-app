import { MdCatchingPokemon } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import React, { FC } from "react";
import Link from "next/link";

const BottomNav: FC = () => {
  return (
    <nav className="sticky bottom-0 w-full border-gray-200 bg-black px-2 py-2.5 sm:px-4">
      <div className="grid grid-flow-row auto-rows-max grid-cols-2">
        <Link
          href="/"
          className="flex flex-col items-center font-arcade text-xs text-white"
          passHref
        >
          <FaHome className="h-8 w-8 text-white" />
          Home
        </Link>
        <Link
          href="/mypokemon"
          className="flex flex-col items-center font-arcade text-xs text-white"
          passHref
        >
          <MdCatchingPokemon className="h-8 w-8 text-white" />
          My Pokemon
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
