import React from 'react';
import { useGenericWordList } from '../../components/Layout/useWordList';
import { words } from "../../data/Declination";
import { TDeclination } from '../../models/Declination';
import { capitalize } from '../../utils';
import { createStateLoader } from "../../utils/ViewsPersistentState";
import { IModesConfig, IRandomConfig, useModes, useRandom } from '../hooks/useSettings';

export interface IConfig extends IRandomConfig, IModesConfig {}

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

  const random = useRandom(config, onUpdate, {});
  const modes = useModes(config, onUpdate, allModes);
  return [
    random,
    modes,
  ];
}