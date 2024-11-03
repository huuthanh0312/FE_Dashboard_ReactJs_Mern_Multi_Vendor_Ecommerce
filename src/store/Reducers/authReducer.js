import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'
import { jwtDecode } from 'jwt-decode'


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
      const token = data.token
      //setup localStorage
      localStorage.setItem('accessToken', token)
      // console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_user_info = createAsyncThunk(
  'auth/get_user_info',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.get('/get-user', { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

//decoding token check duration token
const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token)
    const expireTime = new Date(decodeToken.exp * 1000)
    if (new Date() > expireTime) {
      localStorage.removeItem('accessToken')
      return ''
    } else {
      return decodeToken.role
    }
  } else {
    return ''
  }
}

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
    role: returnRole(localStorage.getItem('accessToken')),
    token: localStorage.getItem('accessToken')
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
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        state.token = payload.token
        state.role = returnRole(payload.token)
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
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        state.token = payload.token
        state.role = returnRole(payload.token)
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
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        state.token = payload.token
        state.role = returnRole(payload.token)
      })
      //get user info
      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.userInfo = payload.userInfo
      })
  }
})

export const { messageClear } = authReducer.actions
export default authReducer.reducer
