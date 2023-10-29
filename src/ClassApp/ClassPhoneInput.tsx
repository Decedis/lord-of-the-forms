import { ChangeEventHandler, Component, createRef } from "react";
import { isNum } from "../utils/validations";

export type PhoneInputState = [string, string, string, string];

type TClassForm = {
  phoneState: [string, string, string, string];
  handlePhone: (phone: [string, string, string, string]) => void;
};
type State = {
  phone: [string, string, string, string];
};
export class ClassPhoneInput extends Component<TClassForm, State> {
  state: State = {
    phone: ["", "", "", ""],
  };

  render() {
    const { phoneState, handlePhone } = this.props;
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
        const newState = this.state.phone.map((phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? e.target.value : phoneInput
        ) as PhoneInputState; //converts the resulting string to PhoneInputState
        //as PhoneInputState stops errors. Converts the outcome to the correct type.
        if (shouldGoToNextRef) {
          nextRef.current?.focus();
        }
        if (shouldGoToPrevRef) {
          prevRef.current?.focus();
        }
        this.setState({ phone: newState });
      };
    const handleInput = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const updatedPhone: [string, string, string, string] = [
        ...this.state.phone,
      ];
      updatedPhone[index] = e.target.value; //was phoneState
      handlePhone(updatedPhone);
      this.setState({ phone: updatedPhone });
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
  }
}
