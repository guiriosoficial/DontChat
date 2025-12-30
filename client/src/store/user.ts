import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from "@/types/user";

const EXPIRES_IN_DAYS = 7

const getCookie = () => {
  const match = document.cookie.match(/user_data=([^;]+)/)
  if (!match) return {} as IUser

  try {
    return JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return {} as IUser
  }
}

const setCookie = (payload: IUser) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + EXPIRES_IN_DAYS)

  const userData = JSON.stringify(payload)
  document.cookie = `user_data=${encodeURIComponent(userData)}; expires=${expires}; path=/`
}

const initialState: IUser = getCookie()

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<IUser>) => {
      setCookie(action.payload)
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
