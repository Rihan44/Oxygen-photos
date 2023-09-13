import { createSlice } from "@reduxjs/toolkit";
import { getAllPhotos, getPhotosByQuery } from "./searchThunk";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPhotos.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = [...state.data,...action.payload];
        })
        .addCase(getAllPhotos.pending, (state) => {state.status = "pending"})
        .addCase(getAllPhotos.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(getPhotosByQuery.fulfilled, (state, action)=> {
            state.status = "fulfilled";
            state.data = [...action.payload];
        })
        .addCase(getPhotosByQuery.pending, (state) => {state.status = "pending"})
        .addCase(getPhotosByQuery.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
});

export const getPhotos = getAllPhotos;
export const getPhotosQuery = getPhotosByQuery;