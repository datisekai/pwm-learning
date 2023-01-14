import React from "react";
import Breadcumb from "../../../components/Breadcumb";
import BlogCard from "../../../components/cards/BlogCard";
import BlogCard2 from "../../../components/cards/BlogCard2";
import BlogCard3 from "../../../components/cards/BlogCard3";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";


const Blog = () => {
  return (
    <>
      <Meta
        title="Blog - PWM"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description="Tin tức PWM"
      />
      <MainLayout>
        <div className="max-w-[1200px] py-4 mx-auto px-2">
          <Breadcumb current="Tin tức" />
          <div className="flex items-center flex-col md:flex-row mt-4">
            <div className="flex-1">
              <BlogCard />
            </div>
            <div className="flex-1 mt-2 md:mt-0 grid grid-cols-2 gap-2 md:ml-2">
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-4 justify-between bg-primary p-2">
            <div className="w-full md:w-[30%]">
                <BlogCard2/>
                <BlogCard2/>
                <BlogCard2/>
                <BlogCard2/>
                <BlogCard2/>
                <BlogCard2/>
            </div>
            <div className="w-full mb-2 md:w-[40%] md:ml-2">
                <BlogCard3/>
            </div>
            <div className="w-full md:w-[30%] md:ml-2">
                <BlogCard3 aspect="16/9" isDesc={false}/>
                <BlogCard3 aspect="16/9" isDesc={false}/>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Blog;
