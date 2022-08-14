import React from 'react';
import { useGenericWordList } from '../../components/Layout/useWordList';
import { words } from '../../data/Comparison';
import { createStateLoader } from "../../utils/ViewsPersistentState";
import { IRandomConfig, useRandom } from '../hooks/useSettings';

export interface IConfig extends IRandomConfig {}

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
  const random = useRandom(config, onUpdate, {});
  return [
    random,
  ];
}