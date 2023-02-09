import { FaSun, FaMoon } from "react-icons/fa";
import React, { FC, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { ThemeContext } from "utils/context";

const Header: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (mode: string) => {
    setTheme(mode);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-gray-200 bg-black px-2 py-2.5 sm:px-4">
      <div className="container mx-auto flex items-center justify-center">
        <Link href="/" passHref>
          <Image src="/PokeBall.ico" alt="PokeBall" width={60} height={60} />
        </Link>
        {theme === "dark" ? (
          <FaSun
            className="absolute right-4 h-8 w-8 text-white"
            onClick={() => handleThemeChange("light")}
          />
        ) : (
          <FaMoon
            className="absolute right-4 h-8 w-8 text-white"
            onClick={() => handleThemeChange("dark")}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
