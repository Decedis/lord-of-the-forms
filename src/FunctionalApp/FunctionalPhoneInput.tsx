//import { useState } from "react";
import { isNum } from "../utils/validations";
export const FunctionalPhoneInput = ({
  phoneState,
  handlePhone,
}: {
  phoneState: string[];
  handlePhone: (phone: string[]) => void; //was phone: string[]
}) => {
  // TODO useRef to make phone interactive
  // need state here

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    phoneState[index] = e.target.value;
    handlePhone(phoneState);
  };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input
          type="text"
          id="phone-input-1"
          placeholder="55"
          maxLength={2}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 0);
          }}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          placeholder="55"
          maxLength={2}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 1);
          }}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          placeholder="55"
          maxLength={2}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 2);
          }}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          placeholder="5"
          maxLength={1}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 3);
          }}
        />
      </div>
    </div>
  );
};
