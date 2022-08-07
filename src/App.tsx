import React from 'react';
import { getComponent, views } from './views';
import styles from './App.module.css';

const App: React.FC = () => {
  const search = new URLSearchParams(window.location.search);
  const view = search.get('view') ?? '';
  const mode = search.get('mode');
  const Component = getComponent(view, mode);

  const [localState, setLocalState] = React.useState<string | undefined>(() => (localStorage.getItem(view) || undefined));

  React.useEffect(() => {
    const callback = (event: StorageEvent) => {
      if (event.storageArea !== localStorage || event.key !== view) {
        return;
      }
      setLocalState(event.newValue || undefined);
    }
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  }, []);

  const updateStats = (val: string) => {
    localStorage.setItem(view, val);
    setLocalState(val);
  }

  return <div className={styles.app}>
    {Component && <Component persistentState={localState} updatePersistentState={updateStats} />}
  </div>;
}

export default App;