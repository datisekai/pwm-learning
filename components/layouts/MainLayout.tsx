import React, { FC } from "react";
import Header from "../Header/Header";
import Footer from "../Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
