import React from 'react';
import styles from './styles.module.css';
import cx from 'classnames';
import { cases, empty, numbers, TCaseName, TDeclination, TDeclinationNumber, TErrorList } from '../../models/Declination';
import { capitalize } from '../../utils';

interface IProps {
  word: TDeclination;
  onChange: (answer: TDeclination) => void;
  errors?: TErrorList;
}

interface IItemProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const Item: React.FC<IItemProps> = ({ name, value, onChange, disabled, error }) => {
  return <>
    <span className={cx(styles.cell, styles.title)}>{name}</span>
    <input
      type='text'
      disabled={disabled}
      className={cx(styles.cell, styles.input, error && styles.error)}
      value={value}
      onChange={e => onChange(e.target.value)}/>
  </>
}

const Declination: React.FC<IProps> = (props) => {
  const { word, onChange, errors } = props;

  const updateAnswer = (number: TDeclinationNumber, caseName: TCaseName, value: string) => {
    const res = {...word};
    res[number][caseName] = value;
    onChange(res);
  }

  return <div className={styles.container}>
    <h2 className={styles.word}>{word.word}</h2>
    {numbers.map(n => <>
      <h3>{capitalize(n)}</h3>
      <div className={styles.declination}>
        {cases.map(c => <>
          <Item
            key={c}
            name={capitalize(c)}
            value={word[n][c]}
            disabled={Boolean(errors)}
            error={errors && errors[n].includes(c)}
            onChange={v => updateAnswer(n, c, v)}
          />
        </>)}
      </div>
    </>)}
  </div>
}

export default Declination;