import React from "react";
import Declinations from "./Declinations";
import MainView from "./Main";

export interface IViewProps {
  persistentState?: string;
  updatePersistentState: (val: string) => void;
}

export const views: Record<string, React.FC<IViewProps>> = {
  '': MainView,
  'declination': Declinations,
}