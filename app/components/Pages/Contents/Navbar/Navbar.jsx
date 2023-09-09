"use client"
import React, { useEffect, useState } from "react";
import styles from './Navbar.module.css'
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import $ from 'jquery';
import {Link} from "@chakra-ui/react";


const Navbar = () => {

  const router = useRouter();
  // Function to go back to the previous page in history
  const goBack = () => {
    router.back();
  };

  

  // const [isScrolled, setIsScrolled] = useState(false);
  // var prevScrollpos = window.scrollY;
  
  // useEffect(() => {
  //  // Get a reference to the hidden element
  //  const hiddenElement = document.getElementById('hiddenElement');
    
  //  document.addEventListener('click', function() {
  //    hiddenElement.classList.toggle('hiddens');
  //  });
  // }, []);

  return (
    <div className="fixed w-full">
         <div id="hiddenElement">
      <header>
        <div className=" w-full my-3 flex justify-between px-14 ">
          <Link href={'/category'}>
          <button>
            <ArrowLeftIcon className="hidden h-6 w-6  sm:inline" />
          </button>
          </Link>
          <div className="flex items-center space-x-4 text-sm ">
            <HeartIcon className="hidden h-6 w-6  sm:inline" />
          </div>
        </div>
      </header>
      </div>
    </div>
 

  );
};

export default Navbar;