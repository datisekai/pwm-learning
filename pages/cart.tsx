import { Inter } from "@next/font/google";
import { BiTrash } from "react-icons/bi";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { RiSubtractLine } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../components/context";
import MainLayout from "../components/layouts/MainLayout";
import Meta from "../components/Meta";
import React from "react";
import { SkuCartModel } from "../models/Sku.model";
import { formatPrices, getImageServer } from "../utils";
import { useForm } from "react-hook-form";
import TextField from "../components/customs/TextField";
import swal from "sweetalert";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import OrderAction from "../actions/Order.action";
import { useRouter } from "next/router";

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
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const router = useRouter();
  const { mutate, isLoading } = useMutation(OrderAction.add, {
    onSuccess: () => {
      swal(
        "Đặt hàng thành công",
        "Chúng tôi sẽ liên hệ với bạn ngay sau khi xác nhận đơn hàng",
        "success"
      );
      setCart([])
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

  return (
    <>
      <Meta
        title="Giỏ hàng | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="px-2 py-4 lg:p-10 rounded-md bg-gray-200 md:m-10 m-5 lg:flex block">
          <div className="lg:w-8/12 xl:w-7/12 w-full">
            <h1 className="font-sans text-2xl text-orange-600 font-bold text-center">
              Giỏ hàng của bạn
            </h1>
            <div className="bg-white rounded-md mt-5 md:block hidden">
              {cart?.length === 0 && (
                <p className="text-center">Chưa có sản phẩm</p>
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
                  <div
                    onClick={() =>
                      setCart(
                        cart.filter((element: any) => element.id !== item.id)
                      )
                    }
                  >
                    <BiTrash className="text-[25px] m-auto dark:text-black hover:cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-md mt-5 md:hidden block">
              <div className="grid grid-flow-col items-center px-3 py-10 gap-4">
                <div className="flex">
                  <LazyLoadImage
                    src={"../../images/2.jpg"}
                    className="m-auto w-[50px] h-[50px]"
                  />
                </div>
                <div>
                  <div className="text-center font-bold text-base dark:text-black">
                    Bộ trang sức Kim Cương
                  </div>
                  <div className="items-center justify-center flex mt-4">
                    <RiSubtractLine className="text-[25px] m-auto mx-2 dark:text-black hover:cursor-pointer" />
                    <input
                      value={1}
                      className="w-9 h-9 text-center border-2 rounded-md border-black"
                    />
                    <GrFormAdd className="text-[25px] m-auto mx-2 hover:cursor-pointer" />
                  </div>
                  <div className="font-bold text-center mt-4 text-base dark:text-black">
                    22.222.222 đ
                  </div>
                </div>
                <div>
                  <BiTrash className="text-[25px] m-auto dark:text-black hover:cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-4/12 xl:w-5/12 w-full rounded-md bg-orange-500 lg:ml-10 p-5 lg:mt-0 mt-5">
            <h1 className="font-sans text-2xl text-white font-bold text-center">
              Thanh toán
            </h1>
            <div className="mt-5">
              <label className="text-gray-100 font-bold">Phương thức thanh toán</label>
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
                  errorTextColor="text-white"
                  control={control}
                  error={errors}
                  name="name"
                  className={cssInputCurrent}
                  rules={{ required: "Không được bỏ trống" }}
                />
              </div>

              <div className="mt-3">
                <label className="text-gray-100 font-bold">Số điện thoại</label>
                <TextField
                  errorTextColor="text-white"
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
              <TextField
                errorTextColor="text-white"
                control={control}
                error={errors}
                name="address"
                className={cssInputCurrent}
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
              onClick={!isLoading ? handleSubmit(handleOrder) : undefined}
              className="rounded-md hover:bg-green-800 transition-all bg-green-600 py-2 px-3 mt-5 items-center text-[30px] flex hover:cursor-pointer"
            >
              <div className="text-gray-100 font-bold w-3/4">
                {formatPrices(subTotal + shipping)}
              </div>
              <div className="flex text-gray-100 font-bold items-center w-1/4">
                Pay <BsFillArrowRightSquareFill className="ml-3 text-[30px]" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
