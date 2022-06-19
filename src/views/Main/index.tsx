import React from 'react';
import MainMenu from '../../components/MainMenu';
import styles from './styles.module.css';

const MainView: React.FC = () => {
  return <>
    <h1 className={styles.title}>Lingua Latina</h1>
    <MainMenu>
      <MainMenu.Item link={'declination'}>Deklinacja</MainMenu.Item>
      <MainMenu.Item>Stopniowanie</MainMenu.Item>
      <MainMenu.Item>Koniugacja</MainMenu.Item>
      <MainMenu.Item>Liczebniki</MainMenu.Item>
    </MainMenu>
  </>;
}

export default MainView;