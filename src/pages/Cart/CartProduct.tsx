import { useDispatch } from "react-redux";
import { productType } from "./types";
import { IoRocketSharp, IoCloseCircleSharp } from "react-icons/io5";
import { AppDispatch } from "../../store";
import { deleteProductFromCart } from "../../store/slices/productSlice";

const CartProduct = (product: productType) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <figure className="flex rounded-lg shadow-lg p-0 bg-slate-50 mx-10 my-8">
      <img
        className="w-48 h-auto mx-auto rounded-none"
        src={product.image}
        alt={product.image}
      />

      <section className="flex flex-col relative justify-start items-start w-72 px-6 py-3 space-y-1">
        <h1 className="text-lg font-bold">
          {product.title.replace(/<\/?[^>]+(>|$)/g, "")}
        </h1>
        <b className="text-lg text-red-500">
          {parseInt(product.lprice).toLocaleString()}원
        </b>
        <span className="flex items-center">
          {product.brand && (
            <b className="text-md text-sky-900">브랜드: {product.brand}</b>
          )}
          &nbsp;
          {product.maker && (
            <b className="text-md text-stone-700">제조사: {product.maker}</b>
          )}
        </span>
        <span
          className="flex flex-1 items-end"
          onClick={() => {
            window.open(product.link);
          }}
        >
          <IoRocketSharp className="w-6 h-6 cursor-pointer" />
          <label className="text-md cursor-pointer">구매링크</label>
        </span>
        <IoCloseCircleSharp
          className="w-7 h-7 cursor-pointer absolute top-1 right-1  text-black/[0.4] transition duration-200 hover:text-red-500/[0.8]"
          onClick={() => {
            dispatch(deleteProductFromCart(product.productId));
          }}
        />
      </section>
    </figure>
  );
};
export default CartProduct;
