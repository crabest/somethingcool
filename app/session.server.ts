import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./db.server";

// Configure session storage
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "default-secret"],
    secure: process.env.NODE_ENV === "production",
  },
});

// Get user session
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

// Get logged-in user ID
export async function getUserId(request: Request): Promise<string | undefined> {
  const session = await getSession(request);
  const userId = session.get("userId");
  return userId;
}

// Require user to be logged in
export async function requireUserId(request: Request): Promise<string> {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect("/login");
  }
  return userId;
}

// Create user session
export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set("userId", userId);

  // Get user info from database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, role: true }
  });

  // Create user info cookie that's accessible from JS
  const userCookie = `userInfo=${JSON.stringify(user)}; Path=/; Max-Age=${
    remember ? 60 * 60 * 24 * 7 : undefined
  }; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": [
        await sessionStorage.commitSession(session, {
          maxAge: remember ? 60 * 60 * 24 * 7 : undefined,
        }),
        userCookie
      ],
    },
  });
}

// Logout user
export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUser(request: Request) {
  const userId = await getUserId(request);

  if (!userId) {
    throw redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      status: true,
    },
  });

  if (!user) {
    throw redirect("/login");
  }

  return user;
} 