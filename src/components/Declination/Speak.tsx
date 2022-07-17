import React from 'react';
import styles from './styles.module.css';
import { cases, numbers, TDeclination } from '../../models/Declination';
import { capitalize } from '../../utils';
import cx from 'classnames';

interface ITestButtonProps {
  name: string;
  value: string;
}

const TestButton: React.FC<ITestButtonProps> = (props) => {
  const {name, value} = props;
  const [visible, setVisible] = React.useState(false);

  return (
  <button
    className={cx(styles.testButton, visible && styles.shown)}
    onClick={() => setVisible(true)}
  >
    {!visible && name}
    {visible && value}
  </button>);
}

interface IProps {
  word: TDeclination;
}

const Declination: React.FC<IProps> = (props) => {
  const { word } = props;

  return <div className={styles.container}>
    <h2 className={styles.word}>{word.word}</h2>
    <div className={styles.testSpace} key={word.word}>
      {numbers.map(n => <div key={n}>
        <h3>{capitalize(n)}</h3>
        {cases.map(c => <TestButton key={`${n}-${c}`} name={capitalize(c)} value={word[n][c] ?? ''}/>)}
      </div>)}
    </div>
  </div>
}

export default Declination;