import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineRight, AiOutlinePlusCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="pt-4 bg-[#2D3641]">
      <div className="pb-4 max-w-[1200px] w-[calc(100%-16px)] mx-auto flex flex-col md:flex-row  md:items-start md:justify-between">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <LazyLoadImage src="/images/logo.png" />
          <p className="text-white mt-2">
            Lorem ipsum dolor amet consectetur adipisicing elit sed eiusm tempor
            incididunt labore dolore magna aliqua enim.
          </p>
          <div className="flex items-center mt-2">
            <div className="p-2 rounded-full border ">
              <BsFacebook className="text-white" fontSize={24} />
            </div>
            <div className="p-2 rounded-full border ml-2">
              <BsFacebook className="text-white" fontSize={24} />
            </div>
            <div className="p-2 rounded-full border ml-2">
              <BsFacebook className="text-white" fontSize={24} />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col mt-2 md:mt-0">
          <h2 className="text-white text-xl">Service</h2>
          <div>
            {["Company History", "About us"].map((item) => (
              <div
                key={item}
                className="py-1 first:mt-2 text-white flex items-center"
              >
                <AiOutlineRight fontSize={20} />
                <span className="ml-2">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 mt-2 md:mt-0">
          <h2 className="text-white text-xl">Quick Link</h2>
          <div>
            {["Company History", "About us", "Company History", "About us"].map(
              (item, index) => (
                <div
                  key={index}
                  className="py-1 first:mt-2 text-white flex items-center"
                >
                  <AiOutlineRight fontSize={20} />
                  <span className="ml-2">{item}</span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex-1 mt-2 md:mt-0">
          <h2 className="text-white text-xl">Subscribe Us</h2>
          <p className="mt-4 text-white">
            Lorem ipsum dolor sit amet, consect etur adipisicing. elit sed do
            eiusmod.
          </p>
          <div className="flex items-center mt-2">
            <input
              type="text"
              className="px-4 py-2 bg-white rounded-tl-lg "
              placeholder="Enter your email"
            />
            <div className="bg-primary h-[40px] flex items-center hover:bg-primaryHover transition-all hover:cursor-pointer justify-center w-[40px] rounded-br-lg">
              <AiOutlinePlusCircle fontSize={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-2 text-white text-center text-lg"><span className="text-primary">PWM</span> © 2022 All Right Reserved</div>
    </div>
  );
};

export default Footer;
