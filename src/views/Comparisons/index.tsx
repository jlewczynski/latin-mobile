import React from 'react';
import { IViewProps } from '..';
import Comparison from '../../components/Comparison';
import { useGenericWordList } from '../../components/Layout/useWordList';
import WriteTestLayout from '../../components/Layout/WriteTestLayout';
import { words } from '../../data/Comparison';
import { empty, TComparison, TErrorList, validate } from '../../models/Comparison';
import type { IWordStatsSet } from '../../models/WordStats';

interface IProps extends IViewProps {
}

interface IConfig {
  random: boolean;
}

interface IPersistentState {
  config: IConfig;
  wordStats: IWordStatsSet;
}

const defaultState: IPersistentState = {
  config: {
    random: false,
  },
  wordStats: {
  },
}

const Comparisons: React.FC<IProps> = (props) => {
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

  const newSet = React.useCallback(() => [...words], []);

  const [word, nextWord] = useGenericWordList<TComparison>(state.config.random, newSet);

  return (
    <WriteTestLayout<TComparison, TErrorList>
      word={word}
      nextWord={nextWord}
      empty={empty}
      validate={validate}
      wordStats={state.wordStats}
      onUpdateStats={stats => doUpdate({wordStats: stats})}
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
    >
      {(answer, setAnswer, errorList, hint) =>
        <Comparison word={answer} onChange={setAnswer} errors={errorList} hint={hint} />}
    </WriteTestLayout>);
}

export default Comparisons;