import React from "react";
import { styled } from "~/design-system/stitches.config";

type ChevronProps = {
  dir: "left" | "right" | "up" | "down";
} & React.ComponentProps<typeof SVG>;

type ButtonProps =
  | {
      isButton: true;
      buttonProps?: React.ComponentProps<typeof Button>;
    }
  | { isButton?: false; buttonProps?: null };

function ChevronIcon({
  isButton = false,
  buttonProps,
  ...props
}: ChevronProps & ButtonProps) {
  return isButton ? (
    <Button {...buttonProps} type="button">
      <Icon {...props} />
    </Button>
  ) : (
    <Icon {...props} />
  );
}

function Icon({ dir = "left", ...props }: ChevronProps) {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      dir={dir}
      {...props}
    >
      <mask
        id="mask0_207_3612"
        style={{ maskType: "alpha" }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z"></path>
      </mask>
      <g mask="url(#mask0_207_3612)">
        <path
          fill="#111"
          d="M14 17.65L8.35 12 14 6.35l1.05 1.05-4.6 4.6 4.6 4.6L14 17.65z"
        ></path>
      </g>
    </SVG>
  );
}

export default ChevronIcon;

const SVG = styled("svg", {
  variants: {
    dir: {
      left: {},
      right: { transform: "rotateZ(180deg)" },
      up: { transform: "rotateZ(90deg)" },
      down: { transform: "rotateZ(-90deg)" },
    },
  },
});

const Button = styled("button", {
  padding: 0,
  lineHeight: 0,
  background: "transparent",
  border: "none",
  width: "max-content",
  height: "max-content",
  "&:hover, &:focus-visible": {
    path: {
      fill: "$primaryPurple500",
    },
  },
});
