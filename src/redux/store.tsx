
import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "./slices/librarySlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
    reducer:{
        librarySongs: libraryReducer, 
        resultSongs: searchReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;