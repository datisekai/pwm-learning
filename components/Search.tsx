import { useRouter } from "next/router";
import React, { FC } from "react";

interface SearchProps {
  open: boolean;
  handleHide: () => void;
}

const Search: FC<SearchProps> = ({ handleHide, open }) => {
  const [keyword, setKeyword] = React.useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      router.push(`/search?keyword=${encodeURI(keyword)}`);
    }
  };
  return (
    <div>
      <div
        onClick={handleHide}
        className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[40] ${
          open ? "block" : "hidden"
        } opacityAnimation`}
      ></div>
      <div className="flex items-center justify-center">
        <div
          className={`w-[80%] flex justify-center transition-transform h-[35px] bg-white fixed top-[150px] z-[45]  items-center ${
            open ? "translate-y-[0]" : "translate-y-[-2000px]"
          } `}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <input
            type="text"
            value={keyword}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-4 text-sm h-full border outline-none block mx-auto"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
