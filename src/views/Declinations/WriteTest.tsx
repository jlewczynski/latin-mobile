import React from 'react';
import DeclinationWrite from '../../components/Declination/Write';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import { words } from '../../data/Declination';
import { IViewProps } from '..';
import WriteTestLayout from '../../components/Layout/WriteTestLayout';
import { capitalize } from '../../utils';
import { allCategories, IConfig, loadState, useWordList } from './StateUtils';
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

  const [word, correct, incorrect] = useWordList(state.config.random, state.config.categories);

  const toggleCategory = (category: string, checked: boolean) => {
    let categories;
    if (checked) {
      categories = [
        ...state.config.categories,
        category,
      ];
    } else {
      categories = state.config.categories.filter(c => c !== category);
    }
    updateConfig({ categories });
  }

  return (
    <WriteTestLayout<TDeclination, TErrorList>
      word={word}
      nextWord={c => c ? correct() : incorrect()}
      empty={empty}
      validate={validate}
      wordStats={state.wordStats}
      onUpdateStats={stats => doUpdate({wordStats: stats})}
      settings={<>
        <label>
          Random
          <input
            type='checkbox'
            checked={state.config.random}
            onChange={e => updateConfig({ random: e.target.checked })}
          />
        </label>
        <div>
          <div>Categories</div>
          {allCategories.map(category => <div>
            <input
              type={'checkbox'}
              key={category}
              checked={state.config.categories.includes(category)}
              onChange={e => toggleCategory(category, e.target.checked)}
            />
            <span>{capitalize(category)}</span>
          </div>)}
        </div>
      </>}
    >
      {(answer, setAnswer, errorList, hint) =>
        <DeclinationWrite word={answer} onChange={setAnswer} errors={errorList} hint={hint} />}
    </WriteTestLayout>);
}

export default DeclinationsWrite;