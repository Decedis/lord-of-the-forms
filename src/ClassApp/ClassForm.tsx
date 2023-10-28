import { Component, FormEvent } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation } from "../types";
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
    const handleUserData = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const isDataValid =
        isEmailValid(this.state.email) &&
        isCityValid(this.state.city, allCities) &&
        isNameValid(this.state.firstName) &&
        isNameValid(this.state.lastName) &&
        isPhoneValid(phone);
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
        <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input
            placeholder="Bilbo"
            value={this.state.firstName}
            onChange={(e) => {
              this.setState({ firstName: e.target.value });
            }}
          />
        </div>
        <ErrorMessage
          message={firstNameErrorMessage}
          show={!isNameValid(this.state.firstName) && this.state.isSubmitted}
        />

        {/* last name input */}
        <div className="input-wrap">
          <label>{"Last Name"}:</label>
          <input
            placeholder="Baggins"
            value={this.state.lastName}
            onChange={(e) => {
              this.setState({ lastName: e.target.value });
            }}
          />
        </div>
        <ErrorMessage
          message={lastNameErrorMessage}
          show={!isNameValid(this.state.lastName) && this.state.isSubmitted}
        />

        {/* Email Input */}
        <div className="input-wrap">
          <label>{"Email"}:</label>
          <input
            placeholder="bilbo-baggins@adventurehobbits.net"
            value={this.state.email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
        </div>
        <ErrorMessage
          message={emailErrorMessage}
          show={!isEmailValid(this.state.email) && this.state.isSubmitted}
        />

        {/* City Input */}
        <div className="input-wrap">
          <label>{"City"}:</label>
          <input
            placeholder="Hobbiton"
            value={this.state.city}
            list="cities"
            onChange={(e) => {
              this.setState({ city: e.target.value });
            }}
          />
        </div>
        <ErrorMessage
          message={cityErrorMessage}
          show={
            !isCityValid(this.state.city, allCities) && this.state.isSubmitted
          }
        />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input type="text" id="phone-input-1" placeholder="55" />
            -
            <input type="text" id="phone-input-2" placeholder="55" />
            -
            <input type="text" id="phone-input-3" placeholder="55" />
            -
            <input type="text" id="phone-input-4" placeholder="5" />
          </div>
        </div>

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={!isPhoneValid(phone) && this.state.isSubmitted}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
