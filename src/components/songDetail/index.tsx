import { useParams, useNavigate} from "react-router-dom";
import { BackButton, SongDetails } from "./styles";
import { useSelector } from "react-redux";

type Song = {
    idTrack: string;
    title: string;
    album: string;
    artist: string;
};

type RootState = {
  resultSongs: {
    results: Song[];
  },
};

const SongDetail = () => {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const songList = useSelector((state: RootState) => state.resultSongs.results);

    const song = songList.find((song) => song.idTrack === id);

    if (!song) {
        return <p>No se encontró la canción.</p>;
    }

    return (
        <SongDetails>
            <h2>Detalle de canción</h2>
            <p><strong>Nombre:</strong> {song.title}</p>
            <p><strong>Álbum:</strong> {song.album}</p>
            <p><strong>Artista:</strong> {song.artist}</p>
            <BackButton onClick={() => navigate("/")}>
                Volver a búsqueda
            </BackButton>
        </SongDetails>
    );
};

export default SongDetail;