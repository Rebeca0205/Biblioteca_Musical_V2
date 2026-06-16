import styled from "styled-components";

const FormSearchBar = styled.form`
    margin-top: 20px;
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

export{
    FormSearchBar,
    SearchInput, 
    SearchButton
}