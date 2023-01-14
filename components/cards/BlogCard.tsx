import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BlogCard = () => {
  return (
    <div className="relative border rounded-sm" style={{
        boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px'
    }}>
      <LazyLoadImage
        src="/images/test.jpg"
        className=" w-full aspect-[1/1] rounded-lg object-fill"
      />
      <div className="absolute bottom-0  py-2 left-0 right-0 bg-[rgba(0,0,0,0.6)] px-2">
        <Link href={'/blog/tin-tuc/nhan-kim-cuong'}>
        <h2 className=" line-clamp-2 md:line-clamp-3 text-md md:text-lg hover:text-primary cursor-pointer hover:underline transition-all text-white ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum nostrum
          cum blanditiis culpa provident obcaecati cumque modi dolores
          perspiciatis. Dolorum rem reiciendis, aspernatur placeat ipsa tempore
          veniam voluptatum magni quod?
        </h2>
        </Link>
        <p className="text-white text-sm md:text-md mt-1">25/12/2022</p>
      </div>
    </div>
  );
};

export default BlogCard;
