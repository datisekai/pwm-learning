import React, { FC } from "react";
import { BiLogIn } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaUserEdit } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { AiTwotoneShop } from "react-icons/ai";
import { BsCartDash, BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import Switch from "react-switch";

interface SidebarProps {
  open: boolean;
  handleHide: () => void;
}

const data = [
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
  {
    url: "/",
    title: "Giỏ hàng",
    icon: BsCartDash,
  },
];

const tools = [
  {
    url: "/",
    title: "Đăng nhập",
    icon: BiLogIn,
  },
];

const Sidebar: FC<SidebarProps> = ({ handleHide, open }) => {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <div className={`${open ? "block" : "hidden"} transition-all`}>
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] opacityAnimation z-[120] ${
          open ? "block" : "hidden"
        }`}
        onClick={handleHide}
      ></div>
      <div
        className={`leftRightAnimation w-[240px] bg-white fixed left-0 top-0 bottom-0 z-[200] ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="py-6 border-b-2">
          <LazyLoadImage src="/images/logo.png" className="mx-auto" />
        </div>
        <div className="px-4 border-b-2 py-2">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center py-3">
                <Icon fontSize={24} />
                <span className="ml-2">{item.title}</span>
              </div>
            );
          })}
        </div>
        <div className="px-4 border-b-2 py-2">
          {tools.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center py-3">
                <Icon fontSize={24} />
                <span className="ml-2">{item.title}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center py-4 px-4">
          <div>
            <Switch
              checked={isDark}
              onChange={() => setIsDark(!isDark)}
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
