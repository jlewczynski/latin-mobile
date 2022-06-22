import React from 'react';
import { IViewProps } from '..';
import Comparison from '../../components/Comparison';
import TestLayout, { IWordStatsSet } from '../../components/Layout/TestLayout';
import { words } from '../../data/Comparison';
import { empty, TComparison, TErrorList, validate } from '../../models/Comparison';

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

  const wordSet = React.useRef<TComparison[]>([]);

  const nextWord = (): TComparison => {
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

  return (
    <TestLayout<TComparison, TErrorList>
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
    </TestLayout>);
}

export default Comparisons;