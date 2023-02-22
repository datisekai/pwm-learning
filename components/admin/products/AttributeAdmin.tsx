import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import AttributeAction from "../../../actions/Attribute.action";
import CategoryAction from "../../../actions/Category.action";
import { AttributeModel } from "../../../models/Attribute.model";
import { AuthContext } from "../../context";
import LoadingSpinner from "../../LoadingSpinner";
import ModalAddAttribute from "./ModalAddAttribute";
import ModalUpdateAttribute from "./ModalUpdateAttribute";

const AttributeAdmin = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<AttributeModel | undefined>(undefined);

  const router = useRouter();

  const { data: attributes, isLoading: isLoadingAttributes } = useQuery(
    ["attributes"],
    AttributeAction.getAll
  );

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(AttributeAction.delete, {
    onSuccess: (data, variable) => {
      toast.success("Đã chuyển vào thùng rác");
      queryClient.setQueryData(
        ["attributes"],
        attributes?.filter((item) => item.id !== variable)
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleDelete = (id: number) => {
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

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="mt-5 grid">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Quản lý phân loại
          </h1>
          {user?.detailActions.includes("product:add") && (
            <button
              onClick={() => setOpenModalAdd(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Thêm phân loại
            </button>
          )}
        </div>
        <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
          <div className="relative">
            {!isLoadingAttributes ? (
              <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Mã phân loại
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tên phân loại
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Chi tiết phân loại
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Ngày cập nhật
                    </th>
                    {(user?.detailActions.includes("product:update") ||
                      user?.detailActions.includes("product:delete")) && (
                      <th scope="col" className="py-3 px-6">
                        Hành động
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {attributes?.map((item) => (
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
                        {item.detailattributes
                          .map((item) => item.name)
                          .join(", ")}
                      </td>
                      <td className="py-4 px-6">
                        {dayjs(item.createdAt).format("DD/MM/YYYY")}
                      </td>
                      {(user?.detailActions.includes("product:update") ||
                        user?.detailActions.includes("product:delete")) && (
                        <td className="py-4 px-6">
                          <div className="flex">
                            {user?.detailActions.includes("product:update") && (
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
                            {user?.detailActions.includes("product:delete") && (
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
      <ModalAddAttribute
        handleClose={() => setOpenModalAdd(false)}
        open={openModalAdd}
      />
      <ModalUpdateAttribute
        handleClose={() => setOpenModalUpdate(false)}
        open={openModalUpdate}
        current={current}
      />
    </>
  );
};

export default AttributeAdmin;
