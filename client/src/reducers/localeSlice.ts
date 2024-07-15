import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  locale: [],
  localesData: {}
}

export const LocaleSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocales: (state, action) => {
      state.locale = action.payload;
    },
    setLocalesData: (state, action) => {
      state.localesData = action.payload;      
    }
  },
});

export const { setLocales, setLocalesData } = LocaleSlice.actions;
export default LocaleSlice.reducer;
