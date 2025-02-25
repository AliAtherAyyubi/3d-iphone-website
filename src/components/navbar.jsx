import React from "react";
import Image from "next/image";
import { appleImg, bagImg, searchImg } from "@/utils/assets";
import {navLists} from '../constants'
//
function Navbar() {
  return (
    
    <header className="w-full py-5 sm:px-10 px-5 flex-center">
      <nav className="flex screen-max-width w-full ">
        <Image src={appleImg} alt="apple logo" height={18} width={18} />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((navitem) => (
            <div
              key={navitem} 
              className="text-gray-400 hover:text-white transition-all text-sm px-4 cursor-pointer"
            >
              {navitem}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Image src={searchImg} height={18} width={18} />
          <Image src={bagImg} height={18} width={18} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
