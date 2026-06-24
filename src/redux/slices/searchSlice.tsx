import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

type Song = {
    idTrack: string;
    title: string;
    album: string;
    artist: string;
};

type SearchResultsState = {
    results: Song[];
    loading: boolean;
    error: string | null;
};

const initialState: SearchResultsState = {
    results: [],
    loading: false,
    error: ''
};

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async(artist : string) => {
    // Obtener álbumes del artista
    const albumsResponse  = await axios.get(
        `/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(artist)}`
    );

    const albums = (albumsResponse.data.album || []).slice(0, 3);

    // Obtener tracks de cada álbum
    const tracksByAlbum = await Promise.all(
        albums.map(async (album: any) => {
            const tracksResponse = await axios.get(
                `/api/v1/json/2/track.php?m=${album.idAlbum}`
            );

            const tracks = tracksResponse.data.track || [];

            // Transformar cada track
            return tracks.map((track: any) => ({
                idTrack: track.idTrack,
                title: track.strTrack,
                album: album.strAlbum,
                artist: album.strArtist,
            }));
        })
    );

    // Unir todos los arreglos de canciones en uno solo
    return tracksByAlbum.flat();
})

const searchSlice = createSlice({
    name: 'songsSearchResults',
    initialState,
    reducers: {
        resetResults: (state) =>{
            state.results = [];
            state.loading = false;
            state.error = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchSongs.pending, (state, action) =>{
                console.log("pending: ", action);
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                console.log("fulfilled: ", action);

                //Aqui se actualiza la lista de resultados con los nuevos encontrados
                state.results = action.payload; 

                state.loading = false;
                state.error = '';
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                console.log("rejected: ", action)
                state.loading = false;
                state.error = "Failed to fetch albums";
            })
    }
});

export const {resetResults} = searchSlice.actions;
const {reducer: searchReducer} = searchSlice;
export default searchReducer;