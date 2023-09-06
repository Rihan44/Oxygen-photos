import { createSlice } from "@reduxjs/toolkit";

const local = JSON.parse(localStorage.getItem('favs')) || [];     

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
                state.data = [...state.data, action.payload];
                local.push(action.payload);       
                localStorage.setItem('favs', JSON.stringify(local)); 
                state.status = 'fullfilled';
            } else {
                state.status = "rejected";
            }
        },

        removePhoto: (state, action) => {
            if(action.type === 'favorites/removePhoto') {
                const {id, index} = action.payload;
                state.data = state.data.filter(item => item.id !== id);
                
                /* TODO COMPROBAR ESTO BIEN */
                /* const updateLocal = local.filter(item => item.id !== id);
                localStorage.setItem('favs', JSON.stringify(updateLocal)); */
            }
        }
    }
})

export const {addPhoto, removePhoto} = favoriteSlice.actions;