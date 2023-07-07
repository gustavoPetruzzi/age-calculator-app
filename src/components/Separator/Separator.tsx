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
      <div class={styles.button} onClick={props.onClick}></div>
    </div>
  )
}

export default Separator