import React from 'react';
import styles from './styles.module.css';
import cx from 'classnames';
import { cases, numbers, TCaseName, TDeclination, TDeclinationNumber, TErrorList } from '../../models/Declination';
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
  onFocusNext?: () => void;
}

const Item = React.forwardRef<HTMLInputElement, IItemProps>((props, ref) => {
  const { name, value, onChange, disabled, error, onFocusNext } = props;
  return <>
    <span className={cx(styles.cell, styles.title)}>{name}</span>
    <input
      ref={ref}
      type='text'
      disabled={disabled}
      className={cx(styles.cell, styles.input, error && styles.error)}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onFocusNext && (e => (e.key === 'Enter') && onFocusNext())}
    />
  </>
});

const Declination: React.FC<IProps> = (props) => {
  const { word, onChange, errors } = props;

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
      <div className={styles.declination}>
        {cases.map((c, ci) =>
          <Item
            key={c}
            ref={element => element && (inputRefs.current.push(element))}
            name={capitalize(c)}
            value={word[n][c]}
            disabled={Boolean(errors)}
            error={errors && errors[n].includes(c)}
            onChange={v => updateAnswer(n, c, v)}
            onFocusNext={() => {
              const next = inputRefs.current[ni * cases.length + ci + 1];
              next && next.focus();
            }}
          />)}
      </div>
    </div>)}
  </div>
}

export default Declination;