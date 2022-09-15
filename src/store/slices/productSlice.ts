import {
  createAsyncThunk,
  createSlice,
  combineReducers,
  PayloadAction,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { GET_PRODUCTS } from "../actions/actionTypes";
import { getProductsByQuery } from "../../lib/api";
import { productType, requestOptType, statesType } from "./types";

//비동기 액션 생성
export const getProducts = createAsyncThunk(
  GET_PRODUCTS,
  async ({ query, sortOpt }: requestOptType) => {
    try {
      const response = await getProductsByQuery({ query, sortOpt });
      return response.data.items;
    } catch (e) {
      console.log("error:", e);
      return [];
    }
  },
);

// persist 리듀서 관련 설정값
const persistConfig = {
  key: "root",
  storage: storageSession,
};

const initialState: statesType = {
  curQuery: "", // 검색된 키워드
  products: [], // 검색된 전체 상품
  displayProducts: [], // 화면에 보여지는 상품
  similarProducts: [], // 현재 보고있는 상품과 비슷한 상품 (동일 브랜드, 카테고리)
  cart: [], // 찜목록
  productDetail: null,

  malls: [], // 상품 판매 브랜드 집합
  selectedMall: "", //선택된 브랜드
  categories: [],
  selectedCategory: "",

  selectedSortOpt: "", // 선택된 정렬 옵션
  selectedViewOpt: 10, // 목록 보기 옵션

  curPage: 1, // 홈화면 상품목록 현재 페이지번호

  loading: false, // 상품목록 로딩 여부
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    // 상품목록을 쇼핑몰에 따라 필터링
    filterProductsByMall(state, action: PayloadAction<string>) {
      if (action.payload === "")
        state.displayProducts =
          state.selectedCategory !== ""
            ? state.products.filter(
                (product) => product.category1 === state.selectedCategory,
              )
            : state.products;
      else
        state.displayProducts = state.products.filter(
          (product) =>
            product.mallName === action.payload &&
            (state.selectedCategory !== ""
              ? product.category1 === state.selectedCategory
              : true),
        );
    },

    // 선택된 쇼핑몰 저장
    setSelectedMall(state, action: PayloadAction<string>) {
      state.selectedMall = action.payload;
    },

    // 상품목록을 카테고리에 따라 필터링
    filterProductsByCategory(state, action: PayloadAction<string>) {
      if (action.payload === "")
        state.displayProducts =
          state.selectedMall !== ""
            ? state.products.filter(
                (product) => product.mallName === state.selectedMall,
              )
            : state.products;
      else
        state.displayProducts = state.products.filter(
          (product) =>
            product.category1 === action.payload &&
            (state.selectedMall !== ""
              ? product.mallName === state.selectedMall
              : true),
        );
    },

    // 선택된 카테고리 저장
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },

    // 검색된 키워드 저장
    setCurQuery(state, action: PayloadAction<string>) {
      state.curQuery = action.payload;
    },

    // 선택된 정렬옵션 저장
    setSortOpt(state, action: PayloadAction<string>) {
      state.selectedSortOpt = action.payload;
    },

    // 선택된 보기옵션 저장
    setViewOpt(state, action: PayloadAction<number>) {
      state.selectedViewOpt = action.payload;
    },

    // 페이지 변경
    setCurPage(state, action: PayloadAction<number>) {
      state.curPage = action.payload;
    },

    // 상품 상세정보 등록
    setProductDetail(state, action: PayloadAction<string>) {
      const productDetail: productType = state.products?.filter(
        (product: productType) => product.productId === action.payload,
      )[0];

      state.productDetail = productDetail;

      const similarProducts = state.products.filter(
        (product) =>
          product.brand === productDetail?.brand &&
          product.category1 === productDetail?.category1,
      );

      if (similarProducts.length < 6) {
        state.similarProducts = similarProducts.filter(
          (product) => product.productId !== productDetail?.productId,
        );
      } else {
        const curProductIdx = similarProducts.findIndex(
          (element) => element.productId === productDetail?.productId,
        );

        if (curProductIdx < 2) {
          state.similarProducts = similarProducts
            .slice(0, 6)
            .filter(
              (product) => product.productId !== productDetail?.productId,
            );
        } else if (curProductIdx > similarProducts.length - 4) {
          state.similarProducts = similarProducts
            .slice(similarProducts.length - 6, similarProducts.length)
            .filter(
              (product) => product.productId !== productDetail?.productId,
            );
        } else {
          state.similarProducts = similarProducts
            .slice(curProductIdx - 3, curProductIdx)
            .concat(
              similarProducts.slice(curProductIdx + 1, curProductIdx + 4),
            );
        }
      }
    },

    // 상품 장바구니에 등록
    addProductToCart(state, action: PayloadAction<productType>) {
      state.cart = [...state.cart, action.payload];
    },

    //상품 장바구니에서 제거
    deleteProductFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(
        (product: productType) => product.productId !== action.payload,
      );
    },

    //장바구니 상품 전체 제거
    deleteAllFromCart(state) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<Array<productType>>) => {
          state.loading = false;
          const resList: Array<productType> = action.payload;
          state.products = resList;
          state.displayProducts = resList;

          if (action.payload.length > 0) {
            //브랜드 정보 저장
            const malls = new Set(Array.from(resList, (item) => item.mallName));
            state.selectedMall = "";
            state.malls = [""].concat(Array.from(malls));

            //카테고리 정보 저장
            const categories = new Set(
              Array.from(resList, (item) => item.category1),
            );
            state.selectedCategory = "";
            state.categories = [""].concat(Array.from(categories));
          } else {
            state.malls = [];
            state.selectedMall = "";
            state.categories = [];
            state.selectedCategory = "";
          }
        },
      ),
      builder.addCase(getProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const persistedReducer = combineReducers({
  productReducer: persistReducer(persistConfig, productsSlice.reducer),
});

export const {
  filterProductsByMall,
  setSelectedMall,
  filterProductsByCategory,
  setSelectedCategory,
  setCurQuery,
  setSortOpt,
  setViewOpt,
  setCurPage,
  setProductDetail,
  addProductToCart,
  deleteProductFromCart,
  deleteAllFromCart,
} = productsSlice.actions;
