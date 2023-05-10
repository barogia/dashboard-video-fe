import type { ActionFunction } from "@remix-run/node";
import { logout } from "~/utils/cookie";

export const action: ActionFunction = async ({ request }) => {
  return logout(request, "/");
};
