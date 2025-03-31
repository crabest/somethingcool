import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  // Clear both cookies
  return redirect("/", {
    headers: {
      "Set-Cookie": [
        "userInfo=; Path=/; Max-Age=0; SameSite=Lax" + 
        (process.env.NODE_ENV === "production" ? "; Secure" : ""),
        "__session=; Path=/; Max-Age=0; SameSite=Lax" + 
        (process.env.NODE_ENV === "production" ? "; Secure" : ""),
      ],
    },
  });
} 