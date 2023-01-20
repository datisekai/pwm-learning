import React, { useContext } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { CategoryBlogModel } from "../../../models/CategoryBlog.model";
import dayjs from "dayjs";
import ModalAddCategoryBlog from "./ModalAddCategoryBlog";
import ModalUpdateCategoryBlog from "./ModalUpdateCategoryBlog";
import { useMutation } from "@tanstack/react-query";
import CategoryBlogAction from "../../../actions/CategoryBlog.action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { AuthContext } from "../../context";

interface BCategoryAdminProps {
  data: CategoryBlogModel[];
}

const BCategoryAdmin: React.FC<BCategoryAdminProps> = ({ data }) => {
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
  const [current, setCurrent] = React.useState<any>();

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(CategoryBlogAction.delete, {
    onSuccess: () => {
      toast.success("Đã chuyển vào thùng rác");
      router.replace(router.asPath);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleDelete = (id: number | string) => {
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
            Quản lý danh mục blog
          </h1>
          {user?.detailActions.includes("categoryBlog:add") && (
            <button
              onClick={() => setOpenModalAdd(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Thêm danh mục blog
            </button>
          )}
        </div>
        <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
          <div className="relative">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Mã danh mục blog
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Tiêu đề
                  </th>

                  <th scope="col" className="py-3 px-6">
                    Ngày tạo
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ngày chỉnh sửa
                  </th>
                  {(user?.detailActions.includes("categoryBlog:update") ||
                    user?.detailActions.includes("categoryBlog:delete")) && (
                    <th scope="col" className="py-3 px-6">
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
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </th>
                    <td className="py-4 px-6 break-words max-w-[300px]">{item.name}</td>
                    <td className="py-4 px-6">
                      {dayjs(item.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="py-4 px-6">
                      {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                    </td>
                    {(user?.detailActions.includes("categoryBlog:update") ||
                      user?.detailActions.includes("categoryBlog:delete")) && (
                      <td className="py-4 px-6">
                        <div className="flex">
                          {user?.detailActions.includes(
                            "categoryBlog:update"
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
                            "categoryBlog:delete"
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
      <ModalAddCategoryBlog
        handleClose={() => setOpenModalAdd(false)}
        open={openModalAdd}
      />
      <ModalUpdateCategoryBlog
        current={current}
        handleClose={() => setOpenModalUpdate(false)}
        open={openModalUpdate}
      />
    </>
  );
};

export default BCategoryAdmin;
