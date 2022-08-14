import React from 'react';
import { capitalize } from '../../utils';

export type ISettingHook<T, U = {}> = (config: T, onUpdate: (diff: Partial<T>) => void, options?: U) => React.ReactNode;

export interface IRandomConfig {
  random: boolean;
}
export const useRandom: ISettingHook<IRandomConfig> = (config, onUpdate) => {
  return <label>
    Random
    <input
      type='checkbox'
      checked={config.random}
      onChange={e => onUpdate({ random: e.target.checked })}
    />
  </label>
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

  return allModes && <div>
    <div>Categories</div>
    {allModes.map(category => <div>
      <input
        type={'checkbox'}
        key={category}
        checked={config.modes.includes(category)}
        onChange={e => toggleMode(category)}
      />
      <span>{capitalize(category)}</span>
    </div>)}
  </div>;
}

export function useSettings() {

}