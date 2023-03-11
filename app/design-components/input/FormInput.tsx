import { useReducer } from "react";
import { useFormContext } from "react-hook-form";

import BaseInput from "./BaseInput";

import type { StyledCompProps } from "~/design-system/stitches.config";
import { styled } from "~/design-system/stitches.config";
import ShowPassword from "~/icon/show-password";

export type FormInputProps = {
  discriminatedType?: "form-input";
  formInputProps?: StyledCompProps<typeof InputWrapper>;
} & React.ComponentProps<typeof BaseInput>;

function FormInput({ formInputProps = {}, ...props }: FormInputProps) {
  const [showPassword, toggleShowPassword] = useReducer((oldS) => !oldS, false);
  const { register, formState } = useFormContext();
  const { onChange, onBlur, ref } = register(props.name);

  const errMessage = formState.errors[props.name]?.[
    "message"
  ] as unknown as string;

  return (
    <InputWrapper {...formInputProps}>
      <BaseInput
        onChange={onChange}
        ref={ref}
        onBlur={onBlur}
        {...props}
        type={showPassword ? "text" : props.type}
        error={!!formState.errors[props.name]}
      />
      {props.type === "password" && (
        <ShowPassIcon onClick={toggleShowPassword} show={showPassword} />
      )}
      {errMessage ? <Error>{errMessage}</Error> : null}
    </InputWrapper>
  );
}

export type TFormInput = (props: FormInputProps) => JSX.Element;
export default FormInput;

const InputWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  position: "relative",
  alignItems: "center",
  input: {
    flex: "1 0 100%",
  },
});

const Error = styled("p", {
  regularBody: "$14px",
  color: "$red500",
  lineHeight: "1.5",
});

const ShowPassIcon = styled(ShowPassword, {
  position: "absolute",
  right: "16px",
  cursor: "pointer",
});
