import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout";
import Home, { Product } from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import PrductDetail from "../pages/ProductDetail";

//라우터 컴포넌트
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout children={<Home />} />} />

        <Route path="/detail/:id" element={<DefaultLayout children={<ProductDetail />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
