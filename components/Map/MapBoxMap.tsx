"use client";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import Map from "react-map-gl";
import Markers from "./Markers";
import "mapbox-gl/dist/mapbox-gl.css";
import MapBoxRoute from "./MapBoxRoute";
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const MapBoxMap = () => {
  const [screenHeight, setScreenHeight] = React.useState<number>();
  //lấy tọa độ vị trí user từ use context
  const {
    userLocation,
    sourceCordinates,
    destinationCordinates,
    onChangeState,
    directionData,
  } = useAppContext();
  // hàm lấy các tọa độ từ source đến destination
  const getDirectionRoute = async () => {
    try {
      const res = await fetch(
        MAPBOX_DRIVING_ENDPOINT +
          sourceCordinates?.lng +
          "," +
          sourceCordinates?.lat +
          ";" +
          destinationCordinates?.lng +
          "," +
          destinationCordinates?.lat +
          "?overview=full&geometries=geojson" +
          "&access_token=" +
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      onChangeState({
        directionData: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const mapRef = React.useRef<any>(null);
  //khi có tọa độ vị trí source hoặc destination được chọn thì map nhảy tới tọa độ đó sau 2.5s
  React.useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);
  //Use to Fly to Destination Markers Location
  React.useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }
    //khi đã chọn được tọa độ của destination và source thì mới chạy function lấy route direction
    if (destinationCordinates && sourceCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // nhân cho 0.82 để khỏi phải scroll
      setScreenHeight(window.innerHeight * 0.82);
    }
  }, []);

  return (
    <div className='p-5'>
      <h2 className='text-[20px] font-semibod'>Map</h2>
      <div className='rouded-lg overflow-hidden'>
        {screenHeight && userLocation ? (
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            ref={mapRef}
            style={{
              width: "100%",
              height: `${screenHeight}px`,
              borderRadius: 10,
            }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
          >
            <Markers />
            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
    </div>
  );
};

export default MapBoxMap;
