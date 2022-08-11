import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Character } from '../../app/models/character.interface';
import { getAllCharacters, selectAllCharacters } from './charactersSlice';

import { selectFavorites } from '../auth/authSlice';
import styles from './CharacterList.module.css';
import CharacterPreview from './CharacterPreview';

const CharacterList = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectAllCharacters);
  const favorites = useAppSelector(selectFavorites);

  useEffect(() => {
    dispatch(getAllCharacters());
  }, [])

  const checkIsFavorite = (character: Character) => {
    const result = favorites.findIndex((f: number) => f === character.id);
    if(result !== -1) {
      return true;
    }
    return false;
  }

  return (
    <div className={styles.pageContainer}>
      <ul className={styles.cardsContainer}>
        {characters.map((character: Character) => {
          return <li key={character.id} className={styles.entityWrapper}>
            <CharacterPreview isFavorite={checkIsFavorite(character)}  character={character} />
            </li>
          })
        }
      </ul>
    </div>
  );
}

export default CharacterList;