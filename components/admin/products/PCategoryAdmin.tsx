import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import CategoryAction from "../../../actions/Category.action";
import { CategoryModel } from "../../../models/Category.model";
import { SpeciesModel } from "../../../models/Species.model";
import { AuthContext } from "../../context";
import ModalAddCategory from "./ModalAddCategory";
import ModalUpdateCategory from "./ModalUpdateCategory";

interface PCategoryAdminProps {
  data: CategoryModel[];
  species: SpeciesModel[];
}

const PCategoryAdmin: FC<PCategoryAdminProps> = ({ data, species }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();

  const router = useRouter();

  const { mutate, isLoading } = useMutation(CategoryAction.delete, {
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

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="mt-5 grid">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Quản lý thể loại
          </h1>
          {user?.detailActions.includes("category:add") && (
            <button
              onClick={() => setOpenModalAdd(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Thêm thể loại
            </button>
          )}
        </div>
        <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
          <div className="relative">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Mã thể loại
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Tên thể loại
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Chủng loại
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ngày cập nhật
                  </th>
                  {(user?.detailActions.includes("category:update") ||
                    user?.detailActions.includes("category:delete")) && (
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
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{item.species.name}</td>
                    <td className="py-4 px-6">
                      {dayjs(item.createdAt).format("DD/MM/YYYY")}
                    </td>
                    {(user?.detailActions.includes("category:update") ||
                      user?.detailActions.includes("category:delete")) && (
                      <td className="py-4 px-6">
                        <div className="flex">
                          {user?.detailActions.includes("category:update") && (
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
                          {user?.detailActions.includes("category:delete") && (
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
      <ModalAddCategory
        open={openModalAdd}
        handleClose={() => setOpenModalAdd(false)}
        data={species}
      />
      <ModalUpdateCategory
        open={openModalUpdate}
        handleClose={() => setOpenModalUpdate(false)}
        data={species}
        current={current}
      />
    </>
  );
};

export default PCategoryAdmin;
