import { useDispatch, useSelector } from "react-redux";
import Song from "../songs";
import { FlexSongs } from "./styles";
import { addSong } from "../../redux/slices/librarySlice";
import { useEffect } from "react";
import { fetchSongs } from "../../redux/slices/searchSlice";
import type { AppDispatch } from "../../redux/store";

type SongData = {
  idTrack: string;
  title: string;
  artist: string;
};

type ResultsProps = {
    searchInput: string;
}

type RootState = {
  resultSongs: {
    results: SongData[];
    loading: boolean;
    error: string | null;
  },
  librarySongs: {
    songs: SongData[];
  }
};

const SearchResults = ({searchInput} : ResultsProps) => {

    const songList = useSelector((state: RootState) => state.resultSongs.results);
    const isLoading = useSelector((state: RootState) => state.resultSongs.loading);
    const error = useSelector((state: RootState) => state.resultSongs.error);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchSongs(searchInput));
    }, [dispatch, searchInput]);

    const handleAddSong = (song : SongData) =>{
        dispatch(addSong(song));
    }

    const library = useSelector(
        (state: RootState) => state.librarySongs.songs
    );

    return(
        <section style={{width: '50%'}}>
            <h2 style={{marginBottom: 0}}>Busqueda</h2>
            <p style={{marginBottom: 0}}>Haz clic en el nombre de la canción para más información</p>
            <p>Las canciones en <strong style={{color: 'yellow'}}>amarillo</strong> ya estan en Mis Canciones</p>
            <FlexSongs>
                {isLoading && (
                    <p style={{ color: 'white' }}>Cargando canciones...</p>
                )}

                {error && (
                    <p style={{ color: 'red' }}>{error}</p>
                )}

                {!isLoading && !error && !songList.length && (
                    <p style={{ color: 'yellow' }}>No se encontraron canciones.</p>
                )}

                {!isLoading && !error && songList.map((song) => {
                    const { idTrack, title, artist } = song;

                    const isInLibrary = library.some(
                    (s) => s.idTrack === song.idTrack
                    );

                    return (
                    <Song
                        key={idTrack}
                        id={idTrack}
                        songName={title}
                        artist={artist}
                        onAdd={() => handleAddSong(song)}
                        isInLibrary={isInLibrary}
                    />
                    );
                })}
            </FlexSongs>
        </section>
    )
};

export default SearchResults;