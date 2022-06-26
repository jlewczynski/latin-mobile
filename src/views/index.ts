import React from "react";
import Conjugations from "./Conjugations";
import Comparisons from "./Comparisons";
import Declinations from "./Declinations";
import MainView from "./Main";

export interface IViewProps {
  persistentState?: string;
  updatePersistentState: (val: string) => void;
}

export const views: Record<string, React.FC<IViewProps>> = {
  '': MainView,
  'declination': Declinations,
  'comparison': Comparisons,
  'conjugation': Conjugations,
}