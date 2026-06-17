import { combineReducers } from "redux"

type Song = {
    idTrack: string;
    title: string;
    artist: string;
};

type LibraryState = {
    songs: Song[];
};

type LibraryAction =
    | { type: "ADD_SONG"; payload: Song }
    | { type: "REMOVE_SONG"; payload: string };

const initialState: LibraryState = {
    songs: []
};

const libraryReducer = (state = initialState, action : LibraryAction) => {
    switch(action.type) {
        case "ADD_SONG":
            const exists = state.songs.some((s) => s.idTrack === action.payload.idTrack);
            
            if (exists) return;

            return{
                ...state,
                songs: [...state.songs, action.payload]
            }
        case "REMOVE_SONG":
            return{
                ...state,
                songs: state.songs.filter(song => song.idTrack !== action.payload)
            }
        default:
            return state;
    }

}

const rootReducer = combineReducers({
    songs: libraryReducer,
})

export default rootReducer;
