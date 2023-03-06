import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { OrderModel } from "../../../models/Order.model";
import { formatPrices, getImageServer } from "../../../utils";
import dataStatus from "../../data/status";

interface ModalViewDetailProps {
  open: boolean;
  handleClose: () => void;
  current: undefined | OrderModel;
}

const ModalViewDetail: React.FC<ModalViewDetailProps> = ({
  handleClose,
  open,
  current,
}) => {
  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] max-h-[500px] overflow-y-scroll md:w-[70%]  p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <div className=" md:mx-10 mx-0">
          <div className="flex">
            <h1 className="font-sans text-2xl text-orange-600 font-bold">
              Chi tiết đơn hàng #{current?.id}:
            </h1>
            <h3 className="font-sans text-2xl ml-5">
              {dataStatus.find((item) => item.value === current?.status)
                ?.text || ""}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:gap-20 gap-4 mt-5">
            <div className="font-bold">Địa chỉ người nhận</div>
            <div className="font-bold">Nhân viên xử lý</div>
          </div>
          <div className="grid grid-cols-2 md:gap-20 gap-4 mt-5">
            <div className="rounded-md bg-gray-200 p-4 dark:text-black">
              <p className="font-bold">{current?.infoorder.name}</p>
              <p>Địa chỉ: {current?.infoorder.address}</p>
              <p>Điện thoại: {current?.infoorder.phone}</p>
            </div>
            <div className="rounded-md bg-gray-200 p-4 dark:text-black">
              {!current?.staff ? (
                <p>Chưa có</p>
              ) : (
                <p>Email: {current?.staff?.email}</p>
              )}
            </div>
          </div>
          <div className="mt-5 mx-2 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
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
                  </tr>
                </thead>
                <tbody>
                  {current?.detailorders?.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-2 break-words max-w-[300px] min-w-[80px]">
                        <LazyLoadImage
                          src={
                            item.sku.image
                              ? getImageServer(
                                  item.sku.image.toString() != "null"
                                    ? item.sku.image
                                    : item.sku.product.thumbnail
                                )
                              : getImageServer(item.sku.product.thumbnail)
                          }
                          className="m-auto w-[50px] h-[50px]"
                        />
                      </td>
                      <td className="py-4 px-6 break-words max-w-[300px] min-w-[120px]">
                        {item.sku.product.name}
                      </td>
                      <td className="py-4 px-6">
                        {formatPrices(
                          item.price - (item.price * item.discount) / 100
                        )}
                      </td>
                      <td className="py-4 px-6">{item.qty}</td>
                      <td className="py-4 px-6">
                        {formatPrices(
                          (item.price - (item.price * item.discount) / 100) *
                            item.qty
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="overflow-auto mb-5">
            <div className="float-right mt-10 grid grid-cols-2 gap-10 ">
              <label className="font-bold text-xl">Tổng cộng: </label>
              <p className="font-bold text-primary text-xl">
                {formatPrices(current?.total || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleClose}
            type="button"
            className="text-gray-500 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalViewDetail;
