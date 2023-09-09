"use client";
import React from "react";
import AutocompleteAddress from "./AutocompleteAddress";

const Booking = () => {
  // nhân cho 0.72 để khỏi phải scroll
  const [screenHeight, setScreenHeight] = React.useState<number>();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenHeight(window.innerHeight * 0.72);
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
      </div>
    </div>
  );
};

export default Booking;
