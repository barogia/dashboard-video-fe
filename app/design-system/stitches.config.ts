import { createStitches } from "@stitches/react";
import type { VariantProps } from "@stitches/react";
import { reset, utilityClass, commonStyle } from "./stitches.global";
import typography, { typoUtils, globalTypo } from "./stitches.typography";
import sizes, { globalSizes } from "./stitches.sizes";
import color from "./stitches.color";
import utils from "./stitches.utils";
import { buttonUtils } from "./stitches.button.utils";
import type * as Stitches from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    ...color,
    ...sizes,
    ...typography,
    shadows: {
      popover:
        "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
      focusedInput: "0px 0px 0px 2px rgba(148, 64, 156, 0.1)",
      button: "box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.05)",
    },
    zIndices: {
      headers: 100,
      modal: 200,
      popover: 300,
      dropdown: 400,
    },
  },
  media: {
    mobile: "(max-width: 550px)",
    tabletAndBelow: "(max-width: 1100px)",
    laptopAndBelow: "(max-width: 1450px)",
    //--------------
    tabletAndAbove: "(min-width: 551px)",
    laptopAndAbove: "(min-width: 1101px)",
    desktop: "(min-width: 1451px)",
    //--------------
    tablet: "(min-width: 551px) and (max-width: 1100px)",
    notTablet: "(max-width: 550px), (min-width: 1101px)",
    //--------------
    "1300AndAbove": "(min-width: 1301px)",
    "1300AndBelow": "(max-width: 1300px)",
  },
  utils: {
    ...utils,
    ...typoUtils,
    ...buttonUtils,
  },
});

export const darkTheme = createTheme({
  colors: {},
});

export const globalStyle = globalCss({
  ...reset,
  ...commonStyle,
  ...utilityClass,
  ...globalTypo,
  ...globalSizes,
});

export type CSS = Stitches.CSS<typeof config>;
export type StyledCompProps<
  T extends { [key: string]: any; [key: symbol]: any }
> = VariantProps<T> & {
  css?: CSS;
  className?: string;
};
