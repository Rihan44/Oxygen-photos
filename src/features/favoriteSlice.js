import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    data: {
        dataFav: JSON.parse(localStorage.getItem('favs')) || [],
        dataSearch: []
    },
    status: 'idle'
}

export const favoriteSlice = createSlice({
    name: "favorites",
    initialState: initalState,
    reducers: {
        addPhoto: (state, action) => {
            if(action.type === 'favorites/addPhoto') {       
                const local = JSON.parse(localStorage.getItem('favs')) || [];     
                state.data.dataFav = [...state.data.dataFav, action.payload];
                local.push(action.payload); 
                localStorage.setItem('favs', JSON.stringify(local));
                state.status = 'fullfilled';
            } else {
                state.status = "rejected";
            }
        },
        removePhoto: (state, action) => {
            if(action.type === 'favorites/removePhoto') {
                const local = JSON.parse(localStorage.getItem('favs')) || []; 
                const {id} = action.payload;
                state.data.dataFav = state.data.dataFav.filter(item => item.id !== id);
                localStorage.setItem('favs', JSON.stringify(local.filter(item => item.id !== id)));
            }
        },
        changeDescription: (state, action) => {
            if (action.type === 'favorites/changeDescription') {
                const { id, alt_description } = action.payload;
                
                state.data.dataFav = state.data.dataFav.map(item => {
                    if (item.id === id) {
                        const updatedItem = { ...item, alt_description };
              
                        const local = JSON.parse(localStorage.getItem('favs')) || [];             
                        localStorage.setItem('favs', JSON.stringify(
                            local.map(localItem => {
                                if (localItem.id === id) {
                                    return { ...localItem, alt_description };
                                }
                                return localItem;
                            })
                        ));
                        
                        return updatedItem;
                    } else {
                        return item;
                    }
                });
            }
        },
        searchFavorites: (state, action) =>{
            if(action.type === 'favorites/searchFavorites'){
                state.data.dataFavSearch = state.data.dataFav.filter(item => item.alt_description === action.payload);
                const local = JSON.parse(localStorage.getItem('favs')) || [];     

                console.log(local)
                /* TODO MODIFICAR COMO SE METE EN EL LOCAL PORQUE LA DESCRIPTION ES EL SLUG EN EL LOCAL */
                state.status = 'fulfilled';
            }
        }
    }
})

export const {addPhoto, removePhoto, changeDescription, searchFavorites} = favoriteSlice.actions;