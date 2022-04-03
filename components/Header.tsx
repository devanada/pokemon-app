import { FaSun, FaMoon } from "react-icons/fa";
import React, { useContext } from "react";
import { ThemeContext } from "../utils/context";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (mode: string) => {
    setTheme(mode);
  };

  return (
    <nav className="sticky top-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 bg-black z-50">
      <div className="container flex justify-center items-center mx-auto">
        <Link href="/">
          <a>
            <Image src="/PokeBall.ico" alt="PokeBall" width={60} height={60} />
          </a>
        </Link>
        {theme === "dark" ? (
          <FaSun
            className="w-8 h-8 text-white absolute right-4"
            onClick={() => handleThemeChange("light")}
          />
        ) : (
          <FaMoon
            className="w-8 h-8 text-white absolute right-4"
            onClick={() => handleThemeChange("dark")}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
