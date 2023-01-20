import React, { FC, useContext } from "react";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsPeople } from "react-icons/bs";
import { TbDiamond } from "react-icons/tb";
import { BiNews } from "react-icons/bi";
import { VscTools } from "react-icons/vsc";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "./context";



interface SidebarAdminProps {
  show: boolean;
  handleClose: () => void;
}

const SidebarAdmin: FC<SidebarAdminProps> = ({ handleClose, show }) => {
  const router = useRouter();

  const {user} = useContext(AuthContext)

  console.log(user)


  const data = [
    {
      url: "/admin",
      title: "Trang chủ",
      icon: AiOutlineHome,
    },
    {
      url: "/admin/user",
      title: "Người dùng",
      icon: BsPeople,
      isHide: !user?.detailActions.includes('user:view')
    },
    {
      url: "/admin/product",
      title: "Sản phẩm",
      icon: TbDiamond,
      isHide: !user?.detailActions.includes('product:view')
    },
    {
      url: "/admin/blog",
      title: "Bài đăng",
      icon: BiNews,
      isHide: !user?.detailActions.includes('blog:view')
    },
    {
      url: "/admin/info",
      title: "Giới thiệu",
      icon: AiOutlineInfoCircle,
    },
    {
      url: "/admin/permission",
      title: "Phân quyền",
      icon: VscTools,
      isHide: !user?.detailActions.includes('permission:view')
    },
    
  ];

  return (
    <>
      {show && (
        <div
          className="md:hidden fixed inset-0 z-10 bg-[rgba(0,0,0,0.6)]"
          onClick={handleClose}
        ></div>
      )}

      <div
        className={`w-[200px] py-2  z-20 md:block bg-primary fixed top-0 left-0 bottom-0 md:relative transition-all ${
          !show && "hidden"
        }`}
      >
        <div className="bg-white rounded-sm px-2 flex items-center mx-4">
          <Link href={'/'}> <LazyLoadImage effect="blur" src="/images/logo.png" /></Link>
        </div>
        <div className="mt-10 px-2">
          {data.map((item, index) => {
            if(!item.isHide){
              const Icon = item.icon;
            return (
              <Link key={index} href={item.url}>
                <div
                  className={`flex items-center px-4 rounded-lg  py-3 mt-1 hover:bg-white hover:text-primary transition-all text-white ${item.url === '/admin' && router.asPath === '/admin' ? 'bg-white text-primary' : item.url !=='/admin' &&router.asPath.includes(item.url) && 'bg-white text-primary' }`}
                >
                  <Icon fontSize={22} />
                  <span className="ml-4 ">{item.title}</span>
                </div>
              </Link>
            );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
