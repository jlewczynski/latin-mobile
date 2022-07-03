import React from 'react';
import Declination from '../../components/Declination';
import { empty, TDeclination, TErrorList, validate } from '../../models/Declination';
import { words } from '../../data/Declination';
import { IViewProps } from '..';
import TestLayout, { IWordStats, IWordStatsSet } from '../../components/Layout/TestLayout';
import { capitalize } from '../../utils';

interface IProps extends IViewProps {
}

interface IConfig {
  random: boolean;
  categories: string[];
}

interface IPersistentState {
  config: IConfig;
  wordStats: IWordStatsSet;
}

const allCategories = Array.from(new Set(words.map(w => w.category)).values());

const defaultState: IPersistentState = {
  config: {
    random: false,
    categories: [...allCategories],
  },
  wordStats: {
  },
}

const loadState = (persistentState?: string): IPersistentState => {
  const result = defaultState;
  const loaded = JSON.parse(persistentState ?? '{}');
  if (loaded.config) {
    if (loaded.config.random) {
      result.config.random = Boolean(loaded.config.random);
    }
    if (loaded.config.categories && Array.isArray(loaded.config.categories)) {
      result.config.categories = [...(loaded.config.categories as any[]).map(v => String(v))]
    }
  }
  if (loaded.wordStats) {
    result.wordStats = {};
    Object.entries<Partial<IWordStats>>(loaded.wordStats).forEach(([word, {repeats, errors}]) => {
      result.wordStats[word] = {
        repeats: repeats ?? 0,
        errors: errors ?? 0,
      }
    });
  }
  return result;
}

const Declinations: React.FC<IProps> = (props) => {
  const { persistentState, updatePersistentState: updateStats } = props;
  const state: IPersistentState = loadState(persistentState);

  const doUpdate = (newState: Partial<IPersistentState>) => {
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

export default Declinations;