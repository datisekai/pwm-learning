import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

const data = [
  "/images/ss1.png",
  "/images/ss2.png",
  "/images/ss3.png",
  "/images/ss4.png",
  "/images/ss5.png",
  "/images/ss6.png",
];

const Section1 = () => {
  return (
    <div className="mt-4 py-4 max-w-[1200px] w-[calc(100%-16px)] mx-auto">
      <div className="flex justify-between items-center py-1 border-b-[2px]">
        <h1 className="inline font-bold text-xl border-line">
          Sản phẩm nổi bật
        </h1>
        <div className="flex items-center hover:text-primary transition-all hover:cursor-pointer">
          <button>Xem tất cả</button>
          <BsChevronDown className="ml-1" />
        </div>
      </div>
      <div className='mt-2 section1'>
            {data.map(item => <div className='section1-item' key={item}>
                    <LazyLoadImage src={item} className='w-full h-full object-fill rounded-lg'/>
            </div>)}
        </div>
    </div>
  );
};

export default Section1;
