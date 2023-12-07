import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from './ProductSlice'
import CartSlice from './CartSlice'



const store = configureStore({
    reducer: {
        Cart: CartSlice,
        Products: ProductSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
export default store