import { useEffect, useState } from "react";
import Song from "../songs";
import { FlexSongs } from "./styles";
import { useDispatch, useSelector } from "react-redux";

type SongData = {
  idTrack: string;
  title: string;
  artist: string;
};

type LibraryProps = {
  songList: SongData[];
  onRemoveSong: (idTrack: string) => void;
};

type RootState = {
  songs: {
    songs: SongData[];
  };
};

const Library = () => {
    const dispatch = useDispatch();

    const songList = useSelector((state: RootState) => state.songs.songs)
    // const [lista, setLista] = useState<SongData[]>([]);

    // useEffect(() => {
    //     const fetchSongs = async () => {
    //         const response = songList;
    //         setLista(response);
    //     };

    //     fetchSongs();

    // }, [songList]);

    const handleRemoveSong = (idTrack : string) => {
        dispatch({
            type: "REMOVE_SONG",
            payload: idTrack,
        });
    }

    return(
        <section>
            <h2>Mis Canciones</h2>
            <FlexSongs>
                {
                    songList.map(song => {
                        const {idTrack, title, artist} = song;

                        return(
                            <Song 
                                key={idTrack} 
                                id={idTrack}
                                songName={title} 
                                artist={artist} 
                                onRemove={() => handleRemoveSong(idTrack)}
                            />
                        );
                    })
                }
            </FlexSongs>   
        </section>
    )
}

export default Library;