import React, { FC, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Search from "../Search";
import { AuthContext } from "../context";
import UserAction from "../../actions/User.action";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const { user, setUser } = React.useContext(AuthContext);

  const router = useRouter();

  React.useEffect(() => {
    const getMyInfo = async () => {
      const result = await UserAction.myInfo();
      if (result) {
        setUser(result);
        setCookie("detailActions", result?.detailActions);

        // if (result?.detailActions?.length > 0) {
        //   router.push("/admin");
        // }
      } else {
        setUser(undefined);
      }
    };
    if (getCookie("token")) {
      getMyInfo();
    }
  }, []);

  return (
    <>
      <Header
        handleOpenSearch={() => setIsSearch(!isSearch)}
        handleOpen={() => setIsOpen(true)}
      />
      <div className="min-h-screen relative">{children}</div>
      <Footer />
      <Sidebar open={isOpen} handleHide={() => setIsOpen(false)} />
      <Search open={isSearch} handleHide={() => setIsSearch(false)} />
    </>
  );
};

export default MainLayout;
