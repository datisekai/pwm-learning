import { Inter } from "@next/font/google";
import { BiTrash } from "react-icons/bi";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { RiSubtractLine } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../components/context";
import MainLayout from "../components/layouts/MainLayout";
import Meta from "../components/Meta";
import React, { useEffect } from "react";
import { SkuCartModel } from "../models/Sku.model";
import { formatPrices, getImageServer } from "../utils";
import { useForm } from "react-hook-form";
import TextField from "../components/customs/TextField";
import swal from "sweetalert";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import OrderAction from "../actions/Order.action";
import { useRouter } from "next/router";
import { IsBrowser } from "../components/IsBrower";
import CartAction from "../actions/Cart.action";
import Select from "../components/customs/Select";
const cssInputCurrent = "px-2 py-1 mt-2 w-full bg-orange-300 rounded";

export default function Home() {
  const { cart, setCart } = React.useContext(AuthContext);
  const handleChangeQty = (id: number, value: number) => {
    if (value < 1) {
      return;
    }
    const newCart = cart.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          qty: value,
        };
      }
      return item;
    });

    setCart(newCart);
  };

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const [valueCity, setValueCity] = React.useState({ value: -1, text: "" });
  const [valueDistrict, setValueDistrict] = React.useState({
    value: -1,
    text: "",
  });
  const [valueWard, setValueWard] = React.useState({ value: -1, text: "" });

  const handleSelectChange = (e: any, type: String) => {
    const value = parseInt(e.target.value);
    const text = e.target.options[e.target.selectedIndex].text;
    if (type === "city") {
      setValueCity({ value, text });
      setValueDistrict({ value: -1, text: "" });
      setValueWard({ value: -1, text: "" });
    } else if (type === "district") {
      setValueDistrict({ value, text });
      setValueWard({ value: -1, text: "" });
    } else {
      setValueWard({ value, text });
    }
  };
  const getAddress = () => {
    console.log(valueCity, valueDistrict, valueWard);
    if (
      valueCity.value !== -1 &&
      valueDistrict.value !== -1 &&
      valueWard.value !== -1
    ) {
      setValue(
        "address",
        valueCity.text + ", " + valueDistrict.text + ", " + valueWard.text
      );
      return;
    }
    setValue("address", "");
  };

  const [cities, setCities] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);

  const apiAddress = "https://provinces.open-api.vn/api/?depth=3";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiAddress);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDistricts([]);
    setWards([]);
    cities.map((item: any) => {
      if (item.code === valueCity.value) {
        setDistricts(item.districts);
      }
    });
    getAddress();
  }, [valueCity]);

  useEffect(() => {
    setWards([]);
    districts.map((item: any) => {
      if (item.code === valueDistrict.value) {
        setWards(item.wards);
      }
    });
    getAddress();
  }, [valueDistrict]);

  useEffect(() => {
    getAddress();
  }, [valueWard]);

  const router = useRouter();

  const { user } = React.useContext(AuthContext);

  const { mutate, isLoading } = useMutation(OrderAction.add, {
    onSuccess: () => {
      swal(
        "Đặt hàng thành công",
        "Chúng tôi sẽ liên hệ với bạn ngay sau khi xác nhận đơn hàng",
        "success"
      );
      setCart([]);
      router.push("/history");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const shipping = 0;

  const subTotal = React.useMemo(() => {
    return cart.reduce((pre: number, cur: any) => {
      return pre + (cur.price - (cur.price * cur.discount) / 100) * cur.qty;
    }, 0);
  }, [cart]);

  const handleOrder = (data: any) => {
    if (cart.length === 0) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      return;
    }
    swal({
      title: "Bạn có chắc chắn thanh toán",
      text: `Số tiền cần thanh toán là ${formatPrices(shipping + subTotal)}`,
      icon: "warning",
      buttons: ["Hủy", "OK"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const payload = {
          ...data,
          skus: cart,
        };
        mutate(payload);
      }
    });
  };

  const handleDeleteItemCart = (item: any) => {
    swal({
      title: "Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?",
      icon: "warning",
      buttons: ["Hủy", "OK"],
      dangerMode: true,
    }).then((willDeleteItemCart) => {
      if (willDeleteItemCart) {
        setCart(cart.filter((element: any) => element.id !== item.id));
      }
    });
  };
  return (
    <>
      <Meta
        title="Giỏ hàng | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <IsBrowser>
        <MainLayout>
          <div className="px-2 py-4 lg:p-10 rounded-md bg-gray-200 md:m-10 m-5 lg:flex block">
            <div className="lg:w-8/12 xl:w-7/12 w-full">
              <h1 className="font-sans text-2xl text-orange-600 font-bold text-center">
                Giỏ hàng của bạn
              </h1>
              <div className="bg-white rounded-md mt-5 md:block hidden">
                {cart?.length === 0 && (
                  <p className="text-center py-2">Chưa có sản phẩm</p>
                )}
                {cart?.map((item: SkuCartModel) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-5 items-center px-3 py-10 gap-4"
                  >
                    <div className="flex ">
                      <LazyLoadImage
                        src={
                          item.image
                            ? getImageServer(item.image)
                            : "/images/logo.jpg"
                        }
                        className="m-auto w-[50px] h-[50px]"
                      />
                    </div>
                    <div className="text-center font-bold text-base dark:text-black">
                      <div className="line-clamp-2">{item.productName}</div>
                    </div>
                    <div className="items-center flex">
                      <RiSubtractLine
                        onClick={() =>
                          item.qty > 1 && handleChangeQty(item.id, item.qty - 1)
                        }
                        className="text-[25px] m-auto mx-2 dark:text-black hover:cursor-pointer"
                      />
                      <input
                        value={item.qty}
                        onChange={(e) =>
                          handleChangeQty(item.id, +e.target.value)
                        }
                        className="w-10 outline-none h-10 text-center border-2 rounded-md border-black"
                      />
                      <GrFormAdd
                        onClick={() => handleChangeQty(item.id, item.qty + 1)}
                        className="text-[25px] m-auto mx-2 hover:cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center space-x-2  text-center p-4 text-base dark:text-black">
                      <div className="space-x-2">
                        <span className="font-bold">
                          {formatPrices(
                            (item.price - (item.price * item.discount) / 100) *
                              item.qty
                          )}
                        </span>
                        <span className="text-primary">x{item.qty}</span>
                      </div>
                      <p></p>
                    </div>
                    <div onClick={() => handleDeleteItemCart(item)}>
                      <BiTrash className="text-[25px] m-auto dark:text-black hover:cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-md mt-5 md:hidden block">
                {cart?.length === 0 && (
                  <p className="text-center py-2">Chưa có sản phẩm</p>
                )}
                {cart?.length > 0 &&
                  cart.map((item: any) => (
                    <div
                      key={item.id}
                      className="grid grid-flow-col items-center px-3 py-10 gap-4"
                    >
                      <div className="flex">
                        <LazyLoadImage
                          src={
                            item.image
                              ? getImageServer(item.image)
                              : "/images/logo.jpg"
                          }
                          className="m-auto w-[50px] h-[50px]"
                        />
                      </div>
                      <div>
                        <div className="text-center font-bold text-base dark:text-black">
                          {item.productName}
                        </div>
                        <div className="items-center justify-center flex mt-4">
                          <RiSubtractLine
                            onClick={() =>
                              item.qty > 1 &&
                              handleChangeQty(item.id, item.qty - 1)
                            }
                            className="text-[25px] m-auto mx-2 dark:text-black hover:cursor-pointer"
                          />
                          <input
                            value={item.qty}
                            onChange={(e) =>
                              handleChangeQty(item.id, +e.target.value)
                            }
                            className="w-9 h-9 text-center border-2 rounded-md border-black"
                          />
                          <GrFormAdd
                            onClick={() =>
                              handleChangeQty(item.id, item.qty + 1)
                            }
                            className="text-[25px] m-auto mx-2 hover:cursor-pointer"
                          />
                        </div>
                        <div className="font-bold text-center mt-4 text-base dark:text-black">
                          {formatPrices(
                            (item.price - (item.price * item.discount) / 100) *
                              item.qty
                          )}
                        </div>
                      </div>
                      <div>
                        <BiTrash
                          onClick={() =>
                            setCart(
                              cart.filter(
                                (element: any) => element.id !== item.id
                              )
                            )
                          }
                          className="text-[25px] m-auto dark:text-black hover:cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="lg:w-4/12 xl:w-5/12 w-full rounded-md bg-orange-500 lg:ml-10 p-5 lg:mt-0 mt-5">
              <h1 className="font-sans text-2xl text-white font-bold text-center">
                Thanh toán
              </h1>
              <div className="mt-5">
                <label className="text-gray-100 font-bold">
                  Phương thức thanh toán
                </label>
                <div className="grid grid-cols-3 gap-6 mt-3">
                  <div className="rounded-md border-2 border-black p-2 shadow-2xl hover:cursor-pointer">
                    <LazyLoadImage
                      src={"../../images/paycod.png"}
                      className="m-auto w-[50px] h-[50px]"
                    />
                  </div>
                  {/* <div className="rounded-md border-2 border-black p-2 shadow-2xl hover:cursor-pointer">
                  <LazyLoadImage
                    src={"../../images/paycard.png"}
                    className="m-auto w-[50px] h-[50px]"
                  />
                </div>
                <div className="rounded-md border-2 border-black p-2 shadow-2xl hover:cursor-pointer">
                  <LazyLoadImage
                    src={"../../images/momo.svg"}
                    className="m-auto w-[50px] h-[50px]"
                  />
                </div> */}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mt-3">
                  <label className="text-gray-100 font-bold">Họ tên</label>
                  <TextField
                    errorTextColor="text-[#EE0000]"
                    control={control}
                    error={errors}
                    name="name"
                    className={cssInputCurrent}
                    rules={{ required: "Không được bỏ trống" }}
                  />
                </div>

                <div className="mt-3">
                  <label className="text-gray-100 font-bold">
                    Số điện thoại
                  </label>
                  <TextField
                    errorTextColor="text-[#EE0000]"
                    control={control}
                    error={errors}
                    name="phone"
                    className={cssInputCurrent}
                    rules={{
                      required: "Không được bỏ trống",
                      pattern: {
                        value:
                          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                        message: "Định dạng SDT chưa đúng",
                      },
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-100 font-bold">Địa chỉ</label>
                <div className="flex">
                  <select
                    name="city"
                    className={"css-field mr-1 !bg-orange-300"}
                    onChange={(e) => handleSelectChange(e, "city")}
                  >
                    <option selected={false} value={-1}>
                      Thành phố/tỉnh
                    </option>
                    {cities?.map((item: any) => (
                      <option key={item.code} value={`${item.code}`}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <select
                    disabled={valueCity.value === -1 ? true : false}
                    name="district"
                    className={"css-field mr-1 !bg-orange-300"}
                    onChange={(e) => handleSelectChange(e, "district")}
                  >
                    <option selected={false} value={-1}>
                      Quận/huyện
                    </option>
                    {districts?.map((item: any) => (
                      <option key={item.code} value={`${item.code}`}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <select
                    disabled={valueDistrict.value === -1 ? true : false}
                    name="ward"
                    className={"css-field !bg-orange-300"}
                    onChange={(e) => handleSelectChange(e, "ward")}
                  >
                    <option selected={false} value={-1}>
                      Phường/xã
                    </option>
                    {wards?.map((item: any) => (
                      <option key={item.code} value={`${item.code}`}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <TextField
                  errorTextColor="text-[#EE0000]"
                  control={control}
                  error={errors}
                  name="address"
                  className={cssInputCurrent && "hidden"}
                  rules={{ required: "Không được bỏ trống" }}
                />
              </div>

              <div className="border-t-2 mt-7 border-orange-400">
                <div className="grid grid-cols-2 mt-3">
                  <div className="text-gray-100 font-bold">Subtotal</div>
                  <div className="text-right text-gray-100 font-bold">
                    {formatPrices(subTotal)}
                  </div>
                </div>
                <div className="grid grid-cols-2 mt-3">
                  <div className="text-gray-100 font-bold">Shipping</div>
                  <div className="text-right text-gray-100 font-bold">
                    {formatPrices(shipping)}
                  </div>
                </div>
                <div className="grid grid-cols-2 mt-3">
                  <div className="text-gray-100 font-bold">Total</div>
                  <div className="text-right text-gray-100 font-bold">
                    {formatPrices(subTotal + shipping)}
                  </div>
                </div>
              </div>
              <div
                onClick={
                  !user
                    ? () => toast.error("Bạn cần đăng nhập")
                    : !isLoading
                    ? handleSubmit(handleOrder)
                    : undefined
                }
                className="rounded-md hover:bg-green-800 transition-all bg-green-600 py-2 px-3 mt-5 items-center text-[30px] flex hover:cursor-pointer"
              >
                <div className="text-gray-100 font-bold w-3/4">
                  {formatPrices(subTotal + shipping)}
                </div>
                <div className="flex text-gray-100 font-bold items-center w-1/4">
                  Pay{" "}
                  <BsFillArrowRightSquareFill className="ml-3 text-[30px]" />
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      </IsBrowser>
    </>
  );
}
