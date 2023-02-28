import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import swal from "sweetalert";
import OrderAction from "../../../actions/Order.action";
import ModalUpdateOrder from "../../../components/admin/orders/ModalUpdateOrder";
import { AuthContext } from "../../../components/context";
import AdminLayout from "../../../components/layouts/AdminLayout";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Meta from "../../../components/Meta";
import { getImageServer } from "../../../utils";

const Order = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();

  const { data, isLoading: isLoadingOrder } = useQuery(
    ["order"],
    OrderAction.getAll
  );
  const { user } = useContext(AuthContext);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(OrderAction.delete, {
    onSuccess: (response, variable) => {
      toast.success("Đã xóa thành công");
      queryClient.setQueryData(
        ["order"],
        data?.filter((item) => item.id !== variable)
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vorder lòng thử lại");
    },
  });

  const handleDelete = (id: string | number) => {
    swal({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Khi xóa, đối tượng sẽ được chuyển vào thùng rác",
      icon: "warning",
      buttons: ["Hủy", "Xóa"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(id);
      }
    });
  };

  const { mutate: updateStatus, isLoading: loadingOrder } = useMutation(
    OrderAction.update,
    {
      onSuccess: (response, variable) => {
        const currentUpdate = data?.find((item) => item.id === variable.id);
        if (currentUpdate) {
          if (currentUpdate.status) {
            toast.success("Đã ẩn thành công");
          } else {
            toast.success("Đã hiển thị thành công");
          }

          queryClient.setQueryData(
            ["order"],
            data?.map((item) => {
              if (item.id === variable.id) {
                return { ...item, status: !currentUpdate.status };
              }
              return item;
            })
          );
        }
      },
      onError: (err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra, vorder lòng thử lại");
      },
    }
  );

  const handleOrder = (data: { id: number; checked: boolean }) => {
    updateStatus({ id: data.id, status: data.checked });
  };

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
              {/* {user?.detailActions.includes("order:add") && ( */}
                <Link href={"/admin/order/add"}>
                  <div className="flex items-center px-2 py-2 rounded-lg bg-green-500 hover:bg-green-700">
                    <AiFillPlusCircle fontSize={24} className="text-white" />
                    <button className=" text-white ml-2">Thêm đơn hàng</button>
                  </div>
                </Link>
              {/* )} */}
            </div>
            <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
              <div className="relative">
                {!isLoadingOrder ? (
                  <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
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
                          Hiển thị
                        </th>
                        {/* {(user?.detailActions.includes("order:update") ||
                          user?.detailActions.includes("order:delete")) && ( */}
                          <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                            Hành động
                          </th>
                        {/* )} */}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item) => (
                        <tr
                          key={item.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-2 py-3 md:py-4 md:px-6 break-words max-w-[200px]">
                            {item.customerId || "Không có"}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6">
                            {item.total || "Không có"}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6 break-words max-w-[200px]">
                            {item.staffId || "Không có"}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6">
                            {dayjs(item.createdAt).format("DD/MM/YYYY")}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6">
                            {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                          </td>
                          <td className="px-2 py-3 md:py-4 md:px-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.status}
                                onChange={(e) =>
                                  handleOrder({
                                    id: item.id,
                                    checked: e.target.checked,
                                  })
                                }
                                className="sr-only peer"
                                disabled={
                                  user?.detailActions.includes("order:update")
                                    ? loadingOrder
                                    : true
                                }
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                            </label>
                          </td>
                          {/* {(user?.detailActions.includes("order:update") ||
                            user?.detailActions.includes("order:delete")) && ( */}
                            <td className="px-2 py-3 md:py-4 md:px-6">
                              <div className="flex">
                                {/* {user?.detailActions.includes(
                                  "order:update"
                                ) && ( */}
                                  <div
                                    onClick={() => {
                                      setCurrent(item);
                                      setOpenModalUpdate(true);
                                    }}
                                    className="bg-primary flex items-center justify-center text-white p-1 rounded-md hover:bg-primaryHover cursor-pointer"
                                  >
                                    <CiEdit fontSize={24} />
                                  </div>
                                {/* )} */}
                                {/* {user?.detailActions.includes(
                                  "order:delete"
                                ) && ( */}
                                  <div
                                    onClick={() => handleDelete(item.id)}
                                    className="ml-2 bg-red-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-red-700 cursor-pointer"
                                  >
                                    <RiDeleteBin6Line fontSize={24} />
                                  </div>
                                {/* )} */}
                              </div>
                            </td>
                          {/* )} */}
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
            users={[]}          />
        </>
      </AdminLayout>
    </>
  );
};

export default Order;
