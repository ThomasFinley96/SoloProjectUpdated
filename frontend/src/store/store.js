
import { configureStore } from "@reduxjs/toolkit"

import currentUserReducer from "../features/currentUser/currentUserSlice"
import userReducer from "../features/user/userSlice"
import orderReducer from "../features/order/orderSlice"

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        user: userReducer,
        order: orderReducer
    }
})

export default store