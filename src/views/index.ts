import React from "react";
import ConjugationsWrite from "./Conjugations/WriteTest";
import Comparisons from "./Comparisons";
import DeclinationsWrite from "./Declinations/WriteTest";
import MainView from "./Main";
import DeclinationsSpeak from "./Declinations/SpeakTest";
import ConjugationSpeak from "./Conjugations/SpeakTest";

export interface IViewProps {
  persistentState?: string;
  updatePersistentState: (val: string) => void;
}

export const views: Record<string, React.FC<IViewProps>> = {
  '': MainView,
  'declination.write': DeclinationsWrite,
  'declination.speak': DeclinationsSpeak,
  'comparison': Comparisons,
  'conjugation.write': ConjugationsWrite,
  'conjugation.speak': ConjugationSpeak,
}