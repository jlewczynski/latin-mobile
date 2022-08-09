import React from 'react';
import MainMenu, { MainMenuItem } from '../../components/MainMenu';
import styles from './styles.module.css';

const MainView: React.FC = () => {
  return <>
    <h1 className={styles.title}>Lingua Latina</h1>
    <MainMenu>
      <MainMenuItem link={'declination'} write speak>Deklinacja</MainMenuItem>
      <MainMenuItem link={'comparison'} write speak>Stopniowanie</MainMenuItem>
      <MainMenuItem link={'conjugation'} write speak>Koniugacja</MainMenuItem>
    </MainMenu>
  </>;
}

export default MainView;