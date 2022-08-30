import React from 'react';
import styles from './styles.module.css';
import cx from 'classnames';

interface IProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

const CheckBox: React.FC<IProps> = (props) => {
  const {label, value, onChange, className} = props;

  return <div className={cx(styles.checkbox, className)} onClick={() => onChange(!value)}>
    <input
      className={styles.input}
      type={'checkbox'}
      checked={value}
    />
    <span className={styles.label}>{label}</span>
  </div>
}

export default CheckBox;
