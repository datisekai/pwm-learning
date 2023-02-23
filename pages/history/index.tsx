import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { LazyLoadImage } from "react-lazy-load-image-component";
const inter = Inter({ subsets: ["latin"] });
import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import Meta from "../../components/Meta";
import Section7 from "../../components/sections/Section7";
export default function Home() {
  const [openTab, setOpenTab] = React.useState(1);
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
            HISTORY ORDER
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
                    (openTab === 1
                      ? "text-white bg-green-600"
                      : "text-green-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Tất cả đơn
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-green-600"
                      : "text-green-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Đang xử lý
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center md:mt-0 mt-4">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-green-600"
                      : "text-green-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Đang vận chuyển
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center md:mt-0 mt-4">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 4
                      ? "text-white bg-green-600"
                      : "text-green-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#link4"
                  role="tablist"
                >
                  Đã giao
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center md:mt-0 mt-4">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 5
                      ? "text-white bg-green-600"
                      : "text-green-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(5);
                  }}
                  data-toggle="tab"
                  href="#link5"
                  role="tablist"
                >
                  Đã hủy
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    {/* TAB 1 */}
                    <Section7 status="all" data={[]} /> 
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                     {/* TAB 2 */}
                     <Section7 status="all" data={[]} /> 
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                     {/* TAB 3 */}
                     <Section7 status="all" data={[]} /> 
                  </div>
                  <div
                    className={openTab === 4 ? "block" : "hidden"}
                    id="link4"
                  >
                     {/* TAB 4 */}
                     <Section7 status="all" data={[]} /> 
                  </div>
                  <div
                    className={openTab === 5 ? "block" : "hidden"}
                    id="link5"
                  >
                     {/* TAB 5 */}
                     <Section7 status="all" data={[]} /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
