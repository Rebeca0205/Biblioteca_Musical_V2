type Song = {
    idTrack: string;
    title: string;
    artist: string;
};

export const addSong = (song : Song) => {
    return{
        type: "ADD_SONG",
        payload: song
    }

}

export const removeSong = (id : string) => {
    return{
        type: "REMOVE_SONG",
        payload: id,
    }
}