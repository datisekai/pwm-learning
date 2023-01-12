import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdminLayout from "../../../components/layouts/AdminLayout";
import PCategoryAdmin from "../../../components/admin/products/PCategoryAdmin";
import ProductAdmin from "../../../components/admin/products/ProductAdmin";
import SpeciesAdmin from "../../../components/admin/products/SpeciesAdmin";
import SkuAdmin from "../../../components/admin/products/SkuAdmin";
import { GetServerSideProps, NextPage } from "next";
import ProductAction from "../../../actions/Product.action";
import { ProductModel } from "../../../models/Product.model";
import CategoryAction from "../../../actions/Category.action";
import SpeciesAction from "../../../actions/Species.action";
import { CategoryModel } from "../../../models/Category.model";
import { SpeciesModel } from "../../../models/Species.model";

const dataTab = [
  {
    id: 0,
    title: "Sản phẩm",
  },
  {
    id: 1,
    title: "Hàng hóa",
  },
  {
    id: 2,
    title: "Chủng loại",
  },
  {
    id: 3,
    title: "Thể loại",
  },
];

interface ProductAdminMnProps{
  products:ProductModel[],
  categories:CategoryModel[],
  species:SpeciesModel[]
}

const ProductAdminManager:NextPage<ProductAdminMnProps> = ({products,categories,species}) => {
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
          {tab === 0 && <ProductAdmin data={products}/>}
          {tab === 1 && <SkuAdmin/>}
          {tab === 2 && <SpeciesAdmin data={species}/>}
          {tab === 3 && <PCategoryAdmin data={categories}/>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductAdminManager;

export const getServerSideProps = async() => {
  const data = await Promise.all([ProductAction.getAll(), CategoryAction.getAll(), SpeciesAction.getAll()])

  return {
    props:{
      products:data[0],
      categories:data[1],
      species:data[2]
    }
  }
}