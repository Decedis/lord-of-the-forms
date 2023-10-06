import { FormEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation, ValidatedValues } from "../types";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import {
  isEmailValid,
  containsFalse,
  isNameValid,
  isCityValid,
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

  validatedValues: ValidatedValues;
};

export const FunctionalForm = ({
  userDataHandler,
  validatedValues,
}: TFunctionalForm) => {
  // TODO in the object, phone data has to be a string of arrays.
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const tempPhone: string[] = [];
  const formData: UserInformation = { firstName, lastName, email, city, phone };
  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCity("");
    setPhone("");
  };

  const handleUserData = (e: FormEvent) => {
    e.preventDefault();
    userDataHandler(formData);
    containsFalse(validatedValues) ? reset() : null;
  };

  return (
    <form onSubmit={handleUserData}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input
          placeholder="Bilbo"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <ErrorMessage
        message={firstNameErrorMessage}
        show={validatedValues.isValFirstName && !isNameValid(firstName)}
      />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          placeholder="Baggins"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={validatedValues.isValLastName && !isNameValid(lastName)}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <ErrorMessage
        message={emailErrorMessage}
        show={validatedValues.isValEmail && !isEmailValid(email)}
      />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          placeholder="Hobbiton"
          value={city}
          list="cities"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <ErrorMessage
        message={cityErrorMessage}
        show={validatedValues.isValCity && !isCityValid(city, allCities)}
      />

      <FunctionalPhoneInput
        phoneState={tempPhone}
        handlePhone={(phone) => {
          const newPhone = phone.join("");
          newPhone.length === 7 ? setPhone(newPhone) : null;
        }}
      />

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={validatedValues.isValPhone && !isPhoneValid(phone)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
