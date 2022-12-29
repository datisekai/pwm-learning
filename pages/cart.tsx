import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { LazyLoadImage } from "react-lazy-load-image-component";
const inter = Inter({ subsets: ["latin"] });
import {
  faTrashCan,
  faSubtract,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layouts/MainLayout";
import Meta from "../components/Meta";
export default function Home() {
  return (
    <>
      <Meta
        title="Giỏ hàng | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="py-10 px-10 overflow-auto">
          <h1 className="font-sans text-2xl text-orange-600 font-bold text-center">
            YOUR CART
          </h1>
          <table className="shadow-md bg-white m-auto my-8">
            <tbody>
              <tr>
                <th className="w-55 text-center px-8 py-4">PRODUCT</th>
                <th className="w-55 text-center px-8 py-4">PRICE</th>
                <th className="w-55 text-center px-8 py-4">QUANTITY</th>
                <th className="w-55 text-center px-8 py-4">ACT</th>
                <th className="w-55 text-center px-8 py-4">TOTAL</th>
              </tr>
              <tr>
                <td className="text-center border-b px-8 py-4">
                  <LazyLoadImage
                    src={"../../images/2.jpg"}
                    className="size-imgCart m-auto"
                  />
                </td>
                <td className="font-bold text-center border-b px-8 py-4">
                  11.111.111 đ
                </td>
                <td className="font-bold text-center border-b px-8 py-4">
                  <div className="flex">
                    <FontAwesomeIcon icon={faSubtract} className="w-5 m-auto mx-5" />
                     2 
                    <FontAwesomeIcon icon={faAdd} className="w-5 m-auto mx-5" />
                  </div>
                </td>
                <td className="text-center border-b px-8 py-4">
                  <FontAwesomeIcon icon={faTrashCan} className="w-6 m-auto" />
                </td>
                <td className="font-bold text-center border-b px-8 py-4">
                  22.222.222 đ
                </td>
              </tr>
              <tr>
                <td className="text-center border-b px-8 py-4">
                  <LazyLoadImage
                    src={"../../images/2.jpg"}
                    className="size-imgCart m-auto"
                  />
                </td>
                <td className="font-bold text-center border-b px-8 py-4">
                  11.111.111 đ
                </td>
                <td className="font-bold text-center border-b px-8 py-4">
                  <div className="flex">
                    <FontAwesomeIcon icon={faSubtract} className="w-5 m-auto mx-5" />
                    2
                    <FontAwesomeIcon icon={faAdd} className="w-5 m-auto mx-5" />
                  </div>
                </td>
                <td className="text-center border-b px-8 py-4">
                  <FontAwesomeIcon icon={faTrashCan} className="w-6 m-auto" />
                </td>
                <td className="font-bold text-center border-b px-8 py-4">
                  22.222.222 đ
                </td>
              </tr>
            </tbody>
          </table>
          <div className="float-right">
            <div className="flex">
            <h1 className="font-sans border-black text-xl font-bold text-center border-b-2">
              SUBTOTAL :
            </h1>
            <h1 className="text-orange-600 font-sans text-xl font-bold text-center ml-2">
              111.111.110 đ
            </h1>
            </div>
            <button className="w-full flex my-8 mx-auto bg-orange-600 py-5 justify-center text-white font-bold">
              CHECK OUT
            </button>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
