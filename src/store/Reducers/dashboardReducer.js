import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'
import { jwtDecode } from 'jwt-decode'

//For Admin get data dashboard
export const getAdminDashboardData = createAsyncThunk(
  'dashboard/getAdminDashboardData',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/admin/dashboard-data', { withCredentials: true })

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// For Seller
//For Seller get data dashboard
export const getSellerDashboardData = createAsyncThunk(
  'dashboard/getSellerDashboardData',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/dashboard-data`, {
        withCredentials: true
      })

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrders: [],
    recentMessages: []
  },
  reducers: {
    // message clear function reudx
    messageClear: (state, _) => {
      // state.errorMessage = ''
      // state.successMessage = ''
    }
  },
  // loader check state
  extraReducers: (builder) => {
    builder
      // For admin

      // Admin get data dashboard
      .addCase(getAdminDashboardData.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale
        state.totalProduct = payload.totalProduct
        state.totalOrder = payload.totalOrder
        state.totalSeller = payload.totalSeller
        state.recentMessages = payload.recentMessages
        state.recentOrders = payload.recentOrders
      })

      // For seller

      // Seller get data dashboard
      .addCase(getSellerDashboardData.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale
        state.totalProduct = payload.totalProduct
        state.totalOrder = payload.totalOrder
        state.totalPendingOrder = payload.totalPendingOrder
        state.recentMessages = payload.recentMessages
        state.recentOrders = payload.recentOrders
      })
    // .addCase(admin_login.pending, (state, { payload }) => {
    //   // get status and data BE pending 404
    //   state.loader = true
    // })
    // .addCase(admin_login.rejected, (state, { payload }) => {
    //   // get status and data BE pending 404
    //   state.loader = false
    //   state.errorMessage = payload.error
    // })
  }
})

export const { messageClear } = dashboardReducer.actions
export default dashboardReducer.reducer
