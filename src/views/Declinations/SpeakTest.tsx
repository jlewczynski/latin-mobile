import React from 'react';
import DeclinationSpeak from '../../components/Declination/Speak';
import { TDeclination } from '../../models/Declination';
import { IViewProps } from '..';
import { IConfig, loadState, useSettings, useWordList } from './StateUtils';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import SpeakTestLayout from '../../components/Layout/SpeakTestLayout';

interface IProps extends IViewProps {
}

const DeclinationsSpeak: React.FC<IProps> = (props) => {
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

  return <SpeakTestLayout<TDeclination>
    word={word}
    nextWord={nextWord}
    wordStats={state.wordStats}
    onUpdateStats={stats => doUpdate({wordStats: stats})}
    settings={settings}
    component={DeclinationSpeak}
  />;
}

export default DeclinationsSpeak;