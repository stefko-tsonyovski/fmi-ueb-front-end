import {
  Action,
  AnyAction,
  configureStore,
  Dispatch,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import user, { UsersState } from "../features/user/userSlice";
import products, { ProductsState } from "../features/products/productsSlice";
import search, { SearchState } from "../features/search/searchSlice";
import users, { UsersSliceState } from "../features/users/usersSlice";

const reducers = combineReducers({
  user,
  products,
  search,
  users,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = (): ThunkDispatch<
  {
    user: UsersState;
    products: ProductsState;
    search: SearchState;
    users: UsersSliceState;
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction> => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
