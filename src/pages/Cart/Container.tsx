import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "./CartProduct";
import Dialog from "@mui/material/Dialog";
import { RiEmotionUnhappyLine, RiDeleteBin6Line } from "react-icons/ri";
import { RootState, AppDispatch } from "../../store";
import { productType } from "./types";
import { deleteProductFromCart } from "../../store/slices/productSlice";

const Container = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector(
    (state: RootState) => state.persistedReducer.productReducer,
  );

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full border-b-2 border-gray-200 justify-between items-center pb-1 px-16 mt-12">
        <b className="text-3xl font-bold">장바구니</b>
        <button
          onClick={() => {
            handleDialogOpen();
          }}
          disabled={cart.length === 0}
        >
          <RiDeleteBin6Line className="w-6 h-6 cursor-pointer text-gray-700 hover:animate-pulse hover:scale-105" />
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {cart.length > 0 ? (
          cart.map((product: productType) => (
            <CartProduct key={product.productId} {...product} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center text-gray-800/[0.5] mt-8">
            <RiEmotionUnhappyLine className="w-48 h-48" />
            <b className="text-3xl mt-6">장바구니에 저장된 상품이 없습니다</b>
          </div>
        )}
      </div>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div>
          <div className="flex justify-center items-center py-6 px-4">
            <b className="text-xl">장바구니 상품을 전부 삭제하시겠습니까?</b>
          </div>

          <div className="flex items-center justify-end space-x-2 border-t-2 border-gray-200 p-4">
            <button
              className="outline-none text-red-500 text-sm"
              onClick={() => {
                dispatch(deleteProductFromCart(""));
                handleDialogClose();
              }}
            >
              삭제
            </button>
            <button
              className="outline-none text-gray-600 text-sm"
              onClick={() => {
                handleDialogClose();
              }}
            >
              취소
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Container;
