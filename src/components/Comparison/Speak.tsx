import React from 'react';
import styles from './styles.module.css';
import { capitalize } from '../../utils';
import TestButton from '../TestButton';
import { grades, TComparison } from '../../models/Comparison';
import Header from '../Layout/Header';

interface IProps {
  word: TComparison;
}

const ComparisonSpeak: React.FC<IProps> = (props) => {
  const { word } = props;

  return <div className={styles.container}>
    <Header className={styles.word} title={word.word} />
    <div className={styles.testSpace} key={word.word}>
      {grades.map(g => <TestButton key={`${g}`} name={capitalize(g)} value={word[g] ?? ''} render={word} />)}
    </div>
  </div>
}

export default ComparisonSpeak;