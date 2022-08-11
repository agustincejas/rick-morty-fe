import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CharacterProperty from '../../app/components/CharacterProperty/CharacterProperty';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './CharacterDetail.module.css';
import { getSingleCharacter, selectSingleCharacter } from './charactersSlice';

const CharacterDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const charId = Number(params.id);
  const character = useAppSelector(selectSingleCharacter);


  useEffect(() => {
    dispatch(getSingleCharacter({ id: charId!}));
  }, [])



  return (
    <div>
      {character?.name &&
      <div className={styles.characterDetailContainer}>
        <div>
          <h1>{character.name}</h1>
          <div className={styles.propertiesContainer}>
            <div>
              <img src={character.image} width="300px" height="300px" alt={character.name + ' image'} />
            </div>
            <div className={styles.properties}>
              <div>
                <span>{character.status} - </span>
                <span>{character.species}</span>
              </div>
              <CharacterProperty label="Gender:" value={character.gender} />
              <CharacterProperty label="Last known location:" value={character.location.name} />
              <CharacterProperty label="First seen in:" value={character.origin.name} />
            </div>
          </div>
        </div>
      </div>}
  </div>)
}

export default CharacterDetail;