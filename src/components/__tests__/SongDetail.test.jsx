import React from 'react';
import {useState} from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SongDetail from '../songDetail';
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route} from "react-router-dom";
import libraryReducer from "../../redux/slices/librarySlice";

const mockSongs = [
  {
    idTrack: "1",
    title: "Bohemian Rhapsody",
    album: "A Night at the Opera",
    artist: "Queen",
  },
];

const createMockStore = () =>
  configureStore({
    reducer: {
      resultSongs: () => ({
        results: mockSongs,
      }),
    },
  });

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SongDetail Component', () => {
    it("should render the details of the song correctly", () => {
        const store = createMockStore();

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/song/1"]}>
                    <Routes>
                        <Route path="/song/:id" element={<SongDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Detalle de canción")).toBeInTheDocument();
        expect(screen.getByText("Bohemian Rhapsody")).toBeInTheDocument();
        expect(screen.getByText("A Night at the Opera")).toBeInTheDocument();
        expect(screen.getByText("Queen")).toBeInTheDocument();
    })

    it("should show a message if the song is not found", () => {
        const store = createMockStore();

        render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/song/999"]}>
            <Routes>
                <Route path="/song/:id" element={<SongDetail />} />
            </Routes>
            </MemoryRouter>
        </Provider>
        );

        expect(screen.getByText("No se encontró la canción.")).toBeInTheDocument();
    });

    it("should call the function to return to the search section after clicking on Buscar", async () => {
        const store = createMockStore();
        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/song/1"]}>
                    <Routes>
                        <Route path="/song/:id" element={<SongDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const button = screen.getByRole("button", {name: /Volver a búsqueda/i});
        await user.click(button);
        expect(mockNavigate).toHaveBeenCalledWith("/");
        
    })
})