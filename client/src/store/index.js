import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './messages'
import userReducer from './user'

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer
  }
})

export default store
