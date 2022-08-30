import React from 'react';
import styles from './styles.module.css';
import { capitalize } from '../../utils';
import TestInputs from '../TestInput';
import { grades, TComparison, TErrorList, TGradeName } from '../../models/Comparison';
import Header from '../Layout/Header';

interface IProps {
  word: TComparison;
  onChange: (answer: TComparison) => void;
  errors?: TErrorList;
  hint?: TComparison;
}

const Comparison: React.FC<IProps> = (props) => {
  const { word, onChange, errors, hint } = props;

  const inputRefs = React.useRef<HTMLInputElement[]>([]);

  const updateAnswer = (grade: TGradeName, value: string) => {
    onChange({...word, [grade]: value});
  }

  return <div className={styles.container}>
    <Header className={styles.word} title={word.word} />
    <TestInputs
      inputRefs={inputRefs}
    >
      {grades.map((g, gi) => ({
          index: gi + 1,
          name: capitalize(g),
          value: word[g],
          hint: hint?.[g],
          disabled: Boolean(errors),
          error: errors?.includes(g),
          onChange: v => updateAnswer(g, v),
      }))}
    </TestInputs>
  </div>
}

export default Comparison;