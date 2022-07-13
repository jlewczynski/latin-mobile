import React from 'react';
import Declination from '../../components/Declination';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import { words } from '../../data/Declination';
import { IViewProps } from '..';
import TestLayout from '../../components/Layout/TestLayout';
import { capitalize } from '../../utils';
import { allCategories, IConfig, loadState } from './StateUtils';
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

  const wordSet = React.useRef<TDeclination[]>([]);

  React.useEffect(() => {
    wordSet.current = wordSet.current.filter(w => state.config.categories.includes(w.category));
  }, [state.config.categories.join(' ')]);

  const nextWord = (): TDeclination => {
    if (!wordSet.current.length) {
      wordSet.current = [...words.filter(w => state.config.categories.includes(w.category))];
    }
    if (state.config.random) {
      const index = Math.floor(Math.random() * wordSet.current.length);
      return wordSet.current.splice(index, 1)[0];
    } else {
      return wordSet.current.shift()!;
    }
  };

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
    <TestLayout<TDeclination, TErrorList>
      nextWord={nextWord}
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
        <Declination word={answer} onChange={setAnswer} errors={errorList} hint={hint} />}
    </TestLayout>);
}

export default DeclinationsWrite;