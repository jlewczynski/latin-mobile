import React from 'react';
import DeclinationSpeak from '../../components/Declination/Speak';
import { TDeclination } from '../../models/Declination';
import { IViewProps } from '..';
import { IConfig, loadState, useSettings, useWordList } from './StateUtils';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import SpeakTestLayout from '../../components/Layout/SpeakTestLayout';
import { useStatsModification } from '../hooks/useStats';
import { IWordStatsSet } from '../../models/WordStats';

interface IProps extends IViewProps {
}

const DeclinationsSpeak: React.FC<IProps> = (props) => {
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

  return <SpeakTestLayout<TDeclination>
    word={word}
    nextWord={nextWord}
    wordStats={state.wordStats}
    onUpdateStats={updateStats}
    settings={settings}
    component={DeclinationSpeak}
  />;
}

export default DeclinationsSpeak;