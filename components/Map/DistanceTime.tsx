import { useAppContext } from "@/context/AppContext";
import React from "react";

const DistanceTime = () => {
  const { directionData } = useAppContext();
  return (
    <div className='bg-yellow-500'>
      <h2 className='text-yellow-100 opacity-80 text-[15px]'>
        Distance:{" "}
        <span className='font-bold mr-3 text-black'>
          {(directionData.routes[0].distance * 0.000621371192).toFixed(2)} Miles
        </span>
        Duration{" "}
        <span className='font-bold text-black'>
          {(directionData.routes[0].duration / 60).toFixed(2)}Min
        </span>
      </h2>
    </div>
  );
};

export default DistanceTime;
