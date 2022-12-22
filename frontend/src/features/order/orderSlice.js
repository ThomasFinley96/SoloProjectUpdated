
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [],
    order: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// get order
export const getOrder = createAsyncThunk("order/getOrder", async (orderId, thunkAPI) => {
    try {
        const response = await axios.get(`/orders/${orderId}`)
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create order
export const createOrder = createAsyncThunk("order/createOrder", async (order, thunkAPI) => {
    try {
        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post("/orders", order, config)
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update order
export const updateOrder = createAsyncThunk("order/updateOrder", async (updatedOrder, thunkAPI) => {
    try {
        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put("/orders/updateOrder", updatedOrder, config)
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get user orders
export const getUserOrders = createAsyncThunk("order/getUserOrders", async (userId, thunkAPI) => {
    try {
        const response = await axios.get(`/orders/user/${userId}`)
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all orders
export const getAllOrders = createAsyncThunk("order/getAllOrders", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/orders")
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete order
export const deleteOrder = createAsyncThunk("order/deleteOrder", async (orderId, thunkAPI) => {
    try {

        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.delete(`/orders/${orderId}`, config)
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrder: (state) => initialState
    },
    extraReducers: (builder) => {
        builder

            // get order
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.order = action.payload
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // get user orders
            .addCase(getUserOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // get all orders
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // create order
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // update order
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.order = action.payload
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.order = null
            })

            // delete order
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = state.orders.filter((order) => order._id !== action.payload)
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { resetOrder } = orderSlice.actions
export default orderSlice.reducer