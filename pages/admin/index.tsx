import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { TbDiamond } from "react-icons/tb";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StatisticAction from "../../actions/Statistic.action";
import AdminLayout from "../../components/layouts/AdminLayout";
import Meta from "../../components/Meta";
import { formatNumber, getImageServer } from "../../utils";

const HomeAdmin = () => {
  const { data: count, isLoading: isLoadingCount } = useQuery(
    ["count"],
    StatisticAction.count
  );
  const { data: latest, isLoading: isLoadingLatest } = useQuery(
    ["latest"],
    StatisticAction.latest
  );

  const dataSection1 = React.useMemo(() => {
    return count
      ? [
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
        ]
      : [];
  }, [count]);

  return (
    <>
      <Meta image="/images/logo.jpg" title="Trang chủ | Admin" description="" />
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
                  className="flex items-center justify-between p-4 rounded-3xl dark:bg-neutral-200"
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
            <div className="dark:bg-neutral-200 w-full md:w-[60%] p-4 rounded-3xl shadow-master">
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
                  <div className="w-[150px] dark:text-black">Tên sản phẩm</div>
                  <div className="w-[100px] dark:text-black">Danh mục</div>
                  <div className="w-[80px] dark:text-black">Ngày đăng</div>
                  <div className="w-[80px] dark:text-black">Trạng thái</div>
                </div>
              </div>
              {latest?.product?.map((item:any) => (
                <div key={item.id} className="mt-2">
                  <div className=" flex justify-between overflow-x-scroll table-home text-sm">
                    <div className="w-[150px] line-clamp-2 dark:text-black">
                      {item.name}
                    </div>
                    <div className="w-[100px] dark:text-black">
                      {item.category.name}
                    </div>
                    <div className="w-[80px] dark:text-black">
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
            <div className="dark:bg-neutral-200 flex-1 md:ml-4 rounded-3xl p-4 mt-4 md:mt-0 shadow-master">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-primary text-lg">Bài đăng</h1>
                <Link href={"/admin/blog"}>
                  <button className="text-white px-2 py-1 rounded-md hover:bg-primaryHover transition-all bg-primary">
                    Xem tất cả
                  </button>
                </Link>
              </div>
              <div className="mt-4 space-y-2">
                {latest?.blog?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center mt-2 first:mt-0"
                  >
                    <div className="w-[50px] h-[50px]">
                      <LazyLoadImage
                        effect="blur"
                        src={getImageServer(item.thumbnail)}
                        className="w-full h-[50px] rounded-sm"
                      />
                    </div>
                    <span className="ml-2 flex-1 line-clamp-2 font-bold text-sm dark:text-black">
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

  if (token) {
    return {
      props: {},
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
