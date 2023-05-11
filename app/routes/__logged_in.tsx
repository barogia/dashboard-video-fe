import { Box } from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getProfile } from "~/api/user";
import { HeaderTabs } from "~/layout/Headertab";
import { getUserToken } from "~/utils/cookie";

export const loader = async ({ request }: LoaderArgs) => {
  const validToken = await getUserToken(request);

  if (!validToken) {
    return redirect("/login");
  }

  const userProfile = await getProfile(validToken);
  return json({ user: userProfile });
};

export default function LoggedIn() {
  const data = useLoaderData();

  return (
    <Box sx={{ background: "#F7F8FC", height: "100%" }}>
      <Box sx={{ height: "50px", padding: "30px" }}></Box>
      <Box sx={{ padding: "20px 45px", overflow: "auto" }}>
        <HeaderTabs user={data.user} />
        <Outlet />
      </Box>
    </Box>
  );
}
