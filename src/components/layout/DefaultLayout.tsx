import React, { Fragment } from "react";
import { Header } from "./Header";

type propsType = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: propsType) => {
  return (
    <Fragment>
      <Header />
      <main className="pt-24">{children}</main>
    </Fragment>
  );
};

export default DefaultLayout;
