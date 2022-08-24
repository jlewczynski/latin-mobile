import React, { MutableRefObject } from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

interface IItemBase {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
}

export interface IItem extends IItemBase {
  index: number;
}

interface IProps {
  inputRefs: MutableRefObject<HTMLInputElement[]>;
  children: IItem[]
}


const TestInputs = (props: IProps) => {
  const { inputRefs, children } = props;
  return <div className={styles.declination} style={{ gridTemplateRows: `repeat(${children.length}, var(--row-height))` }}>
    {children.map(item => {
      const { index, ...props} = item;
      return <Item
      key={index}
      ref={element => element && (inputRefs.current.push(element))}
      {...props}
      onFocusNext={() => {
        const next = inputRefs.current[index];
        next && next.focus();
      }}
    />
    })}
</div>
}

interface IItemProps extends IItemBase {
  onFocusNext?: () => void;
}

const Item = React.forwardRef<HTMLInputElement, IItemProps>((props, ref) => {
  const { name, value, onChange, disabled, error, onFocusNext, hint } = props;
  return <>
    <span className={cx(styles.cell, styles.title)}>{name}</span>
    {hint === undefined &&
      <input
        ref={ref}
        type='text'
        disabled={disabled}
        className={cx(styles.cell, styles.input, error && styles.error)}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onFocusNext && (e => (e.key === 'Enter') && onFocusNext())}
      />
    }
    {hint !== undefined &&
      <span className={cx(styles.cell, styles.hint)}>{hint || '-'}</span>
    }
  </>
});

export default TestInputs;