import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { TbDiamond } from "react-icons/tb";
import AdminLayout from "../../components/layouts/AdminLayout";
import { GrUserManager } from "react-icons/gr";
import { formatNumber, formatPrices, getImageServer } from "../../utils";
import { BsPeople } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { getCookie } from "cookies-next";
import StatisticAction from "../../actions/Statistic.action";
import { StatisticCount, StatisticLatest } from "../../models/Statistic.model";
import dayjs from "dayjs";
import Meta from "../../components/Meta";

interface HomeAdminProps {
  count: StatisticCount;
  latest: StatisticLatest;
}

const HomeAdmin: NextPage<HomeAdminProps> = ({ count, latest }) => {
  const dataSection1 = [
    {
      value: count.views,
      title: "Lượt xem",
      icon: AiOutlineEye,
    },
    {
      value: count.products,
      title: "Sản phẩm",
      icon: TbDiamond,
    },
    {
      value: count.blogs,
      title: "Bài đăng",
      icon: BiNews,
    },
    {
      value: count.users,
      title: "Người dùng",
      icon: BsPeople,
    },
  ];

  return (
    <>
      <Meta image="/images/logo.png" title="Trang chủ | Admin" description="" />
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
                  <div className="w-[100px]">Danh mục</div>
                  <div className="w-[80px]">Ngày đăng</div>
                  <div className="w-[80px]">Trạng thái</div>
                </div>
              </div>
              {latest?.product?.map((item) => (
                <div key={item.id} className="mt-2">
                  <div className=" flex justify-between overflow-x-scroll table-home text-sm">
                    <div className="w-[150px] line-clamp-2">{item.name}</div>
                    <div className="w-[100px]">{item.category.name}</div>
                    <div className="w-[80px]">
                      {dayjs(item.createdAt).format("DD/MM/YYYY")}
                    </div>
                    <div className="w-[80px] rounded-md text-white text-center">
                      <div className=" bg-green-500 px-1 rounded-md">
                        {item.status ? "Hoạt động" : "Đã xóa"}
                      </div>
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
                {latest.blog.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center mt-2 first:mt-0"
                  >
                    <LazyLoadImage
                      effect="blur"
                      src={getImageServer(item.thumbnail)}
                      className="w-[50px] h-[50px] rounded-sm"
                    />
                    <span className="ml-2 line-clamp-2 font-bold text-sm">
                      {item.name}
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
  const token = req.cookies["token"];
  const data = await Promise.all([
    StatisticAction.count(),
    StatisticAction.latest(),
  ]);

  if (token) {
    return {
      props: {
        count: data[0],
        latest: data[1],
      },
    };
  }

  return {
    props: {},
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
