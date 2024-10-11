import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {

      const data = await api.post('/admin-login', info, { withCredentials: true })
      //console.log(data)
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
      state.errorMessage = ""
    }
  },
  // loader check state
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, { payload }) => {    // get status and data BE pending 404
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, { payload }) => {   // get status and data BE pending 404
        state.loader = false;
        state.errorMessage = payload.error
        console.log(payload)
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {   // get status and data BE success 200
        state.loader = false;
        state.successMessage = payload.data.message
        console.log(payload)
      })
  }

})

export const { messageClear } = authReducer.actions
export default authReducer.reducer



