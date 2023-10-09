//import { useState } from "react";
import { useState } from "react";
import { isNum } from "../utils/validations";
export const FunctionalPhoneInput = ({
  phoneState,
  handlePhone,
}: {
  phoneState: [string, string, string, string];
  handlePhone: (phone: [string, string, string, string]) => void; //was phone: string[]
}) => {
  // TODO useRef to make phone interactive

  const [phone, setPhone] =
    useState<[string, string, string, string]>(phoneState);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedPhone: [string, string, string, string] = [...phone];
    updatedPhone[index] = e.target.value; //was phoneState
    handlePhone(updatedPhone);
    setPhone(updatedPhone);
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
          value={phoneState[0]}
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
          value={phoneState[1]}
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
          value={phoneState[2]}
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
          value={phoneState[3]}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 3);
          }}
        />
      </div>
    </div>
  );
};
