import {configureStore} from "@reduxjs/toolkit";
import {searchSlice} from "../features/searchSlice";
import { favoriteSlice } from "../features/favoriteSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        favorites: favoriteSlice.reducer
    },
})