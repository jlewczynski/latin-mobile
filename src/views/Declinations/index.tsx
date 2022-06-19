import React, { useState } from 'react';
import Declination from '../../components/Declination';
import Layout from '../../components/Layout';
import Stats from '../../components/Stats';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import styles from './styles.module.css';
import cx from 'classnames';
import { words } from '../../data/Declination';

interface IProps {
}

const Declinations: React.FC<IProps> = (props) => {
  const [random, setRandom] = React.useState(false);
  const [repeats, setRepeats] = React.useState(0);
  const [errors, setErrors] = React.useState(0);

  const wordSet = React.useRef<TDeclination[]>([]);

  const nextWord = (): TDeclination => {
    console.log(wordSet.current);
    if (!wordSet.current.length) {
      wordSet.current = [...words];
    }
    if (random) {
      const index = Math.floor(Math.random() * wordSet.current.length);
      return wordSet.current.splice(index, 1)[0];
    } else {
      return wordSet.current.shift()!;
    }
  };

  const [template, setTemplate] = React.useState(() => nextWord());
  const [answer, setAnswer] = React.useState(() => empty(template));
  const [errorList, setErrorList] = React.useState<TErrorList>();

  const next = () => {
    const next = nextWord();

    setTemplate(next);
    setAnswer(empty(next));
    setErrorList(undefined);
  }

  const check = () => {
    if (errorList) {
      next();
    } else {
      const result = validate(template, answer);
      if (result) {
        setErrors(e => e + 1);
        setErrorList(result);
      } else {
        setRepeats(p => p + 1);
        next();
      }
    }
  }

  return (
    <Layout
      settings={<>
        <label>
          Random
          <input type='checkbox' checked={random} onChange={e => setRandom(e.target.checked)} />
        </label>
      </>}
      button={
        <button className={cx(styles.submit, errorList && styles.error)} onClick={check}>OK</button>
      }
    >
      <Stats repeats={repeats} errors={errors} />
      <Declination word={answer} onChange={setAnswer} errors={errorList} />
    </Layout>);
}

export default Declinations;