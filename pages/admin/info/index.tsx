import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import swal from "sweetalert";
import InfoAction from "../../../actions/Info.action";
import ModalAddInfo from "../../../components/admin/infos/ModalAddInfo";
import ModalUpdateInfo from "../../../components/admin/infos/ModalUpdateInfo";
import { AuthContext } from "../../../components/context";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Meta from "../../../components/Meta";
import { getImageServer } from "../../../utils";

const InfoAdmin = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();

  const router = useRouter();

  const { data: infos, isLoading: isLoadingInfo } = useQuery(
    ["infos"],
    InfoAction.getAll
  );

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(InfoAction.delete, {
    onSuccess: (data, variable) => {
      toast.success("Đã chuyển vào thùng rác");
      queryClient.setQueryData(
        ["infos"],
        infos?.filter((item) => item.id !== variable)
      );
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
    <Meta image="/images/logo.jpg" title="Giới thiệu | Admin" description="" />
    <AdminLayout>
      <div className="mt-5 grid">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Giới thiệu
          </h1>
          {user?.detailActions.includes("info:add") && (
            <button
              onClick={() => setOpenModalAdd(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Thêm giới thiệu
            </button>
          )}
        </div>
        <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
          <div className="relative">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Code
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Tiêu đề
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nội dung
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Hình ảnh
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ngày tạo
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ngày cập nhật
                  </th>
                  {(user?.detailActions.includes("info:update") ||
                    user?.detailActions.includes("info:delete")) && (
                    <th scope="col" className="py-3 px-6">
                      Hành động
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {infos?.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white break-words max-w-[300px]"
                      >
                        {item.code}
                      </th>
                      <td className="py-4 px-6 break-words max-w-[300px]">
                        {item.title}
                      </td>
                      <td className="py-4 px-6 break-words max-w-[300px]">
                        {item.content}
                      </td>
                      <td className="py-4 px-6">
                        {item.image ? (
                          <LazyLoadImage
                            src={getImageServer(item.image)}
                            alt="123"
                            width={50}
                            height={50}
                          />
                        ) : (
                          "Không có  "
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {" "}
                        {dayjs(item.createAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="py-4 px-6">
                        {" "}
                        {dayjs(item.updateAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex">
                          {user?.detailActions.includes("info:update") && (
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
                          {user?.detailActions.includes("info:delete") && (
                            <div
                              onClick={() => handleDelete(item.id)}
                              className="ml-2 bg-red-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-red-700 cursor-pointer"
                            >
                              <RiDeleteBin6Line fontSize={24} />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalAddInfo
        handleClose={() => setOpenModalAdd(false)}
        open={openModalAdd}
      />
      <ModalUpdateInfo
        current={current}
        handleClose={() => setOpenModalUpdate(false)}
        open={openModalUpdate}
      />
    </AdminLayout>
   </>
  );
};

export default InfoAdmin;
