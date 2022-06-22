import React from 'react';
import styles from './styles.module.css';
import { cases, numbers, TCaseName, TDeclination, TDeclinationNumber, TErrorList } from '../../models/Declination';
import { capitalize } from '../../utils';
import TestInputs from '../TestInput';

interface IProps {
  word: TDeclination;
  onChange: (answer: TDeclination) => void;
  errors?: TErrorList;
  hint?: TDeclination;
}

const Declination: React.FC<IProps> = (props) => {
  const { word, onChange, errors, hint } = props;

  const inputRefs = React.useRef<HTMLInputElement[]>([]);

  const updateAnswer = (number: TDeclinationNumber, caseName: TCaseName, value: string) => {
    const res = {...word};
    res[number][caseName] = value;
    onChange(res);
  }

  return <div className={styles.container}>
    <h2 className={styles.word}>{word.word}</h2>
    {numbers.map((n, ni) => <div key={n}>
      <h3>{capitalize(n)}</h3>
      <TestInputs
        inputRefs={inputRefs}
      >
        {cases.map((c, ci) => ({
            index: ni * cases.length + ci + 1,
            name: capitalize(c),
            value: word[n][c],
            hint: hint?.[n]?.[c],
            disabled: Boolean(errors),
            error: errors && errors[n].includes(c),
            onChange: v => updateAnswer(n, c, v),
        }))}
      </TestInputs>
    </div>)}
  </div>
}

export default Declination;