import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { FcAddImage } from "react-icons/fc";
import TextField from "../../../components/customs/TextField";
import { useForm } from "react-hook-form";
import Select from "../../../components/customs/Select";
import TextArea from "../../../components/customs/TextArea";
import { GrClose } from "react-icons/gr";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import TableProductAdmin from "../../../components/admin/products/TableProductAdmin";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CategoryAction from "../../../actions/Category.action";
import { CategoryModel } from "../../../models/Category.model";
import { uploadImg } from "../../../utils";
import { toast } from "react-hot-toast";
import ProductAction from "../../../actions/Product.action";
import { useRouter } from "next/router";

export interface Sku {
  price: string;
  discount: string;
  file?: File;
  preview: string;
  skuPhanLoai: string;
}

interface AddProductProps {
  categories: CategoryModel[];
}

const AddProduct: React.FC<AddProductProps> = ({ categories }) => {
  
  useEffect(() => {
  },[])

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
      attributeId:groupClassify[0].id
    },
  ]);

  const [classify2, setClassify2] = useState([
    {
      id: uuidv4(),
      text: "",
      attributeId:groupClassify.length > 1 && groupClassify[1].id
    },
  ]);

  const router = useRouter()

  const [thumbnail, setThumbnail] = useState<any>();
  const [preview, setPreview] = useState("");

  const [skus, setSkus] = useState<Sku[]>([]);

  const maxLength = 120;

  const name = watch("name");

  const handleAdd = async (data: any) => {
    const newProduct:any = {
      categoryId: data.category,
      name: data.name,
      description: data.description,
      thumbnail: "",
      attributes: groupClassify
        .filter((item) => item.text != "")
        .map((item) => ({ ...item, name: item.text, text: undefined })),
      skuValue: [],
    };

    if(!thumbnail){
      toast.error("Vui lòng chọn ảnh chính");
      return;
    }

    if(newProduct.attributes.length === 0){
      toast.error("Vui lòng nhập nhóm phân loại")
      return;
    }

    if(classify1.length === 0){
      toast.error("Vui lòng nhập chi tiết phân loại")
      return;
    }
    
    if(newProduct.attributes.length === 2){
      if(classify2.length === 0){
        toast.error("Vui lòng nhập chi tiết phân loại")
        return;
      }
    }

    if(skus.some((item:any) => item.file == null || item.price == "" || item.discount == "" || item.sku == "")){
      toast.error("Vui lòng nhập đầy đủ thông tin biến thể")
      return;
    }

    newProduct.thumbnail = await uploadImg(thumbnail)

    const images = await Promise.all(skus.map((item) => uploadImg(item.file)));

    dataTable.forEach((item:any,index:number) => {
      newProduct.skuValue.push({
        detailAttributes:item.map((element:any) => ({attributeId:element.attributeId, name:element.text})),
        price:skus[index].price,
        discount:skus[index].discount,
        sku:skus[index].skuPhanLoai,
        image:images[index]
      })
    })
    
    if(!newProduct.thumbnail){
      toast.error("Ảnh chính chưa hợp lệ, vui lòng chọn ảnh khác")
      return;
    }

    const result = await ProductAction.add(newProduct);
    if(result && result.success){
     return router.push('/admin/product')
    }

  };

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
              Thêm sản phẩm
            </h1>
          </div>
          <div className="flex flex-col md:flex-row mt-10">
            <div
              className="p-4 rounded-3xl  flex flex-col md:flex-row w-full md:w-[60%]"
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
                        value={thumbnail?.preview || ""}
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
                    <span className="w-[150px]">Tên sản phẩm</span>
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
                                "Tên sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự",
                            },
                            maxLength: {
                              value: 120,
                              message:
                                "Tên sản phẩm của bạn quá dài. Vui lòng nhập tối đa 120 kí tự",
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
                    <span className="w-[150px]">Thể loại</span>
                    <div className="ml-4 flex-1">
                      <Select
                        error={errors}
                        name="category"
                        rules={{
                          required: "Không được để trống ô",
                        }}
                        control={control}
                        className="px-4 h-[34px] outline-none border rounded-md w-full"
                        data={categories.map((item) => ({
                          value: item.id,
                          text: item.name,
                        }))}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Mô tả sản phẩm</span>
                    <div className="ml-4 flex-1">
                      <TextArea
                        control={control}
                        error={errors}
                        rules={{
                          required: "Không được để trống ô",
                          minLength: {
                            value: 100,
                            message:
                              "Mô tả sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 100 kí tự",
                          },
                          maxLength: {
                            value: 3000,
                            message:
                              "Mô tả sản phẩm của bạn quá dài. Vui lòng nhập tối đa 3000 kí tự",
                          },
                        }}
                        name="description"
                        placeholder="Nhập vào"
                        className="w-full border px-4 py-1 rounded-md outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Phân loại hàng</span>
                    <div className="ml-4 flex-1">
                      {[
                        groupClassify.map((item, index) => (
                          <div
                            key={index}
                            className=" bg-gray-100 rounded-md relative p-2 flex-1 first:mt-0 mt-2"
                          >
                            {index > 0 && (
                              <div
                                onClick={() =>
                                  setGroupClassify(
                                    groupClassify.filter(
                                      (element, ind) => element.id !== item.id
                                    )
                                  )
                                }
                                className="absolute top-2 right-2 hover:cursor-pointer"
                              >
                                <GrClose />
                              </div>
                            )}
                            <div className="flex items-center text-[#666]">
                              <span className="w-[100px]">
                                Nhóm PL {index + 1}
                              </span>
                              <input
                                value={item.text}
                                onChange={(e) =>
                                  setGroupClassify(
                                    groupClassify.map((element, ind) => {
                                      if (element.id === item.id) {
                                        return {
                                          ...element,
                                          text: e.target.value,
                                        };
                                      }
                                      return element;
                                    })
                                  )
                                }
                                type="text"
                                className="ml-4 w-full md:w-[50%] rounded-md px-2 py-1 border outline-none "
                                placeholder="ví dụ: màu sắc v.v"
                              />
                            </div>
                            <div className="mt-2 flex items-center text-[#666]">
                              <span className="w-[100px]">Phân loại</span>
                              <div className="grid  flex-1 ml-4 grid-cols-2 gap-1">
                                {index === 0 &&
                                  classify1.map((element, ind) => (
                                    <div
                                      key={element.id}
                                      className="flex items-center first:ml-0"
                                    >
                                      <input
                                        value={element.text}
                                        onChange={(e) =>
                                          setClassify1(
                                            classify1.map((c) => {
                                              if (c.id === element.id) {
                                                return {
                                                  ...c,
                                                  text: e.target.value,
                                                };
                                              }
                                              return c;
                                            })
                                          )
                                        }
                                        type="text"
                                        className="rounded-md px-2 py-1 border w-full outline-none"
                                        placeholder="ví dụ: trắng, đỏ v.v"
                                      />
                                      <div className="flex items-center">
                                        {ind === classify1.length - 1 && (
                                          <AiOutlinePlus
                                            className="cursor-pointer"
                                            onClick={() =>
                                              setClassify1([
                                                ...classify1,
                                                {
                                                  attributeId:classify1[0].attributeId,
                                                  id: uuidv4(),
                                                  text: "",
                                                },
                                              ])
                                            }
                                            fontSize={20}
                                          />
                                        )}
                                        {ind > 0 && (
                                          <AiOutlineDelete
                                            onClick={() =>
                                              setClassify1(
                                                classify1.filter(
                                                  (c) => c.id !== element.id
                                                )
                                              )
                                            }
                                            fontSize={20}
                                            className="ml-1 cursor-pointer"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                {index === 1 &&
                                  classify2.map((element, ind) => (
                                    <div
                                      key={element.id}
                                      className="flex items-center first:ml-0"
                                    >
                                      <input
                                        value={element.text}
                                        onChange={(e) =>
                                          setClassify2(
                                            classify2.map((c) => {
                                              if (c.id === element.id) {
                                                return {
                                                  ...c,
                                                  text: e.target.value,
                                                };
                                              }
                                              return c;
                                            })
                                          )
                                        }
                                        type="text"
                                        className="rounded-md px-2 py-1 border w-full outline-none"
                                        placeholder="ví dụ: trắng, đỏ v.v"
                                      />
                                      <div className="flex items-center">
                                        {ind === classify2.length - 1 && (
                                          <AiOutlinePlus
                                            className="cursor-pointer"
                                            onClick={() =>
                                              setClassify2([
                                                ...classify2,
                                                {
                                                  id: uuidv4(),
                                                  text: "",
                                                  attributeId:classify2[0].attributeId
                                                },
                                              ])
                                            }
                                            fontSize={20}
                                          />
                                        )}
                                        {ind > 0 && (
                                          <AiOutlineDelete
                                            onClick={() =>
                                              setClassify2(
                                                classify2.filter(
                                                  (c) => c.id !== element.id
                                                )
                                              )
                                            }
                                            fontSize={20}
                                            className="ml-1 cursor-pointer"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        )),
                      ]}
                      {groupClassify.length === 1 && (
                        <button
                          onClick={() =>
                            {
                              const newId = uuidv4()
                              setGroupClassify([
                                ...groupClassify,
                                {
                                  id: newId,
                                  text: "",
                                },
                              ])

                              setClassify2(classify2.map(item => ({...item, attributeId:newId})))
                            }
                          }
                          className="mt-2 border rounded-sm px-4 py-1 text-primary hover:cursor-pointer hover:bg-gray-100"
                        >
                          Thêm nhóm phân loại 2
                        </button>
                      )}
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
            <div
              className="p-4 rounded-3xl mt-4 md:mt-0 flex flex-col md:flex-row w-full md:w-[40%] md:ml-4"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="">
                <h2 className="font-bold">Thông tin biến thể</h2>
                <div className="mt-5">
                  <TableProductAdmin
                    skus={skus}
                    handleChange={(data: Sku[]) => setSkus(data)}
                    dataTable={dataTable}
                    classify1={classify1}
                    classify2={classify2}
                    groupClassify={groupClassify}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AddProduct;

export const getServerSideProps = async () => {
  const categories = await CategoryAction.getAll();

  return {
    props: {
      categories,
    },
  };
};
