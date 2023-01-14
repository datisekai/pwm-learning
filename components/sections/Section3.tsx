import React, { FC } from "react";
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
  "/images/3.jpg",
  "/images/4.jpg",
];

interface Section3Props {
  title: string;
}

const Section3: FC<Section3Props> = ({ title }) => {
  return (
    <div className="mt-4 py-4 max-w-[1200px] w-[calc(100%-16px)] mx-auto">
      <div className="flex justify-between items-center py-1 border-b-[2px]">
        <h1 className="inline font-bold text-lg md:text-xl border-line uppercase">
          {title}
        </h1>
        <div className="flex items-center text-sm md:text-md hover:text-primary transition-all hover:cursor-pointer">
          <button>Xem tất cả</button>
          <BsChevronDown className="ml-1" />
        </div>
      </div>
      <div className="mt-4 flex">
        <div className="w-[180px] hidden md:flex flex-col ">
          <div>
            {["Kim cương viên", "Nhẫn", "Hoa tai", "Mặt dây"].map((item) => (
              <div key={item} className="py-2 hover:text-primary transition-all cursor-pointer border-b-[2px]">
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
