import React from 'react';
import BasicLayout from './BasicLayout';
import Stats from '../Stats';
import styles from './styles.module.css';
import cx from 'classnames';
import type { IWordStats, IWordStatsSet } from '../../models/WordStats';

interface IProps<T extends { word: string }> {
  nextWord: () => T;
  wordStats: IWordStatsSet;
  onUpdateStats: (val: Record<string, IWordStats>) => void;
  settings?: React.ReactNode;
  children: (word: T) => React.ReactNode;
}

function SpeakTestLayout<T extends { word: string }>(props: IProps<T>) {
  const {
    nextWord,
    wordStats,
    onUpdateStats,
    settings,
    children,
  } = props;

  const updateWordStat = (word: string, val: Partial<IWordStats>) =>
    onUpdateStats({
      ...wordStats,
      [word]: {
        ...wordStats[word] ?? { repeats: 0, errors: 0 },
        ...val,
      }
    });

  const [word, setWord] = React.useState(() => nextWord());

  const { repeats, errors } = wordStats[word.word] ?? { repeats: 0, errors: 0};

  const next = () => {
    const next = nextWord();

    setWord(next);
  }

  const click = (correct: boolean) => {
    if (correct) {
      updateWordStat(word.word, { repeats: repeats + 1 });
    } else {
      updateWordStat(word.word, { errors: errors + 1 });
    }
    next();
  };

  return (
    <BasicLayout
      settings={settings}
      footer={<>
        <button className={cx(styles.submit)} onClick={() => click(true)}>Poprawne</button>
        <button className={cx(styles.submit, styles.error)} onClick={() => click(false)}>Niepoprawne</button>
      </>}
      additionalActions={<>
        <button
          className={cx(styles.actionButton, styles.skip)}
          onClick={() => next()}
        >
          »
        </button>
      </>}
    >
      <Stats repeats={repeats} errors={errors} />
      {children(word)}
    </BasicLayout>);
}

export default SpeakTestLayout;