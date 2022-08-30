import React from 'react';
import StatsUpdater from '../../components/Settings/StatsUpdater';
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
      repeats: value,
      errors: stats[statKey]?.errors ?? 0,
    }
  });

  return <StatsUpdater value={stats[statKey]?.repeats || 0} onChange={updateStat} />;
}