import { createSlice } from "@reduxjs/toolkit";


const initalState = {
    data: [],
    status: 'idle'
}

export const favoriteSlice = createSlice({
    name: "favorites",
    initialState: initalState,
    reducers: {
        favorites: (state, action) => {
            switch(action.type) {
                case 'favorites/addPhoto':
                    return [...action.payload, ...state.data];
                default:
                    return state;
            }
        }
    }
})

export const {favorites} = favoriteSlice.actions;