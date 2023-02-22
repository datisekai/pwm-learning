import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import PermissionAction from "../../../actions/Permission.action";
import FunctionAdmin from "../../../components/admin/permissions/FunctionAdmin";
import PermissionAdmin from "../../../components/admin/permissions/PermissionAdmin";
import { AuthContext } from "../../../components/context";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Meta from "../../../components/Meta";

const PermissionManager = () => {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const { tab = 0 } = router.query;

  const dataTab = [
    {
      id: 0,
      title: "Quyền",
      isHide: !user?.detailActions.includes("permission:view"),
    },
    {
      id: 1,
      title: "Gán quyền",
      isHide: !user?.detailActions.includes("permission:update"),
    },
  ];

  return (
    <>
      <Meta
        image="/images/logo.jpg"
        title="Phân quyền | Admin"
        description=""
      />
      <AdminLayout>
        <div className="mt-5">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {[
              dataTab.map((item, index) => {
                if (!item.isHide) {
                  return (
                    <li
                      key={item.id}
                      onClick={() =>
                        router.push(`/admin/permission?tab=${item.id}`)
                      }
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
                  );
                }
              }),
            ]}
          </ul>
          <div>
            {+tab === 0 && <PermissionAdmin />}
            {+tab === 1 && <FunctionAdmin />}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default PermissionManager;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");

  if (!detailActions.includes("permission:view")) {
    return {
      props: {},
      redirect: {
        destination: "/admin",
      },
    };
  }

  return {
    props: {},
  };
};
