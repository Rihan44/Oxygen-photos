import { createSlice } from "@reduxjs/toolkit";
import { getAllPhotos } from "./searchThunk";

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
            state.data = [...action.payload, ...state.data];
        })
        .addCase(getAllPhotos.pending, (state) => {state.status = "pending"})
        .addCase(getAllPhotos.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
});

export const getPhotos = getAllPhotos;