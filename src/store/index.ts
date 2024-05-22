import { configureStore, createSlice } from "@reduxjs/toolkit";
import { userType } from "../components/pages/SignUp";

export type UserStateType = {
  id: number;
  users: userType[];
};

const initialState: UserStateType = {
  id: 101,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    incrementId(state) {
      state.id += 1;
      console.log(state);
    },
    setUsers(state, action) {
      state.users = [...state.users, action.payload];
    },
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const userActions = userSlice.actions;
