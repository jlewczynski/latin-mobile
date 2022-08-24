import React from 'react';
import styles from './Header.module.css';
import cx from 'classnames';

const Header = (props: React.HTMLProps<HTMLHeadingElement>) => {
  const { className,  children,...rest} = props;
  return <h2 className={cx(styles.header, className)} {...rest}>{children}</h2>;
}

export default Header