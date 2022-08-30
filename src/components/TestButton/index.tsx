import React from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

interface ITestButtonProps {
  name: string;
  value: string;
  render?: any;
}

const TestButton: React.FC<ITestButtonProps> = (props) => {
  const {name, value, render} = props;
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(false);
  }, [name, value, render]);

  return (
  <button
    className={cx(styles.testButton, visible && styles.shown)}
    onClick={() => setVisible(true)}
  >
    {!visible && name}
    {visible && value}
  </button>);
}
export default TestButton;