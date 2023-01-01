import React from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const SpeciesAdmin = () => {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
          Quản lý chủng loại
        </h1>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
          Thêm chủng loại
        </button>
      </div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="mt-10 bg-white rounded-3xl p-4"
      >
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Mã chủng loại
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
                <th scope="col" className="py-3 px-6">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr
                  key={item}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="py-4 px-6">Trang sức cưới</td>
                  <td className="py-4 px-6">31/12/2022</td>
                  <td className="py-4 px-6">31/12/2022</td>
                  <td className="py-4 px-6">
                    <div className="flex">
                      <div className="bg-primary flex items-center justify-center text-white p-1 rounded-md hover:bg-primaryHover cursor-pointer">
                        <CiEdit fontSize={24} />
                      </div>
                      <div className="ml-2 bg-red-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-red-700 cursor-pointer">
                        <RiDeleteBin6Line fontSize={24} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpeciesAdmin;
