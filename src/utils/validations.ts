import { ValidatedValues } from "../types";

export function isNameValid(name: string) {
  return name.length >= 2 ? true : false;
}
export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}
export function isCityValid(city: string, options: string[]) {
  return options.includes(city);
}
export function isPhoneValid(phone: string) {
  return phone.length === 7;
}
//utility to check for falsity
export const isOnlyTrue = (obj: ValidatedValues) => {
  let result;
  for (const key in obj) {
    if (obj[key] === false) {
      return (result = false);
    } else {
      result = true;
    }
  }
  return result;
};
// utility to force only numeric values in phoneInput
export const isNum = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
};
