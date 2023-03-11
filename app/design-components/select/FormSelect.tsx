import { Controller, useFormContext } from "react-hook-form";

import RadixSelect from "./RadixSelect";
import type { SelectProps } from "./RadixSelect";
import { styled } from "~/design-system/stitches.config";

export type FormSelectProps = {
  discriminatedType?: "form-select";
  onChange?: (value: string) => void;
} & SelectProps;

function FormSelect({ onChange, ...props }: FormSelectProps) {
  const { control, formState } = useFormContext();

  const errMessage = formState.errors[props.name]?.[
    "message"
  ] as unknown as string;

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => (
        <>
          <RadixSelect
            onValueChange={(value) => {
              field.onChange(value);

              onChange?.(value);
            }}
            {...field}
            value={field.value}
            error={!!formState.errors[props.name]}
            {...props}
          />
          {errMessage ? <Error>{errMessage}</Error> : null}
        </>
      )}
    />
  );
}

export type TFormSelect = (props: FormSelectProps) => JSX.Element;
export default FormSelect;

const Error = styled("span", {
  regularBody: "$14px",
  color: "$red500",
  lineHeight: "1.5",
});
