import React from 'react';
import styles from './styles.module.css';

interface IProps {
  repeats: number;
  goal?: number;
  errors: number;
}

const Stats: React.FC<IProps> = (props) => {
  const { repeats, goal, errors } = props;
  return <div className={styles.container}>
    <span>Powtórzenia: {repeats}/{goal}</span>
    <span>Błędy: {errors}</span>
  </div>
}

Stats.defaultProps = {
  goal: 100,
}

export default Stats;