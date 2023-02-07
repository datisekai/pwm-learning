import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdminLayout from "../../../components/layouts/AdminLayout";
import BCategoryAdmin from "../../../components/admin/blogs/BCategoryAdmin";
import BlogAdmin from "../../../components/admin/blogs/BlogAdmin";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import CategoryBlogAction from "../../../actions/CategoryBlog.action";
import { CategoryBlogModel } from "../../../models/CategoryBlog.model";
import BlogAction from "../../../actions/Blog.action";
import { BlogModel } from "../../../models/Blog.model";
import Meta from "../../../components/Meta";
import { AuthContext } from "../../../components/context";


const BlogAdminManager = () => {
  const router = useRouter();

  const {tab = 0} = router.query;

  const {user} = React.useContext(AuthContext);

  const dataTab = [
    {
      id: 0,
      title: "Blog",
      hide: !user?.detailActions.includes("blog:view"),
    },
    {
      id: 1,
      title: "Danh mục Blog",
      hide: !user?.detailActions.includes("categoryBlog:view"),
    },
  ];

  return (
    <>
      <Meta image="/images/logo.png" title="Blog | Admin" description="" />
      <AdminLayout>
        <div className="mt-5">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {[
              dataTab.map((item, index) => !item.hide && (
                <li
                  key={item.id}
                  onClick={() => router.push(`/admin/blog?tab=${item.id}`)}
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
            {+tab === 0 && <BlogAdmin />}
            {+tab === 1 && <BCategoryAdmin />}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default BlogAdminManager;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");

  if (!detailActions.includes("blog:view")) {
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
