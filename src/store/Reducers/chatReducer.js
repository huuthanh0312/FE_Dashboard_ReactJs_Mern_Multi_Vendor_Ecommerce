import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

// For Seller
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
      const { data } = await api.get(`/chat/sellers/get-customer-messages/${customerId}`, {
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

// get message seller to send message Admin
export const getAdminMessagesBySeller = createAsyncThunk(
  'chat/getAdminMessagesBySeller',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    //console.log(sellerId)
    try {
      const { data } = await api.get(`/chat/sellers/get-admin-messages`, {
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
export const sellerSendMessageToAdmin = createAsyncThunk(
  'chat/sellerSendMessageToAdmin',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('/chat/sellers/send-message-to-admin', info, {
        withCredentials: true
      })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// For Admin
// list seller for Admin
export const getSellersByAdmin = createAsyncThunk(
  'chat/getSellersByAdmin',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    //console.log(sellerId)
    try {
      const { data } = await api.get(`/chat/admins/get-sellers`, {
        withCredentials: true
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// get message seller to send message Admin
export const getSellerMessagesByAdmin = createAsyncThunk(
  'chat/getSellerMessagesByAdmin',
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(sellerId)
    try {
      const { data } = await api.get(`/chat/admins/get-seller-messages/${sellerId}`, {
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
export const adminSendMessageToSeller = createAsyncThunk(
  'chat/adminSendMessageToSeller',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('/chat/admins/send-message-to-seller', info, {
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
    admin_seller_messages: [],
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
    updateCustomers: (state, { payload }) => {
      state.activeCustomer = payload
    },
    updateSellers: (state, { payload }) => {
      state.activeSeller = payload
    },
    // Hàm cập nhật message seller and customer
    updateMessageSellerAndCustomer: (state, { payload }) => {
      state.seller_customer_messages = [...state.seller_customer_messages, payload]
    },
    // Hàm cập nhật message admin
    updateAdminMessage: (state, { payload }) => {
      state.admin_seller_messages = [...state.admin_seller_messages, payload]
    },
    // Hàm cập nhật message Seller
    updateSellerMessage: (state, { payload }) => {
      state.admin_seller_messages = [...state.admin_seller_messages, payload]
    }
  },
  // loader check state
  extraReducers: (builder) => {
    builder
      // For Seller
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
          const seller = tempFriends.splice(i, 1)[0] // Lấy customer ra khỏi mảng
          tempFriends.unshift(seller) // Thêm customer vào đầu mảng
        }
        state.seller_customer_messages = [...state.seller_customer_messages, payload.messages] // Cập nhật danh sách tin nhắn
        state.customers = tempFriends // Cập nhật lại danh sách bạn bè
        state.successMessage = 'Message Send Successfully'
      })
      //For seler send Admin message///
      //Get and Send message Admin
      .addCase(getAdminMessagesBySeller.fulfilled, (state, { payload }) => {
        state.admin_seller_messages = payload.admin_seller_messages
      })
      // seller to send message admin
      .addCase(sellerSendMessageToAdmin.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(sellerSendMessageToAdmin.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(sellerSendMessageToAdmin.fulfilled, (state, { payload }) => {
        state.loader = false

        state.admin_seller_messages = [...state.admin_seller_messages, payload.messages] // Cập nhật danh sách tin nhắn
        state.successMessage = 'Message Send Successfully'
      })

      //For Admin
      .addCase(getSellersByAdmin.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers
      })
      .addCase(getSellerMessagesByAdmin.fulfilled, (state, { payload }) => {
        state.currentSeller = payload.currentSeller
        state.admin_seller_messages = payload.admin_seller_messages
      })
      // customer to send message seller
      .addCase(adminSendMessageToSeller.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(adminSendMessageToSeller.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(adminSendMessageToSeller.fulfilled, (state, { payload }) => {
        state.loader = false
        state.admin_seller_messages = [...state.admin_seller_messages, payload.messages]
        state.successMessage = 'Message Send Successfully'
      })
  }
})

export const {
  messageClear,
  updateCustomers,
  updateSellers,
  updateMessageSellerAndCustomer,
  updateAdminMessage,
  updateSellerMessage
} = chatReducer.actions
export default chatReducer.reducer
