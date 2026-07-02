import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '../searchBar';
import { Provider } from 'react-redux';
import {useState} from 'react';
import { store } from '../../redux/store';
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

function Wrapper() {
    const [inputValue, setInputValue] = useState("");

    return (
        <Provider store={store}>
            <SearchBar
                searchTerm={inputValue}
                setSearchTerm={setInputValue}
                onSearch={vi.fn()}
            />
        </Provider>
    );
}

describe('SearchBar Component', () => {
    it("should render the search bar correctly", () => {
        render(
            <Provider store={store}>
                <SearchBar
                searchTerm=""
                setSearchTerm={vi.fn()}
                onSearch={vi.fn()}
                />
            </Provider>
        );

        const PlaceholderElement = screen.getByPlaceholderText("Nombre de un artista");
        expect(PlaceholderElement).toBeInTheDocument();

        const Button = screen.getByText("Buscar");
        expect(Button).toBeInTheDocument();
    })

    it("should let the user write on the input and the value changes", async () => {
        const user = userEvent.setup();

        render(<Wrapper/>);

        const input = screen.getByRole("textbox");

        await user.type(input, "u2");

        expect(input).toHaveValue("u2");
    })

    it("should call the function onSearch when clicking on Buscar", async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();

        render(
            <Provider store={store}>
                <SearchBar
                searchTerm="u2"
                setSearchTerm={vi.fn()}
                onSearch={onSearch}
                />
            </Provider>
        );

        const button = screen.getByRole("button", {name: /buscar/i});
        await user.click(button);
        expect(onSearch).toHaveBeenCalledTimes(1);

        const input = screen.getByRole("textbox");
        await user.click(input);
        await user.keyboard("{Enter}");
        expect(onSearch).toHaveBeenCalledTimes(2);
    })

    it("should clean the input after clicking the refresh button", async () => {
        const user = userEvent.setup();

        render(
            <Wrapper/>
        );

        const input = screen.getByRole("textbox");

        await user.type(input, "u2");

        const refreshButton = screen.getByAltText('Refresh');
        await user.click(refreshButton);

        expect(input).toHaveValue("");
    })
})