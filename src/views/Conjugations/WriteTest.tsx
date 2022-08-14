import React from 'react';
import { IViewProps } from '..';
import ConjugactionWrite, { TConjugationMode } from '../../components/Conjugaction/Write';
import WriteTestLayout from '../../components/Layout/WriteTestLayout';
import { empty, TErrorList, validate } from '../../models/Conjugation';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import { IConfig, loadState, useSettings, useWordList } from './StateUtils';

interface IProps extends IViewProps {
}

const Conjugations: React.FC<IProps> = (props) => {
  const { persistentState, updatePersistentState: updateStats } = props;
  const state = loadState(persistentState);

  const doUpdate = (newState: Partial<IPersistentState<IConfig>>) => {
    updateStats(JSON.stringify({
      ...state,
      ...newState,
    }));
  }
  const updateConfig = (val: Partial<IConfig>) =>
    doUpdate({config: { ...state.config, ...val }});

  const [word, nextWord] = useWordList(state.config);
  const settings = useSettings(state.config, updateConfig);

  return <WriteTestLayout<TConjugationMode, TErrorList>
    word={word}
    nextWord={nextWord}
    empty={t => ({ ...empty(t), mode: t?.mode ?? '' })}
    validate={(t, a) => validate(t, a, a.mode)}
    wordStats={state.wordStats}
    onUpdateStats={stats => doUpdate({wordStats: stats})}
    settings={settings}
    component={ConjugactionWrite}
  />;
}

export default Conjugations;