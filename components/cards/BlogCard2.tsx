import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BlogCard2 = () => {
  return (
    <div className="flex flex-col md:flex-row mt-2 first:mt-0 pb-2 last:border-none border-b">
      <LazyLoadImage
        src="/images/test.jpg"
        className="aspect-[16/9] w-full md:w-[150px] rounded-sm object-cover"
      />
      <div className="md:ml-2 mt-2 md:mt-0">
        <Link href="/blog/tin-tuc/nhan-kim-cuong">
          <h2 className="line-clamp-2 md:line-clamp-3 hover:underline cursor-pointer transition-all">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            eaque eligendi, laudantium minus suscipit reiciendis aut porro eos
            voluptatum commodi at quae qui autem odio, facilis quaerat alias
            ullam ratione?
          </h2>
        </Link>
        <p>25/12/2022</p>
      </div>
    </div>
  );
};

export default BlogCard2;
