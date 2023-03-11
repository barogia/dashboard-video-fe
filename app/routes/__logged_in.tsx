import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader = () => {
  const isLogged = true;

  if (!isLogged) {
    return redirect("/login");
  }
  return null;
};

export default function LoggedIn() {
  return (
    <>
      <Outlet />
    </>
  );
}
