import { prisma } from "~/db.server";
import type { TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";

export async function createTicket({
  title,
  description,
  category,
  priority,
  creatorId,
}: {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  creatorId: string;
}) {
  return prisma.ticket.create({
    data: {
      title,
      description,
      category,
      priority,
      status: "OPEN",
      type: "SUPPORT", // You might want to add this to your schema if needed
      creator: {
        connect: { id: creatorId }
      }
    },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
        }
      }
    }
  });
}

export async function getTicketsByUser(userId: string) {
  return prisma.ticket.findMany({
    where: {
      creatorId: userId
    },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
        }
      },
      messages: {
        select: {
          id: true,
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
} 