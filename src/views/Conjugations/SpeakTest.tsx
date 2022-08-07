import React from 'react';
import { IViewProps } from '..';
import ConjugactionSpeak from '../../components/Conjugaction/Speak';
import type { TConjugationMode } from '../../components/Conjugaction/Write';
import SpeakTestLayout from '../../components/Layout/SpeakTestLayout';
import { modeLabel } from '../../models/Conjugation';
import { IPersistentState } from '../../utils/ViewsPersistentState';
import { allModes, IConfig, loadState, useWordList } from './StateUtils';

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

  const [word, correct, incorrect] = useWordList(state.config.random, state.config.modes);

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
      word={word}
      nextWord={(c) => c ? correct() : incorrect() }
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