import React from 'react';
import { getModeLabels, getTestModeData, modeLabel, setTestModeData, TConjugation, TErrorList } from '../../models/Conjugation';
import { capitalize } from '../../utils';
import Header from '../Layout/Header';
import Section from '../Layout/Section';
import TestInputs from '../TestInput';
import styles from './styles.module.css';

export interface TConjugationMode extends TConjugation {
  mode: string;
}

interface IProps {
  word: TConjugationMode;
  onChange: (answer: TConjugationMode) => void;
  errors?: TErrorList;
  hint?: TConjugationMode;
};

const ConjugactionWrite: React.FC<IProps> = (props) => {
  const { word, onChange, errors, hint } = props;

  const inputRefs = React.useRef<HTMLInputElement[]>([]);

  const updateAnswer = (index: number, value: string) => {
    const res = {...word};
    const data = [...getTestModeData(res, res.mode)];
    data[index] = value;
    setTestModeData(res, word.mode, data);
    onChange(res);
  }

  const data = getTestModeData(word, word.mode);
  const hintData = React.useMemo(() => hint && getTestModeData(hint, word.mode), [hint?.word, word.mode]);
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
    <Header className={styles.word} title={word.word} subtitle={modeLabel(word.mode)}/>
    {/* <h3 className={styles.mode}></h3> */}
    {labels.map(({section, labels, startIndex}) => <Section header={section} key={section}>
      <TestInputs inputRefs={inputRefs}>
        {labels.map((label, i) => ({
            index: startIndex + i + 1,
            name: capitalize(label),
            value: data[startIndex + i],
            hint: hintData?.length ? hintData[startIndex + i] : undefined,
            disabled: Boolean(errors),
            error: errors && Boolean(errors[startIndex + i]),
            onChange: v => updateAnswer(startIndex + i, v),
        }))}
      </TestInputs>
    </Section>)}
  </div>
}

export default ConjugactionWrite;