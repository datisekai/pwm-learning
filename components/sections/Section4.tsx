import React, { FC } from "react";
import { ProductModel } from "../../models/Product.model";
import HomeCard from "../cards/HomeCard";

// const data = [
//   "/images/1.jpg",
//   "/images/2.jpg",
//   "/images/3.jpg",
//   "/images/4.jpg",
// ];

interface Section4 {
  title: string;
  data: ProductModel[];
}

const Section4: FC<Section4> = ({ title, data }) => {
  return (
    <div className="mt-10">
      <h2 className="inline font-bold text-lg md:text-xl border-line">
        {title}
      </h2>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-8">
        {data.map((item) => (
          <HomeCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Section4;
