import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";

interface DetailHistoryProps {
  data: [];
}

const DetailHistory: NextPage<DetailHistoryProps> = ({ data }) => {
  return (
    <>
      <Meta
        title="Blog | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="mt-10 mx-10 ">
          <div className="flex">
            <h1 className="font-sans text-2xl text-orange-600 font-bold">
              Chi tiết đơn hàng #111111:
            </h1>
            <h3 className="font-sans text-2xl ml-5">Giao hàng thành công</h3>
          </div>
          <div className="grid grid-cols-2 gap-20 mt-5">
            <div className="font-bold">Địa chỉ người nhận</div>
            <div className="font-bold">Hình thức thanh toán</div>
          </div>
          <div className="grid grid-cols-2 gap-20 mt-5">
            <div className="rounded-md bg-gray-200 p-4 dark:text-black">
              <p className="font-bold">ABC</p>
              <p>Địa chỉ: ....</p>
              <p>Điện thoại:...</p>
            </div>
            <div className="rounded-md bg-gray-200 p-4 flex items-center justify-center dark:text-black">
              <LazyLoadImage
                src={"../../images/paycod.png"}
                className="w-[50px] h-[50px]"
              />
              Thanh toán tiền mặt khi nhận hàng
            </div>
          </div>
          <div className="mt-7 mx-2 bg-white rounded-3xl p-4 overflow-x-scroll shadow-master">
            <div className="relative">
              <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6"></th>
                    <th scope="col" className="py-3 px-6">
                      Sản phẩm
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Đơn giá
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Số lượng
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Thành tiền
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="py-4 px-6 break-words max-w-[300px]">
                      <LazyLoadImage
                        src={"../../images/2.jpg"}
                        className="m-auto w-[50px] h-[50px] sm:block hidden"
                      />
                    </td>
                    <td className="py-4 px-6 break-words max-w-[300px]">
                      Bộ trang sức kim cương
                    </td>
                    <td className="py-4 px-6">1.000.000 đ</td>
                    <td className="py-4 px-6">2</td>
                    <td className="py-4 px-6">1.900.000 đ</td>
                    <td>
                      <button className="text-white font-bold bg-primary px-4 py-1 inline rounded-lg">
                        Đánh giá
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="overflow-auto mb-10">
            <div className="float-right mt-10 grid grid-cols-2 gap-10 ">
              <label className="font-bold text-xl">Tổng cộng: </label>
              <p className="font-bold text-primary text-xl">100.000.000 đ</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default DetailHistory;
