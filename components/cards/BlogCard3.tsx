import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BlogModelCb } from "../../models/CategoryBlog.model";
import { getImageServer } from "../../utils";

interface BlogCard3Props {
  width?: string;
  isDesc?: boolean;
  aspect?: string;
  data: BlogModelCb;
}

const BlogCard3: FC<BlogCard3Props> = ({
  isDesc = true,
  width = "100%",
  aspect = "1/1",
  data,
}) => {
  const router = useRouter();
  return (
    <div className="mt-2 first:mt-0">
      <LazyLoadImage
        src={getImageServer(data.thumbnail)}
        className=" rounded-sm object-fill"
        style={{ width, aspectRatio: aspect }}
      />
      <Link href={`/blog/${router.query.category}/${data.slug}`}>
        <h1 className="mt-2 line-clamp-2 md:line-clamp-3 text-md  md:text-lg hover:underline cursor-pointer transition-all ">
          {data.name}
        </h1>
      </Link>
      {isDesc && (
        <p className="mt-2 line-clamp-1 md:line-clamp-2 text-sm md:text-md text-gray-800">
          {data.description}
        </p>
      )}
    </div>
  );
};

export default BlogCard3;
