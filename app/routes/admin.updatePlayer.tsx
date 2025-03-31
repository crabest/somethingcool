import { json } from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;
  
  // Build update object from form data
  const updates: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    if (key !== "userId" && value) {
      // Handle password separately
      if (key === "password") {
        updates.password = await bcrypt.hash(value as string, 10);
      } else {
        updates[key] = value;
      }
    }
  }

  try {
    // If updating email or username, check for uniqueness
    if (updates.email || updates.username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            updates.email ? { email: updates.email } : {},
            updates.username ? { username: updates.username } : {},
          ],
          NOT: { id: userId },
        },
      });

      if (existingUser) {
        return json({
          success: false,
          error: "Email or username already taken.",
        }, { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updates,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        status: true,
        lastSeen: true,
        joinedAt: true,
        playtime: true,
      },
    });

    return json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return json({ success: false, error: "Failed to update user." }, { status: 500 });
  }
} 