import React from 'react';
import { IViewProps } from '..';
import ConjugactionSpeak from '../../components/Conjugaction/Speak';
import type { TConjugationMode } from '../../components/Conjugaction/Write';
import SpeakTestLayout from '../../components/Layout/SpeakTestLayout';
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

  return (
    <SpeakTestLayout<TConjugationMode>
      word={word}
      nextWord={nextWord}
      wordStats={state.wordStats}
      onUpdateStats={stats => doUpdate({wordStats: stats})}
      settings={settings}
    >
      {(word) =>
        <ConjugactionSpeak word={word} />}
    </SpeakTestLayout>);
}

export default Conjugations;