const BASE_URL = "http://localhost:4000/api/v1"
// const BASE_URL = "https://ecommerce-backend-lac-three.vercel.app/api/v1"


export const authEndpoints = {
    LOGIN_API : BASE_URL + "/auth/login",
    SIGNUP_API : BASE_URL + "/auth/signup"
}

export const categoryEndpoints = {
    CREATECATEGORY : BASE_URL + "/category/createcategory",
    GET_CATEGORY_BY_ID : (id) => BASE_URL + `/category/getcategorybyid/${id}`,
    DELETE_CATEGORY_BY_ID : (id) => BASE_URL + `/category/deletecategorybyid/${id}`,

    GET_ALL_CATEGORY : BASE_URL + "/category/getallcategory"
}

export const productsEndpoints = {
    CREATE_PRODUCT : BASE_URL + "/product/createproduct",
    GET_PRODUCT_BY_USERID : BASE_URL + "/product/getproductbyuserid",

    GET_PRODUCT_BY_ID : (id) => BASE_URL + `/product/getproductbyid/${id}`,
    GET_PRODUCT_BY_CATEGORYID : (id) => BASE_URL + `/product/getallproductsbycategoryid/${id}`,
    GET_ALL_PRODUCTS : BASE_URL + "/product/getallproducts",
    UPDATE_PRODUCTS_BY_ID : (id) => BASE_URL + `/product/updateproductbyid/${id}`,
    DELETE_BY_ID : (id) => BASE_URL + `/product/deleteproductbyid/${id}`,
    FOR_YOU : BASE_URL + "/product/foryou"
}

export const searchEndpoints = {
    SEARCH_BY_FILTER : (q) => BASE_URL + `/search/searchbyfilter?q=${q}`,
    SEARCH_ALL : (q) => BASE_URL + `/search/searchall?q=${q}`

}

export const orderEndpoints = {
    BUY_NOW :  BASE_URL + "/order/buyorder",
    MY_ORDER :  BASE_URL + "/order/myorder",


}