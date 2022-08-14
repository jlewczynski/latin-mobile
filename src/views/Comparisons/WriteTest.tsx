import React from 'react';
import { IViewProps } from '..';
import ComparisonWrite from '../../components/Comparison/Write';
import WriteTestLayout from '../../components/Layout/WriteTestLayout';
import { empty, TComparison, TErrorList, validate } from '../../models/Comparison';
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

  return <WriteTestLayout<TComparison, TErrorList>
    word={word}
    nextWord={nextWord}
    empty={empty}
    validate={validate}
    wordStats={state.wordStats}
    onUpdateStats={updateStats}
    settings={settings}
    component={ComparisonWrite}
  />;
}

export default Comparisons;