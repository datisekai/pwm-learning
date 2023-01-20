import React, { FC, useContext, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GetServerSideProps, NextPage } from "next";
import UserAction from "../../actions/User.action";
import { UserModel } from "../../models/User.model";
import dayjs from "dayjs";
import ModalAddUser from "../../components/admin/users/ModalAddUser";
import PermissionAction from "../../actions/Permission.action";
import { PermissionModel } from "../../models/Permission.model";
import ModalUpdateUser from "../../components/admin/users/ModalUpdateUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { AuthContext } from "../../components/context";
import Meta from "../../components/Meta";

interface UserAdminProps {}

const UserAdmin: NextPage<UserAdminProps> = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const { data: users, isLoading: isUserLoading, refetch } = useQuery(
    ["users"],
    UserAction.getAll
  );

  const { data: permissions, isLoading: isPermissionLoading } = useQuery(
    ["permisison"],
    PermissionAction.getAll
  );

  const { mutate, isLoading } = useMutation(UserAction.delete, {
    onSuccess: () => {
      toast.success("Đã chuyển vào thùng rác");
      router.replace(router.asPath);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
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

  return (
    <>
      <Meta
        image="/images/logo.png"
        title="Người dùng | Admin"
        description=""
      />
      <AdminLayout>
        <>
          <div className="mt-5 w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
                Quản lý người dùng
              </h1>
              {user?.detailActions.includes("user:add") && (
                <button
                  onClick={() => setOpenModalAdd(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                >
                  Thêm người dùng
                </button>
              )}
            </div>
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              className="mt-10 bg-white rounded-3xl p-4 max-h-[450px] overflow-y-scroll"
            >
              <div className=" relative">
                <table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                        Email
                      </th>
                      <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                        Loại quyền
                      </th>
                      <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                        Ngày tạo
                      </th>
                      <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                        Ngày cập nhật
                      </th>
                      {(user?.detailActions.includes("user:update") ||
                        user?.detailActions.includes("user:delete")) && (
                        <th scope="col" className="py-2 px-3 md:py-3 md:px-6">
                          Hành động
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {isUserLoading
                      ? [1, 2, 3, 4].map((item) => (
                          <tr key={item} className="animate-pulse">
                            <td>
                              <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>{" "}
                            </td>
                            <td>
                              <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>{" "}
                            </td>
                            <td>
                              <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>{" "}
                            </td>
                            <td>
                              <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>{" "}
                            </td>
                            <td>
                              <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>{" "}
                            </td>
                          </tr>
                        ))
                      : users?.map((item: any) => (
                          <tr
                            key={item.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-2 py-3 md:py-4 md:px-6 font-medium text-gray-900 line-clamp-1 dark:text-white"
                            >
                              {item.email}
                            </th>
                            <td className="px-2 py-3 md:py-4 md:px-6">
                              {item.permission.name}
                            </td>
                            <td className="px-2 py-3 md:py-4 md:px-6">
                              {dayjs(item.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="px-2 py-3 md:py-4 md:px-6">
                              {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                            </td>
                            {(user?.detailActions.includes("user:update") ||
                              user?.detailActions.includes("user:delete")) && (
                              <td className="px-2 py-3 md:py-4 md:px-6">
                                <div className="flex">
                                  {user?.detailActions.includes(
                                    "user:update"
                                  ) && (
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
                                  {user?.detailActions.includes(
                                    "user:delete"
                                  ) && (
                                    <div
                                      onClick={() => handleDelete(item.id)}
                                      className="ml-2 bg-red-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-red-700 cursor-pointer"
                                    >
                                      <RiDeleteBin6Line fontSize={24} />
                                    </div>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ModalAddUser
            data={permissions}
            handleClose={() => setOpenModalAdd(false)}
            open={openModalAdd}
          />
          <ModalUpdateUser
            current={current}
            data={permissions}
            handleClose={() => setOpenModalUpdate(false)}
            open={openModalUpdate}
          />
        </>
      </AdminLayout>
    </>
  );
};

export default UserAdmin;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");

  if (!detailActions.includes("user:view")) {
    return {
      props: {},
      redirect: {
        destination: "/admin",
      },
    };
  }

  return {
    props: {},
  };
};
