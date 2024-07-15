import { createSlice } from "@reduxjs/toolkit";

const LeftbarSlice = createSlice({
    name: 'leftbar',
    initialState: {
       value: '0' 
    },
    reducers: {
        handleLeftbar: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { handleLeftbar } = LeftbarSlice.actions;
export const leftbarState = (state: { leftbar: {value: string} }) => state.leftbar.value;

export default LeftbarSlice.reducer;


