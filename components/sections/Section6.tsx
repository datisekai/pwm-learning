import Link from "next/link";
import React, { FC } from "react";
import { BsChevronDown } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { SpeciesModel } from "../../models/Species.model";
import { getImageServer } from "../../utils";

const data = [
  "/images/section6-1.png",
  "/images/section6-2.png",
  "/images/section6-1.png",
];

interface Section6Props {
  data: SpeciesModel[];
}

const Section6: FC<Section6Props> = ({ data }) => {
  return (
    <div className="max-w-[1200px] mx-auto mt-2 px-2">
      <div className="flex justify-between items-center py-1 border-b-[2px]">
        <h1 className="inline font-bold text-lg md:text-xl border-line uppercase">
          Bộ sưu tập
        </h1>
        {/* <div className="flex items-center text-sm md:text-md hover:text-primary transition-all hover:cursor-pointer">
          <button>Xem tất cả</button>
          <BsChevronDown className="ml-1" />
        </div> */}
      </div>
      <div className="mt-4">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          navigation
          color="#EA8143"
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center">
                <LazyLoadImage
                  effect="blur"
                  src={
                    item?.thumbnail
                      ? getImageServer(item.thumbnail)
                      : "/images/no-image.png"
                  }
                  className="w-full rounded-lg "
                />
                <div className="mt-2 flex flex-col">
                  <h4 className="uppercase font-bold">BST {item.name}</h4>
                  <Link
                    href={`/search?speciesId=${item.id}`}
                  >
                    <button className="bg-[#D9D9D9] w-full text-[#898989] px-4 hover:bg-primary hover:text-white transition-all py-1 mt-2">
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Section6;
