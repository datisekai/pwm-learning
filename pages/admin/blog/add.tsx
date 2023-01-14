import React, { useState, useEffect, useMemo, useRef } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import TextField from "../../../components/customs/TextField";
import { useForm } from "react-hook-form";
import Select from "../../../components/customs/Select";
import TextArea from "../../../components/customs/TextArea";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
export interface Sku {
  price: string;
  discount: string;
  file?: File;
  preview: string;
  skuPhanLoai: string;
}

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [addData, setVal] = useState("");
  const [addedData, showData] = useState(0);
  const handleChange = (e: any, editor: any) => {
    const data = editor.getData();
    setVal(data);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },
  });

  const [groupClassify, setGroupClassify] = useState([
    {
      id: uuidv4(),
      text: "",
    },
  ]);

  const [classify1, setClassify1] = useState([
    {
      id: uuidv4(),
      text: "",
    },
  ]);

  const [classify2, setClassify2] = useState([
    {
      id: uuidv4(),
      text: "",
    },
  ]);

  const [thumbnail, setThumbnail] = useState<any>();
  const [preview, setPreview] = useState("");

  const [skus, setSkus] = useState<Sku[]>([]);

  const maxLength = 120;

  const name = watch("name");

  const handleAdd = (data: any) => {};

  const isExistElement = (array: any) => {
    if (array.length > 0 && array[0].text != "") {
      return true;
    }

    return false;
  };

  const dataTable = useMemo(() => {
    const data: any = [];
    classify1.forEach((item) => {
      if (item.text != "") {
        if (!isExistElement(classify2)) {
          data.push([item]);
        } else {
          classify2.forEach((element) => {
            if (element.text != "") {
              data.push([item, element]);
            }
          });
        }
      }
    });

    setSkus(
      data.map(() => ({
        price: "",
        discount: "",
        preview: "",
        file: null,
        skuPhanLoai: "",
      }))
    );

    return data;
  }, [classify1, classify2]);

  return (
    <>
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
                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Danh mục blog</span>
                    <div className="ml-4 flex-1">
                      <Select
                        error={errors}
                        name="category"
                        rules={{
                          required: "Không được để trống ô",
                        }}
                        control={control}
                        className="px-4 h-[34px] outline-none border rounded-md w-full"
                        data={[{ value: 0, text: "Blog trang sức" }]}
                      />
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

                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Mô tả</span>
                    <div className="ml-4 flex-1">
                      <TextArea
                        control={control}
                        error={errors}
                        rules={{
                          required: "Không được để trống ô",
                          minLength: {
                            value: 100,
                            message:
                              "Mô tả của bạn quá ngắn. Vui lòng nhập ít nhất 100 kí tự",
                          },
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
                        textAlign: "left",
                        maxWidth: "850px",
                      }}
                    >
                      <SunEditor                        
                        setOptions={{
                          buttonList: [
                            ["undo", "redo"],
                            ["font", "fontSize", "formatBlock"],
                            ["paragraphStyle", "blockquote"],
                            [
                              "bold",
                              "underline",
                              "italic",
                              "strike",
                              "subscript",
                              "superscript",
                            ],
                            ["fontColor", "hiliteColor", "textStyle"],
                            ["removeFormat"],
                            "/", // Line break
                            ["outdent", "indent"],
                            ["align", "horizontalRule", "list", "lineHeight"],
                            [
                              "table",
                              "link",
                              "image",
                              "video",
                              "audio" /** ,'math' */,
                            ], // You must add the 'katex' library at options to use the 'math' plugin.
                            /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                            ["fullScreen", "showBlocks", "codeView"],
                            ["preview", "print"],
                            ["save", "template"],
                          ],
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSubmit(handleAdd)}
                      className="text-white bg-primary  py-1 rounded-md w-[150px]"
                    >
                      Lưu sản phẩm
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
