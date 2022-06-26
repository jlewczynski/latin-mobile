import React from 'react';
import { IViewProps } from '..';
import Conjugaction, { TConjugationMode } from '../../components/Conjugaction';
import TestLayout, { IWordStatsSet } from '../../components/Layout/TestLayout';
import { words } from '../../data/Conjugation';
import { empty, TErrorList, testModes, validate } from '../../models/Conjugation';

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

const Conjugations: React.FC<IProps> = (props) => {
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

  const wordSet = React.useRef<TConjugationMode[]>([]);

  const nextWord = (): TConjugationMode => {
    if (!wordSet.current.length) {
      wordSet.current = testModes.flatMap(mode => words.map(w => ({...w, mode})));
    }
    if (state.config.random) {
      const index = Math.floor(Math.random() * wordSet.current.length);
      return wordSet.current.splice(index, 1)[0];
    } else {
      return wordSet.current.shift()!;
    }
  };

  return (
    <TestLayout<TConjugationMode, TErrorList>
      nextWord={nextWord}
      empty={t => ({ ...empty(t), mode: t?.mode ?? '' })}
      validate={(t, a) => validate(t, a, a.mode)}
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
        <Conjugaction word={answer} onChange={setAnswer} errors={errorList} hint={hint} />}
    </TestLayout>);
}

export default Conjugations;