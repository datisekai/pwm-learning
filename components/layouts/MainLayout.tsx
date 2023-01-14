import React, { FC, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Search from "../Search";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearch, setIsSearch] = useState(false)

  return (
    <>
      <Header handleOpenSearch={() => setIsSearch(!isSearch)} handleOpen={() =>  setIsOpen(true)}/>
      <div className="min-h-screen relative">{children}</div>
      <Footer />
      <Sidebar open={isOpen} handleHide={() => setIsOpen(false)}/>
      <Search open={isSearch} handleHide={() =>  setIsSearch(false)}/>
    </>
  );
};

export default MainLayout;
