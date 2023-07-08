import type { Component } from 'solid-js';
import styles from './TimeDisplay.module.css';
import { InputType } from '../../store/InputDate';

interface TimeDisplayProps {
	value: string;
	type: InputType;
}

const getLabelByType = (type: InputType) => {
	const labelByType = {
		[InputType.Date]: 'days',
		[InputType.Month]: 'months',
		[InputType.Year]: 'years'
	}

	return labelByType[type];
}

const TimeDisplay: Component<TimeDisplayProps> = (props) => {
	return (
		<div class={styles['time-display']}>
			<span class={styles.value}> {props.value} </span>
			<span class={styles.label}> {getLabelByType(props.type)} </span>
		</div>
	);
}

export default TimeDisplay;