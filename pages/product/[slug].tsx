import { useQuery } from "@tanstack/react-query";
import Lightbox from "lightbox-react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineRight } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductAction from "../../actions/Product.action";
import Breadcumb from "../../components/Breadcumb";
import MainLayout from "../../components/layouts/MainLayout";
import Meta from "../../components/Meta";
import Section4 from "../../components/sections/Section4";
import { ProductModel } from "../../models/Product.model";
import { formatPrices, getImageServer } from "../../utils";

interface ProductDetailProps {
  detail: ProductModel;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ detail }) => {
  const { data } = useQuery(["recommend-product", detail.id], () =>
    ProductAction.search({ categoryId: detail.categoryId })
  );
  const { data: data2 } = useQuery(["recommend-product2", detail.id], () =>
    ProductAction.search({ speciesId: detail.category.speciesId })
  );

  const recommendProducts = useMemo(() => {
    return data?.products.filter((item: any) => item.id !== detail.id) || [];
  }, [data]);

  const recommendProducts2 = useMemo(() => {
    return data2?.products.filter((item: any) => item.id !== detail.id) || [];
  }, [data2]);

  const [indexImage, setIndexImage] = useState(0);

  const [isOpenLightBox, setIsOpenLightBox] = useState(false);

  const listImage = [
    detail.thumbnail,
    ...detail.skus.map((item) => item.image),
  ];

  const [detailAt, setDetailAt] = useState<
    { attributeId: number; detailId: number }[]
  >([]);

  React.useEffect(() => {
    if (detail && detail.skus) {
      setDetailAt(
        detail.skus[0].skuvalues.map((item) => ({
          attributeId: item.attributeId,
          detailId: item.detailAttributeId,
        }))
      );
    }
  }, [detail]);

  const currentSku: any = React.useMemo(() => {
    let sku = detail.skus[0];
    const detailIds = detailAt.map((item) => item.detailId);

    detail?.skus?.forEach((item) => {
      let check = false;
      item.skuvalues.map((element) => {
        if (!detailIds.includes(element.detailAttributeId)) {
          check = true;
        }
      });
      if (!check) {
        sku = item;
      }
    });

    return sku;
  }, [detailAt]);

  return (
    <>
      <Meta
        title={detail.name}
        image={getImageServer(detail.thumbnail)}
        description={detail.description}
      />
      <MainLayout>
        <div className="max-w-[1200px] mx-auto py-4 px-2">
          <Breadcumb current={detail.name} />
          <div className="flex items-center mt-4 flex-col md:flex-row">
            <div className="flex w-full md:w-[60%]  flex-col-reverse md:flex-row items-center">
              <div className="relative mt-2 md:mt-0 w-full max-h-[500px] md:w-[110px] flex flex-row md:flex-col overflow-x-scroll list-image">
                <Swiper
                  direction={"horizontal"}
                  className="mySwiper"
                  slidesPerView={3}
                  spaceBetween={0}
                  breakpoints={{
                    768: {
                      direction: "vertical",
                      slidesPerView: "auto",
                    },
                  }}
                >
                  {listImage.map((item, index) => (
                    <SwiperSlide key={index}>
                      <LazyLoadImage
                        onClick={() => {
                          setIndexImage(index);
                          setIsOpenLightBox(true);
                        }}
                        src={getImageServer(item)}
                        className={`w-[100px] cursor-pointer  aspect-[1/1] rounded-lg mt-2 first:mt-0 ${
                          indexImage === index && "border border-primary"
                        }`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* {listImage.map((item, index) => (
                  <LazyLoadImage
                    key={index}
                    onClick={() => setIndexImage(index)}
                    src={getImageServer(item)}
                    className={`w-[110px] cursor-pointer  aspect-[1/1] rounded-lg mt-2 first:mt-0 ${
                      indexImage === index && "border border-primary"
                    }`}
                  />
                ))} */}
              </div>
              <div className="md:ml-2 md:p-2 flex-1 text-center mx-auto">
                <LazyLoadImage
                  onClick={() => setIsOpenLightBox(true)}
                  src={getImageServer(listImage[indexImage])}
                  className=" w-full rounded-lg text-center"
                />
              </div>
            </div>
            <div className="md:ml-2 flex-1">
              <h1 className="text-2xl mt-4 md:mt-0">{detail.name}</h1>
              <div className="mt-2 flex items-center space-x-4">
                <div className="text-2xl text-primary">
                  {formatPrices(
                    currentSku?.price -
                      (currentSku?.price * currentSku?.discount) / 100
                  )}
                </div>
                {currentSku?.discount > 0 && (
                  <div className="text-xl text-[#999] line-through">
                    {formatPrices(currentSku?.price)}
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center cursor-pointer hover:opacity-80 transition-all">
                Hướng dẫn kích cỡ{" "}
                <span>
                  <AiOutlineRight />
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>SKU</span>
                <span>{currentSku?.sku}</span>
              </div>

              {detail?.attributes?.map((attribute) => (
                <div
                  key={attribute.id}
                  className="flex justify-between items-center mt-2"
                >
                  <span>{attribute.name}</span>
                  <div className="flex items-center">
                    {attribute?.detailattributes?.map((item) => (
                      <span
                        key={item.id}
                        onClick={() => {
                          //Nếu chưa có thuộc tính này
                          //Thêm thuộc tính vào
                          if (
                            !detailAt.some(
                              (element) => element.attributeId == attribute.id
                            )
                          ) {
                            setDetailAt([
                              ...detailAt,
                              { attributeId: attribute.id, detailId: item.id },
                            ]);
                          } else {
                            //Nếu đã có thuộc tính -> set lại cái có cùng thuộc tính
                            setDetailAt(
                              detailAt.map((element) => {
                                if (element.attributeId === attribute.id) {
                                  return {
                                    ...element,
                                    detailId: item.id,
                                  };
                                }
                                return element;
                              })
                            );
                          }
                        }}
                        className={`py-1 px-2 cursor-pointer  hover:border-primary transition-all border-2 rounded-sm first:ml-0 ml-1 ${
                          detailAt.some(
                            (element) => element.detailId == item.id
                          ) && "border-primary"
                        }`}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <a href="#">
                <div className="flex  mt-4 justify-center w-full">
                  <button className="w-full hover:bg-primaryHover transition-all uppercase border-none outline-none bg-primary rounded-lg text-white px-2 py-2">
                    Hotline 1900 111 111
                  </button>
                </div>
              </a>
              <div className="mt-4">
                <div className="flex items-center">
                  <div>
                    <LazyLoadImage
                      className=""
                      effect="blur"
                      src="/images/list-style.gif"
                    />
                  </div>
                  <span>Giá sản phẩm thay đổi theo trọng lượng vàng và đá</span>
                </div>
                <div className="flex items-center">
                  <div>
                    <LazyLoadImage effect="blur" src="/images/list-style.gif" />
                  </div>
                  <span>Đổi sản phẩm trong 48h tại hệ thống cửa hàng PWM</span>
                </div>
                <div className="flex items-center">
                  <div>
                    <LazyLoadImage effect="blur" src="/images/list-style.gif" />
                  </div>
                  <span>Miễn phí giao nhanh toàn quốc 1 - 7 ngày</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 md:mt-0">{detail.description}</p>

          {recommendProducts?.length > 0 && (
            <Section4 title="Sản phẩm được đề xuất" data={recommendProducts} />
          )}
          {recommendProducts2?.length > 0 && (
            <Section4 title="Sự kết hợp hoàn hảo" data={recommendProducts2} />
          )}
          {/* <Section4 title="Sự kết hợp hoàn hảo" /> */}
        </div>
        {isOpenLightBox && (
          <Lightbox
            mainSrc={getImageServer(listImage[indexImage])}
            nextSrc={getImageServer(
              listImage[(indexImage + 1) % listImage.length]
            )}
            prevSrc={getImageServer(
              listImage[(indexImage + listImage.length - 1) % listImage.length]
            )}
            onCloseRequest={() => setIsOpenLightBox(false)}
            onMovePrevRequest={() => {
              setIndexImage(
                (indexImage + listImage.length - 1) % listImage.length
              );
            }}
            onMoveNextRequest={() => {
              setIndexImage((indexImage + 1) % listImage.length);
            }}
          />
        )}
      </MainLayout>
    </>
  );
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const data = await ProductAction.detail(slug);

  return {
    props: {
      detail: data,
    },
    revalidate: 60,
  };
};
