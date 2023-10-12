import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { UserInformation, ValidatedValues } from "../types";
import { FunctionalForm } from "./FunctionalForm";
import {
  isEmailValid,
  isNameValid,
  isCityValid,
  isOnlyTrue,
  isPhoneValid,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState<UserInformation | null>(null);
  const validatedData: ValidatedValues = {
    isValFirstName: userData ? isNameValid(userData.firstName) : true,
    isValLastName: userData ? isNameValid(userData.lastName) : true,
    isValEmail: userData ? isEmailValid(userData.email) : true,
    isValCity: userData ? isCityValid(userData.city, allCities) : true,
    isValPhone: userData ? isPhoneValid(userData.phone) : true,
  };
  console.log("App Validated Data", validatedData);

  return (
    <>
      <h2>Functional</h2>
      {isOnlyTrue(validatedData) ? (
        <ProfileInformation userData={userData} />
      ) : null}

      <FunctionalForm
        userDataHandler={(pulledData) => {
          validatedData.isValFirstName = isNameValid(pulledData.firstName);
          validatedData.isValLastName = isNameValid(pulledData.lastName);
          setUserData(pulledData);
        }}
        validatedData={validatedData}
      />
    </>
  );
};
