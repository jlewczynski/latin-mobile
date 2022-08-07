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
    if (obj.random) {
      state.random = Boolean(obj.random);
    }
  },
);

export const useWordList = (random: boolean) => {
  const newSet = React.useCallback(() => [...words], []);

  return useGenericWordList(random, newSet);
}