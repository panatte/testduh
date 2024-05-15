"use client"

import Navbar from "@/components/Navbar-login";
import Footer from "@/components/Footer";
import { useState } from "react";
import { FaImage,FaCloudUploadAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Portfolio  from "./portfolio";
import Changepass from "./changepass";

export default function Admin() {
    const [activeButton, setActiveButton] = useState("portfolio");
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-gray-900">
        <div className="flex flex-col bg-gray-800 m-[20px] p-14 w-[100rem] min-h-screen rounded-md">
          <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-md  sm:flex dark:divide-gray-700 dark:text-gray-400 mb-[20px] ">
            <li className="w-full focus-within:z-10">
              <a
                href="#"
                onClick={() => {
                  setActiveButton("portfolio");
                }}
                className={`w-full flex justify-center items-center p-4 rounded-md ${
                  activeButton === "portfolio"
                    ? "bg-gray-300 text-gray-900"
                    : "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                } border-r border-gray-200 dark:border-gray-700`}
              >
                <FaImage className="mr-[5px] text-xl"/> my work
              </a>
            </li>
            <li className="w-full focus-within:z-10 mx-[10px]">
              <a
                href="#"
                onClick={() => {
                  setActiveButton("changeprofile");
                }}
                className={`flex justify-center items-center w-full p-4 rounded-md ${
                  activeButton === "changeprofile"
                    ? "bg-gray-300 text-gray-900"
                    : "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                } border-r border-gray-200 dark:border-gray-700`}
              >
                <FaCloudUploadAlt className="mr-[5px] text-xl"/> Upload profile picture
              </a>
            </li>
            <li className="w-full focus-within:z-10">
              <a
                href="#"
                onClick={() => {
                  setActiveButton("changepassword");
                }}
                className={`flex justify-center items-center w-full p-4 rounded-md ${
                  activeButton === "changepassword"
                    ? "bg-gray-300 text-gray-900"
                    : "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                } border-r border-gray-200 dark:border-gray-700`}
              >
               <RiLockPasswordFill className="mr-[5px] text-xl"/> Change password
              </a>
            </li>
          </ul>
          {activeButton === "portfolio" && <Portfolio gridClass="grid gap-4" />}
          {activeButton === "changepassword" && <Changepass/>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
