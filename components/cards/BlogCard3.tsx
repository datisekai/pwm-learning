import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface BlogCard3Props {
  width?: string;
  isDesc?: boolean;
  aspect?: string;
}

const BlogCard3: FC<BlogCard3Props> = ({
  isDesc = true,
  width = "100%",
  aspect = "1/1",
}) => {
  return (
    <div className="mt-2 first:mt-0">
      <LazyLoadImage
        src="/images/test.jpg"
        className=" rounded-sm object-fill"
        style={{ width, aspectRatio: aspect }}
      />
      <h1 className="mt-2 line-clamp-2 md:line-clamp-3 text-md  md:text-lg hover:underline cursor-pointer transition-all ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sed
        necessitatibus. Reprehenderit aut sunt, quisquam cum mollitia
        consectetur tempore? A eligendi tenetur molestias inventore magnam
        eveniet cumque alias provident harum.
      </h1>
      {isDesc && (
        <p className="mt-2 line-clamp-1 md:line-clamp-2 text-sm md:text-md text-gray-800">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit in,
          quia architecto quasi perferendis iusto consectetur totam maxime eum
          sequi fuga praesentium earum provident! Accusantium ipsa maiores harum
          consequuntur nemo.
        </p>
      )}
    </div>
  );
};

export default BlogCard3;
