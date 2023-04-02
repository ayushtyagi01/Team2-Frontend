import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SearchForm {
  user: string;
  jwtToken: string;
  signOut: ((data?: any | undefined) => void) | undefined
}

const initialState: SearchForm = {
  user: "",
  jwtToken: "",
  signOut: undefined
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = "";
    },
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    removeJwtToken: (state) => {
      state.jwtToken = "";
    },
    setSignOut:(state,action)=>{
        state.signOut = action.payload
    }
  },
});

export const user = (state: RootState) => state.user.user;
export const jwtToken = (state: RootState) => state.user.jwtToken;
export const signOut = (state: RootState) => state.user.signOut;

export const { setJwtToken, setUser, removeJwtToken, removeUser,setSignOut } =
  userSlice.actions;

export default userSlice.reducer;
