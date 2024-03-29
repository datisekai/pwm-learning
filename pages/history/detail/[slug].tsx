import { useQuery } from "@tanstack/react-query";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import OrderAction from "../../../actions/Order.action";
import dataStatus from "../../../components/data/status";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";
import { formatPrices, getImageServer } from "../../../utils";

const DetailHistory = () => {
  const router = useRouter();
  const { slug = 0 } = router.query;
  const { data, isLoading } = useQuery(["detail-order", slug], () =>
    OrderAction.getById(slug.toString())
  );
  return (
    <>
      <Meta
        title="Blog | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="mt-10 md:mx-10 mx-4">
          <div className="flex">
            <h1 className="font-sans text-2xl text-orange-600 font-bold">
              Chi tiết đơn hàng #{data?.id}:
            </h1>
            <h3 className="font-sans text-2xl ml-5">
              {dataStatus.find((item) => item.value === data?.status)?.text ||
                ""}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:gap-20 gap-4 mt-5">
            <div className="font-bold">Địa chỉ người nhận</div>
            <div className="font-bold">Hình thức thanh toán</div>
          </div>
          <div className="grid grid-cols-2 md:gap-20 gap-4 mt-5">
            <div className="rounded-md bg-gray-200 p-4 dark:text-black">
              <p className="font-bold">{data?.infoorder.name}</p>
              <p>Địa chỉ: {data?.infoorder.address}</p>
              <p>Điện thoại: {data?.infoorder.phone}</p>
            </div>
            <div className="rounded-md bg-gray-200 p-4 flex items-center justify-center dark:text-black">
              <LazyLoadImage
                src={"../../images/paycod.png"}
                className="w-[50px] h-[50px]"
              />
              Thanh toán tiền mặt khi nhận hàng
            </div>
          </div>
          <div className="mt-7 mx-2 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
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
                  {data?.detailorders?.map((item) => (
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
              <p className="font-bold text-primary text-xl">{formatPrices(data?.total || 0)}</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default DetailHistory;
