import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.token = "";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
