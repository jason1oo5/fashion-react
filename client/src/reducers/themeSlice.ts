import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'lightTheme'
    },
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload;
        }
    }

})

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: any) => state.theme.value;

export default themeSlice.reducer;