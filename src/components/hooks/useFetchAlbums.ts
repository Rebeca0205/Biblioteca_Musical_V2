import { useEffect, useState } from "react";
import axios from 'axios';

type Song = {
  idTrack: string;
  title: string;
  album: string;
  artist: string;
};

type FetchSongsState = {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
};


const useFetchAlbums = (artist:string) => {
    const [songsState, setSongsState] = useState<FetchSongsState>({songs: [], isLoading: true, error: null});

    useEffect(() => {
        if (!artist) {
      setSongsState({
        songs: [],
        isLoading: false,
        error: null,
      });
      return;
    };

        const fetchSongs = async () => {
            try{

                setSongsState({
                    songs: [],
                    isLoading: true,
                    error: null,
                });
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
                const allSongs = tracksByAlbum.flat();

                setSongsState({songs: allSongs, isLoading: false, error:null});
            } catch (error){
                setSongsState({songs: [], isLoading: false, error:"Failed to fetch albums"});
            }
        };

        fetchSongs();
        
    }, [artist]);

    return songsState;
}

export default useFetchAlbums;