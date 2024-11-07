import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

// Create Product
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/products', product, { withCredentials: true })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

//Get Product
export const getProduct = createAsyncThunk(
  'product/getProduct',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/products?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      )
      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const productReducer = createSlice({
  name: 'product',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    products: [],
    totalProduct: 0
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
      // add Product
      .addCase(addProduct.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
      })
      //get Product
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.products = payload.products
        state.totalProduct = payload.totalProduct
      })
  }
})

export const { messageClear } = productReducer.actions
export default productReducer.reducer
