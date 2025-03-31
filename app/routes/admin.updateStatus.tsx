import { json } from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;
  const newStatus = formData.get("status") as string;

  // Define allowed statuses for transition
  const allowedStatuses = ["PENDING", "DELETED", "BANNED", "MUTED"];
  
  try {
    // Fetch the current user status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true },
    });

    if (!user) {
      return json({ success: false, error: "User not found." }, { status: 404 });
    }

    // Check if the current status is one of the allowed statuses
    // Update the user status to OFFLINE
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: newStatus },
    });

    return json({ success: true, user: updatedUser });
    
  } catch (error) {
    console.error("Error updating user status:", error);
    return json({ success: false, error: "Failed to update status." }, { status: 500 });
  }
} 