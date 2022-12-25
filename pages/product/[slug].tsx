import React, { useState } from "react";
import Meta from "../../components/Meta";
import MainLayout from "../../components/layouts/MainLayout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../../utils";
import { AiOutlineRight } from "react-icons/ai";
import Section4 from "../../components/sections/Section4";
import Breadcumb from "../../components/Breadcumb";

const ProductDetail = () => {
  const [indexImage, setIndexImage] = useState(0);
  return (
    <>
      <Meta
        title="Nhẫn kim cương Halo cushion đai eternity NKC2401"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description="Chiếc nhẫn Halo cushion đai eternity NCH2401 là một trong những mẫu nhẫn cầu hôn với kiểu dáng thanh lịch nhưng không kém phần rực rỡ và sang trọng đang được các cặp đôi vô cùng săn đón. Mẫu nhẫn này với chủ dáng tròn được đính chắc chắn trên 4 chấu"
      />
      <MainLayout>
        <div className="max-w-[1200px] mx-auto py-4 px-2">
          <Breadcumb current="Kim cương viên"/>
          <div className="flex items-center flex-col md:flex-row">
            <div className="flex w-full md:w-[60%]  flex-col-reverse md:flex-row items-center">
              <div className="w-full  md:w-[110px] flex flex-row md:flex-col">
                {[0, 1, 2, 3].map((item) => (
                  <LazyLoadImage
                    key={item}
                    onClick={() => setIndexImage(item)}
                    src="/images/test.jpg"
                    className={`w-[110px] cursor-pointer  aspect-[1/1] rounded-lg mt-2 first:mt-0 ${
                      indexImage === item && "border border-primary"
                    }`}
                  />
                ))}
              </div>
              <div className="md:ml-2 text-center mx-auto">
                <LazyLoadImage
                  src="/images/test.jpg"
                  className="flex-1 rounded-lg text-center"
                />
              </div>
            </div>
            <div className="md:ml-2 flex-1">
              <h1 className="text-2xl mt-4 md:mt-0">
                Nhẫn kim cương Halo cushion đai eternity NKC2401
              </h1>
              <div className="mt-2 text-2xl text-primary">
                {formatPrices(25140000)}
              </div>
              <div className="mt-2 flex items-center cursor-pointer hover:opacity-80 transition-all">
                Hướng dẫn kích cỡ{" "}
                <span>
                  <AiOutlineRight />
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Mã sản phẩm</span>
                <span>NKC2401</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Kích thước</span>
                <span>5.4</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Màu sắc</span>
                <div className="flex items-center">
                  <span className="py-1 px-2 cursor-pointer border-primary hover:border-primary transition-all border-2 rounded-sm first:ml-0 ml-1">
                    Đỏ
                  </span>
                  <span className="py-1 px-2 cursor-pointer hover:border-primary transition-all border-2 rounded-sm first:ml-0 ml-1">
                    Xanh
                  </span>
                </div>
              </div>

              <div className="flex  mt-4 justify-center w-full">
                <button className="w-full hover:bg-primaryHover transition-all uppercase border-none outline-none bg-primary rounded-lg text-white px-2 py-2">
                  Hotline 1900 111 111
                </button>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <LazyLoadImage src="/images/list-style.gif" />
                  <span>Giá sản phẩm thay đổi theo trọng lượng vàng và đá</span>
                </div>
                <div className="flex items-center">
                  <LazyLoadImage src="/images/list-style.gif" />
                  <span>Đổi sản phẩm trong 48h tại hệ thống cửa hàng PWM</span>
                </div>
                <div className="flex items-center">
                  <LazyLoadImage src="/images/list-style.gif" />
                  <span>Miễn phí giao nhanh toàn quốc 1 - 7 ngày</span>
                </div>
              </div>
            </div>
          </div>

          <Section4 title="Sản phẩm được đề xuất" />
          <Section4 title="Sự kết hợp hoàn hảo" />
        </div>
      </MainLayout>
    </>
  );
};

export default ProductDetail;
