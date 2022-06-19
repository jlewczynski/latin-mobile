import React from 'react';
import Navbar from '../Navbar';
import styles from './styles.module.css';

interface IProps {
  additionalActions?: React.ReactNode;
  settings?: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const { children, settings, footer, additionalActions } = props;
  return <div className={styles.container}>
    <Navbar
      className={styles.header}
      settings={settings}
      additional={additionalActions}
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