import React, { useEffect, useRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { SelectProps as SelectRootProps } from "@radix-ui/react-select";
//components
// import BaseInput from '_@shared/components/input/BaseInput';
//others
import type { StyledCompProps } from "~/design-system/stitches.config";
import { styled } from "~/design-system/stitches.config";
import CheckedIcon from "~/icon/checked";
import ChevronIcon from "~/icon/chevron";

export type SelectProps = {
  options: { value: string; label: string }[];
  name: string;
  id?: string;
  placeholder?: string;
  value?: string;
  showedValue?:
    | string
    | JSX.Element
    | ((value?: string, label?: string) => string | JSX.Element);
  error?: boolean;
  defaultValue?: string;
  screenReaderForTrigger?: JSX.Element;
  selectIcon?: React.ReactNode;
  ariaLabel?: string;
  selectTriggerProps?: StyledCompProps<typeof SelectTrigger>;
  selectItemStyle?: StyledCompProps<typeof SelectItem>;
} & SelectRootProps;

// eslint-disable-next-line react/display-name
const RadixSelect = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      selectTriggerProps = {},
      selectItemStyle = {},
      options,
      error,
      id,
      placeholder = "select",
      selectIcon,
      showedValue,
      ariaLabel,
      screenReaderForTrigger,
      ...props
    },
    ref
  ) => {
    const refInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!refInput.current) return;

      refInput.current.value = props.value || "";
    }, [props.value]);

    return (
      <Select {...props} value={props.value || undefined}>
        <SelectTrigger
          id={id}
          error={error}
          ref={ref}
          {...selectTriggerProps}
          aria-label={ariaLabel}
        >
          <SelectValue placeholder={placeholder}>
            {typeof showedValue === "function"
              ? showedValue(
                  props.value,
                  options.find((opt) => opt.value === props.value)?.label
                )
              : showedValue}
          </SelectValue>
          <input type="hidden" name={props.name} />

          {screenReaderForTrigger}

          <SelectIcon>{selectIcon || <ChevronIcon dir="down" />}</SelectIcon>
        </SelectTrigger>

        <SelectPrimitive.Portal>
          <SelectContent>
            <SelectScrollUpButton>
              <ChevronIcon dir="up" />
            </SelectScrollUpButton>

            <SelectViewport>
              {options.map((option) => (
                <SelectItem
                  {...selectItemStyle}
                  key={option.value}
                  value={option.value}
                  textValue={option.label}
                >
                  <SelectItemText>{option.label}</SelectItemText>

                  <SelectItemIndicator>
                    <CheckedIcon />
                  </SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectViewport>

            <SelectScrollDownButton>
              <ChevronIcon dir="down" />
            </SelectScrollDownButton>
          </SelectContent>
        </SelectPrimitive.Portal>
      </Select>
    );
  }
);

export type TRadixSelect = typeof RadixSelect;
export default RadixSelect;

const Select = SelectPrimitive.Root;

const SelectIcon = styled(SelectPrimitive.Icon, {
  position: "absolute",
  top: "50%",
  right: "$x3",
  transform: "translateY(-50%)",
  flexJustifyAndAlign: "center",
});

const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  display: "flex",
  flexBasis: "100%",
  regularBody: "$16px",
  background: "$background",
  border: "none",
  flexJustifyAndAlign: "space-between center",
  px: "$x3",
  py: "$x3",
  solidBorder: "$neutral500",
  position: "relative",
  "span:first-of-type": {
    paddingRight: "24px",
    textAlign: "left",
    minHeight: "1.5rem",
  },
  "&[data-placeholder]": { color: "$neutral600" },

  "&:focus-visible": {
    outline: "$primary2Green auto 1px",
    "outline-offset": "0.5px",
    "box-shadow": "$focusedInput",
  },

  // '> span:first-child': { minHeight: '19px' },

  variants: {
    error: {
      true: {
        solidBorder: "$red500",
      },
    },
    selectMode: {
      dropdown: {
        width: "min-content",
        [`${SelectIcon}`]: {
          right: 0,
        },
        "& .gov-base-input": {
          border: "none",
          background: "transparent",
          padding: 0,
        },
      },
      notDisplay: {
        display: "none",
      },
    },
  },
});
const SelectContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  background: "$white",
  backgroundColor: "white",
  borderRadius: 4,
  zIndex: "$dropdown",
  boxShadow: "$popover",
  solidBorder: "$neutral500",
  slideUpAnimationFor: '&[data-state="open"]',
});
const SelectItem = styled(SelectPrimitive.Item, {
  py: "$x2",
  px: "$x3",
  display: "flex",
  flexJustifyAndAlign: "flex-start center",
  background: "$white",
  cursor: "pointer",
  regularBody: "$14px",
  lineHeight: "1.5",
  maxWidth: "calc(100vw - $space$sitePadding*2)",

  "&:focus:not(:focus-visible)": {
    outline: "none",
  },
  "&:hover , &:focus-visible": {
    background: "$neutral100",
    outline: "none",
  },
  "&[data-state='checked']": {
    fontWeight: "$bold",
    background: "$primaryGreen50",
  },
});
const SelectViewport = styled(SelectPrimitive.Viewport, {});
const SelectItemText = styled(SelectPrimitive.ItemText, {});
// const SelectLabel = styled(SelectPrimitive.Label, {});
const SelectScrollUpButton = styled(SelectPrimitive.ScrollUpButton, {
  flexJustifyAndAlign: "center",
});
const SelectScrollDownButton = styled(SelectPrimitive.ScrollDownButton, {
  flexJustifyAndAlign: "center",
});
const SelectItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: "absolute",
  right: 12,
  width: 25,
  display: "inline-flex",
  flexJustifyAndAlign: "center",
  path: {
    fill: "$green500",
  },
});

const SelectValue = styled(SelectPrimitive.Value, {});
