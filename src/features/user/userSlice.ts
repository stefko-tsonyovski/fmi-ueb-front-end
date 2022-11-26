import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { GET_ALL_USERS, LOG_IN } from "../../utils/endpoints";
import axios, { AxiosError } from "axios";

export type SignInUser = {
  username: string;
  password: string;
};

export type CreateUser = {
  email: string;
  phoneNumber: string;
} & SignInUser;

export type User = {
  id: string;
} & CreateUser;

export type UsersState = {
  currentUser?: User | null;
  error?: string | null;
  status: string;
};

const initialState: UsersState = {
  currentUser: null,
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.currentUser = null;
    },
    signIn: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { signOut, signIn } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
