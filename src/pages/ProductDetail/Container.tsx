import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/common/Table";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "../../components/common/Snackbar";
import { IoBagHandle, IoRocketSharp } from "react-icons/io5";
import {
  setProductDetail,
  addProductToCart,
} from "../../store/slices/productSlice";
import { RootState, AppDispatch } from "../../store";

//상품 상세 페이지 컴포넌트
export const Container = () => {
  //const [productId, setProductId] = useState<string | undefined>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { similarProducts, productDetail, cart } = useSelector(
    (state: RootState) => state.persistedReducer.productReducer,
  );

  //Table 컴포넌트 컬럼별 컨텐츠 맵
  const elementMap = {
    title: (value: string) => value.replace(/<\/?[^>]+(>|$)/g, ""),
    image: (value: string) => (
      <img className="w-24 object-contain mx-auto" src={value} alt={value} />
    ),
    brand: (value: string) => value,
    lprice: (value: string) => (
      <span className="text-red-500">{parseInt(value).toLocaleString()}원</span>
    ),
    category1: (value: string) => value,
    productId: (value: string) => (
      <button
        className="rounded-md px-2 py-1 bg-slate-600 text-white"
        onClick={() => {
          window.history.replaceState(null, "", `/detail/${value}`);
          dispatch(
            setProductDetail(window.location.pathname.split("/").at(-1)),
          );
        }}
      >
        보기
      </button>
    ),
  };

  useEffect(() => {
    dispatch(setProductDetail(window.location.pathname.split("/").at(-1)));
  }, [dispatch]);

  return (
    <article className="flex flex-col px-10 py-8">
      {productDetail ? (
        <section className="relative flex rounded-lg shadow-lg">
          <img
            src={productDetail.image}
            alt={productDetail.image}
            className="w-96 h-auto"
          />

          <section className="flex flex-col items-start justify-center pl-16 ml-8 my-8 space-y-3 border-l border-gray-300">
            <h1 className="text-4xl font-bold">
              {productDetail.title.replace(/<\/?[^>]+(>|$)/g, "")}
            </h1>
            <div className="flex flex-col">
              <b className="text-red-500 text-xl">
                최저&nbsp;
                {productDetail &&
                  parseInt(productDetail?.lprice).toLocaleString()}
                원
              </b>
              <label className="text-gray-500 text-lg">{`${
                productDetail.category1
              } ${productDetail.category2 && " > " + productDetail.category2} ${
                productDetail.category3 && " > " + productDetail.category3
              } ${
                productDetail.category4 && " > " + productDetail.category4
              }`}</label>
            </div>
            <div>
              {productDetail?.brand && (
                <span className="flex items-center text-2xl">
                  <b className="text-lime-600">브랜드</b>{" "}
                  <b className="text-gray-800 ml-2">{productDetail.brand}</b>
                </span>
              )}
              <span className="flex items-center text-2xl">
                <b className="text-sky-700">판매몰</b>{" "}
                <b className="text-gray-800 ml-2">{productDetail.mallName}</b>
              </span>
            </div>
            <a className="text-2xl" href={productDetail.link}>
              <span className="flex items-center">
                <IoRocketSharp className="w-8 h-8 text-cyan-900" />
                상품 링크
              </span>
            </a>
          </section>
          <IoBagHandle
            className="absolute bottom-16 right-16 w-12 h-12 text-sky-700 cursor-pointer hover:text-sky-900 active:scale-75 duration-200 ease-in-out"
            onClick={() => {
              const check = cart.find(
                (product) => product.productId === productDetail.productId,
              );

              if (check) {
                setSnackbarMsg("이미 등록된 상품입니다");
                setSnackbarOpen(true);
              } else {
                dispatch(addProductToCart(productDetail));
                setSnackbarMsg("장바구니에 등록 완료되었습니다");
                setSnackbarOpen(true);
              }
            }}
          />
        </section>
      ) : (
        <CircularProgress />
      )}

      {/* 유사한 상품목록 */}
      {similarProducts.length > 1 && (
        <section className="flex flex-col mt-28">
          <h1 className="text-3xl ml-6 mb-4 font-semibold italic underline">
            비슷한 상품
          </h1>
          <Table
            headData={["상품명", "이미지", "브랜드", "가격", "카테고리", "-"]}
            bodyData={similarProducts}
            elementMap={elementMap}
          />
        </section>
      )}

      <Snackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        msg={snackbarMsg}
      />
    </article>
  );
};

export default Container;
