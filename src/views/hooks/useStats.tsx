import React from 'react';
import { IWordStatsSet } from '../../models/WordStats';

export const useStatsModification = (
  word: {word: string, mode: string},
  stats: IWordStatsSet,
  onUpdate: (stats: IWordStatsSet) => void,
) => {
  const statKey = `${word.word}:${word.mode}`;

  const updateStat = (value: number) => onUpdate({
    ...stats,
    [statKey]: {
      repeats: (stats[statKey]?.repeats ?? 0) + value,
      errors: stats[statKey]?.errors ?? 0,
    }
  });

  return <div>
    <button onClick={() => updateStat(-1)}>-</button>
    <span>{stats[statKey]?.repeats}</span>
    <button onClick={() => updateStat(1)}>+</button>
  </div>;
}