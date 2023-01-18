import React, { useContext, useState } from "react";
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
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import SkuAction from "../../../actions/Sku.action";
import { SkuModel } from "../../../models/Sku.model";
import { AuthContext } from "../../../components/context";
import Meta from "../../../components/Meta";


interface ProductAdminMnProps {
  products: ProductModel[];
  categories: CategoryModel[];
  species: SpeciesModel[];
  tab: string;
  skus:SkuModel[]
}

const ProductAdminManager: NextPage<ProductAdminMnProps> = ({
  products,
  categories,
  species,
  tab,
  skus
}) => {

  
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

  const router = useRouter();
  return (
   <>
    <Meta image="/images/logo.png" title="Sản phẩm | Admin" description="" />
    <AdminLayout>
      <div className="mt-5">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {[
            dataTab.map((item, index) => (
              <li
                key={item.id}
                onClick={() => router.push(`/admin/product?tab=${index}`)}
                className="mr-2 cursor-pointer"
              >
                <span
                  className={`inline-block p-4 rounded-t-lg  ${
                    item.id === +tab
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
          {+tab === 0 && <ProductAdmin data={products} categories={categories}/>}
          {+tab === 1 && <SkuAdmin data={skus}/>}
          {+tab === 2 && <SpeciesAdmin data={species} />}
          {+tab === 3 && <PCategoryAdmin species={species} data={categories} />}
        </div>
      </div>
    </AdminLayout></>
  );
};

export default ProductAdminManager;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await Promise.all([
    ProductAction.getAll(),
    CategoryAction.getAll(),
    SpeciesAction.getAll(),
    SkuAction.getAll(),
  ]);
  const tab = query.tab as string;
  return {
    props: {
      products: data[0],
      categories: data[1],
      species: data[2],
      skus: data[3],
      tab: tab || 0,
    },
  };
};
