import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"


const initialState = {
    productData : [],
    banner : null,
    selectedCategory : "For You",
    allCategory: null
}

const productSlice = createSlice({
    name:"product",
    initialState : initialState,
    reducers: {
        setProductData : (state,action) => {
            state.productData = action.payload
        },
        setBanner : (state,action) => {
            state.banner = action.payload
        },
        setCategory : (state, action) => {
            state.selectedCategory = action.payload
        },
        setAllCategory : (state,action) => {
            state.allCategory = action.payload
        }
    }
})

export const {setProductData, setBanner, setCategory, setAllCategory} = productSlice.actions;
export default productSlice.reducer;