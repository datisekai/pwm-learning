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
     <Swiper
      className="w-full h-full"
      modules={[Navigation]}
      spaceBetween={8}
      slidesPerView={5}
      navigation
      breakpoints={{
        768:{
          slidesPerView:3
        },
        320:{
          slidesPerView:2
        }
      }}
     
    >
      {data.map((item, index) => (
        <SwiperSlide key={item.url} className={`line-clamp-1 max-w-[200px] w-auto text-md rounded-tl-lg rounded-br-lg  text-center hover:cursor-pointer  px-4 py-[6px] ${index === 0 ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
          {item.title}
        </SwiperSlide>
      ))}
    </Swiper>

    {/* <div className="flex items-center flex-nowrap category-header overflow-x-scroll">
      {data.map((item,index) => <button className={` ml-2 first:ml-0 line-clamp-1  text-md rounded-tl-lg rounded-br-lg  text-center hover:cursor-pointer  px-4 py-[6px] ${index === 0 ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{item.title}</button>)}
    </div> */}
    </div>
  );
};

export default BottomHeader;
