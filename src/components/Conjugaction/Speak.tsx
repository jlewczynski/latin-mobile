import React from 'react';
import { getModeLabels, getTestModeData, modeLabel } from '../../models/Conjugation';
import { capitalize } from '../../utils';
import Section from '../Layout/Section';
import TestButton from '../TestButton';
import styles from './styles.module.css';
import { TConjugationMode } from './Write';

interface IProps {
  word: TConjugationMode;
};

const ConjugactionSpeak: React.FC<IProps> = (props) => {
  const { word } = props;

  const data = getTestModeData(word, word.mode);
  const labels = React.useMemo(() => {
    const l = getModeLabels(word.mode);
    let startIndex = 0;
    return l.map(s => {
      const ret = {...s, startIndex};
      startIndex += s.labels.length;
      return ret;
    });
  }, [word.mode]);

  return <div className={styles.container}>
    <h2 className={styles.word}>{word.word}</h2>
    <h3 className={styles.mode}>{modeLabel(word.mode)}</h3>
    <div className={styles.testSpace} key={`${word.word}-${word.mode}`}>
      {labels.map(({section, labels, startIndex}) => <Section key={section} header={section}>
        {labels.map((label, i) =>
          <TestButton key={`${label}`} name={capitalize(label)} value={data[startIndex + i]} />)}
      </Section>)}
    </div>
  </div>
}

export default ConjugactionSpeak;