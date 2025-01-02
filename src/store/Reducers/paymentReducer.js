import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

//For Admin Payments
// Get Admin payment request
export const getAdminPaymentRequests = createAsyncThunk(
  'payment/getAdminPaymentRequests',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    //console.log(sellerId)
    try {
      const { data } = await api.get(`/payment/admin/requests`, {
        withCredentials: true
      })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

// Admin confirm payment request
export const adminConfirmRequestPayment = createAsyncThunk(
  'payment/adminConfirmRequestPayment',
  async (paymentId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info)
    try {
      const { data } = await api.post(
        `/payment/admin/confitm-request`,
        { paymentId },
        {
          withCredentials: true
        }
      )
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

//For Seller Payments
// Get seller payment details
export const getSellerPaymentDetails = createAsyncThunk(
  'payment/getSellerPaymentDetails',
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(sellerId)
    try {
      const { data } = await api.get(`/payment/seller/details/${sellerId}`, {
        withCredentials: true
      })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

// Get seller payment details
export const sendWithdrawRequestForSeller = createAsyncThunk(
  'payment/sendWithdrawRequestForSeller',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info)
    try {
      const { data } = await api.post(
        `/payment/seller/withdraw-request`,
        { info },
        {
          withCredentials: true
        }
      )
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//end method

export const paymentReducer = createSlice({
  name: 'payment',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    pendingWithdraws: [],
    successWithdraws: [],
    totalAmount: 0,
    withdrawAmount: 0,
    pendingAmount: 0,
    availableAmount: 0
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
      //For Seller Payments
      // get seller request amount
      .addCase(getSellerPaymentDetails.fulfilled, (state, { payload }) => {
        state.pendingWithdraws = payload.pendingWithdraws
        state.successWithdraws = payload.successWithdraws
        state.totalAmount = payload.totalAmount
        state.withdrawAmount = payload.withdrawAmount
        state.pendingAmount = payload.pendingAmount
        state.availableAmount = payload.availableAmount
      })
      // Send Withdraw Request Payment For Seller
      .addCase(sendWithdrawRequestForSeller.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(sendWithdrawRequestForSeller.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(sendWithdrawRequestForSeller.fulfilled, (state, { payload }) => {
        state.pendingWithdraws = [...state.pendingWithdraws, payload.withdraw]
        state.pendingAmount = state.pendingAmount + payload.withdraw.amount
        state.availableAmount = state.availableAmount - payload.withdraw.amount

        state.loader = false
        state.successMessage = payload.message
      })

      // For Admin request
      //get admin payment request
      .addCase(getAdminPaymentRequests.fulfilled, (state, { payload }) => {
        state.pendingWithdraws = payload.withdrawRequests
      })
      //Admin Confirm Request payement
      .addCase(adminConfirmRequestPayment.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(adminConfirmRequestPayment.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(adminConfirmRequestPayment.fulfilled, (state, { payload }) => {
        const temp = state.pendingWithdraws.filter((r) => r._id !== payload.payment._id)
        state.loader = false
        state.successMessage = payload.message
        state.pendingWithdraws = temp
      })
  }
})

export const { messageClear } = paymentReducer.actions
export default paymentReducer.reducer
