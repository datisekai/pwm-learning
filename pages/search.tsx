import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { BsSortDown } from "react-icons/bs";
import Breadcumb from "../components/Breadcumb";
import HomeCard from "../components/cards/HomeCard";
import MainLayout from "../components/layouts/MainLayout";
import Meta from "../components/Meta";
import { Pagination } from "../components/Pagination";
import ToolSearch from "../components/ToolSearch";

interface SearchProps {
  query: any;
}

const Search: NextPage<SearchProps> = ({ query }) => {
  const { keyword } = query;
  return (
    <>
      <Meta
        title="Tìm kiếm | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />

      <MainLayout>
        <div className="max-w-[1200px] mx-auto pt-4 pb-10 px-2">
          <Breadcumb current={keyword ? `Tìm kiếm "${keyword}"` : "Tìm kiếm"} />
          <div className="flex mt-5">
            <div className="hidden md:block">
              <ToolSearch />
            </div>
            <div className="flex-1 md:ml-5">
              <div
                className="flex items-center justify-between py-2 px-4"
                style={{
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                }}
              >
                <h1 className="uppercase font-bold">Kim cương</h1>
                <div className="flex">
                  <div className="flex items-center text-[#666]">
                    <BsSortDown />
                    <span className="ml-1">Sắp xếp: </span>
                  </div>
                  <select name="" id="" className="outline-none">
                    <option value="">Mặc định</option>
                    <option value="">Giá thấp</option>
                    <option value="">Giá cao</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <HomeCard key={item} data="/images/test.jpg" />
                ))}
              </div>
              <div className="flex w-full justify-end mt-5">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { query },
  };
};
