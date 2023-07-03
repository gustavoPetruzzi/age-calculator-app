import { createStore, produce } from "solid-js/store";
import { InputDate, InputType } from "./InputDate";

const [inputDates, setInputDates] = createStore<InputDate[]>([
  {
    value: "",
    type: InputType.Date,
    label: "Date",
    hasError: false,
    errorMessage: "",
    min: 1,
    max: 31,
  },
  {
    value: "",
    type: InputType.Month,
    label: "Month",
    hasError: false,
    errorMessage: "",
    min: 1,
    max: 12
  },
  {
    value: "",
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