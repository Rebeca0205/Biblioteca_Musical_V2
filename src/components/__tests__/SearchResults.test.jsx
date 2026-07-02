import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SearchResults from '../searchResults';
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { addSong } from "../../redux/slices/librarySlice";
import * as librarySlice from "../../redux/slices/librarySlice";

vi.mock("../../redux/slices/searchSlice", () => ({
  fetchSongs: vi.fn(() => ({ type: "search/fetchSongs" })),
}));

vi.mock("../../redux/slices/librarySlice", async () => {
  const actual = await vi.importActual("../../redux/slices/librarySlice");

  return {
    ...actual,
    addSong: vi.fn(() => ({
      type: "library/addSong",
      payload: {},
    })),
  };
});

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

const mockStore = configureStore({
    reducer: {
        resultSongs: () => ({
        results: mockSongs,
        loading: false,
        error: null,
        }),
        librarySongs: () => ({
        songs: [],
        }),
    },
});

describe('SearchResults Component', () => {
    it('should render the results correctly', () => {
        render(
            <MemoryRouter>
                <Provider store={mockStore}>
                <SearchResults
                    searchInput="Queen"
                />
            </Provider>
            </MemoryRouter>
        )

        const titleBusqueda = screen.getByText("Busqueda");
        expect(titleBusqueda).toBeInTheDocument();

        expect(screen.getByText("Bohemian Rhapsody")).toBeInTheDocument();
        expect(screen.getByText("Queen")).toBeInTheDocument();

        expect(screen.getByText("Sweet Child O Mine")).toBeInTheDocument();
        expect(screen.getByText("Guns N Roses")).toBeInTheDocument();
    });

    it('should call the function addSong', async () => {
        const user = userEvent.setup();

        const addSongSpy = vi.spyOn(librarySlice, "addSong");

        render(
            <>
                <MemoryRouter>
                    <Provider store={mockStore}>
                        <SearchResults
                            searchInput="Queen"
                        />
                    </Provider>
                </MemoryRouter>
            </>
        );

        const addButton = screen.getAllByAltText('Agregar');
        await user.click(addButton[0]);
        expect(addSongSpy).toHaveBeenCalled();

    })

    // it('should include a song in the library', async () => {
    //     const addSongMock = vi.fn();
    //     const user = userEvent.setup();

    //     render(
    //         <>
    //             <Library/>
    //             <MemoryRouter>
    //                 <Provider store={mockStore}>
    //                     <SearchResults
    //                         searchInput="Queen"
    //                     />
    //                 </Provider>
    //             </MemoryRouter>
    //         </>
    //     );

    //     const addButton = screen.getByAltText('Agregar');
    //     await user.click(addButton[0]);

    // })
})