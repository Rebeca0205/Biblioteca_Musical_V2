import styled from "styled-components";

const FormSearchBar = styled.form`
    margin-top: 20px;
    display: flex;
    justify-content: center
`

const SearchInput = styled.input`
    padding: 10px;
`
const SearchButton = styled.button`
    background-color: black;
    color: white;
    font-size: 16px;
    border: none;
    padding: 10px;
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
`

const RefreshIcon = styled.i`
    width: 3%;
    cursor: pointer;
`

const ImgIcon = styled.img`
    width: 50%;
    height: 100%;
`

export{
    FormSearchBar,
    SearchInput, 
    SearchButton,
    RefreshIcon,
    ImgIcon
}