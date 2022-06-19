import React from 'react';
import styles from './styles.module.css';
import cx from 'classnames';

interface IProps {
  className?: string;
  settings?: React.ReactNode;
  hintState?: boolean;
  onHint?: (visible: boolean) => void;
}

const Navbar: React.FC<IProps> = (props) => {
  const { className, settings, hintState, onHint } = props;
  const [settingsExpanded, setSettingsExpanded] = React.useState(false);

  const toggleSettings = () => {
    setSettingsExpanded(prev => Boolean(settings) && !prev);
  }

  const toggleHint = () => onHint && onHint(!hintState);

  return <div className={cx(styles.container, className)}>
    <a className={styles.back} href={'/'}>&lt;</a>
    {onHint &&
      <button
        className={cx(styles.hint, hintState && styles.visible)}
        onClick={toggleHint}
      >
        ?
      </button>}
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