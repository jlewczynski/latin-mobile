import React from 'react';
import styles from './styles.module.css';

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

const StatsUpdater: React.FC<IProps> = (props) => {
  const { value, onChange } = props;

  const update = (v: number) => {
    if (v >= 0) {
      onChange(v);
    }
  }

  return <div className={styles.statUpdater}>
    <button className={styles.updaterButton} onClick={() => update(value - 1)}>-</button>
    <span className={styles.updaterValue}>{value}</span>
    <button className={styles.updaterButton} onClick={() => update(value + 1)}>+</button>
  </div>;
}

export default StatsUpdater;
