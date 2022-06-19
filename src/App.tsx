import React from 'react';
import { views } from './views';
import styles from './App.module.css';

const App: React.FC = () => {
  const search = new URLSearchParams(window.location.search);
  const view = search.get('view') ?? '';
  const Component = views[view];

  const [localState, setLocalState] = React.useState<Record<string, string>>({});
  const updateStats = (val: string) => {
    setLocalState(prev => ({
      ...prev,
      [view]: val
    }));
  }

  return <div className={styles.app}>
    {Component && <Component persistentState={localState[view]} updatePersistentState={updateStats} />}
  </div>;
}

export default App;