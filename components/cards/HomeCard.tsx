import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";

const HomeCard = () => {
  return (
    <div>
      <div className="bg-gray-200 flex items-center justify-center aspect-[1/1] rounded-lg relative">
        <LazyLoadImage src="/images/product.png" />
        <button className="absolute  bottom-4 hover:bg-primary hover:text-white transition-all bg-gray-300 px-4 py-2 rounded-sm mt-2">Thêm vào giỏ hàng</button>

      </div>
      <div className="mt-2 text-center">
        <h3 className="font-bold text-primary">Kim cương viên</h3>
        <p className="font-bold">{formatPrices(11000000)}</p>
      </div>
    </div>
  );
};

export default HomeCard;
