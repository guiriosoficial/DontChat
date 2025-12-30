import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IMessage } from "@/types/messages";

const initialState: IMessage[] = []

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (_state, action: PayloadAction<IMessage[]>) => {
      return action.payload
    },
    updateMessages: (state, action: PayloadAction<IMessage>) => {
      state.push(action.payload)
    }
  }
})

export const { updateMessages, setMessages } = messagesSlice.actions

export default messagesSlice.reducer
