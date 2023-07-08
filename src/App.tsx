import { For, type Component, createSignal } from 'solid-js';
import styles from './App.module.css';
import Input from './components/Input/Input';
import Separator from './components/Separator/Separator';
import { useStore, updateInput, calculate } from './store/useStore';
import AgeDisplay from './components/AgeDisplay/AgeDisplay';
const App: Component = () => {
  const inputDates = useStore();
  const [years, setYears] = createSignal("--");
  const [months, setMonths] = createSignal("--");
  const [days, setDays] = createSignal("--");
  
  const clickHandler = () => {
    const {years, months, days } = calculate();
    setDays(days);
    setMonths(months);
    setYears(years);
  }
  const isDisabled = !inputDates[0].hasError && !inputDates[1].hasError && !inputDates[2].hasError;
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
        <Separator isDisabled={isDisabled} onClick={clickHandler} />
        <AgeDisplay years={years()} months={months()} days={days()} />
      </div>
    </main>
  );
};

export default App;
