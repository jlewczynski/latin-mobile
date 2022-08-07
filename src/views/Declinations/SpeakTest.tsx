import React from 'react';
import DeclinationSpeak from '../../components/Declination/Speak';
import { TDeclination } from '../../models/Declination';
import { IViewProps } from '..';
import { capitalize } from '../../utils';
import { allCategories, IConfig, loadState, useWordList } from './StateUtils';
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
    <SpeakTestLayout<TDeclination>
      word={word}
      nextWord={c => c ? correct() : incorrect()}
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
      {(word) =>
        <DeclinationSpeak word={word} />}
    </SpeakTestLayout>);
}

export default DeclinationsSpeak;