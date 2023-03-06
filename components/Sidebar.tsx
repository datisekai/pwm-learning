import React, { FC } from "react";
import { BiLogIn, BiLogOutCircle } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaUserEdit } from "react-icons/fa";
import { MdContactSupport, MdProductionQuantityLimits } from "react-icons/md";
import {
  AiFillDashboard,
  AiOutlineInfoCircle,
  AiTwotoneShop,
} from "react-icons/ai";
import {
  BsCart2,
  BsCartDash,
  BsFillMoonStarsFill,
  BsFillSunFill,
} from "react-icons/bs";
import Switch from "react-switch";
import Link from "next/link";
import { useTheme } from "next-themes";
import { GiNotebook } from "react-icons/gi";
import { useRouter } from "next/router";
import { AuthContext } from "./context";
import { generateAvatar } from "../utils";
import { deleteCookie } from "cookies-next";

interface SidebarProps {
  open: boolean;
  handleHide: () => void;
}

const tools = [
  {
    url: "/",
    title: "Đăng nhập",
    icon: BiLogIn,
  },
];

const Sidebar: FC<SidebarProps> = ({ handleHide, open }) => {
  const [isDark, setIsDark] = React.useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const router = useRouter();

  const changeTheme = () => {
    if (currentTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  React.useEffect(() => {
    if (theme) {
      setIsDark(theme === "dark");
    }
  }, [theme]);

  const { user, setUser } = React.useContext(AuthContext);

  const handleLogout = () => {
    setUser(undefined);
    deleteCookie("token");
    deleteCookie("detailActions");
    router.reload();
  };

  const data = [
    {
      url: "/cart",
      title: "Giỏ hàng",
      icon: BsCart2,
      hide: !user,
    },
    {
      url: "/history",
      title: "Lịch sử đơn hàng",
      icon: GiNotebook,
      hide: !user,
    },
    {
      url: "/",
      title: "Hỗ trợ",
      icon: MdContactSupport,
    },
    {
      url: "/",
      title: "Hệ thống cửa hàng",
      icon: AiTwotoneShop,
    },
  ];

  return (
    <div>
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] opacityAnimation z-[120] ${
          open ? "block" : "hidden"
        }`}
        onClick={handleHide}
      ></div>
      <div
        className={`w-[240px] bg-white fixed transition-transform left-0 translate-x-[0] top-0 bottom-0 z-[200] ${
          open ? "translate-x-0" : " translate-x-[-100%]"
        }`}
      >
        <Link href={"/"}>
          <div className="py-6 border-b-2">
            <LazyLoadImage
              effect="blur"
              src="/images/PWM-Trangchu.jpg"
              className="mx-auto w-[200px] rounded-tl-lg rounded-br-lg"
            />
          </div>
        </Link>

        {user && (
          <div className="px-4 border-b-2 py-2">
            <div className="flex items-center py-3">
              <LazyLoadImage
                className="w-[40px] aspect-[1/1] rounded-full"
                src={generateAvatar(user?.name || user?.email.split("@")[0])}
              />
              <span className="ml-2 dark:text-black">
                {user?.name || user.email.split("@")[0]}
              </span>
            </div>
            {user?.detailActions.length > 0 && (
              <div
                onClick={() => router.push("/admin")}
                className="flex items-center py-3"
              >
                <AiFillDashboard fontSize={24} className="text-primary" />
                <span className="ml-2 dark:text-black">Dashboard</span>
              </div>
            )}
            <div
              onClick={() => router.push("/profile")}
              className="flex items-center py-3"
            >
              <AiOutlineInfoCircle fontSize={24} className="text-primary" />
              <span className="ml-2 dark:text-black">Thông tin cá nhân</span>
            </div>
            <div onClick={handleLogout} className="flex items-center py-3">
              <BiLogOutCircle fontSize={24} className="text-primary" />
              <span className="ml-2 dark:text-black">Đăng xuất</span>
            </div>
          </div>
        )}

        <div className="px-4 border-b-2 py-2">
          {data.map((item, index) => {
            if (!item.hide) {
              const Icon = item.icon;
              return (
                <div
                  onClick={() => router.push(item.url)}
                  key={index}
                  className="flex items-center py-3"
                >
                  <Icon fontSize={24} className="text-primary" />
                  <span className="ml-2 dark:text-black">{item.title}</span>
                </div>
              );
            }
          })}
        </div>

        {!user && (
          <div className="px-4 border-b-2 py-2">
            <div
              onClick={() => router.push("/login")}
              className="flex items-center py-3"
            >
              <BiLogIn fontSize={24} className="text-primary" />
              <span className="ml-2 dark:text-black">Đăng nhập</span>
            </div>
          </div>
        )}

        <div className="flex items-center py-4 px-4">
          <div>
            <Switch
              checked={isDark}
              onChange={() => {
                changeTheme();
                setIsDark(!isDark);
              }}
              onColor="#EA8143"
              uncheckedIcon={
                <div className="flex items-center justify-center h-full">
                  <BsFillMoonStarsFill className="text-white" />
                </div>
              }
              checkedIcon={
                <div className="flex items-center justify-center h-full">
                  <BsFillSunFill className="text-white" />
                </div>
              }
            />{" "}
          </div>
          <span className="ml-2">Giao diện</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
