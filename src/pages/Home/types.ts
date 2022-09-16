export type SearchBoxProps = {
  query: string;
  setQuery: (val: string) => void;
};

export type SetProductArgs = {
  query: string;
  sortOpt: string;
};

export type ProductProps = {
  title: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  brand: string;
  maker: string;
  productId: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  link: string;
};

export type SelectProps = {
  value: string | number;
  opts: Array<{ title: string; value: string | number } | boolean>;
  handleChange: (val: string) => number | string | void;
};
