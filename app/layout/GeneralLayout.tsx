import { Box } from "@mantine/core";
import { useLocation } from "@remix-run/react";
import React from "react";
import { NavbarSimpleColored } from "./general/DoubleNavbar";
import BrowserOnly from "~/global-components/BrowserOnly";

const GeneralLayout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const pathName = location.pathname;

  const isRouteLoggedIn = routeHaveToBeLoggedIn.includes(pathName);

  const renderTitle = () => {
    return routes.find((route) => route.route === pathName)?.title;
  };

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

const routeHaveToBeLoggedIn = ["/login"];

const routes = [
  {
    route: "/",
    title: "Trang chu",
  },
  {
    route: "/camera",
    title: "Quản lí Video",
  },
  {
    route: "/warning",
    title: "Lịch sử cảnh báo",
  },
  {
    route: "/area",
    title: "Khu vực",
  },
  {
    route: "/analytic",
    title: "Thống kê",
  },
  {
    route: "/contact",
    title: "Liên hệ",
  },
];
