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
                /* ESTO HACE QUE NO SE ACTUALICE BIEN EL STATE */
               state.data.dataFavSearch = state.data.dataFav.filter(
                    photo => photo.alt_description.toLowerCase().includes(action.payload.toLowerCase())
                );

                state.status = 'fulfilled';
            }
        },
        filter: (state, action) => {
            if(action.type === 'favorites/filter'){
                
                switch (action.payload) {
                    case 'date':
                        state.data.dataFavSearch = [...state.data.dataFav]; 
                        state.data.dataFavSearch.sort((a, b) => a.date - b.date);
                        break;
                    case 'width':
                        state.data.dataFavSearch = state.data.dataFav.filter(photo => photo.width === state.data.dataFav.width);
                        break;
                    case 'likes':
                        state.data.dataFavSearch = state.data.dataFav.filter(photo => photo.likes === state.data.dataFav.likes);
                        break;
                    case 'height':
                        state.data.dataFavSearch = state.data.dataFav.filter(photo => photo.height === state.data.dataFav.height);
                        break;
                    default:
                        state.data.dataFavSearch = [...state.data.dataFav];
                }
        
                state.status = 'fulfilled';
            }
        }
    }
})

export const {addPhoto, removePhoto, changeDescription, searchFavorites, filter} = favoriteSlice.actions;