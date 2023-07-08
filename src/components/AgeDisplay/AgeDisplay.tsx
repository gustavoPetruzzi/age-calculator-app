import { createSignal, type Component } from 'solid-js';
import { InputDate, InputType } from '../../store/InputDate';
import TimeDisplay from '../TimeDisplay/TimeDisplay';

interface AgeDisplayProps {
  years: string;
  months: string;
  days: string;
}

const AgeDisplay: Component<AgeDisplayProps> = (props) => {
  return (
    <>
      <TimeDisplay value={props.days} type={InputType.Year} />
      <TimeDisplay value={props.months} type={InputType.Month} />
      <TimeDisplay value={props.years} type={InputType.Date} />
    </>  
  )
} 

export default AgeDisplay;