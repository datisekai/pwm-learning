import { useMutation } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import BlogAction from "../../../actions/Blog.action";
import CategoryBlogAction from "../../../actions/CategoryBlog.action";
import Select from "../../../components/customs/Select";
import TextArea from "../../../components/customs/TextArea";
import TextField from "../../../components/customs/TextField";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Meta from "../../../components/Meta";
import { CategoryBlogModel } from "../../../models/CategoryBlog.model";
import { uploadImg } from "../../../utils";

const TranslationArea = dynamic(
  () => import("../../../components/TranslationArea"),
  {
    ssr: false,
  }
);

interface AddBlogProps {
  categoriesBlog: CategoryBlogModel[];
}

const AddBlog: NextPage<AddBlogProps> = ({ categoriesBlog }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      categoriesBlogId: "",
      description: "",
      slug: "",
    },
  });

  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [preview, setPreview] = useState("");

  const maxLength = 120;

  const name = watch("name");

  const router = useRouter()

  const {mutate, isLoading} = useMutation(BlogAction.add, {
    onSuccess:() => {
      toast.success("Thêm thành công");
      router.push('/admin/blog');
    },
    onError:(err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại")
    }
  })

  const handleAdd = async(data: any) => {
    if (!thumbnail) {
      toast.error("Vui lòng chọn ảnh");
      return;
    }

    if(content.length < 50){
      toast.error("Nội dung quá ngắn, không được dưới 200 kí tự");
      return;
    }

    const image = await uploadImg(thumbnail);

    mutate({...data, thumbnail:image, content})
    
  };

  return (
    <>
    <Meta image="/images/logo.jpg" title="Thêm Blog | Admin" description="" />
      <AdminLayout>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
              Thêm bài đăng
            </h1>
          </div>
          <div className="flex flex-col md:flex-row mt-10">
            <div
              className="p-4 rounded-3xl  flex flex-col md:flex-row w-full md:w-[100%]"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="w-full">
                <h2 className="font-bold">Thông tin cơ bản</h2>

                <div className="mt-5">
                  <div className="flex items-center">
                    <span className="w-[150px]">Hình ảnh chính</span>
                    <div className="ml-4 ">
                      <input
                        type="file"
                        onChange={(e) => {
                          const file: any = e.target.files
                            ? e.target.files[0]
                            : null;
                          if (file) {
                            setPreview(URL.createObjectURL(file));
                            setThumbnail(file);
                          }
                        }}
                        className="hidden"
                        name=""
                        id="mainImage"
                      />
                      <label htmlFor="mainImage" className="cursor-pointer ">
                        {preview ? (
                          <LazyLoadImage
                            src={preview}
                            className="w-[40px] h-[40px]"
                            effect="blur"
                          />
                        ) : (
                          <FcAddImage fontSize={40} />
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center mt-2 ">
                    <span className="w-[150px]">Tiêu đề</span>
                    <div className="flex-1 ml-4 ">
                      <div className=" flex items-center border rounded-md">
                        <TextField
                          control={control}
                          error={errors}
                          showError={false}
                          rules={{
                            required: "Không được để trống ô",
                            minLength: {
                              value: 10,
                              message:
                                "Tiêu đề của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự",
                            },
                            maxLength: {
                              value: 120,
                              message:
                                "Tiêu đề của bạn quá dài. Vui lòng nhập tối đa 120 kí tự",
                            },
                          }}
                          name="name"
                          placeholder="Nhập vào"
                          className="w-full px-4 py-1 rounded-md outline-none"
                        />
                        <div className="border-l px-2 text-[#666]">
                          {name.length}/{maxLength}
                        </div>
                      </div>
                      <p className="py-1 text-primary text-sm">
                        {errors["name"] && errors["name"].message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 ">
                    <span className="w-[150px]">Slug</span>
                    <div className="flex-1 ml-4 ">
                      <TextField
                        control={control}
                        error={errors}
                        showError={false}
                        name="slug"
                        placeholder="kham-pha-y-nghia-ngon-tay-deo-nhan-nam"
                        className="w-full px-4 py-1 border rounded-md outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Danh mục blog</span>
                    <div className="ml-4 flex-1">
                      <Select
                        error={errors}
                        name="categoriesBlogId"
                        rules={{
                          required: "Không được để trống ô",
                        }}
                        control={control}
                        className="px-4 h-[34px] outline-none border rounded-md w-full"
                        data={categoriesBlog?.map((item) => ({
                          text: item.name,
                          value: item.id,
                        }))}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Mô tả</span>
                    <div className="ml-4 flex-1">
                      <TextArea
                        control={control}
                        error={errors}
                        rules={{
                          required: "Không được để trống ô",
                          maxLength: {
                            value: 3000,
                            message:
                              "Mô tả của bạn quá dài. Vui lòng nhập tối đa 3000 kí tự",
                          },
                        }}
                        name="description"
                        placeholder="Nhập vào"
                        className="w-full border px-4 py-1 rounded-md outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex">
                    <span className="w-[150px]">Nội dung</span>
                    <div
                      className="ml-4 flex-1"
                      style={{
                        display: "inline-block",
                        maxWidth: "100%",
                      }}
                    >
                      <TranslationArea onChange={setContent} />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                    disabled={isLoading}
                      onClick={handleSubmit(handleAdd)}
                      className="text-white bg-primary  py-1 rounded-md w-[150px]"
                    >
                      Lưu bài viết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AddBlog;

export const getServerSideProps: GetServerSideProps = async ({ query,req }) => {
  const data = await Promise.all([CategoryBlogAction.getAll()]);

  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");

  if(!detailActions.includes('blog:add')){
    return {
      props:{},
      redirect:{
        destination:'/admin'
      }
    }
  }

  return {
    props: {
      categoriesBlog: data[0],
    },
  };
};
