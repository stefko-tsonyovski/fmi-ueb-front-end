import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Category } from "../products/productsSlice";

export type SearchState = {
  name: string;
  category: Category;
  code: string;
  isFiltered: boolean;
};

const initialState: SearchState = {
  name: "",
  category: 1,
  code: "",
  isFiltered: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setIsFiltered: (state, action: PayloadAction<boolean>) => {
      state.isFiltered = action.payload;
    },
  },
});

export const { setName, setCategory, setCode, setIsFiltered } =
  searchSlice.actions;

export const selectName = (state: RootState) => state.search.name;
export const selectCategory = (state: RootState) => state.search.category;
export const selectCode = (state: RootState) => state.search.code;
export const selectIsFiltered = (state: RootState) => state.search.isFiltered;

export default searchSlice.reducer;
