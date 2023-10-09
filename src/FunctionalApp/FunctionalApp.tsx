import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { UserInformation } from "../types";
import { FunctionalForm } from "./FunctionalForm";
// import {
//   isEmailValid,
//   isNameValid,
//   isCityValid,
//   containsFalse,
//   isPhoneValid,
// } from "../utils/validations";
// import { allCities } from "../utils/all-cities";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState<UserInformation | null>(null);
  // const [isValFirstName, setIsValFirstName] = useState<boolean>(false);
  // const [isValLastName, setIsValLastName] = useState<boolean>(false);
  // const [isValEmail, setIsValEmail] = useState<boolean>(false);
  // const [isValCity, setValIsCity] = useState<boolean>(false);
  // const [isValPhone, setIsValPhone] = useState<boolean>(false);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        userData={userData} //TODO this is broken
      />
      <FunctionalForm
        userDataHandler={(pulledData) => {
          // setIsValEmail(!isEmailValid(pulledData.email));
          // setIsValFirstName(!isNameValid(pulledData.firstName));
          // setIsValLastName(!isNameValid(pulledData.lastName));
          // setValIsCity(!isCityValid(pulledData.city, allCities));
          // setIsValPhone(!isPhoneValid(pulledData.phone));
          setUserData(pulledData); //TODO this might be broken
        }}
      />
    </>
  );
};
