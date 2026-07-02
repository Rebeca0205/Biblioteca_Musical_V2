import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import Library from '../library';
import { addSong } from "../../redux/slices/librarySlice";
import * as librarySlice from "../../redux/slices/librarySlice";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../redux/slices/librarySlice", async () => {
  const actual = await vi.importActual("../../redux/slices/librarySlice");

  return {
    ...actual,
    removeSong: vi.fn(() => ({
      type: "library/removeSong",
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
        songs: mockSongs,
        }),
    },
});

describe('Library Component', () => {
    it('should render the song list correctly', () => {
        render(
            <MemoryRouter>
                <Provider store={mockStore}>
                    <Library />
                </Provider>
            </MemoryRouter>
        )

        const titleLibrary = screen.getByText("Mis Canciones");
        expect(titleLibrary).toBeInTheDocument();

        expect(screen.getByText("Bohemian Rhapsody")).toBeInTheDocument();
        expect(screen.getByText("Queen")).toBeInTheDocument();

        expect(screen.getByText("Sweet Child O Mine")).toBeInTheDocument();
        expect(screen.getByText("Guns N Roses")).toBeInTheDocument();
    });

    it('should call the function removeSong', async () => {
        const user = userEvent.setup();

        const removeSongSpy = vi.spyOn(librarySlice, "removeSong");

        render(
            <MemoryRouter>
                <Provider store={mockStore}>
                    <Library />
                </Provider>
            </MemoryRouter>
        );

        const removeButton = screen.getAllByAltText('Remover');
        await user.click(removeButton[0]);
        expect(removeSongSpy).toHaveBeenCalled();

    })
})