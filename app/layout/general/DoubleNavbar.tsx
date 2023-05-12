import React, { useState } from "react";
import { createStyles, Navbar, Group, Box, Divider } from "@mantine/core";
import {
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconLogout,
  IconHome,
  IconDatabase,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import { color } from "~/config/color";
import { useLocation, useNavigate } from "@remix-run/react";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: (theme.fn.variant({
      variant: "filled",
      color: "#363740" || color.main,
    }).background = "#363740"),
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `1 solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `1 solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        (theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background = "white"),
        0.1
      ),
    },
  },

  linkIcon: {
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        (theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background = "white"),
        0.15
      ),
    },
  },
}));

interface NavbarItemProps {
  link: string;
  label: string;
  icon: JSX.Element;
}

const data: NavbarItemProps[] = [
  { link: "/", label: "Trang chủ", icon: <IconHome /> },
  { link: "/camera", label: "Quản lí Video", icon: <IconDatabase /> },
  // { link: "/warning", label: "Cảnh báo", icon: <IconFingerprint /> },
  { link: "/user", label: "Người dùng", icon: <IconKey /> },
  { link: "/analytic", label: "Thông kê", icon: <IconDatabaseImport /> },
  // { link: "/contact", label: "Liên hệ", icon: <Icon2fa /> },
];

// const footerData: NavbarItemProps[] = [
//   { link: "/setting", label: "Cài đặt", icon: <IconSettings /> },
//   { link: "", label: "Đăng kí", icon: <IconLogout /> },
// ];

export function NavbarSimpleColored({
  children,
}: {
  children: React.ReactNode;
}) {
  const { classes, cx } = useStyles();
  const pathname = useLocation().pathname;

  const [active, setActive] = useState(pathname || "/");
  const navigate = useNavigate();

  const linksRender = (data: NavbarItemProps[]) => {
    return data.map((item) => (
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.link === active,
        })}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActive(item.link);
          navigate(item.link);
        }}
      >
        <Box className={classes.linkIcon}>{item.icon}</Box>
        <span>{item.label}</span>
      </a>
    ));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar height={"110vh"} width={{ sm: 300 }} className={classes.navbar}>
        <Navbar.Section sx={{ marginTop: "20px" }} p="md">
          <Group className={classes.header} position="center">
            <MantineLogo size={28} inverted />
          </Group>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              "> a": { padding: "10px 20px" },
              marginTop: "20px",
            }}
          >
            {linksRender(data)}
          </Box>
        </Navbar.Section>

        {/* <Divider sx={{ width: "100%" }} /> */}

        {/* <Navbar.Section p="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              "> a": { padding: "10px 20px" },
              marginTop: "20px",
            }}
          >
            {linksRender(footerData)}
          </Box>
        </Navbar.Section> */}
      </Navbar>
      {children}
    </Box>
  );
}
