import Link from "next/link";
import React, { FC } from "react";

interface BreadcumbProps {
  current: string;
  pre?: { url: string; title: string };
}

const Breadcumb: FC<BreadcumbProps> = ({ current, pre }) => {
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
          {pre && (
            <>
              <Link href={pre.url}>
                <li className="text-gray-500 hover:text-primaryHover transition-all">
                  {pre.title}
                </li>
              </Link>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
            </>
          )}
          <li className="text-gray-500">{current}</li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcumb;
