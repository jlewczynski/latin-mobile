import React from 'react';
import { IViewProps } from '..';
import ConjugactionSpeak from '../../components/Conjugaction/Speak';
import type { TConjugationMode } from '../../components/Conjugaction/Write';
import SpeakTestLayout from '../../components/Layout/SpeakTestLayout';
import { words } from '../../data/Conjugation';
import { modeLabel, testModes } from '../../models/Conjugation';
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
    <SpeakTestLayout<TConjugationMode>
      nextWord={nextWord}
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
          {allModes.map(mode => <div key={mode}>
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
      {(word) =>
        <ConjugactionSpeak word={word} />}
    </SpeakTestLayout>);
}

export default Conjugations;