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

//end method

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.get('/logout', { withCredentials: true })
      //setup localStorage
      localStorage.removeItem('accessToken')
      if (role === 'admin') {
        navigate('/admin/login')
      } else if (role === 'seller') {
        navigate('/login')
      }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//update Profile Image By Id
export const uploadSellerProfileImage = createAsyncThunk(
  'auth/uploadSellerProfileImage',
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller/profile/image-upload`, image, {
        withCredentials: true
      })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

//Change Profile Info By Id
export const changeSellerInfo = createAsyncThunk(
  'auth/changeSellerInfo',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info)
      const { data } = await api.post(`/seller/profile/info`, info, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
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
    userInfo: '',
    role: returnRole(localStorage.getItem('accessToken')),
    token: localStorage.getItem('accessToken')
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
      //seller image upload profile
      .addCase(uploadSellerProfileImage.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(uploadSellerProfileImage.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(uploadSellerProfileImage.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.userInfo = payload.userInfo
        state.successMessage = payload.message
      })
      //Change Seller Info
      .addCase(changeSellerInfo.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(changeSellerInfo.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(changeSellerInfo.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.userInfo = payload.userInfo
        state.successMessage = payload.message
      })
  }
})

export const { messageClear } = authReducer.actions
export default authReducer.reducer
