import React from "react";
import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsSearch } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";

const Header = () => {
  return (
    <div
      className="sticky top-0 right-0 left-0 z-[100]"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
      }}
    >
      <TopHeader />
      <div className="bg-grey">
        <div className="max-w-[1200px]  mx-auto py-4 w-[calc(100%-16px)] flex items-center justify-between">
          <BiMenuAltLeft fontSize={30} className="block md:hidden" />
          <LazyLoadImage
            src="/images/logo.png"
            className="w-[150px] md:w-auto"
          />
          <div className="md:flex items-center hidden">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="bg-white px-4 py-2 outline-none rounded-tl-lg"
            />
            <div className="hover:bg-primaryHover transition-all hover:cursor-pointer bg-primary h-[40px] w-[40px] flex items-center justify-center rounded-br-lg">
              <BsSearch fontSize={20} className="text-white" />
            </div>
          </div>
          <div className="hidden lg:flex items-center">
            <LazyLoadImage
              width={37}
              height={36}
              src="/images/supporticon.png"
            />
            <span className="ml-2 hover:text-primary transition-all hover:cursor-pointer text-md font-extralight">
              Hỗ trợ khách hàng
            </span>
          </div>
          <div className="hidden lg:flex items-center">
            <LazyLoadImage
              width={37}
              height={36}
              src="/images/system-ecommerce.png"
            />
            <span className="ml-2 hover:text-primary transition-all hover:cursor-pointer text-md font-extralight">
              Hệ thống cửa hàng
            </span>
          </div>
          <div className=" items-center hidden md:flex">
            <button>Đăng nhập</button>
            <button className="px-4 ml-2 py-2 rounded-tl-lg rounded-br-lg hover:bg-primaryHover transition-all bg-primary text-white">
              Đăng ký
            </button>
            <div className="ml-2 relative">
              <LazyLoadImage width={37} height={36} src="/images/cart.png" />
              <span className="absolute w-[20px] h-[20px] text-center flex items-center justify-center text-xs top-[-6px] right-[-8px] bg-primary text-white rounded-full">
                1
              </span>
            </div>
          </div>
          <BsSearch fontSize={20} className="block md:hidden" />
        </div>
      </div>
      <div className="w-full bg-white py-2">
        <BottomHeader />
      </div>
    </div>
  );
};

export default Header;
