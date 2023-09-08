import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPhotos = createAsyncThunk("photo/getAllPhotos", async () => {
    const API_KEY = 'jWPTFpZJiXGBHg2NJFeVIWnZMSh-f7qFcGLCv5Sug18';
    const URL = `https://api.unsplash.com/photos?client_id=${API_KEY}&per_page=30&lang=es`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
});

export const getPhotosByQuery = createAsyncThunk("photo/getByQuery", async (query, path) => {
    if(query.length > 2) {
        const API_KEY = 'jWPTFpZJiXGBHg2NJFeVIWnZMSh-f7qFcGLCv5Sug18';
        const URL = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&per_page=30&query=${query}`;
        const response = await fetch(URL);
        const data = await response.json();
        return data.results;
    }

    return [];
});
