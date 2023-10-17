//import { useState } from "react";
import { ChangeEventHandler, useRef, useState } from "react";
import { isNum } from "../utils/validations";

export type PhoneInputState = [string, string, string, string];
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

  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const ref0 = refs[0];
  const ref1 = refs[1];
  const ref2 = refs[2];
  const ref3 = refs[3];
  const activeInputController =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;
      const shouldGoToNextRef =
        currentMaxLength === value.length && nextRef?.current;
      const shouldGoToPrevRef = value.length === 0;
      const newState = phone.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? e.target.value : phoneInput
      ) as PhoneInputState; //converts the resulting string to PhoneInputState
      //as PhoneInputState stops errors. Converts the outcome to the correct type.
      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }
      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }
      setPhone(newState);
    };
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
          value={phoneState[0]}
          maxLength={2}
          ref={ref0}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 0);
            //activeInputController(0)(e);
          }}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          placeholder="55"
          value={phoneState[1]}
          maxLength={2}
          ref={ref1}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 1);
            activeInputController(1)(e);
          }}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          placeholder="55"
          value={phoneState[2]}
          maxLength={2}
          ref={ref2}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 2);
            activeInputController(2)(e);
          }}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          placeholder="5"
          value={phoneState[3]}
          maxLength={1}
          ref={ref3}
          onKeyDown={(e) => isNum(e)}
          onChange={(e) => {
            handleInput(e, 3);
            activeInputController(3)(e);
          }}
        />
      </div>
    </div>
  );
};
