import React from 'react';
import { useGenericWordList } from '../../components/Layout/useWordList';
import { words } from "../../data/Declination";
import { TDeclination } from '../../models/Declination';
import { capitalize } from '../../utils';
import { createStateLoader } from "../../utils/ViewsPersistentState";

export interface IConfig {
  random: boolean;
  modes: string[];
}

export const allModes = Array.from(new Set(words.map(w => w.mode)).values());

export const loadState = createStateLoader<IConfig>(
  {
    random: false,
    modes: [...allModes],
  },
  (obj, state) => {
    if ('random' in obj) {
      state.random = Boolean(obj.random);
    }
    if (obj.categories && Array.isArray(obj.categories)) {
      state.modes = [...(obj.categories as any[]).map(v => String(v))]
    }
  }
);

export const useWordList = (config: IConfig) => {
  const { random, modes: categories } = config;
  const newSet = React.useCallback(() =>
    words.filter(w => categories.includes(w.mode) || !categories.length),
  [categories.join(',')]);

  return useGenericWordList<TDeclination>(random, newSet);
}

export const useSettings = (config: IConfig, onUpdate: (diff: Partial<IConfig>) => void) => {

  const toggleMode = (category: string, checked: boolean) => {
    let categories;
    if (checked) {
      categories = [
        ...config.modes,
        category,
      ];
    } else {
      categories = config.modes.filter(c => c !== category);
    }
    onUpdate({ modes: categories });
  }

  const component = <>
    <label>
      Random
      <input
        type='checkbox'
        checked={config.random}
        onChange={e => onUpdate({ random: e.target.checked })}
      />
    </label>
    <div>
      <div>Categories</div>
      {allModes.map(category => <div>
        <input
          type={'checkbox'}
          key={category}
          checked={config.modes.includes(category)}
          onChange={e => toggleMode(category, e.target.checked)}
        />
        <span>{capitalize(category)}</span>
      </div>)}
    </div>
  </>;

  return component;
}