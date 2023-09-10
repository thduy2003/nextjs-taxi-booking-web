"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import React from "react";

export default function Home() {
  const { onChangeState } = useAppContext();
  //hàm lấy tọa độ vị trí hiện tại của user  và lưu vào state của context để truyền qua map
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      onChangeState({
        userLocation: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      });
    });
  };

  React.useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
      <div>
        <Booking />
      </div>
      <div className='col-span-2 order-first md:order-last'>
        <MapBoxMap />
      </div>
    </div>
  );
}
