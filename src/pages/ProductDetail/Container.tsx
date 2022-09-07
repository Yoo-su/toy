import { useEffect, useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import { setSimilarProducts } from "../../store/reducers/productSlice";
import { RootState, AppDispatch } from "../../store";
import { locationStateType } from "./types";

//상품 상세 페이지 컴포넌트
export const Container = () => {
  const location = useLocation();
  const {
    title,
    maker,
    brand,
    image,
    category1,
    category2,
    category3,
    category4,
    lprice,
    mallName,
    link,
    productId,
  } = location.state as locationStateType;
  const dispatch = useDispatch<AppDispatch>();
  const { similarProducts } = useSelector(
    (state: RootState) => state.productsReducer
  );

  const elementMap={
    title:(value:string)=>{return value.replace(/<\/?[^>]+(>|$)/g, "")},
    image:(value:string)=><img className="w-24 object-contain mx-auto" src={value} alt={value} />,
    brand:(value:string)=>{return value},
    lprice:(value:string)=><span className='text-red-500'>{parseInt(value).toLocaleString()}원</span>,
    category1:(value:string)=>{return value},
    linkBtn:(value:any)=>(
    <button className="rounded-md px-2 py-1 bg-slate-600 text-white">보기</button>)

  }
  useEffect(() => {
    dispatch(setSimilarProducts({ brand, category1, productId }));
  }, [title]);

  return (
    <article className="flex flex-col px-10 py-8">
      {/* 상품 상세 정보 */}
      <section className="flex rounded-lg shadow-lg">
        <img src={image} alt={image} className="w-96 h-auto" />

        <section className="flex flex-col items-start justify-center pl-16 ml-8 my-8 space-y-3 border-l border-gray-300">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="flex flex-col">
            <b className="text-red-500 text-xl">
              최저&nbsp;{parseInt(lprice).toLocaleString()}원
            </b>
            <label className="text-gray-500 text-lg">{`${category1} ${
              category2 && " > " + category2
            } ${category3 && " > " + category3} ${
              category4 && " > " + category4
            }`}</label>
          </div>
          <div>
            {brand && (
              <span className="flex items-center text-2xl">
                <b className="text-lime-600">브랜드</b>{" "}
                <b className="text-gray-800 ml-2">{brand}</b>
              </span>
            )}
            <span className="flex items-center text-2xl">
              <b className="text-sky-700">판매몰</b>{" "}
              <b className="text-gray-800 ml-2">{mallName}</b>
            </span>
          </div>
          <a className="text-2xl" href={link}>
            상품 링크
          </a>
        </section>
      </section>

      {/* 유사한 상품목록 */}
      {similarProducts.length > 1 && (
        <section className="flex flex-col mt-28">
          <h1 className="text-3xl ml-6 mb-4 font-semibold italic underline">
            비슷한 상품
          </h1>
          <Table thead={["상품명","이미지","브랜드","가격","카테고리","-"]} tbody={similarProducts} elementMap={elementMap} />
          {/* <table className="table-auto shadow-lg text-gray-600 rounded-lg">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th scope="col" className="border py-3 px-6">
                  상품명
                </th>
                <th scope="col" className="border py-3 px-6">
                  이미지
                </th>
                <th scope="col" className="border py-3 px-6">
                  브랜드
                </th>
                <th scope="col" className="border py-3 px-6">
                  가격
                </th>
                <th scope="col" className="border py-3 px-6">
                  카테고리
                </th>
                <th scope="col" className="border py-3 px-6">
                  -
                </th>
              </tr>
            </thead>

            <tbody>
              {similarProducts.map((data) => (
                <tr key={data.productId}>
                  <td className="border px-4 py-2">
                    {data.title.replace(/<\/?[^>]+(>|$)/g, "")}
                  </td>
                  <td className="border px-4 py-2">
                    <img
                      className="w-24 object-contain mx-auto"
                      src={data.image}
                      alt={data.image}
                    />
                  </td>
                  <td className="border text-center">{data.brand}</td>
                  <td className="border text-center text-red-500">
                    {parseInt(data.lprice).toLocaleString()}원
                  </td>
                  <td className="border text-center">{data.category1}</td>
                  <td className="border text-center">
                    <Link
                      to={`/detail/${data.productId}`}
                      state={{
                        title: data.title.replace(/<\/?[^>]+(>|$)/g, ""),
                        image: data.image,
                        lprice: data.lprice,
                        hprice: data.hprice,
                        mallName: data.mallName,
                        brand: data.brand,
                        maker: data.maker,
                        productId: data.productId,
                        productType: data.productType,
                        category1: data.category1,
                        category2: data.category2,
                        category3: data.category3,
                        category4: data.category4,
                        link: data.link,
                      }}
                    >
                      <button className="rounded-md px-2 py-1 bg-slate-600 text-white">
                        보기
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </section>
      )}
    </article>
  );
};

export default Container;