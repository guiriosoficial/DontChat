import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages: (_state, { payload }) => payload,
    updateMessages: (state, { payload }) => [...state, payload]
  }
})

export const { updateMessages, setMessages } = messagesSlice.actions

export default messagesSlice.reducer
