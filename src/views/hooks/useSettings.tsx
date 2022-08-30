import React from 'react';
import CategoriesDiv from '../../components/Settings/CategoriesDiv';
import CheckBox from '../../components/Settings/CheckBox';
import { capitalize } from '../../utils';

export type ISettingHook<T, U = {}> = (config: T, onUpdate: (diff: Partial<T>) => void, options?: U) => React.ReactNode;

export interface IRandomConfig {
  random: boolean;
}
export const useRandom: ISettingHook<IRandomConfig> = (config, onUpdate) => {
  return <CheckBox label={'Losowe'} value={config.random}
    onChange={checked => onUpdate({ random: checked })}
  />;
}

export interface IModesConfig {
  modes: string[];
}
export const useModes: ISettingHook<IModesConfig, string[]> = (config, onUpdate, allModes) => {

  const toggleMode = (mode: string) => {
    let modes;
    if (config.modes.includes(mode)) {
      modes = config.modes.filter(c => c !== mode);
    } else {
      modes = [
        ...config.modes,
        mode,
      ];
    }
    onUpdate({ modes });
  }

  return allModes && <CategoriesDiv>
    {allModes.map(category => <CheckBox
      key={category}
      label={capitalize(category.replaceAll('.', ' ').replaceAll('+', ' & '))}
      value={config.modes.includes(category)}
      onChange={() => toggleMode(category)}
    />)}
  </CategoriesDiv>;
}

export function useSettings() {

}