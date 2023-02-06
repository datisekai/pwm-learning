import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { SpeciesModel } from "../../models/Species.model";

interface ItemSearchProps {
  data: SpeciesModel;
}

const ItemSearch: FC<ItemSearchProps> = ({ data }) => {
  const [isFull, setIsFull] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query && query.categoryId) {
      const categoryId = query.categoryId;
      if (data.categories.some((item) => item.id == +categoryId)) {
        setIsFull(true);
      }
    }
  }, [router]);

  return (
    <div className="">
      <div className="py-1 flex cursor-pointer items-center space-x-2">
        <span
          onClick={() => {
            const query: any = { ...router.query, speciesId: data.id,page:1 };
            if (query?.speciesId) {
              delete query["categoryId"];
            }
            router.push({ query });
          }}
          className={`hover:text-primary  ${
            query &&
            query.speciesId &&
            +query.speciesId === data.id &&
            "text-primary item-search relative"
          }  pb-2`}
         
        >
          {data.name}
        </span>
        <span onClick={() => setIsFull(!isFull)}>
          <AiOutlineDown />
        </span>
      </div>
      <div
        className={`ml-4 overflow-hidden ${!isFull ? "max-h-0" : "max-h-fit"}`}
      >
        {data?.categories?.map((item) => (
          <div
            onClick={() => {
              const query: any = { ...router.query, categoryId: item.id,page:1 };
              if (query?.speciesId) {
                delete query["speciesId"];
              }
              router.push({ query });
            }}
            key={item.id}
            className={`border-b hover:text-primary cursor-pointer ${
              query &&
              query.categoryId &&
              +query.categoryId === item.id &&
              "text-primary"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemSearch;
