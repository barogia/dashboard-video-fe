import type { StyledCompProps } from "~/design-system/stitches.config";
import { styled } from "~/design-system/stitches.config";

function CheckedIcon(props: StyledCompProps<typeof SVG>) {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="9"
      fill="none"
      viewBox="0 0 12 9"
      {...props}
    >
      <path
        fill="#fff"
        d="M5.105 8.158l-.018.018-4.4-4.4L2.12 2.343l2.985 2.985L9.879.554l1.433 1.433-6.19 6.189-.017-.018z"
      ></path>
    </SVG>
  );
}

export default CheckedIcon;

const SVG = styled("svg", {});
