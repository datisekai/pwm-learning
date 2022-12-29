import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

const data = [
  {
    url: "/",
    title: "Trang chủ",
  },
  {
    url: "/search?keyword=nhan-kim-cuong",
    title: "Nhẫn kim cương",
  },
  {
    url: "/search?keyword=trang-suc-kim-cuong",
    title: "Trang sức kim cương",
  },
  {
    url: "/blog/tips-hay",
    title: "Tips hay",
  },
  {
    url: "/blog/tin-tuc",
    title: "Tin tức",
  },
  {
    url: "/blog/nghien-cuu-chuyen-sau",
    title: "Nghiên cứu chuyên sâu",
  },
];

const BottomHeader = () => {
  const router = useRouter()
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
          <Link key={index} href={item.url}>
            <button
              className={` select-none whitespace-nowrap max-w-[200px] w-auto text-sm md:text-md rounded-tl-lg rounded-br-lg  text-center hover:cursor-pointer  px-4 py-[6px] font-bold ${
                item.url === router.asPath
                  ? "bg-primary text-white"
                  : "bg-transparent text-white "
              }`}
            >
              <span className="animation-left-right relative left-right">
                {item.title}
              </span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomHeader;
