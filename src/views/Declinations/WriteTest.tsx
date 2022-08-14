import React from 'react';
import DeclinationWrite from '../../components/Declination/Write';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import { IViewProps } from '..';
import WriteTestLayout from '../../components/Layout/WriteTestLayout';
import { IConfig, loadState, useSettings, useWordList } from './StateUtils';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import { IWordStatsSet } from '../../models/WordStats';
import { useStatsModification } from '../hooks/useStats';

interface IProps extends IViewProps {
}

const DeclinationsWrite: React.FC<IProps> = (props) => {
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

  return <WriteTestLayout<TDeclination, TErrorList>
    word={word}
    nextWord={nextWord}
    empty={empty}
    validate={validate}
    wordStats={state.wordStats}
    onUpdateStats={updateStats}
    settings={settings}
    component={DeclinationWrite}
  />;
}

export default DeclinationsWrite;