import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "initial value for testing",
  reducers: {
    setNotification(state, action) {},
  },
})

export default notificationSlice.reducer
