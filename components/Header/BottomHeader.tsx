import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

const data = [
  {
    url: "/",
    title: "Trang chủ",
  },
  {
    url: "/",
    title: "Nhẫn kim cương",
  },
  {
    url: "/",
    title: "Trang sức kim cương",
  },
  {
    url: "/",
    title: "Tips hay",
  },
  {
    url: "/",
    title: "Tin tức",
  },
  {
    url: "/",
    title: "Nghiên cứu chuyên sâu",
  },
  
];

const BottomHeader = () => {
  return (
    <div className=" max-w-[1200px] mx-auto ">
      {/* <Swiper
      className="w-full h-full"
      modules={[Navigation]}
      spaceBetween={8}
      slidesPerView={5}
      navigation
      breakpoints={{
        768:{
          slidesPerView:4
        },
        320:{
          slidesPerView:2
        }
      }}
     
    >
      {data.map((item, index) => (
        <SwiperSlide key={item.url} className={`select-none flex justify-center line-clamp-1 max-w-[200px] w-auto text-md rounded-tl-lg rounded-br-lg  text-center hover:cursor-pointer  px-4 py-[6px] font-bold ${index === 0 ? 'bg-primary text-white' : 'bg-transparent text-white '}`}>
          <span className="animation-left-right relative left-right">{item.title}</span>
        </SwiperSlide>
      ))}
    </Swiper> */}

      <div className="flex items-center flex-nowrap px-2 md:px-0 md:justify-center category-header overflow-x-scroll w-full">
        {data.map((item, index) => (
          <button
            className={` select-none whitespace-nowrap max-w-[200px] w-auto text-md rounded-tl-lg rounded-br-lg  text-center hover:cursor-pointer  px-4 py-[6px] font-bold ${
              index === 0
                ? "bg-primary text-white"
                : "bg-transparent text-white "
            }`}
          >
            <span className="animation-left-right relative left-right">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomHeader;
