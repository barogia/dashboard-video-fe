import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { PopoverProps as DropdownRootProps } from "@radix-ui/react-popover";

//components
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { config, styled } from "~/design-system/stitches.config";
import RightArrow from "~/icon/RightArrow";
import BaseInput from "../input/BaseInput";
import SearchInput from "../input/SearchInput";
//others

export type DropdownProps = {
  options: { value: string; label: string }[];
  name: string;
  onChange?(value: string): void;
  value?: string;
  showNoData?: boolean;
  defaultValue?: string;
  getPresentedValue?: (value: string, label: string) => string;
  screenReaderForTrigger?: JSX.Element;
  dropdownIcon?: React.ReactNode;
  dropdownTriggerProps?: React.ComponentProps<typeof DropdownTriggerer>;
  dropdownContentProps?: React.ComponentProps<typeof DropdownContent>;
  dropdownRootProps?: DropdownRootProps;
} & Omit<React.ComponentProps<typeof BaseInput>, "onChange" | "value">;

// eslint-disable-next-line react/display-name
const RadixDropdown = forwardRef<HTMLInputElement, DropdownProps>(
  (
    {
      dropdownRootProps = {},
      dropdownTriggerProps = {},
      dropdownContentProps = {},
      options,
      value,
      name,
      showNoData = false,
      dropdownIcon,
      getPresentedValue,
      screenReaderForTrigger,
      onChange,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [, reRender] = useState<object>();
    const formMethods = useForm({
      defaultValues: {
        keyword: "",
      },
    });
    const { watch } = formMethods;
    const selectedText =
      options.find((opt) => opt.value === value)?.label || "";
    const filterdOptions = options.filter(
      (opt) =>
        watch("keyword") === "" ||
        opt.label
          .trim()
          .toLowerCase()
          .includes(watch("keyword").trim().toLowerCase())
    );
    const _handleOpenChange = useCallback(() => {
      if (open && value) {
        const activeElement = document.getElementById(value);
        if (activeElement) activeElement.scrollIntoView();
      }
    }, [open, value]);

    useEffect(() => {
      _handleOpenChange();
    }, [_handleOpenChange]);

    return (
      <Dropdown open={open} onOpenChange={setOpen} {...dropdownRootProps}>
        <DropdownTriggerer asChild {...dropdownTriggerProps}>
          <DropdownTriggererContent>
            <BaseInput
              tabIndex={-1}
              name={name}
              ref={ref}
              autoComplete="off"
              {...props}
              onChange={() => {}} //to ignore warning
              value={
                getPresentedValue
                  ? getPresentedValue(value || "", selectedText)
                  : selectedText
              }
              type="hidden"
            />
            <DropdownValue>
              {getPresentedValue
                ? getPresentedValue(value || "", selectedText)
                : selectedText}
            </DropdownValue>
            {screenReaderForTrigger}
            {dropdownIcon}
          </DropdownTriggererContent>
        </DropdownTriggerer>
        <DropdownPortal>
          <DropdownContent
            sideOffset={1}
            {...dropdownContentProps}
            ref={(ref) => {
              if (ref && ref.parentElement)
                ref.parentElement.style.zIndex =
                  config.theme.zIndices.dropdown.toString();
            }}
          >
            <FormProvider {...formMethods}>
              <FilterForm
                onSubmit={formMethods.handleSubmit(reRender)}
                autoComplete="off"
              >
                <SearchInput
                  placeholder="Type your keyword"
                  name="keyword"
                  css={{
                    button: {
                      flex: "0 1 32px",
                      padding: "$x2",
                    },
                  }}
                />
              </FilterForm>
              <DropdownOptions>
                {filterdOptions.length > 0 ? (
                  filterdOptions.map((opt) => (
                    <DropdownOption
                      key={opt.value + opt.label}
                      active={value === opt.value}
                      onClick={() => {
                        if (onChange) onChange(opt.value);
                        setOpen(false);
                      }}
                      id={opt.value}
                    >
                      <DropdownOptionText>{`${opt.label} `}</DropdownOptionText>
                      <DropdownOptionIndicator>
                        {/* <SlimCheckIcon
                        // color={config.theme.colors.primaryGreen500}
                        /> */}
                        <RightArrow />
                      </DropdownOptionIndicator>
                    </DropdownOption>
                  ))
                ) : showNoData ? (
                  <NoData>
                    {`Can’t find any matches for “${watch("keyword")}”`}
                  </NoData>
                ) : null}
              </DropdownOptions>
            </FormProvider>
          </DropdownContent>
        </DropdownPortal>
      </Dropdown>
    );
  }
);

export type TDropdown = typeof RadixDropdown;
export default RadixDropdown;

const Dropdown = PopoverPrimitive.Root;
const DropdownPortal = PopoverPrimitive.Portal;
const DropdownTriggerer = styled(PopoverPrimitive.Trigger, {
  position: "relative",
  border: "none",
  width: "100%",
});
const DropdownTriggererContent = styled("button", {
  color: "$black",
  svg: {
    position: "absolute",
    top: "50%",
    right: "$x2",
    transform: "translateY(-50%) rotate(-90deg)",
  },
});
const DropdownValue = styled("div", {
  backgroundColor: "$neutral50",
  border: "1px solid $neutral500",
  fontSize: "$16px",
  cursor: "pointer",
  maxWidth: "100%",
  width: "100%",
  height: "100%",
});
const DropdownContent = styled(PopoverPrimitive.Content, {
  display: "flex",
  flexDirection: "column",
  borderRadius: "2px",
  border: "1px solid $neutral500",
  py: "$x3",
  color: "$black",
  "& > *": {
    width: "100%",
  },
  "& > *:nth-child(2)": {
    marginTop: "$x3",
  },
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    slideUpAnimationFor: '&[data-state="open"][data-side="bottom"]',
  },
});
const FilterForm = styled("form", {
  px: "$x2",

  "& div input": {
    padding: "$x1 $x3",
    lineHeight: "24px",
  },

  "& div button": {
    flexBasis: "32px",
    svg: {
      size: "16px",
    },
  },
});
const DropdownOptionIndicator = styled("div", {
  marginLeft: "auto",
  display: "none",
  path: {
    fill: "$green500",
  },
  width: 25,
});
const DropdownOptionText = styled("span", {
  regularBody: "$14px",
  lineHeight: "21px",
  letterSpacing: "0.02em",
});
const DropdownOptions = styled("div", {
  maxHeight: "331px",
  overflowY: "scroll",
});
const DropdownOption = styled("button", {
  padding: "$x2 $x3",
  backgroundColor: "$white",
  border: "none",
  transition: "all linear 0.2s",
  display: "flex",
  alignItems: "center",
  width: "100%",
  color: "$black",

  variants: {
    active: {
      true: {
        [`${DropdownOptionText}`]: {
          fontWeight: "$bold",
        },

        backgroundColor: "$primaryGreen50",

        [`${DropdownOptionIndicator}`]: {
          display: "block",
        },
      },
    },
  },

  "&:hover": {
    backgroundColor: "$primaryGreen50",
  },
});
const NoData = styled("div", {
  width: "100%",
  height: "100%",
  flexJustifyAndAlign: "center",
  flexDirection: "column",
  regularBody: "$16px",

  svg: {
    marginBottom: "40px",
  },
});
