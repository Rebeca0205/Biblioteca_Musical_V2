import { useDispatch, useSelector } from "react-redux";
import Song from "../songs";
import { FlexSongs } from "./styles";

type SongData = {
  idTrack: string;
  title: string;
  artist: string;
};

type SearchResultsProps = {
  songList: SongData[];
  isLoading: boolean;
  error: string | null;
};

type RootState = {
  songs: {
    songs: SongData[];
  };
};

const SearchResults = ({songList, isLoading, error} : SearchResultsProps) => {
    if (isLoading) return <p style={{color: 'white'}}>Cargando canciones...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;
    if (!songList.length) return <p style={{color: 'yellow'}}>No se encontraron canciones.</p>;

    const dispatch = useDispatch();

    const handleAddSong = (song : SongData) =>{
        dispatch({
            type: "ADD_SONG",
            payload: song
        })
    }

    const library = useSelector(
        (state: RootState) => state.songs.songs
    );

    return(
        <section>
            <h2 style={{marginBottom: 0}}>Busqueda</h2>
            <p>Las canciones en <strong style={{color: 'yellow'}}>amarillo</strong> ya estan en Tus Canciones</p>
            <FlexSongs>
                {songList.map((song) => {
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