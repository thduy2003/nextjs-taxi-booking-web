import { useAppContext } from "@/context/AppContext";
import React from "react";
import { Marker } from "react-map-gl";
const Markers = () => {
  //lấy tọa độ source và destination được chọn để đánh dấu marker lên map
  const { userLocation, destinationCordinates, sourceCordinates } =
    useAppContext();

  return (
    <>
      {userLocation ? (
        <Marker
          longitude={userLocation?.lng as number}
          latitude={userLocation?.lat as number}
          anchor='bottom'
        >
          <img src='./pin.png' className='w-10 h-10' alt='' />
        </Marker>
      ) : null}
      {destinationCordinates ? (
        <Marker
          longitude={destinationCordinates?.lng as number}
          latitude={destinationCordinates?.lat as number}
          anchor='bottom'
        >
          <img src='./pin.png' className='w-10 h-10' alt='' />
        </Marker>
      ) : null}
      {sourceCordinates ? (
        <Marker
          longitude={sourceCordinates?.lng as number}
          latitude={sourceCordinates?.lat as number}
          anchor='bottom'
        >
          <img src='./pin.png' className='w-10 h-10' alt='' />
        </Marker>
      ) : null}
    </>
  );
};

export default Markers;
