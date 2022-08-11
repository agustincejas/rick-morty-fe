import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Character } from '../../app/models/character.interface';

import { selectFavorites, selectUserId, setFavorites } from '../auth/authSlice';
import styles from './CharacterPreview.module.css';

type Props = {
  character: Character,
  isFavorite: boolean
}

const CharacterPreview: FC<Props> = ({ character, isFavorite}) => {

  const navigate = useNavigate();
  const favorites = useAppSelector(selectFavorites);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const goToDetailPage = () => {
    navigate(`/characters/${character.id}`);
  }

  const removeFromFavorites = () => {
    const newFavorites = favorites.filter((favorite) => favorite !== character.id);
    dispatch(setFavorites({ favorites: newFavorites, id: userId} ));
  }

  const addToFavorites = () => {
    const newFavorites = [...favorites, character.id];
    const favoritesSet = new Set(newFavorites);
    const favoritesArray = Array.from(favoritesSet);
    dispatch(setFavorites({ favorites: favoritesArray, id: userId} ));
  }

  return (
    <div className={styles.card} >
      <span className={styles.name} data-test-name>{ character.name }</span>
      <img data-test-image src={character.image} width='300px' height='300px' alt={character.name + ' image '} onClick={goToDetailPage}/>
      {isFavorite && <BsSuitHeartFill data-test-favorite className={styles.favIcon} color='red' onClick={removeFromFavorites} size={'40px'}/>}
      {!isFavorite &&<BsSuitHeart data-test-not-favorite className={styles.favIcon}  onClick={addToFavorites}  size={'40px'}/> }
    </div>
  );
}

export default CharacterPreview;