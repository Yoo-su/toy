import { SelectProps } from "../../../pages/Home/types";

//메인화면 검색 결과 필터링을 위한 select 컴포넌트
const Select = ({ value, opts, handleChange }: SelectProps) => (
  <select
    value={value}
    onChange={(e) => {
      handleChange(e.target.value);
    }}
  >
    {opts?.map(
      (opt) =>
        typeof opt === "object" && (
          <option key={opt.value} value={opt.value}>
            {opt.title || "전체"}
          </option>
        ),
    )}
  </select>
);

export default Select;
