import { splitProps, type Component } from 'solid-js';
import styles from './Input.module.css';

interface InputProps {
  hasError: boolean;
  min: number,
  max: number,
  errorMessage: string;
  onBlur: (value: string) => void,
  label: string;
  placeholder: string;
  style?: any;
}

const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ["label", "onBlur", "hasError", "errorMessage", "min", "max", "placeholder"]);
  return (
    <label class={styles['custom-label']} {...others}>
      {local.label}
      <input onBlur={(e) => local.onBlur(e.target.value)} type="number" min={local.min} max={local.max} placeholder={local.placeholder} />
      {local.hasError && <span>{local.errorMessage}</span> }
    </label>
  );
}

export default Input;