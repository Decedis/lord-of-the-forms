import { FormEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation, ValidatedValues } from "../types";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isOnlyTrue,
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

    if (isDataValid) {
      userDataHandler(formData);
      reset();
    }
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
        show={!isNameValid(firstName)} //the show condition can be simplified into a single value.
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
        show={!isNameValid(lastName)}
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

      <ErrorMessage message={emailErrorMessage} show={!isEmailValid(email)} />

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
        show={!isCityValid(city, allCities)}
      />

      <FunctionalPhoneInput
        phoneState={formPhone}
        handlePhone={(phone) => {
          setFormPhone(phone);
        }}
      />

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={!isPhoneValid(phone)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
