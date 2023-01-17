import React, { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdminLayout from "../../../components/layouts/AdminLayout";
import PermissionAdmin from "../../../components/admin/permissions/PermissionAdmin";
import FunctionAdmin from "../../../components/admin/permissions/FunctionAdmin";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import PermissionAction from "../../../actions/Permission.action";
import { PermissionModel } from "../../../models/Permission.model";
import { ActionModel } from "../../../models/Action.model";
import { AuthContext } from "../../../components/context";
import Meta from "../../../components/Meta";



interface BlogAdminManagerProps {
  tab: string | number;
  permissions: PermissionModel[];
  actions: ActionModel[];
}

const BlogAdminManager: NextPage<BlogAdminManagerProps> = ({
  tab,
  permissions,
  actions,
}) => {
  const router = useRouter();
  
  const {user} = useContext(AuthContext)

  const dataTab = [
    {
      id: 0,
      title: "Quyền",
    },
    {
      id: 1,
      title: "Gán quyền",
      isHide: !user?.detailActions.includes('permission:update')
    },
  ];

  return (
  <>
  <Meta image="/images/logo.png" title="Phân quyền | Admin" description="" />
  <AdminLayout>
      <div className="mt-5">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {[
            dataTab.map((item, index) => {
              if(!item.isHide){
                return  <li
                key={item.id}
                onClick={() => router.push(`/admin/permission?tab=${item.id}`)}
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
              }
            }),
          ]}
        </ul>
        <div>
          {+tab === 0 && <PermissionAdmin data={permissions} />}
          {+tab === 1 && (
            <FunctionAdmin permissions={permissions} data={actions} />
          )}
        </div>
      </div>
    </AdminLayout></>
  );
};

export default BlogAdminManager;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const tab = query.tab || 0;
  const token = req.cookies["token"] || "";

  const data = await Promise.all([
    PermissionAction.getAll(),
    PermissionAction.getActions(token),
  ]);

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
    props: {
      tab,
      permissions: data[0],
      actions: data[1],
    },
  };
};
