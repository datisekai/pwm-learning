import { GetServerSideProps, NextPage } from "next";
import { BsSortDown } from "react-icons/bs";
import CategoryAction from "../actions/Category.action";
import ProductAction from "../actions/Product.action";
import SpeciesAction from "../actions/Species.action";
import Breadcumb from "../components/Breadcumb";
import HomeCard from "../components/cards/HomeCard";
import MainLayout from "../components/layouts/MainLayout";
import Meta from "../components/Meta";
import { Pagination } from "../components/Pagination";
import ToolSearch from "../components/ToolSearch";
import { CategoryModel } from "../models/Category.model";
import { ProductModel } from "../models/Product.model";
import { SpeciesModel } from "../models/Species.model";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { AiOutlineRight } from "react-icons/ai";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductSkeletonCard from "../components/skeletons/ProductSkeletonCard";
import ImageNoSuitableProductFound from "../public/images/Nosuitableproductfound.png";
interface SearchProps {
  // query: any;
  // species: SpeciesModel[];
  // products: {
  //   products: ProductModel[];
  //   totalPage: number;
  // };
}

const Search: NextPage<SearchProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { name, speciesId, categoryId, min, max } = query;
  const [showOptions, setShowOptions] = React.useState(false);

  const { data: species, isLoading: isSpeciesLoading } = useQuery(
    ["species-search"],
    () => SpeciesAction.getAll(1)
  );
  const { data: products, isLoading: isProductsLoading } = useQuery(
    ["result-search", query],
    () => ProductAction.search(query)
  );

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Meta
        title="Tìm kiếm | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />

      <MainLayout>
        <div className="max-w-[1200px] mx-auto pt-4 pb-10 px-2">
          <Breadcumb current={name ? `Tìm kiếm "${name}"` : "Tìm kiếm"} />
          <div className="md:flex block mt-5">
            <button
              onClick={handleClick}
              className="md:hidden block bg-primary py-2 px-3 font-bold rounded mb-4 ml-1"
            >
              Tìm kiếm
            </button>

            <div className="md:hidden block">
              {showOptions && <ToolSearch species={species || []} />}
            </div>
            <div className="md:block hidden">
              <ToolSearch species={species || []} />
            </div>
            <div className="flex-1 md:ml-5">
              <div
                className="flex items-center justify-between py-2 px-4"
                style={{
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                }}
              >
                <h1 className="uppercase font-bold">Tìm kiếm </h1>
                <div className="flex">
                  <div className="flex items-center text-[#666]">
                    <BsSortDown />
                    <span className="ml-1">Sắp xếp: </span>
                  </div>
                  <select
                    onChange={(e) =>
                      router.push({
                        query: { ...router.query, sort: e.target.value },
                      })
                    }
                    defaultValue={"default"}
                    className="outline-none"
                  >
                    <option value="default">Mặc định</option>
                    <option value="asc">Giá thấp</option>
                    <option value="desc">Giá cao</option>
                  </select>
                </div>
              </div>
              {products?.products.length == 0 ? (
                <div className="mt-10 flex justify-center">
                  <img
                    src="/images/Nosuitableproductfound.png"
                    alt="Ảnh không tìm thấy sản phẩm"
                  />
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                  {isProductsLoading
                    ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <ProductSkeletonCard key={item} />
                      ))
                    : products?.products.map((item: any) => (
                        <HomeCard key={item.id} data={item} />
                      ))}
                </div>
              )}

              <div className="flex w-full justify-end mt-5">
                {products && products?.totalPage > 1 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(e) => {
                      router.push({
                        query: { ...router.query, page: +e.selected + 1 },
                      });
                    }}
                    forcePage={+(query.page || 1) - 1}
                    pageRangeDisplayed={5}
                    pageCount={products.totalPage}
                    previousLabel={<span>{`<`}</span>}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Search;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   // const data = await Promise.all([
//   //   SpeciesAction.getAll(1),
//   //   ProductAction.search(query),
//   // ]);

//   return {
//     props: { query },
//   };
// };
