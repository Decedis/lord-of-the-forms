import { ChangeEventHandler, Component, createRef } from "react";
import { isNum } from "../utils/validations";
import { ErrorMessage } from "../ErrorMessage";

export type PhoneInputState = [string, string, string, string];

type PropsClassForm = {
  phoneState: PhoneInputState;
  setPhoneState: (phone: PhoneInputState) => void;
  errorMessage: string;
  showCondition: boolean;
};

export class ClassPhoneInput extends Component<PropsClassForm> {
  render() {
    const { phoneState, setPhoneState, errorMessage, showCondition } =
      this.props;

    const refs = [
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
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
        const newState = phoneState.map((phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? e.target.value : phoneInput
        ) as PhoneInputState;
        //converts the resulting string to PhoneInputState
        //as PhoneInputState stops errors. Converts the outcome to the correct type.
        if (shouldGoToNextRef) {
          nextRef.current?.focus();
        }
        if (shouldGoToPrevRef) {
          prevRef.current?.focus();
        }

        setPhoneState(newState);
      };

    return (
      <>
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
                activeInputController(0)(e);
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
                activeInputController(3)(e);
              }}
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} show={showCondition} />
      </>
    );
  }
}
