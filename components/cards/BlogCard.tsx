import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BlogModel } from "../../models/Blog.model";
import dayjs from "dayjs";
import { BlogModelCb } from "../../models/CategoryBlog.model";
import { getImageServer } from "../../utils";
import { useRouter } from "next/router";
interface BlogProps {
  data: BlogModelCb;
}

const BlogCard: React.FC<BlogProps> = ({ data }) => {
  const router = useRouter()
  return (
    <div
    onClick={() => router.push(`/blog/read/${data.slug}`)}
      className="relative border rounded-sm"
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <LazyLoadImage
        src={getImageServer(data.thumbnail)}
        className=" w-full aspect-[1/1] rounded-lg object-fill"
      />

      <div className="absolute bottom-0  py-2 left-0 right-0 bg-[rgba(0,0,0,0.6)] px-2">
        <h2 className=" line-clamp-2 md:line-clamp-3 text-md md:text-lg hover:text-primary cursor-pointer hover:underline transition-all text-white ">
          {data.name}
        </h2>
        <p className="text-white text-sm md:text-md mt-1">
          {dayjs(data.createdAt).format("DD/MM/YYYY")}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
