import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import CategoryBlogAction from "../../actions/CategoryBlog.action";
import HeaderAction from "../../actions/Header.action";
import SpeciesAction from "../../actions/Species.action";

const BottomHeader = () => {
  const router = useRouter();

  const { data: dataSpecies } = useQuery(["species"], SpeciesAction.home);
  const { data: dataCategoryBlog } = useQuery(
    ["category-blog"],
    CategoryBlogAction.getByUser
  );
  const { data: dataHeader } = useQuery(["header"], HeaderAction.getHeader);

  const [data, setData] = React.useState([{ url: "/", title: "Trang chủ" }]);

  React.useEffect(() => {
    // if(dataCategoryBlog && dataSpecies){
    //   setData([...data, ...dataSpecies?.species?.map((item:any) => ({url:`/search?speciesId=${item.id}`,title:item.name})),...dataCategoryBlog?.map((item:any) => ({url:`/blog/${item.slug}`, title:item.name}))])
    // }
    if (dataHeader) {
      const home = dataHeader.species.find((item: any) => item.id === 0);
      if (home) {
        const species = dataHeader.species.filter((item: any) => item.id !== 0);
        setData([
          { url: "/", title: home.name },
          ...species?.map((item: any) => ({
            url: `/search?speciesId=${item.id}`,
            title: item.name,
          })),
          ...dataHeader.blogs?.map((item: any) => ({
            url: `/blog/${item.slug}`,
            title: item.name,
          })),
        ]);
      } else {
        setData([
          ...dataHeader?.species?.map((item: any) => ({
            url: `/search?speciesId=${item.id}`,
            title: item.name,
          })),
          ...dataHeader.blogs?.map((item: any) => ({
            url: `/blog/${item.slug}`,
            title: item.name,
          })),
        ]);
      }
    }
  }, [dataHeader]);

  return (
    <div className=" max-w-[1200px] mx-auto flex justify-center">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={"auto"}
        color="#EA8143"
      >
        {data.map((item, index) => (
          <SwiperSlide style={{ width: "auto" }} key={index}>
            <Link key={index} href={item.url}>
              <button
                className={` select-none whitespace-nowrap  w-auto text-sm md:text-md rounded-tl-lg rounded-br-lg  text-center hover:cursor-pointer  px-4 py-[6px] font-bold ${
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BottomHeader;
