import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import PermissionAction from "../../../actions/Permission.action";
import { AuthContext } from "../../context";
import LoadingSpinner from "../../LoadingSpinner";
import ModalAddPermission from "./ModalAddPermission";
import ModalUpdatePermission from "./ModalUpdatePermission";

const PermissionAdmin = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();

  const { data: permissions, isLoading: isLoadingPermission } = useQuery(
    ["permissions"],
    PermissionAction.getAll
  );

  const router = useRouter();

  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(PermissionAction.delete, {
    onSuccess: (data, variable) => {
      queryClient.setQueryData(
        ["permissions"],
        permissions?.filter((item) => item.id !== variable)
      );
      toast.success("Đã chuyển vào thùng rác");
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
      <div className="mt-5 grid">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Quản lý quyền
          </h1>
          {user?.detailActions.includes("permission:add") && (
            <button
              onClick={() => setOpenModalAdd(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Thêm quyền
            </button>
          )}
        </div>
        <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
          <div className="relative">
            {!isLoadingPermission ? (
              <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Mã quyền
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tên quyền
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Ghi chú
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Ngày cập nhật
                    </th>

                    {(user?.detailActions.includes("permission:update") ||
                      user?.detailActions.includes("permission:delete")) && (
                      <th scope="col" className="py-3 px-6">
                        Hành động
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {permissions?.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.id}
                      </th>
                      <td className="py-4 px-6 break-words max-w-[300px]">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 break-words max-w-[300px]">
                        {item.note || "Không có"}
                      </td>
                      <td className="py-4 px-6">
                        {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                      </td>

                      {(user?.detailActions.includes("permission:update") ||
                        user?.detailActions.includes("permission:delete")) && (
                        <td className="py-4 px-6">
                          <div className="flex">
                            {user?.detailActions.includes(
                              "permission:update"
                            ) &&
                              item.id !== 10 && (
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
                              "permission:delete"
                            ) &&
                              item.id !== 10 && (
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
      <ModalAddPermission
        handleClose={() => setOpenModalAdd(false)}
        open={openModalAdd}
      />
      <ModalUpdatePermission
        current={current}
        handleClose={() => setOpenModalUpdate(false)}
        open={openModalUpdate}
      />
    </>
  );
};

export default PermissionAdmin;
