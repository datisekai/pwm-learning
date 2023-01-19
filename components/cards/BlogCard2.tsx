import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BlogModelCb } from "../../models/CategoryBlog.model";
import { getImageServer } from "../../utils";

interface BlogProps {
  data: BlogModelCb;
}

const BlogCard2: React.FC<BlogProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row mt-2 first:mt-0 pb-2 last:border-none border-b">
      <LazyLoadImage
        src={getImageServer(data?.thumbnail)}
        className="aspect-[16/9] w-full md:w-[150px] rounded-sm object-cover"
      />
      <div className="md:ml-2 mt-2 md:mt-0">
        <Link href={`/blog/${router.query.category}/${data.slug}`}>
          <h2 className="line-clamp-2 md:line-clamp-3 hover:underline cursor-pointer transition-all">
            {data.name}
          </h2>
        </Link>
        <p> {dayjs(data.createdAt).format("DD/MM/YYYY")}</p>
      </div>
    </div>
  );
};

export default BlogCard2;
