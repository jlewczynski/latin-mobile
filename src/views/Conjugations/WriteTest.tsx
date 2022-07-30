import React from 'react';
import { IViewProps } from '..';
import ConjugactionWrite, { TConjugationMode } from '../../components/Conjugaction/Write';
import WriteTestLayout from '../../components/Layout/WriteTestLayout';
import { words } from '../../data/Conjugation';
import { empty, modeLabel, TErrorList, testModes, validate } from '../../models/Conjugation';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import { allModes, IConfig, loadState } from './StateUtils';

interface IProps extends IViewProps {
}

const Conjugations: React.FC<IProps> = (props) => {
  const { persistentState, updatePersistentState: updateStats } = props;
  const state = loadState(persistentState);

  const doUpdate = (newState: Partial<IPersistentState<IConfig>>) => {
    updateStats(JSON.stringify({
      ...state,
      ...newState,
    }));
  }
  const updateConfig = (val: Partial<IConfig>) =>
    doUpdate({config: { ...state.config, ...val }});

  const wordSet = React.useRef<TConjugationMode[]>([]);

  React.useEffect(() => {
    wordSet.current = words.flatMap(w =>
      testModes(w)
      .filter(m => state.config.modes.includes(m))
      .map(mode => ({...w, mode})));
  }, [state.config.modes.join(' ')]);

  const nextWord = (): TConjugationMode => {
    if (!wordSet.current.length) {
      wordSet.current = words.flatMap(w =>
        testModes(w)
        .filter(m => state.config.modes.includes(m))
        .map(mode => ({...w, mode})));
    }
    if (state.config.random) {
      const index = Math.floor(Math.random() * wordSet.current.length);
      return wordSet.current.splice(index, 1)[0];
    } else {
      return wordSet.current.shift()!;
    }
  };

  const toggleMode = (mode: string, checked: boolean) => {
    let modes;
    if (checked) {
      modes = [
        ...state.config.modes,
        mode,
      ];
    } else {
      modes = state.config.modes.filter(m => m !== mode);
    }
    updateConfig({ modes });
  }

  return (
    <WriteTestLayout<TConjugationMode, TErrorList>
      nextWord={nextWord}
      empty={t => ({ ...empty(t), mode: t?.mode ?? '' })}
      validate={(t, a) => validate(t, a, a.mode)}
      wordStats={state.wordStats}
      onUpdateStats={stats => doUpdate({wordStats: stats})}
      settings={<>
        <label>
          Random
          <input
            type='checkbox'
            checked={state.config.random}
            onChange={e => updateConfig({ random: e.target.checked })}
          />
        </label>
        <div>
          <div>Tenses</div>
          {allModes.map(mode => <div>
            <input
              type={'checkbox'}
              key={mode}
              checked={state.config.modes.includes(mode)}
              onChange={e => toggleMode(mode, e.target.checked)}
            />
            <span>{modeLabel(mode)}</span>
          </div>)}
        </div>
      </>}
    >
      {(answer, setAnswer, errorList, hint) =>
        <ConjugactionWrite word={answer} onChange={setAnswer} errors={errorList} hint={hint} />}
    </WriteTestLayout>);
}

export default Conjugations;