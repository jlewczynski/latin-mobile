import React from 'react';
import styles from './Header.module.css';
import cx from 'classnames';

interface IProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

const Header: React.FC<IProps> = (props) => {
  const { title, subtitle, className } = props;
  return <>
    <h2 className={cx(styles.header, className)}>{title}</h2>
    {subtitle && <h3 className={cx(styles.subHeader, className)}>{subtitle}</h3>}
  </>;
}

export default Header