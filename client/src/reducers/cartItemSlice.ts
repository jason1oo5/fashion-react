import { createSlice } from "@reduxjs/toolkit";

const CartItemSlice = createSlice({
    name: 'cartItem',
    initialState: {
        value: []
    },
    reducers: {
        setCartItem: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setCartItem } = CartItemSlice.actions;
export const cartItemState = (state: any) => state.cartItem.value;

export default CartItemSlice.reducer;