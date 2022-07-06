import { IWordStats, IWordStatsSet } from "../../components/Layout/TestLayout";
import { words } from "../../data/Declination";

export interface IConfig {
  random: boolean;
  categories: string[];
}

export interface IPersistentState {
  config: IConfig;
  wordStats: IWordStatsSet;
}

export const allCategories = Array.from(new Set(words.map(w => w.category)).values());

const defaultState: IPersistentState = {
  config: {
    random: false,
    categories: [...allCategories],
  },
  wordStats: {
  },
}

export const loadState = (persistentState?: string): IPersistentState => {
  const result = defaultState;
  const loaded = JSON.parse(persistentState ?? '{}');
  if (loaded.config) {
    if (loaded.config.random) {
      result.config.random = Boolean(loaded.config.random);
    }
    if (loaded.config.categories && Array.isArray(loaded.config.categories)) {
      result.config.categories = [...(loaded.config.categories as any[]).map(v => String(v))]
    }
  }
  if (loaded.wordStats) {
    result.wordStats = {};
    Object.entries<Partial<IWordStats>>(loaded.wordStats).forEach(([word, {repeats, errors}]) => {
      result.wordStats[word] = {
        repeats: repeats ?? 0,
        errors: errors ?? 0,
      }
    });
  }
  return result;
}
