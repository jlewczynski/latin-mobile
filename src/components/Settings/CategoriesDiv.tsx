import React from 'react';
import styles from './styles.module.css';

interface IProps extends React.PropsWithChildren<{}> {}

const CategoriesDiv: React.FC<IProps> = (props) => {
  const { children } = props;
  return <div className={styles.categories}>
    <div className={styles.categoryLabel}>Categories</div>
    <div className={styles.container}>
      {children}
    </div>
  </div>
}

export default CategoriesDiv;
