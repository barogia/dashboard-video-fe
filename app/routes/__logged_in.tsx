import { Box } from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserToken } from "~/utils/cookie";

export const loader = async ({ request }: LoaderArgs) => {
  const validToken = await getUserToken(request);

  if (!validToken) {
    return redirect("/login");
  }
  return null;
};

export default function LoggedIn() {
  return (
    <Box sx={{ background: "#F7F8FC", height: "100%" }}>
      <Box sx={{ height: "50px", padding: "30px" }}></Box>
      <Box sx={{ padding: "20px 45px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
