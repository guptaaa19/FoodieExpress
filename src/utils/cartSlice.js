import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: ( state, action ) => {
            // mutating our state here
            // Redux toolkit uses immer js bts
            state.items.push(action.payload);
        },
        // removeItem: (state) => {
        //      state.items.pop()
        // },
        clearCart: (state) => {
            // state.items.length = 0; //[], make our array empty
            state.items = [];
        },
        removeItem: (state, action) => {
            // Filter out the item with the given id
            state.items = state.items.filter(
              (item) => item.card.info.id !== action.payload
            );
          },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;  // we are taking out each action performed individually and writitng it , it is a template provided by redux itself

export default cartSlice.reducer;