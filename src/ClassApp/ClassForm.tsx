import { Component, FormEvent } from "react";
import { UserInformation } from "../types";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassTextInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type TClassForm = {
  userInformationHandler: (data: UserInformation) => void;
};
type State = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  formPhone: [string, string, string, string];
  isSubmitted: boolean;
};

export class ClassForm extends Component<TClassForm, State> {
  state: State = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    formPhone: ["", "", "", ""],
    isSubmitted: false,
  };

  render() {
    const phone: string = this.state.formPhone.join("");
    const { userInformationHandler } = this.props;
    const formData: UserInformation = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      city: this.state.city,
      phone,
    };
    const { firstName, lastName, email, city, formPhone, isSubmitted } =
      this.state;

    const reset = () => {
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        formPhone: ["", "", "", ""],
        isSubmitted: false,
      });
    };
    const isDataValid =
      isEmailValid(this.state.email) &&
      isCityValid(this.state.city, allCities) &&
      isNameValid(this.state.firstName) &&
      isNameValid(this.state.lastName) &&
      isPhoneValid(phone);
    const handleUserData = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isDataValid) {
        userInformationHandler(formData);
        reset();
        this.setState({ isSubmitted: false });
      } else {
        this.setState({ isSubmitted: true });
        alert("Bad data input");
      }
    };

    return (
      <form onSubmit={handleUserData}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          labelText="First Name"
          inputProps={{
            placeholder: "Bilbo",
            value: firstName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ firstName: e.target.value });
            },
          }}
          errorMessage={firstNameErrorMessage}
          showCondition={!isNameValid(firstName) && isSubmitted}
        />

        {/* last name input */}
        <ClassTextInput
          labelText="Last Name"
          inputProps={{
            placeholder: "Baggins",
            value: lastName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ lastName: e.target.value });
            },
          }}
          errorMessage={lastNameErrorMessage}
          showCondition={!isNameValid(lastName) && isSubmitted}
        />

        {/* Email Input */}
        <ClassTextInput
          labelText="Email"
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: email,
            onChange: (e) => {
              this.setState({ email: e.target.value });
            },
          }}
          errorMessage={emailErrorMessage}
          showCondition={!isEmailValid(email) && isSubmitted}
        />

        {/* City Input */}
        <ClassTextInput
          labelText="City"
          inputProps={{
            placeholder: "Hobbiton",
            value: city,
            list: "cities",
            onChange: (e) => {
              this.setState({ city: e.target.value });
            },
          }}
          errorMessage={cityErrorMessage}
          showCondition={!isCityValid(city, allCities) && isSubmitted}
        />

        <ClassPhoneInput
          phoneState={formPhone}
          setPhoneState={(phone) => this.setState({ formPhone: phone })}
          errorMessage={phoneNumberErrorMessage}
          showCondition={!isPhoneValid(phone) && isSubmitted}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
