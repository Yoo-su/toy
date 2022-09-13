import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

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
    </Routes>
  </BrowserRouter>
);

export default Router;
