"use client";
import React from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";

const Booking = () => {
  // nhân cho 0.82 để khỏi phải scroll
  const [screenHeight, setScreenHeight] = React.useState<number>();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenHeight(window.innerHeight * 0.82);
    }
  }, []);

  return (
    <div className='p-5'>
      <h2 className='font-semibold text-[20px]'>Booking</h2>
      <div
        className='border-[1px] rounded-md p-5'
        style={{ height: screenHeight }}
      >
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <button className='w-full bg-yellow-400 p-1 rounded-md mt-4'>
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
