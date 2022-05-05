import React, { useState } from "react";
import { CalendarIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const Header = () => {
  const [hamburgerIcon, setHamburgerIcon] = useState(false);
  const handleHamburgerState = () => setHamburgerIcon(!hamburgerIcon);
  return (
    <>
      <nav className="md:flex justify-between bg-gray-200 p-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-secondary-200 text-3xl font-body font-bold p-3">
              <span className="border-b-2 border-gray-50">FutFund</span>
            </h1>
          </div>

          <div className="md:hidden cursor-pointer">
            <MenuIcon
              className={!hamburgerIcon ? "w-5" : "hidden w-5"}
              id="burger"
              onClick={handleHamburgerState}
            ></MenuIcon>
            <XIcon
              className={!hamburgerIcon ? "w-5 hidden" : "block w-5"}
              onClick={handleHamburgerState}
            ></XIcon>
          </div>
        </div>

        <ul
          className={
            !hamburgerIcon
              ? "hidden md:flex"
              : "md:flex justify-between items-center block"
          }
        >
          <li className="m-3 border-b-2 border-gray-100 md:border-none">
            <a
              href="/"
              className="font-semibold text-gray-500 uppercase text-sm hover:text-gray-700 font-body"
            >
              Home
            </a>
          </li>
          <li className="m-3 border-b-2 border-gray-100 md:border-none">
            <a
              href="/"
              className="font-semibold text-gray-500 uppercase text-sm hover:text-gray-700 font-body"
            >
              About
            </a>
          </li>
          <li className="m-3 border-b-2 border-gray-100 md:border-none">
            <a
              href="/"
              className="font-semibold text-gray-500 uppercase text-sm hover:text-gray-700 font-body"
            >
              Contact us
            </a>
          </li>
          <li className="m-3">
            <a
              href="/login"
              className="font-semibold text-gray-200 uppercase text-sm 
                hover:text-gray-400 hover:bg-white bg-primary border-primary p-1 rounded-full tracking-wider pl-2 pr-2 border-2"
            >
              Login
            </a>
          </li>
          <li className="m-3">
            <a
              href="/register"
              className="font-semibold text-gray-200 uppercase text-sm 
                hover:text-gray-400 hover:bg-white bg-primary border-primary p-1 rounded-full tracking-wider pl-2 pr-2 border-2"
            >
              Register
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
