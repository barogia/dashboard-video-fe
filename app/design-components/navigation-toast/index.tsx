import React, { useEffect, useState } from "react";
import * as ToastRadix from "@radix-ui/react-toast";
import { keyframes, styled } from "~/design-system/stitches.config";
import { Spinner } from "@chakra-ui/react";
import { useLocation } from "@remix-run/react";
const NavigationToast = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setOpen(true);
    const timer = setTimeout(() => {
      setOpen(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ToastProvider swipeDirection="right">
      <ToastRoot open={open}>
        <ToastInformation>
          {/* <ButtonSpinner /> */}
          <Spinner w={25} h={25} />
          <ToastTitle>Navigating...</ToastTitle>
        </ToastInformation>
      </ToastRoot>
      <ToastViewPort />
    </ToastProvider>
  );
};

export default NavigationToast;

const ToastProvider = ToastRadix.Provider;

const VIEWPORT_PADDING = 25;

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const ToastInformation = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$x4",
  alignItems: "center",
});

const ToastRoot = styled(ToastRadix.Root, {
  backgroundColor: "$primaryGreen50",
  borderRadius: 6,
  boxShadow: "$popover",
  padding: "$x4",
  display: "flex",
  gap: "$x3",
  justifyContent: "flex-start",
  alignItems: "center",
  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${hide} 100ms ease-in`,
  },
  '&[data-swipe="move"]': {
    transform: "translateX(var(--radix-toast-swipe-move-x))",
  },
  '&[data-swipe="cancel"]': {
    transform: "translateX(0)",
    transition: "transform 200ms ease-out",
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },
  "> *:first-child": {
    flexShrink: 0,
  },
});
const ToastViewPort = styled(ToastRadix.Viewport, {
  position: "fixed",
  bottom: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
});

const ToastTitle = styled(ToastRadix.Title, {
  boldBody: "$16px",
  color: "$primaryGreen500",
});
