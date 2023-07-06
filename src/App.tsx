import { For, type Component } from 'solid-js';
import styles from './App.module.css';
import Input from './components/Input/Input';
import Separator from './components/Separator/Separator';
import { useStore, updateInput } from './store/useStore';
const App: Component = () => {
  const inputDates = useStore();
  return (
    <main class={styles.App}>
      <div class={styles.container}>
        <div class={styles["input-container"]}>
          <For each={[...inputDates]}>
            {(item) => 
              <Input
                placeholder={item.placeholder}
                hasError={item.hasError} 
                errorMessage={item.errorMessage} 
                onBlur={(value) => updateInput(value, item.type)} 
                label={item.label}
                min={item.min}
                max={item.max}
              />
            }
          </For>
        </div>
        <Separator isDisabled={false} />
      </div>
    </main>
  );
};

export default App;
