import React, { useState } from 'react';
import Declination from '../../components/Declination';
import Layout from '../../components/Layout';
import Stats from '../../components/Stats';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import styles from './styles.module.css';
import cx from 'classnames';
import { words } from '../../data/Declination';
import { IViewProps } from '..';

interface IProps extends IViewProps {
}

interface IConfig {
  random: boolean;
}

interface IWordStats {
  repeats: number;
  errors: number;
}

interface IPersistentState {
  config: IConfig;
  wordStats: Record<string, IWordStats>;
}

const defaultState: IPersistentState = {
  config: {
    random: false,
  },
  wordStats: {
  },
}

const Declinations: React.FC<IProps> = (props) => {
  const { persistentState, updatePersistentState: updateStats } = props;
  const state: IPersistentState = persistentState ?
    JSON.parse(persistentState) :
    defaultState;

  const doUpdate = (newState: Partial<IPersistentState>) => {
    updateStats(JSON.stringify({
      ...state,
      ...newState,
    }));
  }
  const updateConfig = (val: Partial<IConfig>) =>
    doUpdate({config: { ...state.config, ...val }});
  const updateWordStats = (word: string, val: IWordStats) =>
    doUpdate({ wordStats: { ...state.wordStats, [word]: val }});
  const updateWordStat = (word: string, val: Partial<IWordStats>) =>
    updateWordStats(word, {
      ...state.wordStats[word] ?? { repeats: 0, errors: 0 },
      ...val,
    });

  const wordSet = React.useRef<TDeclination[]>([]);

  const nextWord = (): TDeclination => {
    if (!wordSet.current.length) {
      wordSet.current = [...words];
    }
    if (state.config.random) {
      const index = Math.floor(Math.random() * wordSet.current.length);
      return wordSet.current.splice(index, 1)[0];
    } else {
      return wordSet.current.shift()!;
    }
  };

  const [template, setTemplate] = React.useState(() => nextWord());
  const [answer, setAnswer] = React.useState(() => empty(template));
  const [errorList, setErrorList] = React.useState<TErrorList>();

  const { repeats, errors } = state.wordStats[template.word] ?? { repeats: 0, errors: 0};

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
        updateWordStat(template.word, { errors: errors + 1 });
        setErrorList(result);
      } else {
        updateWordStat(template.word, { repeats: repeats + 1 });
        next();
      }
    }
  }

  return (
    <Layout
      settings={<>
        <label>
          Random
          <input
            type='checkbox'
            checked={state.config.random}
            onChange={e => updateConfig({ random: e.target.checked })}
          />
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