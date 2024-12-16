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
export const getProducts = createAsyncThunk(
  'product/getProducts',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/products?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      )
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

//Get Product By Id
export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/products/${productId}`, { withCredentials: true })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

//update Product By Id
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/products/${product.productId}`, product, {
        withCredentials: true
      })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

//update Product Image By Id
export const updateProductImage = createAsyncThunk(
  'product/updateProductImage',
  async ({ oldImage, newImage, productId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('oldImage', oldImage)
      formData.append('newImage', newImage)
      const { data } = await api.put(`/products/${productId}/image`, formData, {
        withCredentials: true
      })
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
    product: '',
    totalProduct: 0
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
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.products = payload.products
        state.totalProduct = payload.totalProduct
      })
      //get Product by Id
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.product = payload.product
      })
      // update product by Id
      .addCase(updateProduct.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.product = payload.product
        state.successMessage = payload.message
      })
      //update image by ID
      .addCase(updateProductImage.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.product = payload.product
        state.successMessage = payload.message
      })
  }
})

export const { messageClear } = productReducer.actions
export default productReducer.reducer
