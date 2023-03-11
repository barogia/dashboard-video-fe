import type { PropertyValue } from "@stitches/react";

export default {
  fontSizes: {
    "2px": "calc(2rem / 16)",
    "3px": "calc(3rem / 16)",
    // sizes above is for fixing font error
    "10px": "calc(10rem / 16)",
    "12px": "calc(12rem / 16)",
    "13px": "calc(13rem / 16)",
    "14px": "calc(14rem / 16)",
    "16px": "calc(16rem / 16)",
    "17px": "calc(17rem / 16)",
    "18px": "calc(18rem / 16)",
    "19px": "calc(19rem / 16)",
    "20px": "calc(20rem / 16)",
    "22px": "calc(22rem / 16)",
    "24px": "calc(24rem / 16)",
    "28px": "calc(28rem / 16)",
    "36px": "calc(36rem / 16)",
    "38px": "calc(38rem / 16)",
    "51px": "calc(51rem / 16)",
    "128px": "calc(128rem / 16)",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    ultraBold: 800,
  },
  lineHeights: {
    "16px": "calc(16rem / 16)",
    "18px": "calc(18rem / 16)",
    "20px": "calc(20rem / 16)",
    "21px": "calc(21rem / 16)",
    "23px": "calc(23rem / 16)",
    "24px": "calc(24rem / 16)",
    "27px": "calc(27rem / 16)",
    "28px": "calc(28rem / 16)",
    "30px": "calc(30rem / 16)",
    "32px": "calc(32rem / 16)",
    "34px": "calc(34rem / 16)",
    "37px": "calc(37rem / 16)",
    "47px": "calc(47rem / 16)",
    "50px": "calc(50rem / 16)",
    "51px": "calc(51rem / 16)",
    "68px": "calc(68rem / 16)",
    "100px": "calc(100rem / 16)",
  },
  letterSpacings: {},
  fonts: {
    headerFont: '"Poppins", sans-serif',
    bodyFont: '"Poppins", sans-serif',
    // bodyFont: 'Inter, sans-serif',
  },
};

type Font = {
  ff?: PropertyValue<"fontFamily">;
  fw?: PropertyValue<"fontWeight">;
  fs?: PropertyValue<"fontSize">;
};
export const typoUtils = {
  fonts: ({ ff, fw, fs }: Font) => ({
    fontFamily: ff,
    fontWeight: fw,
    fontSize: fs,
  }),
  boldHeader: (size: PropertyValue<"fontSize">) => ({
    fontFamily: "$headerFont",
    fontWeight: "$bold",
    color: "$text2",
    fontSize: size,
  }),
  semiBoldHeader: (size: PropertyValue<"fontSize">) => ({
    fontFamily: "$headerFont",
    fontWeight: "$semiBold",
    color: "$text2",
    fontSize: size,
  }),
  boldBody: (size: PropertyValue<"fontSize">) => ({
    fontFamily: "$bodyFont",
    fontWeight: "$bold",
    color: "$text2",
    letterSpacing: "0.02em",
    fontSize: size,
  }),
  mediumBody: (size: PropertyValue<"fontSize">) => ({
    fontFamily: "$bodyFont",
    fontWeight: "$medium",
    color: "$text2",
    letterSpacing: "0.02em",
    fontSize: size,
  }),
  regularBody: (size: PropertyValue<"fontSize">) => ({
    fontFamily: "$bodyFont",
    fontWeight: "$regular",
    color: "$text2",
    letterSpacing: "0.02em",
    fontSize: size,
  }),
  lightBody: (size: PropertyValue<"fontSize">) => ({
    fontFamily: "$bodyFont",
    fontWeight: "$light",
    color: "$text2",
    letterSpacing: "0.02em",
    fontSize: size,
  }),
};

export const globalTypo = {
  "@font-face": [
    {
      "font-family": "Gotham",
      "font-style": "normal",
      "font-weight": 300,
      "font-display": "swap",
      src: `url("/fonts/GothamNarrow-Light.woff2") format("woff2")`,
      // src: `url("./fonts/GothamNarrow-Light.woff2") format("woff2"),
      //       url("./fonts/GothamNarrow-Light.otf")`,
    },
    {
      "font-family": "Gotham",
      "font-style": "normal",
      "font-weight": 400, //325 - regular
      "font-display": "swap",
      src: `url("/fonts/GothamNarrow-Book.woff2") format("woff2")`,
      // src: `url("./fonts/GothamNarrow-Book.woff2") format("woff2"),
      //       url("./fonts/GothamNarrow-Book.otf")`,
    },
    {
      "font-family": "Gotham",
      "font-style": "normal",
      "font-weight": 500, //350 - Medium
      "font-display": "swap",
      src: `url("/fonts/GothamNarrow-Medium.woff2") format("woff2")`,
      // src: `url("./fonts/GothamNarrow-Medium.woff2") format("woff2"),
      //       url("./fonts/GothamNarrow-Medium.otf")`,
    },
    {
      "font-family": "Gotham",
      "font-style": "normal",
      "font-weight": 700, //400 - bold
      "font-display": "swap",
      src: `url("/fonts/GothamNarrow-Bold.woff2") format("woff2")`,
      // src: `url("./fonts/GothamNarrow-bold.woff2") format("woff2"),
      //       url("./fonts/GothamNarrow-Bold.otf")`,
    },
    {
      "font-family": '"Playfair Display"',
      "font-style": "normal",
      "font-weight": 700,
      "font-display": "swap",
      src: `url("/fonts/Playfair-Bold.woff2") format("woff2")`,
    },
    {
      "font-family": '"Playfair Display"',
      "font-style": "normal",
      "font-weight": 600,
      "font-display": "swap",
      src: `url("/fonts/Playfair-SemiBold.woff2") format("woff2")`,
    },
    {
      "font-family": '"Playfair Display"',
      "font-style": "normal",
      "font-weight": 400,
      "font-display": "swap",
      src: `url("/fonts/Playfair-Regular.woff2") format("woff2")`,
      // 'ascent-override': '70%',
      // 'descent-override': '20%',
      // 'line-gap-override': '2%',
    },
  ],

  body: {
    fontFamily: "Gotham",
  },

  [`input, textarea, select`]: {
    fontSize: "$16px",
    "&::placeholder": {
      color: "#7c7c7c",
    },
  },
  label: { fontSize: "$16px" },
};
