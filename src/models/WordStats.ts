export interface IWordStats {
  repeats: number;
  errors: number;
}

export type IWordStatsSet = Record<string, IWordStats>;