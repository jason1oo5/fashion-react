import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProducts } = ProductSlice.actions;
export const productState = (state: any) => state.products.value;

export default ProductSlice.reducer;
