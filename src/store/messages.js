import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'mesages',
  initialState: [],
  reducers: {
    updateMessages: (state, action) => {
      return [...state, action.payload]
    }
  }
})

export const { updateMessages } = messagesSlice.actions

export default messagesSlice.reducer
