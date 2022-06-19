import React from 'react';
import Navbar from '../Navbar';
import styles from './styles.module.css';

interface IProps {
  settings?: React.ReactNode;
  footer?: React.ReactNode;
  hintState?: boolean;
  onHint?: (visible: boolean) => void;
}

const Layout: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const { children, settings, footer, hintState, onHint } = props;
  return <div className={styles.container}>
    <Navbar
      className={styles.header}
      settings={settings}
      hintState={hintState}
      onHint={onHint}
    />
    <div className={styles.body}>
      {children}
    </div>
    {footer && <div className={styles.footer}>
      {footer}
    </div>}
  </div>
}

export default Layout;