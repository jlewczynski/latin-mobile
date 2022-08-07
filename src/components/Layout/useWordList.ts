import React from 'react';

export function useGenericWordList<T>(random: boolean, newSet: () => T[]): [T, (c: boolean) => void, () => void, () => void] {
  const [wordList, setWordList] = React.useState<T[]>(newSet);

  React.useEffect(() => {
    setWordList(newSet());
  }, [newSet]);

  const next = (val: T[]): T[] => {
    if (random) {
      const index = Math.floor(Math.random() * val.length);
      return [val[index], ...val.slice(0, index), ...val.slice(index+1)];
    }
    return val;
  };

  const correct = () => setWordList(prev => {
    if (prev.length === 1) {
      return next(newSet());
    }
    return next(prev.slice(1));
  });

  const incorrect = () => setWordList(prev => {
    if (prev.length === 1) {
      return prev;
    }
    const [first, ...rest] = prev;
    return [...next(rest), first];
  });

  const nextWord = (isCorrect: boolean) => isCorrect ? correct() : incorrect();

  return [
    wordList[0],
    nextWord,
    correct,
    incorrect,
  ]
}