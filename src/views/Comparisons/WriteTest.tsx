import React from 'react';
import { IViewProps } from '..';
import ComparisonWrite from '../../components/Comparison/Write';
import WriteTestLayout from '../../components/Layout/WriteTestLayout';
import { empty, TComparison, TErrorList, validate } from '../../models/Comparison';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import { IConfig, loadState, useSettings, useWordList } from './StateUtils';

interface IProps extends IViewProps {
}

const Comparisons: React.FC<IProps> = (props) => {
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

  return <WriteTestLayout<TComparison, TErrorList>
    word={word}
    nextWord={nextWord}
    empty={empty}
    validate={validate}
    wordStats={state.wordStats}
    onUpdateStats={stats => doUpdate({wordStats: stats})}
    settings={settings}
    component={ComparisonWrite}
  />;
}

export default Comparisons;