import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ""
    },
  },
})

const { setNotification, removeNotification } = notificationSlice.actions
export const setNotificationWithTimeout = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
}

export default notificationSlice.reducer
