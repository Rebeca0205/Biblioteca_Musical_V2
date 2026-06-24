import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Song = {
    idTrack: string;
    title: string;
    artist: string;
};

type LibraryState = {
    songs: Song[];
};

const initialState: LibraryState = {
    songs: []
};


const librarySlice = createSlice({
    name: 'libraryList',
    initialState,
    reducers: {
        addSong: (state, action: PayloadAction<Song>) => {
            state.songs.push(action.payload);
        },
        removeSong: (state, action: PayloadAction<string>) => {
            return { songs: state.songs.filter(song  => song.idTrack !== action.payload)}
        }
    }
});

export const {addSong, removeSong} = librarySlice.actions;
const {reducer: libraryReducer} = librarySlice;
export default libraryReducer;