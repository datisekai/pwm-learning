import React, { FC, useState } from "react";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { generateAvatar } from "../../utils";

interface HeaderAdminProps{
    show:boolean,
    handleShow:() => void
}

const HeaderAdmin:FC<HeaderAdminProps> = ({handleShow,show}) => {

  return (
    <div className="flex items-center justify-between">
      <div onClick={handleShow} className='cursor-pointer'>
        {show ? (
          <BiMenuAltRight fontSize={28} />
        ) : (
          <BiMenuAltLeft fontSize={28} />
        )}
      </div>
      <div className="flex items-center">
        <span>admin@gmail.com</span>
        <LazyLoadImage
          effect="blur"
          src={generateAvatar("admin@gmail.com")}
          className="ml-2 w-[40px] h-[40px] rounded-full"
        />
      </div>
    </div>
  );
};

export default HeaderAdmin;
