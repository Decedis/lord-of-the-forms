import { Component, ComponentProps } from "react";
import { ErrorMessage } from "../ErrorMessage";

type ClassTextInputProps = {
  labelText: string;
  inputProps: ComponentProps<"input">;
  errorMessage: string;
  showCondition: boolean;
};
export class ClassTextInput extends Component<ClassTextInputProps> {
  render() {
    const { labelText, inputProps, errorMessage, showCondition } = this.props;

    return (
      <>
        <div className="input-wrap">
          <label htmlFor="name">{labelText}:</label>
          <input type="text" {...inputProps} />
        </div>
        <ErrorMessage message={errorMessage} show={showCondition} />
      </>
    );
  }
}
