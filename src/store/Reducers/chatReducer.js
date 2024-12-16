import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import api from '../../api/api'

// customers add chat seller
export const getCustomersBySeller = createAsyncThunk(
  'chat/getCustomersBySeller',
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(sellerId)
    try {
      const { data } = await api.get(`/chat/sellers/get-customers/${sellerId}`, {
        withCredentials: true
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// get message Customer to send message seller
export const getCustomerMessagesBySeller = createAsyncThunk(
  'chat/getCustomerMessagesBySeller',
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(sellerId)
    try {
      const { data } = await api.get(`/chat/sellers/get-customers-messages/${customerId}`, {
        withCredentials: true
      })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Send message seller to customer
export const sellerSendMessageToCustomer = createAsyncThunk(
  'chat/sellerSendMessageToCustomer',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('/chat/sellers/send-message-to-customer', info, {
        withCredentials: true
      })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const chatReducer = createSlice({
  name: 'chat',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    customers: [], //for seller to customers
    sellers: [], // for admin to sellers list
    friends: [], // for admin to admins list
    seller_customer_messages: [],
    seller_admin_messages: [],
    currentSeller: {}, //for admin
    currentCustomer: {}, //for seller to customers
    activeCustomer: [],
    activeSeller: [],
    activeAdmin: ''
  },
  reducers: {
    // message clear function reudx
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
    // Hàm cập nhật message seller and customer
    updateMessageSellerAndCustomer: (state, { payload }) => {
      state.seller_customer_messages = [...state.seller_customer_messages, payload]
    },
    // Hàm cập nhật message
    updateMessageAdminAndSeller: (state, { payload }) => {
      state.seller_customer_messages = [...state.seller_admin_messages, payload]
    }
  },
  // loader check state
  extraReducers: (builder) => {
    builder
      .addCase(getCustomersBySeller.fulfilled, (state, { payload }) => {
        state.customers = payload.customers
      })
      .addCase(getCustomerMessagesBySeller.fulfilled, (state, { payload }) => {
        state.currentCustomer = payload.currentCustomer
        state.seller_customer_messages = payload.seller_customer_messages
      })
      // customer to send message seller
      .addCase(sellerSendMessageToCustomer.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(sellerSendMessageToCustomer.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(sellerSendMessageToCustomer.fulfilled, (state, { payload }) => {
        state.loader = false
        let tempFriends = [...state.customers] // Tạo bản sao của myFriends
        let i = tempFriends.findIndex((f) => f.friendId === payload.messages.receiverId)
        if (i >= 0) {
          // Kiểm tra nếu seller tồn tại trong danh sách bạn bè
          const seller = tempFriends.splice(i, 1)[0] // Lấy seller ra khỏi mảng
          tempFriends.unshift(seller) // Thêm seller vào đầu mảng
        }
        state.seller_customer_messages = [...state.seller_customer_messages, payload.messages] // Cập nhật danh sách tin nhắn
        state.customers = tempFriends // Cập nhật lại danh sách bạn bè
        state.successMessage = 'Message Send Successfully'
      })
  }
})

export const { messageClear, updateMessageSellerAndCustomer, updateMessageAdminAndSeller } =
  chatReducer.actions
export default chatReducer.reducer
