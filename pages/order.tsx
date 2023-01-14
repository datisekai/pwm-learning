import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { LazyLoadImage } from "react-lazy-load-image-component";
const inter = Inter({ subsets: ["latin"] });
import {
  faFolderClosed,
  faMoneyBill1,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layouts/MainLayout";
import SectionCart from "../components/sections/SectionCart";
import Meta from "../components/Meta";
export default function Home() {
  return (
    <>
      <Meta
        title="Đơn hàng | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="py-10 px-10 overflow-auto">
          <div className="w-2/4 float-left">
            <div className="mt-5 px-10 overflow-auto">
              <h1 className="font-sans text-2xl text-orange-600 font-bold">
                Wishes Fashion
              </h1>
              <input
                className="py-2 mt-5 w-full bg-gray-200 rounded text-center"
                placeholder="Cart > Shipment Details"
              ></input>
            </div>
            <div className="mt-5 px-10 overflow-auto">
              <h1 className="font-sans text-2xl text-orange-600 font-bold">
                Shipments Details
              </h1>
              <input
                className="px-2 py-2 mt-5 w-full border border-black rounded"
                placeholder="Full name..."
              ></input>
              <div className="grid grid-cols-3 gap-4">
                <input
                  className="col-span-2 ... px-2 py-2 mt-5 w-full border border-black rounded"
                  placeholder="Email..."
                ></input>
                <input
                  className="... px-2 py-2 mt-5 w-full border border-black rounded"
                  placeholder="Phone number..."
                ></input>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-5">
                <select className="... px-2 py-2 border border-black rounded">
                  <option>Select City 1</option>
                </select>
                <select className="... px-2 py-2 border border-black rounded">
                  <option>Select District 1</option>
                </select>
                <select className="... px-2 py-2 border border-black rounded">
                  <option>Select Town 1</option>
                </select>
              </div>
              <input
                className="px-2 py-2 mt-5 w-full border border-black rounded"
                placeholder="Address..."
              ></input>
            </div>
            <div className="mt-5 px-10 overflow-auto">
              <h1 className="font-sans text-2xl text-orange-600 font-bold">
                Shipping Methods
              </h1>
              <div className="mt-5 w-full h-48 border border-black rounded">
                <FontAwesomeIcon
                  icon={faFolderClosed}
                  className="flex w-10 m-auto h-2/4"
                />
                <div className="border-t border-black h-2/4 flex ">
                  <p className="m-auto  justify-center">
                    Please select a province/city for a list of shipping
                    methods.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 px-10 overflow-auto">
              <h1 className="font-sans text-2xl text-orange-600 font-bold">
                Shipping Methods
              </h1>
              <div className="mt-5 w-full h-48 border border-black rounded">
                <div className="h-2/4 flex ">
                  <input
                    type="radio"
                    id="payCOD"
                    className="flex marginRadio"
                  />
                  <FontAwesomeIcon
                    icon={faMoneyBill1}
                    className="flex w-20 m-auto h-50"
                  />
                  <label className="m-auto  justify-center" htmlFor="payCOD">
                    Pay on delivery (COD)
                  </label>
                </div>
                <div className="border-t border-black h-2/4 flex ">
                  <p className="m-auto justify-center text-center">
                    When the Shipper comes to pick up the goods, please pay the
                    Shipper directly!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 px-10 overflow-auto">
              <h1 className="flex float-left font-sans text-2xl text-orange-600 font-bold">
                Cart
              </h1>
              <button className="flex float-right bg-orange-600 py-2 px-2 justify-center text-white font-bold rounded">
                ORDER COMPLETION
              </button>
            </div>
          </div>
          <div className="w-2/4 border-l border-black float-right">
            <SectionCart />
            <div className="ml-5 border-t border-gray-300">
              <input
                className="mt-10 py-2 rounded border border-gray-300 w-1/2"
                placeholder="Discount code"
              />
              <button className="mt-10 ml-3 rounded bg-gray-200 py-2 px-10">
                Use
              </button>
            </div>{" "}
            <div className="mt-5 ml-5 border-t border-gray-300 px-10 overflow-auto">
              <div className="mt-5 overflow-auto">
                <p className="mt-3 flex float-left">Temporary</p>
                <p className="mt-3 flex float-right">499.000</p>
              </div>
              <div className="mt-2 overflow-auto">
                <p className="flex float-left">Tranport fee</p>
                <p className="flex float-right">-</p>
              </div>
            </div>
            <div className="mt-5 ml-5 border-t border-gray-300 px-10 overflow-auto">
              <p className="mt-5 flex float-left">Total</p>
              <p className="mt-5 ml-3 flex float-right">499.000</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
