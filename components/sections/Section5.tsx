import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HomeCard from "../cards/HomeCard";
const data = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/1.jpg",
  "/images/2.jpg",
];

const Section5 = () => {
  return (
    <div className="mt-4 py-4 max-w-[1200px] w-[calc(100%-16px)] mx-auto">
      <div className="flex justify-between items-center py-1 border-b-[2px]">
        <h1 className="inline font-bold text-lg md:text-xl border-line uppercase">
          Trang sức cưới
        </h1>
        <div className="flex items-center text-sm md:text-md hover:text-primary transition-all hover:cursor-pointer">
          <button>Xem tất cả</button>
          <BsChevronDown className="ml-1" />
        </div>
      </div>
      <div className="mt-4 flex  flex-col md:flex-row">
        <div className="w-full md:w-[40%]">
          <LazyLoadImage src="/images/section5.png" />
        </div>
        <div className="flex-1 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-8">
          {data.map((item) => (
            <HomeCard data={item} key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section5;
