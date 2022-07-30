import React from 'react';
import MainMenu from '../../components/MainMenu';
import styles from './styles.module.css';

const MainView: React.FC = () => {
  return <>
    <h1 className={styles.title}>Lingua Latina</h1>
    <MainMenu>
      <MainMenu.Item link={'declination'} mode={'write'}>Deklinacja (pisanie)</MainMenu.Item>
      <MainMenu.Item link={'declination'} mode={'speak'}>Deklinacja (mówienie)</MainMenu.Item>
      <MainMenu.Item link={'comparison'}>Stopniowanie</MainMenu.Item>
      <MainMenu.Item link={'conjugation'} mode={'write'}>Koniugacja (pisanie)</MainMenu.Item>
      <MainMenu.Item link={'conjugation'} mode={'speak'}>Koniugacja (mówienie)</MainMenu.Item>
      <MainMenu.Item>Liczebniki</MainMenu.Item>
    </MainMenu>
  </>;
}

export default MainView;