import React from 'react';
import Navbar from '../Navbar';
import styles from './styles.module.css';

interface IProps {
  settings?: React.ReactNode;
  button?: React.ReactNode;
}

const Layout: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const { children, settings, button } = props;
  return <div className={styles.container}>
    <Navbar
      className={styles.header}
      settings={settings}
    />
    <div className={styles.body}>
      {children}
    </div>
    {button && <div className={styles.footer}>
      {button}
    </div>}
  </div>
}

export default Layout;