import React from "react"
import { FormSearchBar, SearchButton, SearchInput } from "./styles";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
}

const SearchBar = ({searchTerm, setSearchTerm, onSearch}: SearchBarProps) => {
    const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch();
    };

    return(
        <FormSearchBar onSubmit={handleSubmit}>
            <SearchInput
                type="text"
                placeholder="Nombre de un artista"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">Buscar</SearchButton>
        </FormSearchBar>
    );
}

export default SearchBar;