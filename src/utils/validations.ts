export function isNameValid(name: string) {
  return name.length >= 2 ? true : false;
}
export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}
export function isCityValid(city: string, options: string[]) {
  return options.some(
    (cityFromOptions: string) =>
      cityFromOptions.toLowerCase() === city.toLowerCase()
  );
}
export function isPhoneValid(phone: string) {
  return phone.length === 7;
}
//utility to check for falsity

// utility to force only numeric values in phoneInput
export const isNum = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
};
