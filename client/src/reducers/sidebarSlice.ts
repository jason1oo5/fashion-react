import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
       value: '-375px' 
    },
    reducers: {
        handleSidebar: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { handleSidebar } = SidebarSlice.actions;
export const sidebarState = (state: { sidebar: {value: string} }) => state.sidebar.value;

export default SidebarSlice.reducer;


