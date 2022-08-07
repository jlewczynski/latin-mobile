import React from 'react';
import MainMenu, { MainMenuItem } from '../../components/MainMenu';
import styles from './styles.module.css';

const MainView: React.FC = () => {
  return <>
    <h1 className={styles.title}>Lingua Latina</h1>
    <MainMenu>
      <MainMenuItem link={'declination'} mode={'write'}>Deklinacja (pisanie)</MainMenuItem>
      <MainMenuItem link={'declination'} mode={'speak'}>Deklinacja (mówienie)</MainMenuItem>
      <MainMenuItem link={'comparison'}>Stopniowanie</MainMenuItem>
      <MainMenuItem link={'conjugation'} mode={'write'}>Koniugacja (pisanie)</MainMenuItem>
      <MainMenuItem link={'conjugation'} mode={'speak'}>Koniugacja (mówienie)</MainMenuItem>
      <MainMenuItem>Liczebniki</MainMenuItem>
    </MainMenu>
  </>;
}

export default MainView;