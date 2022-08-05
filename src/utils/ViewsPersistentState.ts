import type { IWordStats, IWordStatsSet } from "../models/WordStats";

export interface IPersistentState<T> {
  config: T;
  wordStats: IWordStatsSet;
}

function defaultState<T>(defaultConfig: T): IPersistentState<T> {
  return {
    config: defaultConfig,
    wordStats: {
    },
  }
}

export function createStateLoader<T>(
  defaultConfig: T,
  defaultParser: (obj: any, state: T) => void,
  wordStatParser?: (stats: IWordStatsSet, word: string, repeats?: number, errors?: number) => void,
) {
  return (persistentState?: string): IPersistentState<T> => {
    const result = defaultState(defaultConfig);
    const loaded = JSON.parse(persistentState ?? '{}');
    if (loaded.config) {
      defaultParser(loaded.config, result.config);
    }
    if (loaded.wordStats) {
      result.wordStats = {};
      const wordParser = wordStatParser ?? ((state: IWordStatsSet, word: string, repeats?: number, errors?: number) => {
        state[word] = {
          repeats: repeats ?? 0,
          errors: errors ?? 0,
        };
      });
      Object.entries<Partial<IWordStats>>(loaded.wordStats).forEach(([word, {repeats, errors}]) => {
        wordParser(result.wordStats, word, repeats, errors);
      });
    }
    return result;
  }
}
