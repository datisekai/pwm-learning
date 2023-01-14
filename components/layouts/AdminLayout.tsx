import React, { FC, useState } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import SidebarAdmin from "../SidebarAdmin";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  return (
    <>
      <div className="min-h-screen flex">
        <SidebarAdmin
          show={isShowMenu}
          handleClose={() => setIsShowMenu(false)}
        />
        <div className="flex-1 px-2 md:px-4 py-2">
          <HeaderAdmin
            show={isShowMenu}
            handleShow={() => setIsShowMenu(!isShowMenu)}
          />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
