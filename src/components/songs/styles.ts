import styled from "styled-components";

interface SongProps {
    isInLibrary: boolean;
}

const AddIcon = styled.i`
    width: 3%;
    cursor: pointer;
`

const ImgIcon = styled.img`
    width: 100%;
    height: 100%;
`

const SongComp = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NameSong = styled.p<SongProps>`
    color: ${({isInLibrary}) => 
        isInLibrary ? "yellow" : "white"
    };
    font-weight: 600;
`

export{
    AddIcon,
    ImgIcon,
    SongComp,
    NameSong
}