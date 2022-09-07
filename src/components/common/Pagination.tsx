import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { setCurPage } from "../../store/reducers/productSlice";
import { GrPrevious, GrNext } from "react-icons/gr";

type propsType = {
  total: number;
  limit: number;
  page: number;
};

//페이지네이션 컴포넌트
const Pagination = ({ total, limit, page }: propsType) => {
  const dispatch = useDispatch();
  const numPages = Math.ceil(total / limit);

  return (
    <Fragment>
      <nav className="flex justify-center items-center gap-1 m-4">
        {/* 이전 페이지 이동 버튼 */}
        <button
          className="disabled:opacity-40"
          onClick={() => dispatch(setCurPage(page - 1))}
          disabled={page === 1}
        >
          <GrPrevious />
        </button>

        {/* n 페이지로 이동하는 버튼들 */}
        {Array(numPages)
          .fill(null)
          .map((_, index) => (
            <button
              className="rounded-full w-8 h-8 border-2 border-sky-300 text-black hover:scale-110
                                        transition duration-150 text-sm"
              key={index + 1}
              onClick={() => dispatch(setCurPage(index + 1))}
              aria-current={page === index + 1 ? "page" : undefined}
            >
              {index + 1}
            </button>
          ))}

        {/* 다음 페이지 이동 버튼 */}
        <button
          className="disabled:opacity-40"
          onClick={() => dispatch(setCurPage(page + 1))}
          disabled={page === numPages}
        >
          <GrNext />
        </button>
      </nav>
    </Fragment>
  );
};

export default Pagination;
