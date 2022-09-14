import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product, SearchBox, Chip } from "./index";
import Select from "../../components/common/Select";
import Pagination from "../../components/common/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import {
  getProducts,
  setSelectedCategory,
  filterProductsByCategory,
  setSortOpt,
  setViewOpt,
  setCurPage,
} from "../../store/slices/productSlice";
import { RootState, AppDispatch } from "../../store";

//메인 홈 페이지 컴포넌트
const Container = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    products,
    loading,
    malls,
    displayProducts,
    categories,
    selectedCategory,
    selectedSortOpt,
    selectedViewOpt,
    curPage,
  } = useSelector((state: RootState) => state.persistedReducer.productReducer);
  const [query, setQuery] = useState("");
  const setCurQuery = useCallback((val: string) => {
    setQuery(val);
  }, []);

  //페이징용 변수
  const offset = (curPage - 1) * selectedViewOpt;

  return (
    <div className="flex flex-col items-center relative">
      {/* 검색어 입력란 */}
      <SearchBox query={query} setQuery={setCurQuery} />

      {/* 특정 업체 상품 보기 버튼들 */}
      {malls && (
        <div className="flex flex-wrap items-center justify-center mb-3">
          {malls.map((mall) => (
            <Chip text={mall} key={mall} />
          ))}
        </div>
      )}

      {/* 상품 개수정보 및 목록 보기 설정 옵션 */}
      {products?.length > 0 && (
        <div className="flex w-full border-b-2 md:px-24 justify-between pb-2">
          <span>{displayProducts.length}개의 상품</span>

          <div className="flex items-center space-x-3">
            <Select
              value={selectedCategory}
              opts={Array.from(categories, (category) =>
                Object.assign({}, { title: category, value: category }),
              )}
              handleChange={(val: string) => {
                dispatch(setSelectedCategory(val));
                dispatch(setCurPage(1));
                dispatch(filterProductsByCategory(val));
              }}
            />

            <Select
              value={selectedSortOpt}
              opts={[
                { title: "유사도순", value: "sim" },
                { title: "날짜순", value: "date" },
                { title: "낮은가격순", value: "asc" },
                { title: "높은가격순", value: "dsc" },
              ]}
              handleChange={(val: string) => {
                dispatch(setSortOpt(val));
                dispatch(getProducts({ query: query, sortOpt: val }));
              }}
            />

            {displayProducts.length >= 10 && (
              <Select
                value={selectedViewOpt}
                opts={[
                  { title: "10개", value: 10 },
                  displayProducts.length >= 10 && { title: "20개", value: 20 },
                  displayProducts.length >= 20 && { title: "50개", value: 50 },
                ]}
                handleChange={(val: string) => {
                  dispatch(setCurPage(1));
                  dispatch(setViewOpt(parseInt(val)));
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* 상품목록 */}
      {loading ? (
        <CircularProgress className="my-12" />
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center mx-auto">
            {displayProducts
              .slice(offset, offset + selectedViewOpt)
              .map((product) => (
                <Product key={product.productId} {...product} />
              ))}
          </div>
        </div>
      )}

      {displayProducts.length > 0 && (
        <Pagination
          total={displayProducts.length}
          limit={selectedViewOpt}
          page={curPage}
        />
      )}

      <BsFillArrowUpCircleFill
        className="w-14 h-14 cursor-pointer fixed bottom-10 right-10 text-sky-800 hover:opacity-70 active:scale-90 transition duration-200 z-50"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default Container;
