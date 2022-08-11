import { FC } from "react";
import styles from './CharacterProperty.module.css';

type Props = {
  label: string,
  value: string
}

const CharacterProperty: FC<Props> = ({ label, value }) => {
return (
  <div className={styles.propertyContainer}>
    <span className={styles.propertyLabel}>{label} </span>
    <span>{value}</span>
  </div>
  );
}

export default CharacterProperty;