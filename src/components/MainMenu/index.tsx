import React, { PropsWithChildren } from "react";
import styles from './styles.module.css';
import cx from 'classnames';

const MainMenu: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  return <div className={styles.container}>
    {children}
  </div>
};

interface IMenuItemProps {
  link?: string;
  mode?: string;
  disabled?: boolean;
}

export const MainMenuItem: React.FC<PropsWithChildren<IMenuItemProps>> = (props) => {
  const { link, mode, disabled, children } = props;
  const queries = [];
  if (link) {
    queries.push(`view=${link}`);
  }
  if (mode) {
    queries.push(`mode=${mode}`);
  }

  return <a
    className={cx(styles.button, disabled && styles.disabled)}
    href={queries.length ? `?${queries.join('&')}` : '#'}
  >
    {children}
  </a>
}

MainMenuItem.defaultProps = {
  link: '',
  disabled: false,
}

export default MainMenu;