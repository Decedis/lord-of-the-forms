export type UserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};
export type ValidatedValues = {
  [key: string]: boolean;
  isValFirstName: boolean;
  isValLastName: boolean;
  isValEmail: boolean;
  isValCity: boolean;
  isValPhone: boolean;
};
