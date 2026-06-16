import Plus from './img/plus-circle.svg';
import Minus from './img/minus-circle.svg';
import { Link } from 'react-router-dom';
import { AddIcon, ImgIcon, NameSong, SongComp } from './styles';

type SongProps = {
  id: string | number;
  songName: string;
  artist: string;
  onAdd?: () => void;
  onRemove?: () => void;
  isInLibrary?: boolean;
};

const Song = ({id, songName, artist, onAdd, onRemove, isInLibrary = false}: SongProps) => {
    const hasAdd = typeof onAdd === 'function';
    const hasRemove = typeof onRemove === 'function';

    return(
        <SongComp>
            <Link to={`/song/${id}`}>
                <NameSong isInLibrary={isInLibrary}>{songName}</NameSong>
            </Link>
            {/* <p>{songName}</p> */}
            <p>{artist}</p>
            {hasAdd && (
                <AddIcon onClick={onAdd}>
                    <ImgIcon src={Plus} alt='Agregar'/>
                </AddIcon>
            )}

            {hasRemove && (
                <AddIcon onClick={onRemove}>
                    <ImgIcon src={Minus} alt='Remover'/>
                </AddIcon>
            )}
            
        </SongComp>
    )
}

// class Song extends Component {
//     render(){
//         return(
//             <div className='songComp'>
//                 <p>{this.props.songName}</p>
//                 <p>{this.props.artist}</p>
//                 <p>{this.props.duration}</p>
//             </div>
//         )
//     }

// }

export default Song;