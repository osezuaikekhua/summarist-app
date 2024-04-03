import { createSlice } from '@reduxjs/toolkit'

const userInfo = localStorage.getItem("USER_EMAIL") !== null ? JSON.parse(localStorage.getItem("USER_EMAIL")) : []

const initialState = {
    testEmail: userInfo,
    email: null,
    uid: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUser: (state, action) => {
        state.email = action.payload.email
        state.uid = action.payload.uid
        localStorage.setItem("USER_EMAIL", JSON.stringify(state.email))
        localStorage.setItem("USER_UID", JSON.stringify(state.uid))
        state.testEmail = userInfo
    },
    signOutUser : (state) => {
        state.email = null
        state.uid = null
        state.testEmail = localStorage.removeItem("USER_EMAIL")
    }


  }
});

export const {setUser, signOutUser} = userSlice.actions

export default userSlice.reducer