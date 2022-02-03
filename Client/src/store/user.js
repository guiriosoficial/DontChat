import { createSlice } from '@reduxjs/toolkit'

const getCookie = () => {
  const cookies = document.cookie.split('; ')
    .reduce((prev, curr) => {
      const [key, ...value] = curr.split('=')
      prev[key] = value.join('=')
      return prev
    }, {})

  return cookies
}

const setCookie = (payload) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  Object.keys(payload).forEach((key) => {
    document.cookie = `${key}=${payload[key]}; expires=${expires}`
  })
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getCookie() || {},
  reducers: {
    setUser: (_state, { payload }) => {
      setCookie(payload)
      return getCookie() || payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
