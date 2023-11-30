import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import React, { FC } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
