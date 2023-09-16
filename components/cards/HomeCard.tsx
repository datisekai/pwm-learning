import React, { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices, getImageServer } from "../../utils";
import { AiFillPlusCircle } from "react-icons/ai";
import Link from "next/link";
import { ProductModel } from "../../models/Product.model";
import { da } from "suneditor/src/lang";

interface HomeCardProps {
  data: ProductModel;
}
const HomeCard: React.FC<HomeCardProps> = ({ data }) => {
  const minPrice = useMemo(() => {
    let min =
      data?.skus[0].price -
        (data.skus[0].price * data.skus[0].discount) / 100 || 0;
    data?.skus.forEach((item) => {
      if (item.price < min) {
        min = item.price - (item.price * item.discount) / 100;
      }
    });
    return min;
  }, [data]);

  const maxPrice = useMemo(() => {
    let max =
      data?.skus[0].price -
        (data.skus[0].price * data.skus[0].discount) / 100 || 0;
    data?.skus.forEach((item) => {
      if (item.price > max) {
        max = item.price - (item.price * item.discount) / 100;
      }
    });
    return max;
  }, [data]);

  return (
    <Link href={`/product/${data.slug}`}>
      <div className="w-full h-full pb-2 border shadow-custom-100">
        <div className="flex items-center justify-center w-full  relative">
          <LazyLoadImage
            effect="blur"
            src={getImageServer(data.thumbnail)}
            className=" rounded-sm w-full aspect-[1/1] object-cover"
          />
          <button className="absolute text-sm md:text-md  bottom-0 w-full bg-[rgba(0,0,0,0.6)] text-white hover:bg-primary hover:text-white transition-all  px-4 py-2  mt-2">
            Xem chi tiết
          </button>
        </div>
        <div className="mt-2 text-center">
          <h3 className="font-bold text-sm px-2 line-clamp-2 md:text-md">
            {data.name}
          </h3>
          <p className="font-bold text-sm md:text-md text-primary">
            {data.skus[0].priceDisplay !== null
              ? data.skus[0].priceDisplay
              : minPrice === maxPrice
              ? formatPrices(minPrice)
              : `${formatPrices(minPrice)} - ${formatPrices(maxPrice)}`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
