import React from 'react';
import Declination from '../../components/Declination';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import { words } from '../../data/Declination';
import { IViewProps } from '..';
import TestLayout, { IWordStatsSet } from '../../components/Layout/TestLayout';

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

  return (
    <TestLayout<TDeclination, TErrorList>
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
        <Declination word={answer} onChange={setAnswer} errors={errorList} hint={hint} />}
    </TestLayout>);
}

export default Declinations;