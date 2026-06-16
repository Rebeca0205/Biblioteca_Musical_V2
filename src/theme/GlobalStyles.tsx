import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body{
        margin: ${props => props.theme.margin.zero};
        font-family: ${props => props.theme.fonts.base};
        background-color: ${props => props.theme.colors.background};
    }

    .App{
        text-align: ${props => props.theme.align.center};
    }

    h1, h2, h3, h4, p{
        color: ${props => props.theme.colors.primary};
    }

    section{
        display: flex;
        flex-direction: column;
    }

    h2 {
        font-size: 2rem;
    }

    a {
        text-decoration: none;
    }
`

export default GlobalStyles;