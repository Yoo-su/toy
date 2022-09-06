import { memo, useMemo, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { productProps } from "./types";

//메인화면 상품정보 카드 컴포넌트
const Product = ({
  title,
  image,
  lprice,
  hprice,
  mallName,
  brand,
  maker,
  productId,
  productType,
  category1,
  category2,
  category3,
  category4,
  link,
}: productProps) => {
  const refinedTitle = useMemo(() => title.replace(/<\/?[^>]+(>|$)/g, ""), []);

  return (
    <Link
      to={`/detail/${productId}`}
      state={{
        title: refinedTitle,
        image,
        lprice,
        hprice,
        mallName,
        brand,
        maker,
        productId,
        productType,
        category1,
        category2,
        category3,
        category4,
        link,
      }}
    >
      <div className="flex flex-col rounded-md shadow-md w-40 bg-gray-50 cursor-pointer py-4 my-5 mx-8 hover:animate-pulse">
        <img
          className="w-full max-h-40 object-contain"
          src={image}
          alt={image}
          loading="lazy"
        />

        <div className="flex flex-col space-y-1 px-2 w-full mt-2 font-gowun-batang">
          <b
            className="text-sm text-center text-ellipsis overflow-hidden"
            style={titleStyle}
          >
            {refinedTitle}
          </b>
          <b className="text-red-500 text-center text-sm">
            최저: {parseInt(lprice).toLocaleString()}&nbsp;원
          </b>
          {hprice && (
            <b className="text-blue-400 text-start text-sm">최고: {hprice}원</b>
          )}
          <b className="text-sm text-gray-800 text-center">&nbsp;{mallName}</b>
        </div>
      </div>
    </Link>
  );
};

const titleStyle: CSSProperties = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  display: "-webkit-box",
};

export default memo(Product);
