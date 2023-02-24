import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import AttributeAdmin from "../../../components/admin/products/AttributeAdmin";
import PCategoryAdmin from "../../../components/admin/products/PCategoryAdmin";
import ProductAdmin from "../../../components/admin/products/ProductAdmin";
import SkuAdmin from "../../../components/admin/products/SkuAdmin";
import SpeciesAdmin from "../../../components/admin/products/SpeciesAdmin";
import { AuthContext } from "../../../components/context";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Meta from "../../../components/Meta";

const ProductAdminManager = () => {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const { tab = 0 } = router.query;

  const dataTab = [
    {
      id: 0,
      title: "Sản phẩm",
      hide: !user?.detailActions.includes("product:view"),
    },
    {
      id: 1,
      title: "Hàng hóa",
      hide: !user?.detailActions.includes("product:view"),
    },
    {
      id: 2,
      title: "Chủng loại",
      hide: !user?.detailActions.includes("species:view"),
    },
    {
      id: 3,
      title: "Thể loại",
      hide: !user?.detailActions.includes("category:view"),
    },
    {
      id: 4,
      title: "Phân loại",
      hide: !user?.detailActions.includes("product:view"),
    },
  ];

  return (
    <>
      <Meta image="/images/logo.jpg" title="Sản phẩm | Admin" description="" />
      <AdminLayout>
        <div className="mt-5">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {[
              dataTab.map(
                (item, index) =>
                  !item.hide && (
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
                  )
              ),
            ]}
          </ul>
          <div>
            {+tab === 0 && <ProductAdmin />}
            {+tab === 1 && <SkuAdmin />}
            {+tab === 2 && <SpeciesAdmin />}
            {+tab === 3 && <PCategoryAdmin />}
            {+tab === 4 && <AttributeAdmin />}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductAdminManager;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");

  if (
    detailActions.includes("product:view") ||
    detailActions.includes("species:view") ||
    detailActions.includes("category:view")
  ) {
    return {
      props: {},
    };
  }

  return {
    props: {},
    redirect: {
      destination: "/admin",
    },
  };
};
