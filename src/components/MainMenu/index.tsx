import React, { PropsWithChildren } from "react";
import styles from './styles.module.css';
import cx from 'classnames';

const MainMenu: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  return <div className={styles.container}>
    {children}
  </div>
};

const modes = [ 'write', 'speak' ] as const;
type Mode = typeof modes[number];

interface IMenuItemProps extends Record<Mode, boolean | undefined> {
  link?: string;
  disabled?: boolean;
}

export const MainMenuItem: React.FC<PropsWithChildren<IMenuItemProps>> = (props) => {
  const { link, disabled, children, ...modes } = props;
  const url = `?view=${link ?? ''}`;

  if (Object.values(modes).filter(v => !!v).length === 0) {
    return <a
      className={cx(styles.button, disabled && styles.disabled)}
      href={disabled ? '' : url}
    >
      {children}
    </a>;
  }

  return <div className={styles.item}>
    <div className={styles.label}>{children}</div>
    <div className={styles.modes}>
      {Object.keys(modes).map(mode => modes[mode as Mode] &&
        <ModeButton key={mode} link={url} mode={mode as Mode} disabled={disabled} />)}
    </div>
  </div>;
}

MainMenuItem.defaultProps = {
  link: '',
  ...(modes.reduce((rec, mode) => ({ ...rec, [mode]: true }), {} as Partial<Record<Mode, true>>)),
  disabled: false,
}

interface IModeButtonProps {
  link: string;
  mode: Mode;
  disabled?: boolean;
}

const icons: Record<Mode, string> = {
  write: '✏',
  speak: '🗣',
}

const ModeButton: React.FC<IModeButtonProps> = (props) => {
  const { link, mode, disabled } = props;
  const url = `${link}&mode=${mode}`;

  return <a className={styles.button} href={disabled ? '' : url}>{icons[mode]}</a>
}

export default MainMenu;