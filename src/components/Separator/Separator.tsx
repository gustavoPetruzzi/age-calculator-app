import type { Component } from 'solid-js';
import styles from './Separator.module.css';

interface SeparatorProps {
  isDisabled: boolean;
  onClick: () => void;
}

const Separator: Component<SeparatorProps> = (props) => {
  return (
    <div class={styles.container}>
      <div class={styles.separator}></div>
      <button disabled={props.isDisabled} class={styles.button} onClick={props.onClick}></button>
    </div>
  )
}

export default Separator