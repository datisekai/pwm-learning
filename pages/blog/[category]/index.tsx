import { GetServerSideProps, NextPage } from "next";
import CategoryBlogAction from "../../../actions/CategoryBlog.action";
import Breadcumb from "../../../components/Breadcumb";
import BlogCard from "../../../components/cards/BlogCard";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";
import { CategoryBlogModel } from "../../../models/CategoryBlog.model";
interface BlogProps {
  blogs: CategoryBlogModel;
}
const Blog: NextPage<BlogProps> = ({ blogs }) => {
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
          <div className="flex items-center flex-col md:flex-row mt-4">
            <div className="flex-1">
              {blogs && blogs.blogs && blogs?.blogs?.length > 0 && (
                <BlogCard  data={blogs.blogs[0]} />
              )}
            </div>
            <div className="flex-1 mt-2 md:mt-0 grid grid-cols-2 gap-2 md:ml-2">
              {blogs &&
                blogs.blogs &&
                blogs.blogs.length > 1 &&
                blogs.blogs.map((item, index) => {
                  if (index > 0 && index < 5) {
                    return <BlogCard  key={item.id} data={item} />;
                  }
                })}
            </div>
          </div>
          {/* {blogs && blogs.blogs && blogs.blogs.length >= 15 &&  (
            <div className="flex flex-col md:flex-row mt-4 justify-between bg-primary p-2">
              <div className="w-full md:w-[30%]">
                {blogs.blogs.map((item, index) => {
                  if (index >= 5 && index <= 10) {
                    return <BlogCard2 key={item.id} data={item} />;
                  }
                })}
              </div>
              <div className="w-full mb-2 md:w-[40%] md:ml-2">
                <BlogCard3 data={blogs.blogs[11]} />
              </div>
              <div className="w-full md:w-[30%] md:ml-2">
                <BlogCard3
                  aspect="16/9"
                  data={blogs.blogs[12]}
                  isDesc={false}
                />
                <BlogCard3
                  aspect="16/9"
                  data={blogs.blogs[13]}
                  isDesc={false}
                />
              </div>
            </div>
          )} */}
          {blogs && blogs.blogs && (
            <div className="mt-2 grid grid-cols-2  md:grid-cols-4 gap-x-2 gap-y-4">
              {blogs &&
                blogs.blogs &&
                blogs.blogs.map((item, index) => {
                  if (index >= 5) {
                    return <BlogCard  key={item.id} data={item} />;
                  }
                })}
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
  if (!category) {
    return {
      notFound: true,
    };
  }
  const data = await CategoryBlogAction.getBySlug(category.toString());
  return {
    props: {
      blogs: data,
    },
  };
};
