import React, { FC, useState } from "react";
import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsSearch } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
interface HeaderProps {
  handleOpen: () => void;
  handleOpenSearch: () => void;
}

const Header: FC<HeaderProps> = ({ handleOpen, handleOpenSearch }) => {
  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <HiOutlineSun
          className="w-6 h-6"
          role={"button"}
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <HiOutlineMoon
        className="w-6 h-6"
          role={"button"}
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      router.push(`/search?keyword=${encodeURI(keyword)}`);
    }
  };

  return (
    <>
      <div
        className="relative top-0 right-0 left-0 z-[100]"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
        {/* <TopHeader /> */}
        <div className="bg-grey">
          <div className="max-w-[1200px]  mx-auto py-4 w-[calc(100%-16px)] flex items-center justify-between">
            <BiMenuAltLeft
              onClick={handleOpen}
              fontSize={30}
              className="block md:hidden"
            />

            <Link href={"/"}>
              <img
                alt="PWM Logo"
                src="/images/logo.png"
                className="w-[150px] md:w-auto"
              />
            </Link>
            <div className="md:flex items-center hidden">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="bg-white px-4 py-2 w-[350px] outline-none rounded-tl-lg"
                value={keyword}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div
                onClick={handleSearch}
                className="hover:bg-primaryHover transition-all hover:cursor-pointer bg-primary h-[40px] w-[40px] flex items-center justify-center rounded-br-lg"
              >
                <BsSearch fontSize={20} className="text-white" />
              </div>
            </div>
            <div  className="hover:bg-primaryHover transition-all hover:cursor-pointer bg-primary h-[40px] w-[40px] flex items-center justify-center rounded-br-lg">{/* UI */}
            {renderThemeChanger()}</div>
            <div className="flex items-center">
              <div className="hidden lg:flex items-center">
                <Image
                  alt="Icon"
                  width={37}
                  height={36}
                  src="/images/supporticon.png"
                />
                <span className="ml-2 hover:text-primary transition-all hover:cursor-pointer text-md font-extralight">
                  Hỗ trợ khách hàng
                </span>
              </div>
              <div className="hidden ml-4 lg:flex items-center">
                <Image
                  width={37}
                  height={36}
                  alt="Icon"
                  src="/images/system-ecommerce.png"
                />
                <span className="ml-2 hover:text-primary transition-all hover:cursor-pointer text-md font-extralight">
                  Hệ thống cửa hàng
                </span>
              </div>
            </div>
            {/* <div className=" items-center hidden md:flex">
              <button>Đăng nhập</button>
              <button className="px-4 ml-2 py-2 rounded-tl-lg rounded-br-lg hover:bg-primaryHover transition-all bg-primary text-white">
                Đăng ký
              </button>
              <Link href={"/cart"}>
                <div className="ml-2 relative cursor-pointer">
                  <Image
                    alt="Cart"
                    width={37}
                    height={36}
                    src="/images/cart.png"
                  />
                  <span className="absolute w-[20px] h-[20px] text-center flex items-center justify-center text-xs top-[-6px] right-[-8px] bg-primary text-white rounded-full">
                    1
                  </span>
                </div>
              </Link>
            </div> */}
            <BsSearch
              onClick={handleOpenSearch}
              fontSize={20}
              className="block md:hidden"
            />
          </div>
        </div>
      </div>
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
        }}
        className="w-full sticky top-[0] right-0 z-[110] left-0 bg-green-600 py-2"
      >
        <BottomHeader />
      </div>
    </>
  );
};

export default Header;
