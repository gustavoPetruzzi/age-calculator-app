import { Component } from 'solid-js';
import styles from './Separator.module.css';

const Separator: Component<{isDisabled: boolean}> = (props) => {
  return (
    <div class={styles.container}>
      <div class={styles.separator}></div>
      <div class={styles.button}></div>
    </div>
  )
}

export default Separator