import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";

const FLEX_CENTER =
  "text-white flex flex-col items-center text-xs sm:text-sm md:text-xl";

const BottomNav = () => {
  return (
    <nav className="sticky bottom-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 bg-black z-50">
      <div className="grid grid-flow-row auto-rows-max grid-cols-2">
        <Link href="/">
          <a className={FLEX_CENTER}>
            <FaHome className="w-8 h-8 text-white" />
            Home
          </a>
        </Link>
        <Link href="/">
          <a className={FLEX_CENTER}>
            <MdCatchingPokemon className="w-8 h-8 text-white" />
            My Pokemon
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
