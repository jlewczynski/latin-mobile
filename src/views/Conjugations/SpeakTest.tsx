import React from 'react';
import { IViewProps } from '..';
import ConjugactionSpeak from '../../components/Conjugaction/Speak';
import type { TConjugationMode } from '../../components/Conjugaction/Write';
import SpeakTestLayout from '../../components/Layout/SpeakTestLayout';
import { IWordStatsSet } from '../../models/WordStats';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import { useStatsModification } from '../hooks/useStats';
import { IConfig, loadState, useSettings, useWordList } from './StateUtils';

interface IProps extends IViewProps {
}

const Conjugations: React.FC<IProps> = (props) => {
  const { persistentState, updatePersistentState: updateState } = props;
  const state = loadState(persistentState);

  const doUpdate = (newState: Partial<IPersistentState<IConfig>>) => {
    updateState(JSON.stringify({
      ...state,
      ...newState,
    }));
  }
  const updateConfig = (val: Partial<IConfig>) =>
    doUpdate({config: { ...state.config, ...val }});

  const [word, nextWord] = useWordList(state.config);

  const updateStats = (stats: IWordStatsSet) => doUpdate({wordStats: stats});
  const statUpdater = useStatsModification(word, state.wordStats, updateStats);

  const settings = [
    ...useSettings(state.config, updateConfig),
    statUpdater,
  ];

  return <SpeakTestLayout<TConjugationMode>
    word={word}
    nextWord={nextWord}
    wordStats={state.wordStats}
    onUpdateStats={updateStats}
    settings={settings}
    component={ConjugactionSpeak}
  />;
}

export default Conjugations;