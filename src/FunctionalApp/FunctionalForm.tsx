import { FormEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation, initialUserData } from "../types";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type TFunctionalForm = {
  dataHandler: (data: UserInformation) => void;
};

export const FunctionalForm = ({ dataHandler }: TFunctionalForm) => {
  const [formData, setFormData] = useState<UserInformation>(initialUserData);
  //propertyHandler updates formData state on change
  const propertyHandler = (
    property: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevProp) => ({ ...prevProp, [property]: e.target.value }));
  };
  //handlerUserData submits form data to parent component
  const handlerUserData = (e: FormEvent) => {
    e.preventDefault();
    dataHandler(formData);
    setFormData(initialUserData);
  };
  return (
    <form onSubmit={handlerUserData}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input
          placeholder="Bilbo"
          value={formData.firstName}
          onChange={(e) => propertyHandler("firstName", e)}
        />
      </div>
      <ErrorMessage message={firstNameErrorMessage} show={true} />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          placeholder="Baggins"
          value={formData.lastName}
          onChange={(e) => propertyHandler("lastName", e)}
        />
      </div>
      <ErrorMessage message={lastNameErrorMessage} show={true} />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={formData.email}
          onChange={(e) => propertyHandler("email", e)}
        />
      </div>
      <ErrorMessage message={emailErrorMessage} show={true} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          placeholder="Hobbiton"
          value={formData.city}
          list="cities"
          onChange={(e) => propertyHandler("city", e)}
        />
      </div>
      <ErrorMessage message={cityErrorMessage} show={true} />

      <FunctionalPhoneInput />

      <ErrorMessage message={phoneNumberErrorMessage} show={true} />

      <input type="submit" value="Submit" />
    </form>
  );
};
