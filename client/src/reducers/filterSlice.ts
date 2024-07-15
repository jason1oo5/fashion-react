import { createSlice } from "@reduxjs/toolkit";

const FilterSlice = createSlice({
  name: "filterOpt",
  initialState: {
    value: {
      userProduct: false,
      page: 1,
      perPage: 20,
      type: "",
      filterBy: "",
      sortBy: "price",
      minPrice: "",
      maxPrice: "",
      search: "",
    },
  },
  reducers: {
    setFilterOpt: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFilterOpt } = FilterSlice.actions;
export const filterOptState = (state: any) => state.filterOpt.value;

export default FilterSlice.reducer;
