import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdminLayout from "../../../components/layouts/AdminLayout";
import PCategoryAdmin from "../../../components/admin/products/PCategoryAdmin";
import ProductAdmin from "../../../components/admin/products/ProductAdmin";
import SpeciesAdmin from "../../../components/admin/products/SpeciesAdmin";

const dataTab = [
  {
    id: 0,
    title: "Sản phẩm",
  },
  {
    id: 1,
    title: "Chủng loại",
  },
  {
    id: 2,
    title: "Thể loại",
  },
];

const ProductAdminManager = () => {
  const [tab, setTab] = useState(0);
  return (
    <AdminLayout>
      <div className="mt-5">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {[
            dataTab.map((item, index) => (
              <li
                key={item.id}
                onClick={() => setTab(item.id)}
                className="mr-2 cursor-pointer"
              >
                <span
                  className={`inline-block p-4 rounded-t-lg  ${
                    item.id === tab
                      ? "text-primary bg-gray-100"
                      : "hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {item.title}
                </span>
              </li>
            )),
          ]}
        </ul>
        <div>
          {tab === 0 && <ProductAdmin/>}
          {tab === 1 && <SpeciesAdmin/>}
          {tab === 2 && <PCategoryAdmin/>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductAdminManager;
