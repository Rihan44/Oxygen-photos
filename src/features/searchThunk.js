import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPhotos = createAsyncThunk("photo/getAllPhotos", async () => {
    const API_KEY = 'jWPTFpZJiXGBHg2NJFeVIWnZMSh-f7qFcGLCv5Sug18';
    const URL = `https://api.unsplash.com/photos?client_id=${API_KEY}&per_page=20&lang=es`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
});
