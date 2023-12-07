import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItemsCheckOut: [],
    totalQty: 0,
    totalPrice: 0,
    tax: 0,
    gtotal: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        add(state, action) {
            let findAlreadyAddedItem = state.cartItemsCheckOut.findIndex((item) => item._id === action.payload._id)
            if (findAlreadyAddedItem >= 0) {
                state.cartItemsCheckOut[findAlreadyAddedItem].quantity += 1
            }
            else {
                state.cartItemsCheckOut.push(action.payload)
            }
        },

        remove(state, action) {
            const remainingCartItems = state.cartItemsCheckOut.filter((item) => item._id !== action.payload._id)
            void (state.cartItemsCheckOut = remainingCartItems)
        },

        getCartTotal(state) {
            const { totalQty, totalPrice } = state.cartItemsCheckOut.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;
                    cartTotal.totalQty += quantity
                    cartTotal.totalPrice += itemTotal
                    return cartTotal
                },
                {
                    totalQty: 0,
                    totalPrice: 0,
                }
            )
            state.totalPrice = parseInt(totalPrice.toFixed(2))
            state.totalQty = totalQty
            state.tax = Number((totalPrice / 100) * 10).toFixed(2)
            state.gtotal = Number(totalPrice) + Number(((totalPrice / 100) * 10).toFixed(2))
        },

        clearAllCart(state) {
            state.cartItemsCheckOut = []
        },


        decreaseCartQuantity(state, action) {
            const itemIndex = state.cartItemsCheckOut.findIndex(item => item._id === action.payload._id)
            if (state.cartItemsCheckOut[itemIndex].quantity > 1) { state.cartItemsCheckOut[itemIndex].quantity -= 1; }

            else if (state.cartItemsCheckOut[itemIndex].quantity === 1) {
                const remainingCartItems = state.cartItemsCheckOut.filter((item) => item._id !== action.payload._id);
                void (state.cartItemsCheckOut = remainingCartItems);
            }
        },

        increaseCartQuantity(state, action) {
            const itemIndex = state.cartItemsCheckOut.findIndex(item => item._id === action.payload._id)
            void (state.cartItemsCheckOut[itemIndex].quantity += 1);
        },
    },
})

export const { add, remove, getCartTotal, clearAllCart, increaseCartQuantity, decreaseCartQuantity } = cartSlice.actions
export default cartSlice.reducer