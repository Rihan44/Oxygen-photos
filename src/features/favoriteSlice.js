import { createSlice } from "@reduxjs/toolkit";


const initalState = {
    data: JSON.parse(localStorage.getItem('favs')) || [],
    status: 'idle'
}

export const favoriteSlice = createSlice({
    name: "favorites",
    initialState: initalState,
    reducers: {
        addPhoto: (state, action) => {
            if(action.type === 'favorites/addPhoto') {       
                localStorage.setItem('favs', JSON.stringify(state.data));
                state.status = 'fullfilled';
                state.data = [...state.data, action.payload];
            } else {
                state.status = "rejected";
            }
        },

        removePhoto: (state, action) => {
            if(action.type === 'favorites/removePhoto') {
                state.data.filter((id) => id === state.data.pop(id));
            }
        }
    }
})

export const {addPhoto} = favoriteSlice.actions;