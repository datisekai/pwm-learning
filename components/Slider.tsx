import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { SliderModel } from "../models/Slider.model";
import { getImageServer } from "../utils";
import SliderSkeletonCard from "./skeletons/SliderSkeletonCard";

// const data = [
//   "/images/banner1.png",
//   "/images/banner2.png",
//   "/images/banner3.png",
// ];

interface SliderProps {
  data: SliderModel[];
}

const Slider: React.FC<SliderProps> = ({ data }) => {
  return (
    <div className="max-w-[1200px] mx-auto mt-2">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        color="#EA8143"
        pagination={{ clickable: true }}
      >
        {!data &&
          [1, 2, 3].map((item) => (
            <SwiperSlide key={item}>
              <SliderSkeletonCard />
            </SwiperSlide>
          ))}
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <LazyLoadImage
              effect="blur"
              src={getImageServer(item.image)}
              className="w-full "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
