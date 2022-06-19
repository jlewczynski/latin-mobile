import React, { useState } from 'react';
import Declination from '../../components/Declination';
import Layout from '../../components/Layout';
import Stats from '../../components/Stats';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import styles from './styles.module.css';
import cx from 'classnames';

interface IProps {
}

const rose: TDeclination = {
  word: 'róża',
  singularis: {
    nominativus: 'rosa',
    genetivus: 'rosae',
    dativus: 'rosae',
    accusativus: 'rosam',
    ablativus: 'rosa',
    vocativus: 'rosa',
  },
  pluralis: {
    nominativus: 'rosae',
    genetivus: 'rosarum',
    dativus: 'rosis',
    accusativus: 'rosas',
    ablativus: 'rosis',
    vocativus: 'rosae',
  }
}

const Declinations: React.FC<IProps> = (props) => {
  const [random, setRandom] = React.useState(false);
  const [repeats, setRepeats] = React.useState(0);
  const [errors, setErrors] = React.useState(0);

  const [template, setTemplate] = React.useState(rose);
  const [answer, setAnswer] = React.useState(empty(rose));
  const [errorList, setErrorList] = React.useState<TErrorList>();

  const testNext = () => {
    const next = rose; //get next word;

    setTemplate(next);
    setAnswer(empty(next));
    setErrorList(undefined);
  }

  const check = () => {
    if (errorList) {
      testNext();
    } else {
      const result = validate(rose, answer);
      if (result) {
        setErrors(e => e + 1);
        setErrorList(result);
      } else {
        setRepeats(p => p + 1);
        testNext();
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