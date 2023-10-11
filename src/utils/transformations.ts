export const capitalize = (input: string): string => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  let result = "";
  for (let i = 0; i < input.length; i++) {
    if (i === 0) {
      result += input[i].toLocaleUpperCase();
    } else {
      result += input[i].toLocaleLowerCase();
    }
  }
  return result;
};

export const formatPhoneNumber = (input: string): string => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  let result = "";
  for (let i = 0; i < input.length; i++) {
    result += input[i];
    if (i === 1 || i === 3 || i === 5) {
      result += "-";
    }
  }
  return result;
};
