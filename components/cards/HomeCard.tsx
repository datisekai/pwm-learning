import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";
import { AiFillPlusCircle } from "react-icons/ai";
import Link from "next/link";

interface HomeCardProps {
  data: string;
}
const HomeCard: React.FC<HomeCardProps> = ({ data }) => {
  return (
    <Link href={"/product/kim-cuong-vien"}>
      <div>
        <div className="bg-gray-200 flex items-center justify-center aspect-[1/1]  relative">
          <LazyLoadImage
            src={data}
            className="aspect-[1/1] rounded-sm w-full object-cover"
          />
          <button className="absolute text-sm md:text-md  bottom-0 w-full bg-[rgba(0,0,0,0.6)] text-white hover:bg-primary hover:text-white transition-all  px-4 py-2  mt-2">
            Xem chi tiết
          </button>
        </div>
        <div className="mt-2 text-center">
          <h3 className="font-bold text-sm md:text-md">Kim cương viên</h3>
          <p className="font-bold text-sm md:text-md text-primary">
            {formatPrices(11000000)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
