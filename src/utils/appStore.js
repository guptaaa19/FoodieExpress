import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
    reducer:{
        cart : cartReducer, // we have reducer for our cart
    },
});

export default appStore;