import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { BsChevronDown } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { PopularModel } from "../../models/Popular.model";
import { getImageServer } from "../../utils";

// const data = [
//   "/images/2.jpg",
//   "/images/1.jpg",
//   "/images/4.jpg",
//   "/images/1.jpg",
//   "/images/4.jpg",
//   "/images/3.jpg",
// ];

interface Section1Props{
  data:PopularModel[]
}

const Section1:FC<Section1Props> = ({data}) => {
  
  const router = useRouter()
  return (
    <div className="mt-4 py-4 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center py-1 border-b-[2px] px-2">
        <h1 className="inline font-bold text-lg md:text-xl border-line">
          Sản phẩm nổi bật
        </h1>
        {/* <div className="flex text-sm md:text-md items-center hover:text-primary transition-all hover:cursor-pointer">
          <button>Xem tất cả</button>
          <BsChevronDown className="ml-1" />
        </div> */}
      </div>
     <div className="hidden md:block">
     
     </div>

      <div className="mt-2">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480:{
              slidesPerView:1.5,
            },
            640:{
              slidesPerView:2.5,
            },
            1024:{
              slidesPerView:3
            }
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={getImageServer(item.product.thumbnail)} className="w-full aspect-[16/9] object-fill" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Section1;
