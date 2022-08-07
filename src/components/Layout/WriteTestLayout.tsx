import React from 'react';
import BasicLayout from './BasicLayout';
import Stats from '../Stats';
import styles from './styles.module.css';
import cx from 'classnames';
import type { IWordStats, IWordStatsSet } from '../../models/WordStats';

interface IProps<T extends { word: string, mode?: string }, U> {
  word: T;
  nextWord: (correct: boolean) => void;
  empty: (template?: T) => T;
  validate: (template: T, answer: T) => U | null;
  wordStats: IWordStatsSet;
  onUpdateStats: (val: Record<string, IWordStats>) => void;
  settings?: React.ReactNode;
  children: (answer: T, onChange: (v: T) => void, errors?: U, hint?: T) => React.ReactNode;
}

function WriteTestLayout<T extends { word: string, mode?: string }, U>(props: IProps<T, U>) {
  const {
    word: template,
    nextWord,
    empty,
    validate,
    wordStats,
    onUpdateStats,
    settings,
    children,
  } = props;

  const updateWordStat = (word: string, val: Partial<IWordStats>, mode?: string) => {
    const key = `${word}${mode && ':' + mode}`;
    onUpdateStats({
      ...wordStats,
      [key]: {
        ...wordStats[key] ?? { repeats: 0, errors: 0 },
        ...val,
      }
    });
  }

  const [answer, setAnswer] = React.useState(() => empty(template));
  React.useEffect(() => setAnswer(empty(template)), [template.word, template.mode]);
  const [errorList, setErrorList] = React.useState<U>();
  const [showHint, setShowHint] = React.useState(false);

  const key = `${template.word}${template.mode && ':' + template.mode}`;
  const { repeats, errors } = wordStats[key] ?? { repeats: 0, errors: 0};

  const next = (correct: boolean) => {
    setAnswer(empty(template));
    setErrorList(undefined);
    nextWord(correct);
  }

  const check = () => {
    if (errorList) {
      next(false);
    } else {
      const result = validate(template, answer);
      if (result) {
        updateWordStat(template.word, { errors: errors + 1 }), template.mode;
        setErrorList(result);
      } else {
        updateWordStat(template.word, { repeats: repeats + 1 }, template.mode);
        next(true);
      }
    }
  }

  return (
    <BasicLayout
      settings={settings}
      footer={
        <button className={cx(styles.submit, errorList && styles.error)} disabled={showHint} onClick={check}>OK</button>
      }
      additionalActions={<>
        <button
          className={cx(styles.actionButton, styles.hint, showHint && styles.visible)}
          onClick={() => setShowHint(prev => !prev)}
        >
          ?
        </button>
        <button
          className={cx(styles.actionButton, styles.skip)}
          onClick={() => next(true)}
        >
          »
        </button>
      </>}
    >
      <Stats repeats={repeats} errors={errors} />
      {children(answer, setAnswer, errorList, showHint ? template : undefined)}
    </BasicLayout>);
}

export default WriteTestLayout;