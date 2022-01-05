import { createStore } from '@reduxjs/toolkit'

const user = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_USERNAME':
      return action.value
    default:
      return state
  }
}

const messages = (state = [], action) => {
  switch(action.type) {
    case 'RECIVE_MESSAGE':
      return [...state, action.message]
    default:
      return state
  }

}

const store = createStore({
  messages,
  user
})

export default store