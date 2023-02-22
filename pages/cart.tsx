import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { LazyLoadImage } from "react-lazy-load-image-component";
const inter = Inter({ subsets: ["latin"] });
import { RiSubtractLine } from "react-icons/ri";
import { GrFormAdd } from "react-icons/gr";
import { BiTrash } from "react-icons/bi";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import MainLayout from "../components/layouts/MainLayout";
import Meta from "../components/Meta";
export default function Home() {
  return (
    <>
      <Meta
        title="Giỏ hàng | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="px-2 py-4 lg:p-10 rounded-md bg-gray-200 m-10 lg:flex block">
          <div className="lg:w-8/12 xl:w-7/12 w-full">
            <h1 className="font-sans text-2xl text-orange-600 font-bold text-center">
              YOUR CART
            </h1>
            <div className="bg-white rounded-md mt-5">
              <div className="grid grid-flow-col items-center px-3 py-10 gap-4">
                <div className="flex">
                  <LazyLoadImage
                    src={"../../images/2.jpg"}
                    className="m-auto w-[50px] h-[50px]"
                  />
                </div>
                <div className="text-center font-bold text-base dark:text-black">
                  Bộ trang sức Kim Cương
                </div>
                <div className="items-center flex">
                  <RiSubtractLine className="text-[25px] m-auto mx-2 dark:text-black hover:cursor-pointer" />
                  <input
                    value={1}
                    className="w-10 h-10 text-center border-2 rounded-md border-black"
                  />
                  <GrFormAdd className="text-[25px] m-auto mx-2 hover:cursor-pointer" />
                </div>
                <div className="font-bold text-center p-4 text-base dark:text-black">
                  22.222.222 đ
                </div>
                <div>
                  <BiTrash className="text-[25px] m-auto dark:text-black hover:cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md mt-5">
            <div className="grid grid-flow-col items-center px-3 py-10 gap-4">
                <div className="flex">
                  <LazyLoadImage
                    src={"../../images/2.jpg"}
                    className="m-auto w-[50px] h-[50px]"
                  />
                </div>
                <div className="text-center font-bold text-base dark:text-black">
                  Bộ trang sức Kim Cương
                </div>
                <div className="items-center flex">
                  <RiSubtractLine className="text-[25px] m-auto mx-2 dark:text-black hover:cursor-pointer" />
                  <input
                    value={1}
                    className="w-10 h-10 text-center border-2 rounded-md border-black"
                  />
                  <GrFormAdd className="text-[25px] m-auto mx-2 hover:cursor-pointer" />
                </div>
                <div className="font-bold text-center p-4 text-base dark:text-black">
                  22.222.222 đ
                </div>
                <div>
                  <BiTrash className="text-[25px] m-auto dark:text-black hover:cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-4/12 xl:w-5/12 w-full rounded-md bg-orange-500 lg:ml-10 p-5 lg:mt-0 mt-5">
            <h1 className="font-sans text-2xl text-white font-bold text-center">
              PAYMENT
            </h1>
            <div className="mt-5">
              <label className="text-gray-100 font-bold">Payment method</label>
              <div className="grid grid-cols-3 gap-6 mt-3">
                <div className="rounded-md border-2 border-black p-2 shadow-2xl hover:cursor-pointer">
                  <LazyLoadImage
                    src={"../../images/paycod.png"}
                    className="m-auto w-[50px] h-[50px]"
                  />
                </div>
                <div className="rounded-md border-2 border-black p-2 shadow-2xl hover:cursor-pointer">
                  <LazyLoadImage
                    src={"../../images/paycard.png"}
                    className="m-auto w-[50px] h-[50px]"
                  />
                </div>
                <div className="rounded-md border-2 border-black p-2 shadow-2xl hover:cursor-pointer">
                  <LazyLoadImage
                    src={"../../images/momo.svg"}
                    className="m-auto w-[50px] h-[50px]"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-3">
                <label className="text-gray-100 font-bold">Họ tên</label>
                <input className="px-2 py-1 mt-2 w-full bg-orange-300 rounded" />
              </div>

              <div className="mt-3">
                <label className="text-gray-100 font-bold">Số điện thoại</label>
                <input className="px-2 py-1 mt-2 w-full bg-orange-300 rounded" />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-gray-100 font-bold">Địa chỉ</label>
              <input className="px-2 py-1 mt-2 w-full bg-orange-300 rounded" />
            </div>

            <div className="border-t-2 mt-7 border-orange-400">
              <div className="grid grid-cols-2 mt-3">
                <div className="text-gray-100 font-bold">Subtotal</div>
                <div className="text-right text-gray-100 font-bold">
                  $3.000.00
                </div>
              </div>
              <div className="grid grid-cols-2 mt-3">
                <div className="text-gray-100 font-bold">Shipping</div>
                <div className="text-right text-gray-100 font-bold">$20.00</div>
              </div>
              <div className="grid grid-cols-2 mt-3">
                <div className="text-gray-100 font-bold">Total</div>
                <div className="text-right text-gray-100 font-bold">
                  $3.820.00
                </div>
              </div>
            </div>
            <div className="rounded-md bg-green-600 py-2 px-3 mt-5 items-center text-[30px] flex hover:cursor-pointer">
              <div className="text-gray-100 font-bold w-3/4">$3.820.00</div>
              <div className="flex text-gray-100 font-bold items-center w-1/4">
                Pay <BsFillArrowRightSquareFill className="ml-3 text-[30px]" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
