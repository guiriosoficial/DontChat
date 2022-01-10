import { createSlice } from '@reduxjs/toolkit'

const getCookie = () => {
  return document.cookie.split('; ').reduce((prev, current) => {
    const [key, ...value] = current.split('=')
    prev[key] = value.join('=')
    return prev
  }, {})
}

const setCookie = (payload) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)
  document.cookie = `username=${payload}; expires=${expires}`
}

export const usernameSlice = createSlice({
  name: 'username',
  initialState: getCookie().username || '',
  reducers: {
    changeUsername: (_state, { payload }) => {
      setCookie(payload)
      return getCookie().username || payload
    }
  }
})

export const { changeUsername } = usernameSlice.actions

export default usernameSlice.reducer
