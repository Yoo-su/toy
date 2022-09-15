import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DefaultLayout from "../components/layout";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

//라우터 컴포넌트
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        }
      />

      <Route
        path="/detail/:id"
        element={
          <DefaultLayout>
            <ProductDetail />
          </DefaultLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <DefaultLayout>
            <Cart />
          </DefaultLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
