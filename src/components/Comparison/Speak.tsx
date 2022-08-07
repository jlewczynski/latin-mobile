import React from 'react';
import styles from './styles.module.css';
import { capitalize } from '../../utils';
import TestButton from '../TestButton';
import { grades, TComparison } from '../../models/Comparison';

interface IProps {
  word: TComparison;
}

const ComparisonSpeak: React.FC<IProps> = (props) => {
  const { word } = props;

  return <div className={styles.container}>
    <h2 className={styles.word}>{word.word}</h2>
    <div className={styles.testSpace} key={word.word}>
      {grades.map(g => <TestButton key={`${g}`} name={capitalize(g)} value={word[g] ?? ''}/>)}
    </div>
  </div>
}

export default ComparisonSpeak;