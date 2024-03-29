import router from "next/router";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { OrderModel } from "../../models/Order.model";
import { formatPrices, getImageServer } from "../../utils";
import dataStatus from "../data/status";
interface Section7 {
  data: OrderModel[];
}

const Section7: FC<Section7> = ({ data }) => {
  return (
    <div className="mt-5">
      {data.length === 0 && <div className="text-center bg-white py-2 rounded-md">Chưa có đơn hàng</div>}
      {data?.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-md mt-5 dark:bg-gray-800 "
        >
          <div className="p-2 font-bold">
            {dataStatus.find((element) => element.value == item.status)?.text ||
              "Không có"}
          </div>
          <table className="table-auto w-full text-sm text-center text-gray-500 dark:text-gray-400 mb-2 border-y-[1px] border-orange-400">
            <thead className="text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th className="py-2 px-6 sm:block hidden">Hình ảnh</th>
                <th className="py-2 px-6">Sản phẩm</th>
                <th className="py-2 px-6">Đơn giá</th>
                <th className="py-2 px-6">Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {item.detailorders.map((element) => (
                <tr key={element.id} className="bg-white dark:bg-gray-800">
                  <td className="py-2 px-6 items-center sm:flex hidden">
                    <LazyLoadImage
                      src={
                        element.sku.image
                          ? getImageServer(
                              element.sku.image.toString() != "null"
                                ? element.sku.image
                                : element.sku.product.thumbnail
                            )
                          : getImageServer(element.sku.product.thumbnail)
                      }
                      className="m-auto w-[50px] h-[50px]"
                    />
                  </td>
                  <td className="break-words max-w-[200px] py-2 px-6">
                    {element.sku.product.name}
                  </td>
                  <td className="py-2 px-6">{formatPrices(element.price - (element.price * element.discount/100))}</td>
                  <td className="py-2 px-6">{element.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right overflow-auto mr-5">
            <div className="font-bold text-base py-1">
              Tổng tiền: {formatPrices(item.total)}
            </div>
            <div className="flex float-right mb-5">
              {/* <button className="text-white bg-primary px-4 py-1 inline rounded-lg">
                Mua lại
              </button> */}
              <button
                className="bg-gray-200 text-primary px-4 py-1 inline rounded-lg ml-3"
                onClick={() => router.push(`/history/detail/${item.id}`)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section7;
