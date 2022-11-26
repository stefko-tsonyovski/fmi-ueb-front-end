import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum Category {
  food = 1,
  stationery = 2,
  construction = 3,
}

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  boughtPrice: number;
  salesPrice: number;
  quantity: number;
  category: Category;
  code: string;
};

export type ProductsState = {
  products: Product[];
  error?: string | null;
  status: string;
};

const initialState: ProductsState = {
  products: [],
  error: null,
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter((p) => p.id !== action.payload.id);
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { createProduct, editProduct, deleteProduct } =
  productsSlice.actions;

export const selectAllProducts = (state: RootState) => state.products.products;

export const selectAllProductsByCode = (state: RootState, code: string) =>
  state.products.products.filter((p) => p.code === code);

export const selectAllProductsBySearch = (
  state: RootState,
  name: string,
  category: Category
) =>
  state.products.products.filter(
    (p) =>
      p.name.toLowerCase().includes(name.toLowerCase()) &&
      p.category === category
  );

export const selectProductById = (state: RootState, id: string) =>
  state.products.products.find((p) => p.id === id);

export default productsSlice.reducer;
