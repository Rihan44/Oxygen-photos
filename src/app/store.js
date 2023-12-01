import {configureStore} from "@reduxjs/toolkit";

import { favoriteSlice } from "../features/favorites/favoriteSlice";
import {searchSlice} from "../features/search/searchSlice.js";

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        favorites: favoriteSlice.reducer
    },
})