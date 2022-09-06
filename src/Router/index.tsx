import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@components/layout";
import Home from "@pages/Home";

//라우터 컴포넌트
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
};
