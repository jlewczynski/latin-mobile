import React from 'react';
import { capitalize } from '../../utils';
import styles from './styles.module.css';

interface IProps {
  header: string;
}

const Section: React.FC<React.PropsWithChildren<IProps>> = ({header, children}) => {
  return <div className={styles.section}>
    <h3>{capitalize(header)}</h3>
    <div className={styles.buttonList}>
      {children}
    </div>
  </div>;
};

export default Section;