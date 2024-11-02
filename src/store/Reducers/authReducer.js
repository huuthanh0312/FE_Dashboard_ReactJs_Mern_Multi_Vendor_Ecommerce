import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('/admin-login', info, { withCredentials: true })
      //setup localStorage
      localStorage.setItem('accessToken', data.token)
      return fulfillWithValue(data)
    } catch (error) {
      //console.log(error.response.data);
      return rejectWithValue(error.response.data)
    }
  }
)

export const seller_register = createAsyncThunk(
  'auth/seller_register',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('/seller-register', info, { withCredentials: true })
      //setup localStorage
      localStorage.setItem('accessToken', data.token)
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      //console.log(error.response.data);
      return rejectWithValue(error.response.data)
    }
  }
)

export const seller_login = createAsyncThunk(
  'auth/seller_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('/seller-login', info, { withCredentials: true })
      //setup localStorage
      localStorage.setItem('accessToken', data.token)
      // console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      //console.log(error.response.data);
      return rejectWithValue(error.response.data)
    }
  }
)
export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: ''
  },
  reducers: {
    // message clear function reudx
    messageClear: (state, _) => {
      state.errorMessage = ''
    }
  },
  // loader check state
  extraReducers: (builder) => {
    builder
      // admin - login
      .addCase(admin_login.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
        console.log(payload)
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        console.log(payload)
      })
      // seller - register
      .addCase(seller_register.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
        console.log(payload)
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        console.log(payload)
      })
      // seller  - login
      .addCase(seller_login.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
        console.log(payload)
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        console.log(payload)
      })
  }
})

export const { messageClear } = authReducer.actions
export default authReducer.reducer
