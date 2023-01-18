import dayjs from "dayjs";
import React, { FC, useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SpeciesModel } from "../../../models/Species.model";
import ModalAddSpecies from "./ModalAddSpecies";
import ModalUpdateSpecies from "./ModalUpdateSpecies";
import { useMutation } from "@tanstack/react-query";
import SpeciesAction from "../../../actions/Species.action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { AuthContext } from "../../context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageServer } from "../../../utils";

interface SpeciesAdminProps {
  data: SpeciesModel[];
}

const SpeciesAdmin: FC<SpeciesAdminProps> = ({ data }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();

  console.log(data)

  const router = useRouter();

  const { mutate, isLoading } = useMutation(SpeciesAction.delete, {
    onSuccess: () => {
      toast.success("Đã chuyển vào thùng rác");
      router.replace(router.asPath);
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
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Quản lý chủng loại
          </h1>
          {user?.detailActions.includes("species:add") && (
            <button
              onClick={() => setOpenModalAdd(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Thêm chủng loại
            </button>
          )}
        </div>
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="mt-10 bg-white rounded-3xl p-4 max-h-[500px] overflow-y-scroll"
        >
          <div className="overflow-x-auto relative">
            <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Hình ảnh
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Tên chủng loại
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ngày tạo
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ngày cập nhật
                  </th>
                  {(user?.detailActions.includes("species:update") ||
                    user?.detailActions.includes("species:delete")) && (
                    <th scope="col" className="py-3 px-6">
                      Hành động
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <LazyLoadImage width={60} height={60} className='rounded-md' src={getImageServer(item.thumbnail)} alt=""/>
                      </th>
                      <td className="py-4 px-6">{item.name}</td>
                      <td className="py-4 px-6">
                        {dayjs(item.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="py-4 px-6">
                        {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex">
                          {user?.detailActions.includes("species:update") && (
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
                          {user?.detailActions.includes("species:delete") && (
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
      <ModalAddSpecies
        handleClose={() => setOpenModalAdd(false)}
        open={openModalAdd}
      />
      <ModalUpdateSpecies
        current={current}
        handleClose={() => setOpenModalUpdate(false)}
        open={openModalUpdate}
      />
    </>
  );
};

export default SpeciesAdmin;
