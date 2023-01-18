import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import { BiLogOut, BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { generateAvatar } from "../../utils";
import { AuthContext } from "../context";

interface HeaderAdminProps {
  show: boolean;
  handleShow: () => void;
}

const HeaderAdmin: FC<HeaderAdminProps> = ({ handleShow, show }) => {
  const { user, setUser } = useContext(AuthContext);

  const router = useRouter();

  const handleLogout = () => {
    setUser(undefined)
    deleteCookie('token');
    deleteCookie('detailActions');
    router.push('/login')
  }

  return (
    <div className="flex items-center justify-between">
      <div onClick={handleShow} className="cursor-pointer">
        {show ? (
          <BiMenuAltRight fontSize={28} />
        ) : (
          <BiMenuAltLeft fontSize={28} />
        )}
      </div>
      <div className="flex items-center relative tool-user">
        <span>{user && user.email}</span>
        <LazyLoadImage
          effect="blur"
          src={generateAvatar(user && user.email)}
          className="ml-2 w-[40px] h-[40px] rounded-full"
        />

        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="py-2 child-tool-user hidden right-0 select-none px-4 absolute w-[200px] bottom-[-44px] bg-white rounded-md"
        >
          <div onClick={handleLogout} className="hover:text-primary cursor-pointer flex items-center space-x-2">
            <BiLogOut className="text-primary" fontSize={20}/>
            <span className="text-black">Đăng xuất</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
