import React from 'react';
import { TConjugationMode } from '../../components/Conjugaction/Write';
import { useGenericWordList } from '../../components/Layout/useWordList';
import { words } from '../../data/Conjugation';
import { testModes } from "../../models/Conjugation";
import { createStateLoader } from "../../utils/ViewsPersistentState";

export interface IConfig {
  random: boolean;
  modes: string[];
}

export const allModes = testModes();

export const loadState = createStateLoader<IConfig>(
  {
    random: false,
    modes: [...allModes],
  },
  (obj, state) => {
    if (obj.random) {
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

export const useWordList = (random: boolean, modes: string[]): [TConjugationMode, ()=>void, ()=>void] => {
  const newSet = React.useCallback((): TConjugationMode[] => words.flatMap(w =>
    testModes(w)
    .filter(m => modes.includes(m))
    .map(mode => ({...w, mode}))),
  [modes.join(' ')]);

  return useGenericWordList(random, newSet);
}