export type RequestOptType = {
  query: string;
  sortOpt: string;
};

export type ProductType = {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  productId: string;
  ProductType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
};

export type SimilarProductType = {
  title: string;
  productId: string;
  brand: string;
  lprice: string;
  category1: string;
  image: string;
};

export type StatesType = {
  curQuery: string;
  products: Array<ProductType>;
  displayProducts: ProductType[];
  similarProducts: SimilarProductType[];
  cart: ProductType[];
  productDetail: ProductType | null;

  malls: string[];
  selectedMall: string;
  categories: string[];
  selectedCategory: string;

  selectedSortOpt: string;
  selectedViewOpt: number;

  curPage: number;
  loading: boolean;
};
