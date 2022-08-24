import React from 'react';
import { TConjugationMode } from '../../components/Conjugaction/Write';
import { useGenericWordList } from '../../components/Layout/useWordList';
import { words } from '../../data/Conjugation';
import { testModes } from "../../models/Conjugation";
import { createStateLoader } from "../../utils/ViewsPersistentState";
import { IModesConfig, IRandomConfig, useModes, useRandom } from '../hooks/useSettings';

export interface IConfig extends IRandomConfig, IModesConfig {}

export const allModes = testModes();

export const loadState = createStateLoader<IConfig>(
  {
    random: false,
    modes: [...allModes],
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
      word = `${word}:indicativus.activum.praesens`
    }
    state[word] = {
      repeats: repeats ?? 0,
      errors: errors ?? 0,
    }
  }
);

export const useWordList = (config: IConfig) => {
  const {random, modes} = config;
  const newSet = React.useCallback(() => words.flatMap(w =>
    testModes(w)
    .filter(m => modes.includes(m) || !modes.length)
    .map(mode => ({...w, mode} as TConjugationMode))),
  [modes.join(' ')]);

  return useGenericWordList(random, newSet);
}

export const useSettings = (config: IConfig, onUpdate: (diff: Partial<IConfig>) => void) => {
  const random = useRandom(config, onUpdate, {});
  const modes = useModes(config, onUpdate, allModes);
  return [
    random,
    modes,
  ];
}