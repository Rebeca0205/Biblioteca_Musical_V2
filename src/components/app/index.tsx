import {useState} from 'react';

import Header from '../header';
import SearchResults from '../searchResults';
import Library from '../library';
import {Route, Routes} from "react-router-dom"
import SearchBar from '../searchBar';
import useFetchAlbums from '../hooks/useFetchAlbums';
import SongDetail from '../songDetail';

import { ThemeProvider } from 'styled-components';
import Theme from '../../theme';
import GlobalStyles from '../../theme/GlobalStyles';

export interface SongData {
  idTrack: string;
  title: string;
  artist: string;
}

const AppComp = () => {
    // const [library, setLibrary] = useState<SongData[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const {songs, isLoading, error} = useFetchAlbums(searchTerm)

    // const addSong = (song : SongData) => {
    //     const exists = library.some((s) => s.idTrack === song.idTrack);
    //     if (exists) return;

    //     setLibrary(prev => [...prev, song]);
    // };

    // const removeSong = (songId : string) => {
    //     setLibrary(prev => prev.filter(song => song.idTrack !== songId));
    // };

    return (
        <ThemeProvider theme={Theme}>
        <GlobalStyles/>
        <div className="App">
            <Header appName="Mi Biblioteca Musical"/>
            <SearchBar 
                searchTerm={inputValue}
                setSearchTerm={setInputValue}
                onSearch={() => setSearchTerm(inputValue)}
            />
            <Routes>
                <Route path='/song/:id' element={<SongDetail songs={songs}/>} />
                <Route path='/' element={<SearchResults songList={songs} isLoading={isLoading} error={error}/>}/>
            </Routes>
            
            <Library/>
        </div>
        </ThemeProvider>
    );
};

export default AppComp;