"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Navbar_login from "../components/Navbar-login";
import Navbar_admin from "../components/Navbar-admin";
import Footer from "../components/Footer";
import Borad from "../components/board";
import SearchBar from "../components/searchbar";
import Sort from "../components/sort";
import React, { useEffect, useState } from "react";
import PopUp from "../components/popup";

export default function Home() {
  const [nav, setNav] = useState("");
  const [showPopUp, setShowPopUp] = useState("");
  const [profile, setProfile] = useState({} as any);
  const handleClose = () => {
    setShowPopUp("");
  };

  const address = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  fetch(address + "/api/Checkcookies", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Success") {
        setNav(data.data.role);
        setProfile(data.data.path_profile);
      } else {
        setNav("guest");
      }
    });


  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("share");
    if (page) {
      setShowPopUp(page);
    }
  }, []);

  const [sortOrder, setSortOrder] = useState<string>('latest');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSortChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main>
      {String(nav) === "admin" ? (
        <Navbar_admin />
      ) : String(nav) === "user" ? (
        <Navbar_login />
      ) : (
        <Navbar />
      )}
      <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-gray-900">
      <div className="grid bg-gray-800 m-[20px] p-14 min-h-[90vh] rounded-md min-w-screen">
          <div className="grid p-6 grid-cols-2">
            <div className="col-start-2">
              <Sort onSortChange={handleSortChange} />
              <div className="flex justify-end">
                <div className="m-2 w-[300px] ">
                  <SearchBar onSearch={handleSearch} />
                </div>
              </div>
            </div>
          </div>
          <div className="row-start-3">
            <Borad gridClass="grid gap-4" sort={sortOrder} search={searchQuery} />
          </div>
          {/* <div className="row-start-4 m-4 justify-center flex">
          <button type="button" className="text-white text-3xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 " 
          onClick={Reloadimg}
          >
            More</button>
          </div> */}
        </div>
      </main>
      <Footer />
      {showPopUp && <PopUp imgUrl={showPopUp} onclose={handleClose} />}
    </main>
  );
}
