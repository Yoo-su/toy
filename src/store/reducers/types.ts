export type requestOptType = {
    query:string,
    sortOpt:string
}

export type productType = {
    title:string,
    link:string,
    image:string,
    lprice:string,
    hprice:string,
    mallName:string,
    productId:string,
    productType:string,
    brand:string,
    maker:string,
    category1:string,
    category2:string,
    category3:string,
    category4:string,
}

export type statesType = {
    curQuery:string,
    products:productType[],
    displayProducts:productType[],
    similarProducts:productType[],

    malls:string[],
    selectedMall:string,
    categories:string[],
    selectedCategory:string,

    selectedSortOpt:string,
    selectedViewOpt:number,
    
    curPage:number
    loading:boolean

}