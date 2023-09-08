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
            const local = JSON.parse(localStorage.getItem('favs')) || [];
            state.data = [...state.data, action.payload];
            local.push(action.payload);
            localStorage.setItem('favs', JSON.stringify(local));
            state.status = 'fulfilled';
            state.status = "rejected";
        },
        removePhoto: (state, action) => {
            const local = JSON.parse(localStorage.getItem('favs')) || [];
            const { id } = action.payload;

            localStorage.setItem('favs', JSON.stringify(local.filter(item => item.id !== id)));
            state.data = state.data.filter(item => item.id !== id);
        },
        changeDescription: (state, action) => {
            const { id, alt_description } = action.payload;

            state.data = state.data.map(item => {
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
        },
        searchFavorites: (state, action) => {
            const local = JSON.parse(localStorage.getItem('favs')) || [];
            const query = action.payload.toLowerCase();
            if (query !== '') {
                state.data = local.filter(
                    photo => photo.alt_description.toLowerCase().includes(query)
                );
            } else {
                state.data = local;
            }
            state.status = 'fulfilled';
        },
        filtersReduce: (state, action) =>{
            const local = JSON.parse(localStorage.getItem('favs')) || [];

            switch (action.payload) {
                case 'date':
                    state.data = state.data.sort((a, b) => b.dateAdded - a.dateAdded);
                    break;
                case 'width':
                    state.data = state.data.sort((a, b) => b.width - a.width);
                    break;
                case 'likes':
                    state.data = state.data.sort((a, b) => b.likes - a.likes);
                    break;
                case 'height':
                    state.data = state.data.sort((a, b) => b.height - a.height);
                    break;
                default:
                    if (local.length > 0) {
                        state.data = local;
                    } else {
                        state.data = [];
                    }     
            }
            state.status = 'fulfilled';

        }

    }
})

export const { addPhoto, removePhoto, changeDescription, searchFavorites, filtersReduce } = favoriteSlice.actions;