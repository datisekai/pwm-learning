import React, { FC, useEffect, useState, useContext } from "react";
import UserAction from "../../actions/User.action";
import { AuthContext } from "../context";
import HeaderAdmin from "../Header/HeaderAdmin";
import SidebarAdmin from "../SidebarAdmin";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const getMyInfo = async () => {
      const result = await UserAction.myInfo();
      if (result) {
        setUser(result);
      } else {
        setUser(undefined);
      }
    };
    getMyInfo();
  }, []);

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
