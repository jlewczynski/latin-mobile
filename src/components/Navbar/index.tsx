import React from 'react';
import styles from './styles.module.css';
import cx from 'classnames';

interface IProps {
  className?: string;
  settings?: React.ReactNode;
}

const Navbar: React.FC<IProps> = (props) => {
  const { className, settings } = props;
  const [settingsExpanded, setSettingsExpanded] = React.useState(false);

  const toggleSettings = () => {
    setSettingsExpanded(prev => Boolean(settings) && !prev);
  }

  return <div className={cx(styles.container, className)}>
    <a className={styles.back} href={'/'}>&lt;</a>
    <button
      className={styles.settings}
      onClick={toggleSettings}
    />
    {settings && settingsExpanded &&
      <div className={styles.settingsPanel}>
        {settings}
      </div>}
  </div>
}

export default Navbar;