import React from 'react';
import { useGenericWordList } from '../../components/Layout/useWordList';
import { words } from "../../data/Declination";
import { TDeclination } from '../../models/Declination';
import { capitalize } from '../../utils';
import { createStateLoader } from "../../utils/ViewsPersistentState";

export interface IConfig {
  random: boolean;
  categories: string[];
}

export const allCategories = Array.from(new Set(words.map(w => w.category)).values());

export const loadState = createStateLoader<IConfig>(
  {
    random: false,
    categories: [...allCategories],
  },
  (obj, state) => {
    if ('random' in obj) {
      state.random = Boolean(obj.random);
    }
    if (obj.categories && Array.isArray(obj.categories)) {
      state.categories = [...(obj.categories as any[]).map(v => String(v))]
    }
  }
);

export const useWordList = (config: IConfig) => {
  const { random, categories } = config;
  const newSet = React.useCallback(() =>
    words.filter(w => categories.includes(w.category) || !categories.length),
  [categories.join(',')]);

  return useGenericWordList<TDeclination>(random, newSet);
}

export const useSettings = (config: IConfig, onUpdate: (diff: Partial<IConfig>) => void) => {

  const toggleCategory = (category: string, checked: boolean) => {
    let categories;
    if (checked) {
      categories = [
        ...config.categories,
        category,
      ];
    } else {
      categories = config.categories.filter(c => c !== category);
    }
    onUpdate({ categories });
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
      {allCategories.map(category => <div>
        <input
          type={'checkbox'}
          key={category}
          checked={config.categories.includes(category)}
          onChange={e => toggleCategory(category, e.target.checked)}
        />
        <span>{capitalize(category)}</span>
      </div>)}
    </div>
  </>;

  return component;
}