import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

const data = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
];

const Slider = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        color="#EA8143"
        pagination={{ clickable: true }}
      >
        {data.map(item => <SwiperSlide key={item}>
            <LazyLoadImage src={item} className='w-full '/>
        </SwiperSlide>)}
      </Swiper>
    </div>
  );
};

export default Slider;
