import React from 'react';
import BasicLayout from './BasicLayout';
import Stats from '../Stats';
import styles from './styles.module.css';
import cx from 'classnames';
import type { IWordStats, IWordStatsSet } from '../../models/WordStats';

interface IProps<T extends { word: string, mode?: string }, U> {
  nextWord: () => T;
  empty: (template?: T) => T;
  validate: (template: T, answer: T) => U | null;
  wordStats: IWordStatsSet;
  onUpdateStats: (val: Record<string, IWordStats>) => void;
  settings?: React.ReactNode;
  children: (answer: T, onChange: (v: T) => void, errors?: U, hint?: T) => React.ReactNode;
}

function WriteTestLayout<T extends { word: string, mode?: string }, U>(props: IProps<T, U>) {
  const {
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

  const [template, setTemplate] = React.useState(() => nextWord());
  const [answer, setAnswer] = React.useState(() => empty(template));
  const [errorList, setErrorList] = React.useState<U>();
  const [showHint, setShowHint] = React.useState(false);

  const key = `${template.word}${template.mode && ':' + template.mode}`;
  const { repeats, errors } = wordStats[key] ?? { repeats: 0, errors: 0};

  const next = () => {
    const next = nextWord();

    setTemplate(next);
    setAnswer(empty(next));
    setErrorList(undefined);
  }

  const check = () => {
    if (errorList) {
      next();
    } else {
      const result = validate(template, answer);
      if (result) {
        updateWordStat(template.word, { errors: errors + 1 }), template.mode;
        setErrorList(result);
      } else {
        updateWordStat(template.word, { repeats: repeats + 1 }, template.mode);
        next();
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
          onClick={() => next()}
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