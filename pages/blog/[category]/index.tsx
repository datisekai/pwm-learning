import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import CategoryBlogAction from "../../../actions/CategoryBlog.action";
import Breadcumb from "../../../components/Breadcumb";
import BlogCard from "../../../components/cards/BlogCard";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";
import BlogSkeletonCard from "../../../components/skeletons/BlogSkeletonCard";

const Blog = () => {
  const router = useRouter();

  const { category, page = 1, limit = 9 } = router.query;

  const { data: blogs, isLoading } = useQuery(
    [
      "category-blog",
      {
        category,
        page,
        limit,
      },
    ],
    () =>
      CategoryBlogAction.getBySlug({
        slug: category,
        page,
        limit,
      })
  );



  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
            <Breadcumb current={blogs?.name || "PWM"} />
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
                {/* Ẩn trên mobile do iphone bị lỗi, đã có fix bên dưới... */}
                <div className="hidden md:grid flex-1 mt-2 md:mt-0 grid-cols-2 gap-2 md:ml-2">
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

              {/* Thêm để fix lỗi responsive trên iphone... */}
              <div className="grid grid-cols-2 gap-2 md:hidden mt-2">
                {blogs &&
                  blogs.blogs &&
                  blogs.blogs.length > 1 &&
                  blogs.blogs.map((item: any, index: number) => {
                    if (index > 0 && index < 5) {
                      return <BlogCard key={item.id} data={item} />;
                    }
                  })}
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
                forcePage={+(page || 1) - 1}
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

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const category = query.category;
//   const page = query.page || 1;
//   const limit = query.limit || 9;
//   if (!category) {
//     return {
//       notFound: true,
//     };
//   }
//   // const data = await CategoryBlogAction.getBySlug(category.toString());
//   return {
//     props: {
//       // blogs: data,
//       category,
//       page,
//       limit,
//     },
//   };
// };
