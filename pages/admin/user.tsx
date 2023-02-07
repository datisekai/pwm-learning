import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import PermissionAction from "../../actions/Permission.action";
import UserAction from "../../actions/User.action";
import ModalAddUser from "../../components/admin/users/ModalAddUser";
import ModalUpdateUser from "../../components/admin/users/ModalUpdateUser";
import { AuthContext } from "../../components/context";
import AdminLayout from "../../components/layouts/AdminLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import Meta from "../../components/Meta";
import { UserModel } from "../../models/User.model";

const UserAdmin = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();

  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { page = 1 } = router.query;

  const { data: permissions, isLoading: isLoadingPermission } = useQuery(
    ["permissions"],
    PermissionAction.getAll
  );
  const { data: users, isLoading: isLoadingUser } = useQuery(
    ["users"],
    UserAction.getAll
  );

  const queryClient = useQueryClient();

  const { mutate, isLoading: isLoadingDelete } = useMutation(
    UserAction.delete,
    {
      onSuccess: (data, variables) => {
        console.log(variables)
        queryClient.setQueryData(
          ["users"],
          users?.filter((item) => item.id != variables)
        );
        toast.success("Đã chuyển vào thùng rác");
        router.replace(router.asPath);
      },
      onError: (err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      },
    }
  );

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
          <div className="mt-5 grid">
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
            <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px]  overflow-x-auto shadow-master">
              <div className="relative">
                {!isLoadingUser || !isLoadingPermission ? (
                  <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                      {users?.map((item: UserModel) => (
                        <tr
                          key={item.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="break-words max-w-[200px] px-2 py-3 md:py-4 md:px-6 font-medium text-gray-900 line-clamp-1 dark:text-white"
                          >
                            {item.email}
                          </th>
                          <td className="px-2 py-3 md:py-4 md:px-6 break-words max-w-[200px]">
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
                ) : (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner isFullScreen={false} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <ModalAddUser
            data={permissions || []}
            handleClose={() => setOpenModalAdd(false)}
            open={openModalAdd}
          />
          <ModalUpdateUser
            current={current}
            data={permissions || []}
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
