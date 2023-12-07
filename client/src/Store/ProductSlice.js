import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'

const initialState = {
    data: [],
    status: "idle",
    error: null,
    // selCat: []
}

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterCat(state, action) {
            state.selCat.push(action.payload)
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = "idle"
            })
            .addCase(getProducts.rejected, (state) => {
                state.status = "error"
            })
    }
})

export default ProductSlice.reducer

//get all products from mongo db
export const getProducts = createAsyncThunk('products/get', async () => {
    try {
        const data = await fetch('https://pos-server-gules.vercel.app/api/v1/items/get-item')
        const result = data.json()
        // console.log(result);
        return result
    } catch (error) {
        console.log("Thunk error = ", error);
    }
})

export const { filterCat } = ProductSlice.actions

