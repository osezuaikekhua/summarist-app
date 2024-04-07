import { createSlice } from '@reduxjs/toolkit'

const userInfo = localStorage.getItem("USER_EMAIL") !== null ? JSON.parse(localStorage.getItem("USER_EMAIL")) : []
const getUserUid = localStorage.getItem("USER_UID") !== null ? JSON.parse(localStorage.getItem("USER_UID")) : []
const getPremium = localStorage.getItem("USER_PREMIUM") !== null ? localStorage.getItem("USER_PREMIUM") : null
const updatedPremium = localStorage.getItem("NEW_PREMIUM") !== null ? localStorage.getItem("NEW_PREMIUM") : null

const initialState = {
    User_Email: userInfo,
    User_Uid: getUserUid,
    User_Premium: getPremium,
    New_Premium: updatedPremium,
    email: null,
    uid: null,
    setPremium: null,
    newPremium: null
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
        
        state.User_Email = userInfo
        state.User_Uid = getUserUid
        
    },
    signOutUser : (state) => {
        state.email = null
        state.uid = null
        state.setPremium = null
        state.User_Email = localStorage.removeItem("USER_EMAIL")
        state.User_Uid = localStorage.removeItem("USER_UID")
        state.User_Premium = localStorage.removeItem("USER_PREMIUM")
        state.User_Premium = localStorage.removeItem("NEW_PREMIUM")
    },
    setPremium : (state, action) => {
      state.setPremium = action.payload.setPremium
      localStorage.setItem("USER_PREMIUM", JSON.stringify(state.setPremium))
      state.User_Premium = getPremium
    },
    updatePremium: (state, action) => {
      state.User_Premium = localStorage.removeItem("USER_PREMIUM")
      state.newPremium = action.payload.newPremium
      localStorage.setItem("NEW_PREMIUM", JSON.stringify(state.newPremium))
      state.New_Premium = updatedPremium
    }
  }
});

export const {setUser, signOutUser, setPremium, updatePremium} = userSlice.actions

export default userSlice.reducer