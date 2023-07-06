export interface InputDate {
  type: InputType
  label: string;
  value: string;
  hasError: boolean;
  errorMessage: string;
  min: number;
  max: number;
  placeholder: string;
}

export enum InputType {
  Date,
  Month,
  Year
}