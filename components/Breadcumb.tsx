import Link from "next/link";
import React, { FC } from "react";

interface BreadcumbProps{
    current:string
}

const Breadcumb:FC<BreadcumbProps> = ({current}) => {
  return (
    <>
      <nav className="rounded-md w-full">
        <ol className="list-reset flex">
          <Link href={"/"}>
            <li className="text-primary hover:text-primaryHover transition-all">
              Trang chủ
            </li>
          </Link>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">{current}</li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcumb;
