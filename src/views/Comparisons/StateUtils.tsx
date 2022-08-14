import React from 'react';
import { useGenericWordList } from '../../components/Layout/useWordList';
import { words } from '../../data/Comparison';
import { createStateLoader } from "../../utils/ViewsPersistentState";
import { IModesConfig, IRandomConfig, useModes, useRandom } from '../hooks/useSettings';

export interface IConfig extends IRandomConfig, IModesConfig {}

export const loadState = createStateLoader<IConfig>(
  {
    random: false,
    modes: [],
  },
  (obj, state) => {
    if ('random' in obj) {
      state.random = Boolean(obj.random);
    }
    if (obj.modes && Array.isArray(obj.modes)) {
      state.modes = [...(obj.modes as any[]).map(v => String(v))]
    }
  },
  (state, word, repeats, errors) => {
    if (!word.includes(':')) {
      word = `${word}:${words.find(v => v.word === word)?.mode ?? ''}`
    }
    state[word] = {
      repeats: repeats ?? 0,
      errors: errors ?? 0,
    }
  }
);

export const allModes = Array.from(new Set(words.map(w => w.mode)).values());

export const useWordList = (config: IConfig) => {
  const { random, modes } = config;
  const newSet = React.useCallback(() => [...words].filter(m => modes.includes(m.mode) || !modes.length), []);

  return useGenericWordList(random, newSet);
}

export const useSettings = (config: IConfig, onUpdate: (diff: Partial<IConfig>) => void) => {
  const random = useRandom(config, onUpdate, {});
  const modes = useModes(config, onUpdate, allModes)
  return [
    random,
    modes,
  ];
}