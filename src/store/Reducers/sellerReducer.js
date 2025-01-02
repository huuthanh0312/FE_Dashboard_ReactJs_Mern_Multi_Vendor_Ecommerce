import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

// Get sellers
export const getSellers = createAsyncThunk(
  'seller/getSellers',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/get-sellers?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      )
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Get sellers By Id
export const getSeller = createAsyncThunk(
  'seller/getSeller',
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`get-sellers/${sellerId}`, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Update sellers By Id
export const updateSellerStatus = createAsyncThunk(
  'seller/updateSellerStatus',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/sellers-update-status`, info, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Get sellers active
export const getActiveSellers = createAsyncThunk(
  'seller/getActiveSellers',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    console.log(parPage, page, searchValue)
    try {
      const { data } = await api.get(
        `/get-active-sellers?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      )
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Get sellers deactive
export const getDeactiveSellers = createAsyncThunk(
  'seller/getDeactiveSellers',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    console.log(parPage, page, searchValue)
    try {
      const { data } = await api.get(
        `/get-deactive-sellers?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      )
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end methods

// Create Seller Tripe Connect Acount
export const createSellerStripeConnectAccount = createAsyncThunk(
  'seller/createSellerStripeConnectAccount',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const {
        data: { url }
      } = await api.get(`/payment/create-stripe-connect-account`, {
        withCredentials: true
      })
      return fulfillWithValue(url)
    } catch (error) {
      throw error
    }
  }
)
//end methods

// Create Seller Tripe Connect Acount
export const activeSellerStripeConnectAccount = createAsyncThunk(
  'seller/activeSellerStripeConnectAccount',
  async (activeCode, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/payment/active-stripe-connect-account/${activeCode}`,
        {},
        {
          withCredentials: true
        }
      )
      return fulfillWithValue(data)
    } catch (error) {
      throw error
    }
  }
)
//end methods

export const sellerReducer = createSlice({
  name: 'seller',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    isLoadingPayment: false,
    sellers: [],
    totalSeller: 0,
    seller: ''
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
      //get seller
      .addCase(getSellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers
        state.totalSeller = payload.totalSeller
      })
      //get seller by Id
      .addCase(getSeller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller
      })
      // Seller Update Status By Admin
      .addCase(updateSellerStatus.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(updateSellerStatus.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(updateSellerStatus.fulfilled, (state, { payload }) => {
        state.loader = false
        state.seller = payload.seller
        state.successMessage = payload.message
      })
      //get seller active
      .addCase(getActiveSellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers
        state.totalSeller = payload.totalSeller
      })
      //get seller deactive
      .addCase(getDeactiveSellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers
        state.totalSeller = payload.totalSeller
      })
      //create seller payment connect account
      .addCase(createSellerStripeConnectAccount.pending, (state, { payload }) => {
        state.isLoadingPayment = true
      })
      .addCase(createSellerStripeConnectAccount.rejected, (state, { payload }) => {
        state.isLoadingPayment = false
        state.errorMessage = 'Create Payment Faild'
      })
      .addCase(createSellerStripeConnectAccount.fulfilled, (state, { payload }) => {
        window.location.href = payload
        state.isLoadingPayment = false
      })
      // active seller payment connect account
      .addCase(activeSellerStripeConnectAccount.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(activeSellerStripeConnectAccount.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.message
      })
      .addCase(activeSellerStripeConnectAccount.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.message
      })
  }
})

export const { messageClear } = sellerReducer.actions
export default sellerReducer.reducer
