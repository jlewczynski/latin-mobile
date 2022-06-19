import React from 'react';
import { views } from './views';
import styles from './App.module.css';

const App: React.FC = () => {
  const search = new URLSearchParams(window.location.search);
  const view = search.get('view') ?? '';
  const Component = views[view];

  return <div className={styles.app}>
    {Component && <Component />}
  </div>;
}

export default App;