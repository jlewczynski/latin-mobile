import { words } from "../../data/Declination";
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
    if (obj.random) {
      state.random = Boolean(obj.random);
    }
    if (obj.categories && Array.isArray(obj.categories)) {
      state.categories = [...(obj.categories as any[]).map(v => String(v))]
    }
  }
);
