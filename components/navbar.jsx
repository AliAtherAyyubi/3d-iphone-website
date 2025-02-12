import React from "react";
import Image from "next/image";
import { appleImg, bagImg, searchImg } from "@/utils";
// import {navLists} from '../constants/index.js'
import {navLists} from '../constants'
//
function Navbar() {
  return (
    
    <header className="w-full p-4">
      <nav className="flex justify-between items-center ">
        <Image src={appleImg} alt="apple logo" height={18} width={18} />

        <div className="flex-center flex-1 max-sm:hidden">
          {navLists.map((navitem) => (
            <div
              key={navitem} 
              className="text-gray-400 hover:text-white transition-all text-sm px-4 cursor-pointer"
            >
              {navitem}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-4">
          <Image src={searchImg} height={18} width={18} />
          <Image src={bagImg} height={18} width={18} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
