import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import RadixDropdown from "./RadixDropdown";

export type FormDropdownProps = {
  discriminatedType?: "form-dropdown";
  onChange?: (value: string) => void;
  getPresentedValue?: (value: string, label: string) => string;
} & React.ComponentProps<typeof RadixDropdown>;

function FormDropdown(props: FormDropdownProps) {
  const { control, formState } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => (
        <RadixDropdown
          getPresentedValue={props.getPresentedValue}
          {...field}
          {...props}
          onChange={(value) => {
            field.onChange(value);
            if (props.onChange) props.onChange(value);
          }}
        />
      )}
    />
  );
}

export type TFormDropdown = (props: FormDropdownProps) => JSX.Element;
export default FormDropdown;
