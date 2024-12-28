import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

//For Admin Orders
// Get orders
export const getAdminOrders = createAsyncThunk(
  'order/getAdminOrders',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      )
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

// Get orders by Id
export const getAdminOrderById = createAsyncThunk(
  'order/getAdminOrderById',
  async ({ orderId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/orders/${orderId}`, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

// handle admin update status orders
export const updateAdminStatusOrder = createAsyncThunk(
  'order/updateAdminStatusOrder',
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    //console.log(orderId, info)
    try {
      const { data } = await api.put(`/admin/orders/status-update/${orderId}`, info, {
        withCredentials: true
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

//For Seller Orders
// Get orders
export const getSellerOrders = createAsyncThunk(
  'order/getSellerOrders',
  async ({ sellerId, parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/seller/${sellerId}/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      )
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

// Get orders by Id
export const getSellerOrderById = createAsyncThunk(
  'order/getSellerOrderById',
  async ({ orderId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(orderId)
      const { data } = await api.get(`/seller/orders/${orderId}`, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      console.error('API Call Error:', error.response?.data || error.message)
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

// handle admin update status orders
export const updateSellerStatusOrder = createAsyncThunk(
  'order/updateSellerStatusOrder',
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    //console.log(orderId, info)
    try {
      const { data } = await api.put(`/seller/orders/status-update/${orderId}`, info, {
        withCredentials: true
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

export const orderReducer = createSlice({
  name: 'order',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    myOrders: [],
    totalOrder: 0,
    order: {}
  },
  reducers: {
    // message clear function reudx
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    }
  },
  // loader check state
  extraReducers: (builder) => {
    builder
      //For Admin
      //get admin orders
      .addCase(getAdminOrders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders
        state.totalOrder = payload.totalOrder
      })
      //get admin order by Id
      .addCase(getAdminOrderById.fulfilled, (state, { payload }) => {
        state.order = payload.order
      })
      // Admin update status
      .addCase(updateAdminStatusOrder.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(updateAdminStatusOrder.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(updateAdminStatusOrder.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })

      //For seller
      .addCase(getSellerOrders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders
        state.totalOrder = payload.totalOrder
      })
      //get seller order by Id
      .addCase(getSellerOrderById.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(getSellerOrderById.fulfilled, (state, { payload }) => {
        state.order = payload.order
      })
      .addCase(updateSellerStatusOrder.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(updateSellerStatusOrder.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })
  }
})

export const { messageClear } = orderReducer.actions
export default orderReducer.reducer
