import { ComponentProps } from "react";
import { ErrorMessage } from "../ErrorMessage";

export function FunctionalTextInput({
  labelText,
  inputProps,
  errorMessage,
  showCondition,
}: {
  labelText: string;
  inputProps: ComponentProps<"input">;
  errorMessage: string;
  showCondition: boolean;
}) {
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
