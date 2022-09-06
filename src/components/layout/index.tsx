import React, { Fragment } from "react";
import { Header } from "./Header";

type propsType = {
  children: React.ReactNode;
};

const Layout = ({ children }: propsType) => {
  return (
    <Fragment>
      <Header />
      <main className="pt-24">{children}</main>
    </Fragment>
  );
};

export default Layout;
