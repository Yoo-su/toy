import axios from 'axios';

const baseURL='/v1/search/shop.json'
const header={
    'X-Naver-Client-Id':process.env.REACT_APP_CLIENT_ID || '',    
    'X-Naver-Client-Secret':process.env.REACT_APP_CLIENT_SECRET || '',
    'Access-Control-Allow-Origin':'*'
}

type propsType={
    query:string,
    sortOpt:string
}



export const getProductsByQuery=({query,sortOpt='sim'}:propsType)=>{
    return axios.get(baseURL,{
        params:{
            query:query,
            display:100,
            sort:sortOpt
        },
        headers:header
    });
}

