import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillPlusCircle } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import swal from "sweetalert";
import OrderAction from "../../../actions/Order.action";
import ModalUpdateOrder from "../../../components/admin/orders/ModalUpdateOrder";
import ModalViewDetail from "../../../components/admin/orders/ModalViewDetail";
import { AuthContext } from "../../../components/context";
import dataStatus from "../../../components/data/status";
import AdminLayout from "../../../components/layouts/AdminLayout";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Meta from "../../../components/Meta";
import { OrderModel } from "../../../models/Order.model";
import { formatPrices, getImageServer } from "../../../utils";

const Order = () => {
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();
  const [currentView, setCurrentView] = useState<undefined | OrderModel>();
  const router = useRouter();

  const { data, isLoading: isLoadingOrder } = useQuery(
    ["orders", router.asPath],
    OrderAction.getAll
  );

  const { user } = useContext(AuthContext);

  return (
    <>
      <Meta image="/images/logo.jpg" title="Order | Admin" description="" />
      <AdminLayout>
        <>
          <div className="mt-5 grid">
            <div className="flex items-center justify-between">
              <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
                Quản lý đơn hàng
              </h1>
              {user?.detailActions.includes("order:add") && (
                <Link href={"/admin/order/add"}>
                  <div className="flex items-center px-2 py-2 rounded-lg bg-green-500 hover:bg-green-700">
                    <AiFillPlusCircle fontSize={24} className="text-white" />
                    <button className=" text-white ml-2">Thêm đơn hàng</button>
                  </div>
                </Link>
              )}
            </div>
            <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
              <div className="relative">
                {!isLoadingOrder ? (
                  <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                          #
                        </th>
                        <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                          Khách hàng
                        </th>
                        <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                          Tổng tiền
                        </th>
                        <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                          Nhân viên
                        </th>
                        <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                          Ngày tạo
                        </th>
                        <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                          Ngày cập nhật
                        </th>
                        <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                          Tình trạng
                        </th>
                        {(user?.detailActions.includes("order:update") ||
                          user?.detailActions.includes("order:delete")) && (
                          <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                            Hành động
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item) => (
                        <tr
                          key={item.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-2 py-3 md:py-4 md:px-6 break-words max-w-[200px]">
                            #{item.id}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6 break-words max-w-[200px]">
                            {item.customer.email || "Không có"}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6">
                            {formatPrices(item.total) || "Không có"}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6 break-words max-w-[200px]">
                            {item.staff ? item.staff.email : "Chưa có"}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6">
                            {dayjs(item.createdAt).format("DD/MM/YYYY")}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6">
                            {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6">
                            {dataStatus.find(
                              (element) => element.value === item.status
                            )?.text || "Không có"}
                          </td>
                          {user?.detailActions.includes("order:update") && (
                            <td className="px-2 py-3 md:py-4 md:px-6">
                              <div className="flex space-x-1">
                                {user?.detailActions.includes("order:view") && (
                                  <div
                                    onClick={() => {
                                      setCurrentView(item);
                                      setOpenModalView(true);
                                    }}
                                    className="bg-slate-400 flex items-center justify-center text-white p-1 rounded-md hover:bg-slate-600 cursor-pointer"
                                  >
                                    <AiFillEye fontSize={24} />
                                  </div>
                                )}
                                {user?.detailActions.includes(
                                  "order:update"
                                ) && item.status !== 3 && (
                                  <div
                                    onClick={() => {
                                      setCurrent(item);
                                      setOpenModalUpdate(true);
                                    }}
                                    className="bg-primary flex items-center justify-center text-white p-1 rounded-md hover:bg-primaryHover cursor-pointer"
                                  >
                                    <CiEdit fontSize={24} />
                                  </div>
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner isFullScreen={false} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <ModalUpdateOrder
            current={current}
            handleClose={() => setOpenModalUpdate(false)}
            open={openModalUpdate}
            users={[]}
          />
          <ModalViewDetail
            handleClose={() => setOpenModalView(false)}
            open={openModalView}
            current={currentView}
          />
        </>
      </AdminLayout>
    </>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies["token"];
  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");

  if (token) {
    if (detailActions.length > 0) {
      if (detailActions.includes("order:view")) {
        return {
          props: {},
        };
      }
      return {
        props: {},
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    }
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
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
