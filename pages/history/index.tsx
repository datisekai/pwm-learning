import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { LazyLoadImage } from "react-lazy-load-image-component";
const inter = Inter({ subsets: ["latin"] });
import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import Meta from "../../components/Meta";
import Section7 from "../../components/sections/Section7";
import dataStatus from "../../components/data/status";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import OrderAction from "../../actions/Order.action";
export default function Home() {
  const router = useRouter();

  const { status = "" } = router.query;

  const {data, isLoading} = useQuery(['history-order', status], () => OrderAction.search(status.toString()))

  return (
    <>
      <Meta
        title="Giỏ hàng | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="flex flex-wrap m-5">
          <h1 className="font-sans text-2xl text-orange-600 font-bold">
            Lịch sử đơn hàng
          </h1>
          <div className="w-full mt-2">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (status === ""
                      ? "text-white bg-green-600"
                      : "text-green-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/history`);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Tất cả
                </a>
              </li>
              {dataStatus.map((item) => (
                <li key={item.value} className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (status != "" && +status == item.value
                        ? "text-white bg-green-600"
                        : "text-green-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/history?status=${item.value}`);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <Section7 data={data || []} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
