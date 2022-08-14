import React from 'react';
import { IViewProps } from '..';
import ComparisonSpeak from '../../components/Comparison/Speak';
import SpeakTestLayout from '../../components/Layout/SpeakTestLayout';
import { TComparison } from '../../models/Comparison';
import { IWordStatsSet } from '../../models/WordStats';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import { useStatsModification } from '../hooks/useStats';
import { IConfig, loadState, useSettings, useWordList } from './StateUtils';

interface IProps extends IViewProps {
}

const Comparisons: React.FC<IProps> = (props) => {
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

  return <SpeakTestLayout<TComparison>
    word={word}
    nextWord={nextWord}
    wordStats={state.wordStats}
    onUpdateStats={updateStats}
    settings={settings}
    component={ComparisonSpeak}
  />;
}

export default Comparisons;