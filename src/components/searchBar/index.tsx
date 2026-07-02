import React from "react"
import refresh from "./refresh-ccw.svg"
import { FormSearchBar, ImgIcon, RefreshIcon, SearchButton, SearchInput } from "./styles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { resetResults } from "../../redux/slices/searchSlice";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
}

const SearchBar = ({searchTerm, setSearchTerm, onSearch}: SearchBarProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch();
    };

    const handleRefresh = () => {
        setSearchTerm('');
        dispatch(resetResults());
        
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

            <RefreshIcon onClick={handleRefresh}>
                <ImgIcon src={refresh} alt='Refresh'/>
            </RefreshIcon>
        </FormSearchBar>
    );
}

export default SearchBar;