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

const dataTab = [
  {
    id: 0,
    title: "Blog",
  },
  {
    id: 1,
    title: "Danh mục Blog",
  },
];

interface BlogAdminProps {
  tab: string;
  categoriesBlog:CategoryBlogModel[]
}

const BlogAdminManager: NextPage<BlogAdminProps> = ({ tab, categoriesBlog }) => {
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="mt-5">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {[
            dataTab.map((item, index) => (
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
          {+tab === 1 && <BCategoryAdmin data={categoriesBlog} />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogAdminManager;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const tab = query.tab || "0";
  const data = await Promise.all([CategoryBlogAction.getAll()])

  return {
    props: { tab, categoriesBlog:data[0] },
  };
};
