import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import CategoryAction from "../../../actions/Category.action";
import CategoryBlogAction from "../../../actions/CategoryBlog.action";
import Breadcumb from "../../../components/Breadcumb";
import BlogCard from "../../../components/cards/BlogCard";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";
import BlogSkeletonCard from "../../../components/skeletons/BlogSkeletonCard";
import { CategoryBlogModel } from "../../../models/CategoryBlog.model";
interface BlogProps {
  category: string;
}
const Blog: NextPage<BlogProps> = ({ category }) => {
  const { data: blogs, isLoading } = useQuery(["category-blog", category], () =>
    CategoryBlogAction.getBySlug(category)
  );

  return (
    <>
      <Meta
        title="Blog - PWM"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description="Tin tức PWM"
      />
      <MainLayout>
        <div className="max-w-[1200px] py-4 mx-auto px-2">
          <Breadcumb current="Tin tức" />
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              <BlogSkeletonCard/>
              <BlogSkeletonCard/>
              <BlogSkeletonCard/>
              <BlogSkeletonCard/>
              <BlogSkeletonCard/>
              <BlogSkeletonCard/>
              <BlogSkeletonCard/>
              <BlogSkeletonCard/>
            </div>
          ) : (
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
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Blog;
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const category = query.category;
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
    },
  };
};
