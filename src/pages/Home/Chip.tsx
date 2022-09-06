import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProductsByMall, setSelectedMall, setCurPage } from '../../../store/reducers/productReducer';

type propsType = {
  text: string;
};

//메인페이지 특정 브랜드 상품만 필터링하는 버튼 컴포넌트
function Chip({ text }: propsType) {
  const dispatch = useDispatch();
  const { selectedMall } = useSelector((state) => state.products);

  return (
    <button
      className={`flex justify-center items-center rounded-xl ${
        selectedMall === text ? 'border-0 bg-sky-300 text-sky-900 font-bold' : 'border-2 border-gray-300'
      }
                    mx-3 my-1 px-2 py-1 cursor-pointer shadow-sm`}
      onClick={() => {
        dispatch(setCurPage(1));
        dispatch(setSelectedMall(text));
        dispatch(filterProductsByMall(text));
      }}
    >
      <span className="text-sm">{text}</span>
    </button>
  );
}

export default memo(Chip);
