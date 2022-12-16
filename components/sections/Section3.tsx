import React from "react";
import { BsChevronDown } from "react-icons/bs";
import HomeCard from "../cards/HomeCard";

const Section3 = () => {
  return (
    <div className="mt-4 py-4 max-w-[1200px] w-[calc(100%-16px)] mx-auto">
      <div className="flex justify-between items-center py-1 border-b-[2px]">
        <h1 className="inline font-bold text-xl border-line">Kim cương</h1>
        <div className="flex items-center hover:text-primary transition-all hover:cursor-pointer">
          <button>Xem tất cả</button>
          <BsChevronDown className="ml-1" />
        </div>
      </div>
      <div className="mt-4 flex">
        <div className="w-[180px] hidden md:block">
          {["Kim cương viên", "Nhẫn", "Hoa tai", "Mặt dây"].map((item) => (
            <div key={item} className="py-2 border-b-[2px]">
              <span>{item} (2)</span>
            </div>
          ))}
        </div>
        <div className="flex-1 md:ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-8">
            {[1,2,3,4,5,6,7,8].map(item => <HomeCard key={item}/>)}
        </div>
      </div>
    </div>
  );
};

export default Section3;
