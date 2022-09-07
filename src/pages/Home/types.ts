
import { SetStateAction, Dispatch } from "react";

export type searchBoxProps = {
    query:string,
    setQuery:Dispatch<SetStateAction<string>>
}

export type getProductArgs = {
  query:string,
  sortOpt:string
}

export type productProps = {
  title: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  brand: string;
  maker: string;
  productId: string;
  productType: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  link: string;
};

export type selectProps = {
  value:string|number,
  opts:Array<{title:string, value:string|number} | boolean>,
  handleChange:any
}