import React from "react";
import Comparisons from "./Comparisons";
import MainView from "./Main";
import Declinations from "./Declinations";
import Conjugations from "./Conjugations";

export interface IViewProps {
  persistentState?: string;
  updatePersistentState: (val: string) => void;
}

const modes = ['write', 'speak'] as const;
type Mode = typeof modes[number];

export type ITestView = Record<Mode, React.FC<IViewProps>>;

export const views: Record<string, React.FC<IViewProps> | ITestView> = {
  '': MainView,
  'declination': Declinations,
  'comparison': Comparisons,
  'conjugation': Conjugations,
}

export function getComponent(view: string, mode?: string | null): React.FC<IViewProps> | null {
  const component = views[view];
  if (!component)
    return null;
  if (typeof component === 'function') {
    return component;
  }

  return (mode && (modes as readonly string[]).includes(mode) && component[mode as Mode]) || null;
}