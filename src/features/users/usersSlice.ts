import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { User } from "../user/userSlice";

export type UsersSliceState = {
  users: User[];
};

const initialState = {
  users: [] as User[],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { createUser } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.users.users;

export const selectUserByEmailOrUsername = (
  state: RootState,
  email: string,
  username: string
) =>
  state.users.users.find((u) => u.email === email || u.username === username);

export const selectUserByUsernameAndPassword = (
  state: RootState,
  username: string,
  password: string
) =>
  state.users.users.find(
    (u) => u.username === username && u.password === password
  );

export default usersSlice.reducer;
