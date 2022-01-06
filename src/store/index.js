import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './messages'
import userReducer from './username'

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    username: userReducer
  }
})

export default store