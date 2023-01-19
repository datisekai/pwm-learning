import React, { FC, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HomeCard from "../cards/HomeCard";

const data = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/ss1.png",
  "/images/ss2.png",
  "/images/ss3.png",
  "/images/ss4.png",
];

interface Section3Props {
  title: string;
}

const Section3: FC<Section3Props> = ({ title}) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () =>
  {
    setShowOptions(!showOptions);
  }
  return (
    <div className="mt-4 py-4 max-w-[1200px] w-[calc(100%-16px)] mx-auto">
      <div className="flex justify-between items-center py-1 border-b-[2px]">
        <button type="button" className="md:hidden block" onClick={handleClick}>
        <h1 className="inline font-bold text-lg md:text-xl border-line uppercase">
          {title}
        </h1>
        </button>
        <h1 className="hidden md:inline font-bold text-lg md:text-xl border-line uppercase">
          {title}
        </h1>
        <div className="flex items-center text-sm md:text-md hover:text-primary transition-all hover:cursor-pointer">
          <button>Xem tất cả</button>
          <BsChevronDown className="ml-1" />
        </div>
      </div>
      <div className="mt-4 block md:flex">
        <div className="md:hidden block">
        { showOptions && (
        <div className="w-[180px] md:flex flex-col absolute md:static z-10 bg-green-700 md:bg-transparent md:p-0 p-2.5 md:rounded-none rounded-lg">
          <div>
            {["Kim cương viên", "Nhẫn", "Hoa tai", "Mặt dây"].map((item) => (
              <div
                key={item}
                className="py-2 hover:text-primary transition-all cursor-pointer border-b-[2px]" 
               
              >
                <span>{item} (2)</span>
              </div>
            ))}
          </div>
        </div>
        )}
        </div>
        <div className="w-[180px] md:flex hidden flex-col absolute md:static z-10 bg-green-700 md:bg-transparent md:p-0 p-2.5 md:rounded-none rounded-lg">
          <div>
            {["Kim cương viên", "Nhẫn", "Hoa tai", "Mặt dây"].map((item) => (
              <div
                key={item}
                className="py-2 hover:text-primary transition-all cursor-pointer border-b-[2px]" 
               
              >
                <span>{item} (2)</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 md:ml-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-8">
          {data.map((item) => (
            <HomeCard data={item} key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
