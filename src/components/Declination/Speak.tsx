import React from 'react';
import styles from './styles.module.css';
import { cases, numbers, TDeclination } from '../../models/Declination';
import { capitalize } from '../../utils';
import TestButton from '../TestButton';
import Section from '../Layout/Section';

interface IProps {
  word: TDeclination;
}

const Declination: React.FC<IProps> = (props) => {
  const { word } = props;

  return <div className={styles.container}>
    <h2 className={styles.word}>{word.word}</h2>
    <div className={styles.testSpace} key={word.word}>
      {numbers.map(n => <Section header={n} key={n}>
        {cases.map(c => <TestButton key={`${n}-${c}`} name={capitalize(c)} value={word[n][c] ?? ''}/>)}
      </Section>)}
    </div>
  </div>
}

export default Declination;