import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

const data = [
  "/images/2.jpg",
  "/images/1.jpg",
  "/images/4.jpg",
  "/images/1.jpg",
  "/images/4.jpg",
  "/images/3.jpg",
];

const Section1 = () => {
  return (
    <div className="mt-4 py-4 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center py-1 border-b-[2px] px-2">
        <h1 className="inline font-bold text-xl border-line">
          Sản phẩm nổi bật
        </h1>
        <div className="flex items-center hover:text-primary transition-all hover:cursor-pointer">
          <button>Xem tất cả</button>
          <BsChevronDown className="ml-1" />
        </div>
      </div>
     <div className="hidden md:block">
     <div className="mt-2 section1 ">
        {data.map((item) => (
          <div className="section1-item" key={item}>
            <LazyLoadImage
              src={item}
              className="w-full h-full object-fill rounded-lg"
            />
          </div>
        ))}
      </div>
     </div>

      <div className="mt-2 block md:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {data.map((item) => (
            <SwiperSlide key={item}>
              <LazyLoadImage src={item} className="w-full aspect-[16/9] object-fill" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Section1;
