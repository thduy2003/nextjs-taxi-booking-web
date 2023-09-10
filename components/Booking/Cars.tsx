import CarsList from "@/data/CarsList";
import { CarItem } from "@/interfaces/carItem.type";
import React from "react";
import Image from "next/image";
const Cars = () => {
  const [selectedCar, setSelectedCar] = React.useState<number>();
  return (
    <div className='mt-3'>
      <h2 className='font-semibold'>Select Car</h2>
      <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
        {CarsList.map((item: CarItem, index: number) => (
          <div
            key={index}
            className={`m-2 p-2 flex flex-col border-[1px] rounded-md hover:border-yellow-400 cursor-pointer ${
              index === selectedCar ? "border-yellow-400 border-[2px]" : ""
            }`}
            onClick={() => setSelectedCar(index)}
          >
            <Image
              src={item.image}
              width={75}
              height={90}
              alt={item.name}
              className='w-full h-[90px] object-contain flex-shrink-0'
            />
            <div className='flex justify-between items-center flex-1'>
              <h2 className='text-[10px] text-gray-500'>{item.name}</h2>
              <span className=''>{item.charges}$</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
