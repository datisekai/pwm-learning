import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";

interface HomeCardProps{
data:string
}
const HomeCard:React.FC<HomeCardProps> = ({data}) => {
  return (
    <div>
      <div className="bg-gray-200 flex items-center justify-center aspect-[1/1] rounded-lg relative">
        <LazyLoadImage src={data} />
        <button className="absolute  bottom-4 hover:bg-primary hover:text-white transition-all bg-gray-300 px-4 py-2 rounded-tl-lg rounded-br-lg mt-2">Xem chi tiết</button>

      </div>
      <div className="mt-2 text-center">
        <h3 className="font-bold text-primary">Kim cương viên</h3>
        <p className="font-bold">{formatPrices(11000000)}</p>
      </div>
    </div>
  );
};

export default HomeCard;
