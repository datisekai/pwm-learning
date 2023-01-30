import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import BlogAction from "../../../actions/Blog.action";
import Breadcumb from "../../../components/Breadcumb";
import BlogCard from "../../../components/cards/BlogCard";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";
import { BlogModel } from "../../../models/Blog.model";

interface DetailBlogProps {
  data: BlogModel;
}

const DetailBlog: NextPage<DetailBlogProps> = ({ data }) => {
  const router = useRouter();
  const { isLoading } = useQuery(
    ["increase-view", router?.query?.slug || 1],
    () => {
      return BlogAction.increaseView(router?.query?.slug?.toString() || "1");
    }
  );


  const { data: dataRecommend } = useQuery(
    ["recommend-blog", data.categoriesBlogId],
    () =>
      BlogAction.search({ categoriesBlogId: data.categoriesBlogId, limit: 8, id:data.id })
  );

  return (
    <>
      <Meta
        title="Blog | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="max-w-[860px] mx-auto px-2 py-4">
          <Breadcumb
            pre={{
              title: data.categories_blog?.name || "",
              url: `/blog/${data.categories_blog?.slug}`,
            }}
            current={"Blog"}
          />
          <div className="mt-10 leading-8">
            <h1 className="font-bold text-lg">{data.name}</h1>
            <p className="text-[#666] text-sm mt-2">Ngày 31/12/2022</p>

            <p className="mt-5">{data.description}</p>
            <div className="mt-5">
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>

            {dataRecommend && (
              <div className="mt-5 pb-10">
                <h2 className="font-bold uppercase text-primary text-center">
                  Có thể bạn quan tâm
                </h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
                  {dataRecommend.map((item: any) => (
                    <BlogCard key={item.id} data={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default DetailBlog;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const blogs = (await BlogAction.getAll()) || [];
//   return {
//     paths: blogs.map((item: any) => ({ params: { slug: item.slug } })),
//     fallback: false,
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  const data = await BlogAction.getBySlug(slug);

  return {
    props: {
      data: data,
    },
    revalidate:60
  };
};

