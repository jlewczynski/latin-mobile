import React from "react";
import Declinations from "./Declinations";
import MainView from "./Main";

export const views: Record<string, React.FC<{}>> = {
  '': MainView,
  'declination': Declinations,
}