import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import CategoryAction from "../../../actions/Category.action";
import CategoryBlogAction from "../../../actions/CategoryBlog.action";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";
import React from "react";
import { CiAlignBottom } from "react-icons/ci";
import BlogCard from "../../../components/cards/BlogCard";
import Breadcumb from "../../../components/Breadcumb";
import BlogSkeletonCard from "../../../components/skeletons/BlogSkeletonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

interface BlogProps {
  category: string;
  page: string | number;
  limit: string | number;
}
const Blog: NextPage<BlogProps> = ({ category, page, limit }) => {
  // const { data: blogs, isLoading } = useQuery(["category-blog", category], () =>
  //   CategoryBlogAction.getBySlug(category)
  // );

  const router = useRouter();

  // const { data, fetchNextPage, isLoading, isFetching, isFetchingNextPage } =
  //   useInfiniteQuery(
  //     ["category-blog", { category, page }],
  //     ({ pageParam }) => {
  //       return CategoryBlogAction.getBySlug({
  //         slug: category,
  //         page: pageParam,
  //         limit: 2,
  //       });
  //     },
  //     {
  //       getNextPageParam: (lastPage: any, allPages: any) => {
  //         if (+page < +lastPage.totalPage) {
  //           return +page + 1;
  //         }
  //       },
  //     }
  //   );

  const { data: blogs, isLoading } = useQuery(
    [
      "category-blog",
      {
        category,
        page,
        limit
      },
    ],
    () =>
      CategoryBlogAction.getBySlug({
        slug: category,
        page,
        limit,
      })
  );

  // const blogs = React.useMemo(() => {
  //   if (data) {
  //     // return data.pages.reduce(
  //     //   (pre, cur) => {
  //     //     return { ...cur, blogs: [...pre.blogs, ...cur.blogs] };
  //     //   },
  //     //   {
  //     //     blogs: [],
  //     //   }
  //     // );
  //     return data.pages[data.pages.length - 1];
  //   }

  //   return {
  //     blogs: [],
  //   };
  // }, [data]);

  return (
    <>
      <Meta
        title="Blog - PWM"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description="Tin tức PWM"
      />
      <MainLayout>
        <div className="max-w-[1200px] py-4 mx-auto px-2">
          <div className="flex items-center justify-between">
            <Breadcumb current="Tin tức" />
            <>
              <select
                id="displays"
                defaultValue={9}
                onChange={(e) =>
                  router.push({
                    query: { ...router.query, page: 1, limit: e.target.value },
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="5">5</option>
                <option value="9">9</option>
                <option value="13">13</option>
                <option value="17">17</option>
                <option value="21">21</option>
              </select>
            </>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              <BlogSkeletonCard />
              <BlogSkeletonCard />
              <BlogSkeletonCard />
              <BlogSkeletonCard />
              <BlogSkeletonCard />
              <BlogSkeletonCard />
              <BlogSkeletonCard />
              <BlogSkeletonCard />
            </div>
          ) : (
            // <InfiniteScroll
            //   dataLength={blogs?.blogs}
            //   next={() => fetchNextPage()}
            //   hasMore={true}
            //   loader={<p></p>}
            //   endMessage={<p>Hết</p>}
            // >
            <>
              <div className="flex items-center flex-col md:flex-row mt-4">
                <div className="flex-1">
                  {blogs && blogs.blogs && blogs?.blogs?.length > 0 && (
                    <BlogCard data={blogs.blogs[0]} />
                  )}
                </div>
                <div className="flex-1 mt-2 md:mt-0 grid grid-cols-2 gap-2 md:ml-2">
                  {blogs &&
                    blogs.blogs &&
                    blogs.blogs.length > 1 &&
                    blogs.blogs.map((item: any, index: number) => {
                      if (index > 0 && index < 5) {
                        return <BlogCard key={item.id} data={item} />;
                      }
                    })}
                </div>
              </div>

              {blogs && blogs.blogs && (
                <div className="mt-2 grid grid-cols-2  md:grid-cols-4 gap-x-2 gap-y-4">
                  {blogs &&
                    blogs.blogs &&
                    blogs.blogs.map((item: any, index: number) => {
                      if (index >= 5) {
                        return <BlogCard key={item.id} data={item} />;
                      }
                    })}
                </div>
              )}
            </>
            // </InfiniteScroll>
          )}

          {blogs?.totalPage > 1 && (
            <div className="mt-4">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                forcePage={+page - 1}
                onPageChange={(e) => {
                  if (+e.selected < +blogs?.totalPage) {
                    router.push({
                      query: { ...router.query, page: +e.selected + 1 },
                    });
                  }
                }}
                pageRangeDisplayed={5}
                pageCount={blogs.totalPage}
                previousLabel={<span>{`<`}</span>}
              />
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Blog;
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const category = query.category;
  const page = query.page || 1;
  const limit = query.limit || 9;
  if (!category) {
    return {
      notFound: true,
    };
  }
  // const data = await CategoryBlogAction.getBySlug(category.toString());
  return {
    props: {
      // blogs: data,
      category,
      page,
      limit,
    },
  };
};
