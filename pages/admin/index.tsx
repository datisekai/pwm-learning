import { GetServerSideProps } from "next";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { TbDiamond } from "react-icons/tb";
import AdminLayout from "../../components/layouts/AdminLayout";
import { GrUserManager } from "react-icons/gr";
import { formatNumber, formatPrices } from "../../utils";
import { BsPeople } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";

const dataSection1 = [
  {
    value: 7112,
    title: "Lượt xem",
    icon: AiOutlineEye,
  },
  {
    value: 50,
    title: "Sản phẩm",
    icon: TbDiamond,
  },
  {
    value: 12,
    title: "Bài đăng",
    icon: BiNews,
  },
  {
    value: 4,
    title: "Người dùng",
    icon: BsPeople,
  },
];

const HomeAdmin = () => {
  return (
    <>
      <AdminLayout>
        <>
          <div className="grid mt-5 grid-cols-2 md:grid-cols-4 gap-4">
            {dataSection1.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                key={index}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                  className="flex items-center justify-between p-4 rounded-3xl"
                >
                  <div>
                    <p className="text-primary text-xl font-bold">
                      {formatNumber(item.value)}
                    </p>
                    <p className="text-[#666]">{item.title}</p>
                  </div>
                  <Icon fontSize={30} className="text-primary" />
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col md:flex-row">
            <div
              className="w-full md:w-[60%] p-4 rounded-3xl"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-primary text-lg">
                  Sản phẩm gần đây
                </h1>
                <Link href="/admin/product">
                  <button className="text-white px-2 py-1 rounded-md hover:bg-primaryHover transition-all bg-primary">
                    Xem tất cả
                  </button>
                </Link>
              </div>
              <div className="mt-4">
                <div className="font-bold flex justify-between overflow-x-scroll table-home text-sm">
                  <div className="w-[150px]">Tên sản phẩm</div>
                  <div className="w-[100px]">Loại</div>
                  <div className="w-[80px]">Giá</div>
                  <div className="w-[80px]">Trạng thái</div>
                </div>
              </div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="mt-2">
                  <div className=" flex justify-between overflow-x-scroll table-home text-sm">
                    <div className="w-[150px] line-clamp-2">
                      Nhẫn kim cương {item}
                    </div>
                    <div className="w-[100px]">Màu Đỏ, Size L</div>
                    <div className="w-[80px]">{formatPrices(20000000)}</div>
                    <div className="w-[80px] bg-green-500 px-1 rounded-md text-white text-center">
                      Hoạt động
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex-1 md:ml-4 rounded-3xl p-4 mt-4 md:mt-0"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-primary text-lg">Bài đăng</h1>
                <Link href={"/admin/blog"}>
                  <button className="text-white px-2 py-1 rounded-md hover:bg-primaryHover transition-all bg-primary">
                    Xem tất cả
                  </button>
                </Link>
              </div>
              <div className="mt-4">
                {[11, 12, 13, 14].map((item) => (
                  <div key={item} className="flex items-center mt-2 first:mt-0">
                    <LazyLoadImage
                      effect="blur"
                      src="/images/test.jpg"
                      className="w-[70px]"
                    />
                    <span className="ml-2 line-clamp-2 font-bold text-sm">
                      Trao gửi yêu thương - Time for gifts ♥️ Ưu đãi ngay 15%
                      cho trang sức kim cương
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      </AdminLayout>
    </>
  );
};

export default HomeAdmin;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const token = req.cookies["token"];

  // if (token) {
  //   return {
  //     props: {},
  //   };
  // }

  // return {
  //   props: {},
  //   redirect: {
  //     destination: "/admin/login",
  //     permanent: false,
  //   },
  // };
  return {
    props: {},
  };
};
