import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  setCurQuery,
  setCurPage,
} from "../../store/reducers/productSlice";
import { GoSearch } from "react-icons/go";
import { searchBoxProps } from "./types";
import { RootState, AppDispatch } from "../../store";

//메인화면 검색창 컴포넌트
const SearchBox = ({ query, setQuery }: searchBoxProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { curQuery } = useSelector((state: RootState) => state.productsReducer);

  const dispatchProducts = () => {
    if ((query.trim().length === 0) === false) {
      dispatch(getProducts({ query: query, sortOpt: "sim" }));
      dispatch(setCurQuery(query));
      dispatch(setCurPage(1));
    }
  };

  useEffect(() => {
    if (curQuery) {
      setQuery(curQuery);
    }
  }, []);
  return (
    <div
      className="flex items-center my-10 px-2 py-1 rounded-xl shadow-lg h-16
                     w-96 justify-between"
    >
      <input
        className="flex-1 h-4/5 mr-4 focus:outline-sky-400 px-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            dispatchProducts();
          }
        }}
      />
      <GoSearch
        className="w-10 h-10 cursor-pointer
                                rounded-full p-2 bg-blue-100 text-blue-500"
        onClick={dispatchProducts}
      />
    </div>
  );
};

export default SearchBox;
