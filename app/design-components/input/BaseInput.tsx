import React from "react";
import type { StyledCompProps } from "~/design-system/stitches.config";
import { styled } from "~/design-system/stitches.config";

export type BaseInputProps = {
  name: string;
  focusOnMount?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  StyledCompProps<typeof Input>;

//Export type allow FormItem to check type without import a whole component

// eslint-disable-next-line react/display-name
const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className = "", focusOnMount, ...props }, ref) => {
    return (
      <Input
        className={`${className} gov-base-input`}
        {...props}
        ref={(inputRef) => {
          if (!inputRef || !ref) return;
          if (focusOnMount) inputRef.focus();
          if (typeof ref === "function") ref(inputRef);
          else ref.current = inputRef;
        }}
      />
    );
  }
);

BaseInput.toString = () => ".gov-base-input";
export type TBaseInput = typeof BaseInput;
export default BaseInput;

const Input = styled("input", {
  regularBody: "$14px",
  padding: "$x2",
  backgroundColor: "$background",
  solidBorder: "$neutral500",
  borderRadius: "2px",
  textAlign: "left",
  backgroundImage:
    "-webkit-gradient(linear, 0% 0%, 0% 100%, from(hsla(0,0%,100%,0)), to(hsla(0,0%,100%,0)))",
  "&:focus:not(:focus-visible)": { outline: "none" },
  "&:disabled": {
    solidBorder: "$neutral500 !important",
    color: "$neutral700 !important",
    "-webkit-text-fill-color": "$colors$neutral700 !important",
    opacity: 1,
    background: "$neutral100 !important",
    cursor: "not-allowed",
  },
  "&::placeholder": {
    fontWeight: "400",
    color: "$neutral600",
  },
  "&:focus-visible": {
    outline: "$primary2Green auto 1px",
  },

  variants: {
    error: {
      true: {
        solidBorder: "$red500",
        "&:focus-visible": { outline: "red" },
      },
    },
  },
});
