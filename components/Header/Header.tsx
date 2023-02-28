import { deleteCookie } from "cookies-next";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { BsCart2, BsSearch } from "react-icons/bs";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { generateAvatar, getImageServer } from "../../utils";
import { AuthContext } from "../context";
import BottomHeader from "./BottomHeader";
interface HeaderProps {
  handleOpen: () => void;
  handleOpenSearch: () => void;
}

const Header: FC<HeaderProps> = ({ handleOpen, handleOpenSearch }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const { infos, user, setUser }: any = React.useContext(AuthContext);

  const handleLogout = () => {
    setUser(undefined);
    deleteCookie("token");
    deleteCookie("detailActions");
    router.reload();
  };

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
          className="w-6 h-6 "
          role={"button"}
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (router && router.query && router.query.name) {
      setKeyword(router.query.name.toString());
    }
  }, [router]);

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      router.push(`/search?name=${encodeURI(keyword)}`);
    }
  };

  const logoRender = React.useMemo(() => {
    let logo = "/images/logo.jpg";
    if (infos) {
      const currentInfo = infos.find(
        (item: any) =>
          item.code.indexOf("logo") !== -1 && item.title === router.asPath
      );
      if (currentInfo) {
        logo = getImageServer(currentInfo.image);
      }
    }

    return logo;
  }, [router.asPath, infos]);

  return (
    <>
      <div className="relative top-0 right-0 left-0 z-[100]">
        <div className="bg-grey">
          <div className="max-w-[1200px] mx-auto py-2 md:py-4 w-[calc(100%-16px)] flex items-center justify-between">
            <BiMenuAltLeft
              onClick={handleOpen}
              fontSize={30}
              className="block md:hidden dark:text-black"
            />

            <div className="flex-1 md:flex-none flex justify-center">
              <Link href={"/"}>
                {" "}
                <div className="w-[150px] h-[50px]">
                  <LazyLoadImage
                    effect="blur"
                    alt="PWM Logo"
                    src={logoRender}
                    className=" w-[150px] h-[50px] rounded-tl-md rounded-br-md "
                  />
                </div>
              </Link>
            </div>
            <div className="md:flex items-center hidden">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="bg-white px-4 py-2 w-[350px] outline-none rounded-tl-lg dark:text-black"
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

            <div className="flex items-center">
              <div className="hidden lg:flex items-center">
                <Image
                  alt="Icon"
                  width={37}
                  height={36}
                  src="/images/supporticon.png"
                />
                <span className="ml-2 hover:text-primary dark:text-black transition-all hover:cursor-pointer text-md font-extralight">
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
                <span className="ml-2 hover:text-primary dark:text-black transition-all hover:cursor-pointer text-md font-extralight">
                  Hệ thống cửa hàng
                </span>
              </div>
            </div>
            {/* <div className="hidden text-primary hover:bg-primaryHover transition-all hover:cursor-pointer  h-[40px] w-[40px] md:flex items-center justify-center rounded-full">
              {renderThemeChanger()}
            </div> */}
            <div className="flex ml-2  md:hidden w-[30px] h-[30px]  items-center justify-center">
              <BsSearch
                onClick={handleOpenSearch}
                fontSize={20}
                className=" dark:text-black"
              />
            </div>
            <div className="flex  items-center space-x-3">
              <div
                onClick={() => router.push("/cart")}
                className="hidden md:block relative cursor-pointer"
              >
                <BsCart2 className="text-[24px]" />
                <div className="absolute top-[-4px] text-xs w-[16px] h-[16px] text-center inline bg-primary text-white rounded-full right-[-8px]">
                  1
                </div>
              </div>
              {user ? (
                <div className="user relative hidden md:block">
                  <LazyLoadImage
                    src={generateAvatar(user && (user?.name || user?.email))}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <ul className="menu-user hidden transition-all shadow-md rounded-md py-2 absolute mt-2 bg-white right-0">
                   {user?.detailActions?.length > 0 &&  <li
                      onClick={() => router.push("/admin")}
                      className="px-4 whitespace-nowrap hover:text-primary transition-all cursor-pointer border-b-2 last:border-none py-1"
                    >
                      Dashboard
                    </li>}
                    <li
                      onClick={() => router.push("/profile")}
                      className="px-4 whitespace-nowrap hover:text-primary transition-all cursor-pointer border-b-2 last:border-none py-1"
                    >
                      Thông tin cá nhân
                    </li>
                    <li
                      onClick={() => router.push("/history")}
                      className="px-4 whitespace-nowrap hover:text-primary transition-all cursor-pointer border-b-2 last:border-none py-1"
                    >
                      Lịch sử đơn hàng
                    </li>

                    <li
                      onClick={handleLogout}
                      className="px-4 whitespace-nowrap hover:text-primary transition-all cursor-pointer border-b-2 last:border-none py-1"
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href={"/login"}>
                  <button className="hidden md:flex px-4 py-2 rounded-tl-md rounded-br-md hover:bg-primaryHover cursor-pointer bg-primary text-white">
                    Đăng nhập
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
        }}
        className="w-full sticky top-[0] right-0 z-[50] left-0 bg-green-600 py-2"
      >
        <BottomHeader />
      </div>
    </>
  );
};

export default Header;
