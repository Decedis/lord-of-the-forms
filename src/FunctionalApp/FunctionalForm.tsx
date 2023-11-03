import { FormEvent, useState } from "react";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { UserInformation } from "../types";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type TFunctionalForm = {
  userDataHandler: (data: UserInformation) => void;
};

export const FunctionalForm = ({ userDataHandler }: TFunctionalForm) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [formPhone, setFormPhone] = useState<[string, string, string, string]>([
    "",
    "",
    "",
    "",
  ]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const phone: string = formPhone.join("");
  const formData: UserInformation = {
    firstName,
    lastName,
    email,
    city,
    phone,
  };
  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCity("");
    setFormPhone(["", "", "", ""]);
  };

  const handleUserData = (e: FormEvent) => {
    e.preventDefault();

    const isDataValid =
      isEmailValid(email) &&
      isCityValid(city, allCities) &&
      isNameValid(firstName) &&
      isNameValid(lastName) &&
      isPhoneValid(phone);

    if (!isDataValid) {
      setIsSubmitted(true);
      alert("Bad data input");
      return;
    }
    userDataHandler(formData);
    reset();
    setIsSubmitted(false);
  };

  return (
    <form onSubmit={handleUserData}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        labelText="First Name"
        inputProps={{
          placeholder: "Bilbo",
          value: firstName,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value);
          },
        }}
        errorMessage={firstNameErrorMessage}
        showCondition={!isNameValid(firstName) && isSubmitted}
      />

      {/* last name input */}
      <FunctionalTextInput
        labelText="Last Name"
        inputProps={{
          placeholder: "Baggins",
          value: lastName,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value);
          },
        }}
        errorMessage={lastNameErrorMessage}
        showCondition={!isNameValid(lastName) && isSubmitted}
      />

      {/* Email Input */}
      <FunctionalTextInput
        labelText="Email"
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: email,
          onChange: (e) => {
            setEmail(e.target.value);
          },
        }}
        errorMessage={emailErrorMessage}
        showCondition={!isEmailValid(email) && isSubmitted}
      />

      {/* City Input */}
      <FunctionalTextInput
        labelText="City"
        inputProps={{
          placeholder: "Hobbiton",
          value: city,
          list: "cities",
          onChange: (e) => {
            setCity(e.target.value);
          },
        }}
        errorMessage={cityErrorMessage}
        showCondition={!isCityValid(city, allCities) && isSubmitted}
      />

      <FunctionalPhoneInput
        phoneState={formPhone}
        setPhoneState={setFormPhone}
        errorMessage={phoneNumberErrorMessage}
        showCondition={!isPhoneValid(phone) && isSubmitted}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
