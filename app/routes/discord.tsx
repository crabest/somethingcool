import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

const DISCORD_INVITE_URL = "https://discord.gg/SFeceZEQAf";

export const loader: LoaderFunction = async () => {
  return redirect(DISCORD_INVITE_URL);
};

export default function Discord() {
  return null;
} 