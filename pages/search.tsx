import { GetServerSideProps, NextPage } from "next";
import React from "react";
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

interface SearchProps {
  query: any;
  species: SpeciesModel[];
  products: {
    products: ProductModel[];
    totalPage: number;
  };
}

const Search: NextPage<SearchProps> = ({ query, species, products }) => {
  const { name, speciesId, categoryId, min, max } = query;
  const router = useRouter();
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
          <div className="flex mt-5">
            <div className="hidden md:block">
              <ToolSearch species={species} />
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
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <HomeCard key={item} data="/images/test.jpg" />
                ))} */}
                {products?.products.map((item) => (
                  <HomeCard key={item.id} data={item} />
                ))}
              </div>
              <div className="flex w-full justify-end mt-5">
                {products?.totalPage > 1 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(e) => {
                      console.log(e.selected);
                      router.push({
                        query: { ...router.query, page: +e.selected + 1 },
                      });
                    }}
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await Promise.all([
    SpeciesAction.getAll(1),
    ProductAction.search(query),
  ]);

  return {
    props: { query, species: data[0], products: data[1] },
  };
};
