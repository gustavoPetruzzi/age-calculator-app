import { createStore, produce } from "solid-js/store";
import { InputDate, InputType } from "./InputDate";
import { createSignal } from "solid-js";


const today = new Date();
const monthsLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const [isDisabled, setIsDisabled] = createSignal(true);

const [inputDates, setInputDates] = createStore<InputDate[]>([
  {
    value: "",
    placeholder: "DD",
    type: InputType.Date,
    label: "Date",
    hasError: false,
    errorMessage: "",
    min: 1,
    max: 31,
  },
  {
    value: "",
    placeholder: "MM",
    type: InputType.Month,
    label: "Month",
    hasError: false,
    errorMessage: "",
    min: 1,
    max: 12
  },
  {
    value: "",
    placeholder: "YYYY",
    type: InputType.Year,
    label: "Year",
    hasError: false,
    errorMessage: "",
    min: 1900,
    max: 2023
  },

]);
export const useStore = () => {
  return inputDates;
}

export const updateInput = (value: string, type: InputType) => {
  const date = getInputByType(InputType.Date);
  const month = getInputByType(InputType.Month);
  const year = getInputByType(InputType.Year);

  const updateActions = {
    [InputType.Date]: () => {
      if (validateMinMax(value, date.min, date.max) && validateDate(value, month.value, year.value)) {
        setInputDates(
          produce(s => {
            s[type].errorMessage = "";
            s[type].hasError = false;
            s[type].value = value;
          })
        );
      } else {
        setInputDates(
          produce(s => {
            s[type].errorMessage = "Must be a valid day";
            s[type].hasError = true;
          })
        );
      }
    },
    [InputType.Month]: () => {
      if (validateMinMax(value, month.min, month.max) && validateDate(date.value, value, year.value)) {
        setInputDates(
          produce(s => {
            s[type].errorMessage = "";
            s[type].hasError = false;
            s[type].value = value;
          })
        );    
      } else {
        setInputDates(
          produce(s => {
            s[type].errorMessage = "Must be a valid Month";
            s[type].hasError = true;
          })
        );
      }
    },
    [InputType.Year]: () => {
      if (validateMinMax(value, year.min, year.max) && validateDate(date.value, month.value, value)) {
        setInputDates(
          produce(s => {
            s[type].errorMessage = "";
            s[type].hasError = false;
            s[type].value = value;
          })
        );
      } else {
        setInputDates(
          produce(s => {
            s[type].errorMessage = "Must be a valid year";
            s[type].hasError = true;
          })
        );
      }
    }
  }

  const func = updateActions[type];
  if (func) {
    func();
    isButtonDisabled();
  }
}

const isButtonDisabled = () => {
  const dateIsValid = !inputDates[0].hasError && inputDates[0].value.length > 0;
  const monthIsValid = !inputDates[1].hasError && inputDates[1].value.length > 0;
  const yearIsValid = !inputDates[2].hasError && inputDates[2].value.length > 0;
  const isValid = dateIsValid && monthIsValid && yearIsValid;

  setIsDisabled(!isValid);
}

export const calculate = (): { years: string, months: string, days: string } => {
  let date = today.getDate();
  let month = 1 + today.getMonth();
  let year = today.getFullYear();

  let inputDate = inputDates.find(input => input.type === InputType.Date);
  let inputMonth = inputDates.find(input => input.type === InputType.Month);
  let inputYear = inputDates.find(input => input.type === InputType.Year);
  
  if (+inputDate!.value > date) {
    date = date + monthsLength[month - 1];
    month = month -1;
  }

  if (+inputMonth!.value > month) {
    month = month + 12;
    year = year - 1;
  }

  const days = date - +inputDate!.value;
  const months = month - +inputMonth!.value;
  const years = year - +inputYear!.value;

  return {
    years: years.toString(),
    months: months.toString(),
    days: days.toString()
  }
}

const getInputByType = (type: InputType): InputDate => {
  return (inputDates.find(input => input.type === type))!;
}


const validateMinMax = (value: string, min: number, max: number): boolean => {
  if (+value < min || +value > max ) {
    return false;
  }
  return true;
}
const validateDate = (date: string, month: string, year: string): boolean => {

  if (month!.length > 0 && year!.length > 0) {
    const lastDay = getLastDayMonth(+month!, +year!);
    if (+date! > lastDay) {
      return false;
    }
    return true;
  }
  return true;
} 

const getLastDayMonth = (month: number, year: number) => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}