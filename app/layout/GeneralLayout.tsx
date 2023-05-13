import { Box } from "@mantine/core";
import { useLocation } from "@remix-run/react";
import React from "react";
import { NavbarSimpleColored } from "./general/DoubleNavbar";
import BrowserOnly from "~/global-components/BrowserOnly";

const GeneralLayout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const pathName = location.pathname;

  const isRouteLoggedIn = routeHaveToBeLoggedIn.includes(pathName);

  return (
    <>
      {isRouteLoggedIn ? (
        <>
          <Box>{children}</Box>
        </>
      ) : (
        <BrowserOnly>
          <NavbarSimpleColored>
            <Box sx={{ width: "100%" }}>{children}</Box>
          </NavbarSimpleColored>
        </BrowserOnly>
      )}
    </>
  );
};

export default GeneralLayout;

const routeHaveToBeLoggedIn = ["/login", "/register"];
