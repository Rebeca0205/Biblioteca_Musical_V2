import React from 'react';
import {useState} from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SearchResults from '../searchResults';
import Library from '../library';
import SearchBar from '../searchBar';
import Header from '../header';
import SongDetail from '../songDetail';
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import libraryReducer from "../../redux/slices/librarySlice";

vi.mock("../../redux/slices/searchSlice", () => ({
  fetchSongs: vi.fn(() => ({ type: "songs/fetchSongs" })),
}));



const mockSongs = [
    {
        idTrack: "1",
        title: "Bohemian Rhapsody",
        artist: "Queen",
    },
    {
        idTrack: "2",
        title: "Sweet Child O Mine",
        artist: "Guns N Roses",
    },
];

const resultSongsReducer = (state = {
        results: [],
        loading: false,
        error: null,
    }, action) => {
    if (action.type === "songs/fetchSongs") {
        return {
        ...state,
        results: mockSongs,
        };
    }

    return state;
};

const mockStore = configureStore({
    reducer: {
        resultSongs: resultSongsReducer,
        librarySongs: libraryReducer,
    },
});

const AppMock = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
                <Header appName="Mi Biblioteca Musical"/>
                <Provider store={mockStore}>
                    <SearchBar 
                        searchTerm={inputValue}
                        setSearchTerm={setInputValue}
                        onSearch={() => setSearchTerm(inputValue)}
                    />
                    <MemoryRouter>
                        <Library />
                        <SearchResults
                            searchInput={searchTerm}
                        />
                    </MemoryRouter>
                </Provider>
            </> 
    );
}

describe('App Component', () => {
    it('should render all the components correctly', () => {
        render(
            <>
                <Header appName="Mi Biblioteca Musical"/>
                <Provider store={mockStore}>
                    <SearchBar 
                        searchTerm=""
                        setSearchTerm={vi.fn()}
                        onSearch={vi.fn()}
                    />
                    <MemoryRouter>
                        <Library />
                        <SearchResults
                            searchInput=""
                        />
                    </MemoryRouter>
                </Provider>
            </> 
        )

        const AppNameElement = screen.getByText("Mi Biblioteca Musical");
        expect(AppNameElement).toBeInTheDocument();

        const PlaceholderElement = screen.getByPlaceholderText("Nombre de un artista");
        expect(PlaceholderElement).toBeInTheDocument();

        const titleLibrary = screen.getByText("Mis Canciones");
        expect(titleLibrary).toBeInTheDocument();

        const titleBusqueda = screen.getByText("Busqueda");
        expect(titleBusqueda).toBeInTheDocument();

    });

    it('should look for songs writing it on the input and the results must be displayed', async () => {
        const user = userEvent.setup();

        render(<AppMock/>);

        //El usuario escribe "Queen" en el input y hace click en boton para buscar las canciones del artista
        const input = screen.getByRole("textbox");
        await user.type(input, "Queen");
        const button = screen.getByRole("button", {name: /buscar/i});
        await user.click(button);

        //Se espera que se muestren alguna cancion de Queen
        expect(screen.getByText("Bohemian Rhapsody")).toBeInTheDocument();
        expect(screen.getByText("Queen")).toBeInTheDocument();

    })

    // it('should look for songs writing it on the input and the results must be displayed', async () => {
    //     const user = userEvent.setup();

    //     const addSongSpy = vi.spyOn(librarySlice, "addSong");

    //     render(
    //         <>
    //             <MemoryRouter>
    //                 <Provider store={mockStore}>
    //                     <SearchResults
    //                         searchInput="Queen"
    //                     />
    //                 </Provider>
    //             </MemoryRouter>
    //         </>
    //     );

    //     const addButton = screen.getAllByAltText('Agregar');
    //     await user.click(addButton[0]);
    //     expect(addSongSpy).toHaveBeenCalled();

    // })

    it('should include a song in the library from the results', async () => {
        const user = userEvent.setup();

        render(<AppMock/>);

        const input = screen.getByRole("textbox");
        await user.type(input, "Queen");
        const button = screen.getByRole("button", {name: /buscar/i});
        await user.click(button);

        //Se hace clic en "agregar" para añadir la cancion a la bibliotea
        const addButton = screen.getAllByAltText('Agregar');
        await user.click(addButton[0]);

        //Se espera que la cancion se muestre en la biblioteca
        expect(screen.getAllByText("Bohemian Rhapsody").length).toBeGreaterThan(1);

    })
})