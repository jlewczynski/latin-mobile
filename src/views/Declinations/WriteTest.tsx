import React from 'react';
import DeclinationWrite from '../../components/Declination/Write';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import { IViewProps } from '..';
import WriteTestLayout from '../../components/Layout/WriteTestLayout';
import { IConfig, loadState, useSettings, useWordList } from './StateUtils';
import { IPersistentState } from '../../utils/ViewsPersistentState';

interface IProps extends IViewProps {
}

const DeclinationsWrite: React.FC<IProps> = (props) => {
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

  const [word, nextWord] = useWordList(state.config.random, state.config.categories);
  const settings = useSettings(state.config, updateConfig);

  return (
    <WriteTestLayout<TDeclination, TErrorList>
      word={word}
      nextWord={nextWord}
      empty={empty}
      validate={validate}
      wordStats={state.wordStats}
      onUpdateStats={stats => doUpdate({wordStats: stats})}
      settings={settings}
    >
      {(answer, setAnswer, errorList, hint) =>
        <DeclinationWrite word={answer} onChange={setAnswer} errors={errorList} hint={hint} />}
    </WriteTestLayout>);
}

export default DeclinationsWrite;