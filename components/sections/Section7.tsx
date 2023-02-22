import router from "next/router";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface Section7 {
  status: string;
  data: [];
}

const Section7: FC<Section7> = ({ status, data }) => {
  return (
    <div className="mt-5">
      <div className="bg-white rounded-md mt-5 dark:bg-gray-800 ">
        <div className="p-2 font-bold">Giao hàng thành công</div>
        <table className="table-auto w-full text-sm text-center text-gray-500 dark:text-gray-400 mb-2 border-y-[1px] border-orange-400">
          <thead className="text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th className="py-2 px-6"></th>
              <th className="py-2 px-6">Sản phẩm</th>
              <th className="py-2 px-6">Đơn giá</th>
              <th className="py-2 px-6">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="py-2 px-6 flex items-center ">
                <LazyLoadImage
                  src={"../../images/2.jpg"}
                  className="m-auto w-[50px] h-[50px] sm:block hidden"
                />
              </td>
              <td className="break-words max-w-[200px] py-2 px-6">Bộ trang sức kim cương</td>
              <td className="py-2 px-6">100.000 đ</td>
              <td className="py-2 px-6">2</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="py-2 px-6">
                <LazyLoadImage
                  src={"../../images/2.jpg"}
                  className="m-auto w-[50px] h-[50px] sm:block hidden"
                />
              </td>
              <td className="break-words max-w-[200px] py-2 px-6">Bộ trang sức kim cương</td>
              <td className="py-2 px-6">100.000 đ</td>
              <td className="py-2 px-6">2</td>
            </tr>
          </tbody>
        </table>
        <div className="text-right overflow-auto mr-5">
          <div className="font-bold text-base py-1">Tổng tiền: 400.000 đ</div>
          <div className="flex float-right mb-5">
            <button className="text-white bg-primary px-4 py-1 inline rounded-lg">
              Mua lại
            </button>
            <button
              className="bg-gray-200 text-primary px-4 py-1 inline rounded-lg ml-3"
              onClick={() => router.push(`/history/detail/slug`)}
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md mt-5 dark:bg-gray-800">
        <div className="p-2 font-bold">Giao hàng thành công</div>
        <table className="table-auto w-full text-sm text-center text-gray-500 dark:text-gray-400 mb-2 border-y-[1px] border-orange-400">
          <thead className="text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th className="py-2 px-6"></th>
              <th className="py-2 px-6">Sản phẩm</th>
              <th className="py-2 px-6">Đơn giá</th>
              <th className="py-2 px-6">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800 ">
              <td className="py-2 px-6">
                <LazyLoadImage
                  src={"../../images/2.jpg"}
                  className="m-auto w-[50px] h-[50px] sm:block hidden"
                />
              </td>
              <td className="break-words max-w-[200px] py-2 px-6">Bộ trang sức kim cương</td>
              <td className="py-2 px-6">100.000 đ</td>
              <td className="py-2 px-6">2</td>
            </tr>
          </tbody>
        </table>
        <div className="text-right overflow-auto mr-5">
          <div className="font-bold text-base py-1">Tổng tiền: 400.000 đ</div>
          <div className="flex float-right mb-5">
            <button className="text-white bg-primary px-4 py-1 inline rounded-lg">
              Mua lại
            </button>
            <button
              className="bg-gray-200 text-primary px-4 py-1 inline rounded-lg ml-3"
              onClick={() => router.push(`/history/detail/slug`)}
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section7;
