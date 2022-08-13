import React from 'react';
import { useGenericWordList } from '../../components/Layout/useWordList';
import { words } from '../../data/Comparison';
import { createStateLoader } from "../../utils/ViewsPersistentState";

export interface IConfig {
  random: boolean;
}

export const loadState = createStateLoader<IConfig>(
  {
    random: false,
  },
  (obj, state) => {
    if ('random' in obj) {
      state.random = Boolean(obj.random);
    }
  },
);

export const useWordList = (config: IConfig) => {
  const { random } = config;
  const newSet = React.useCallback(() => [...words], []);

  return useGenericWordList(random, newSet);
}

export const useSettings = (config: IConfig, onUpdate: (diff: Partial<IConfig>) => void) => {
  const component = <>
    <label>
      Random
      <input
        type='checkbox'
        checked={config.random}
        onChange={e => onUpdate({ random: e.target.checked })}
      />
    </label>
  </>;

  return component;
}