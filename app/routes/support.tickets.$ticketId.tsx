import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";
import { TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";
import { useState } from "react";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const ticketId = params.ticketId;

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          username: true,
        },
      },
      messages: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  if (!ticket) {
    throw new Response("Ticket not found", { status: 404 });
  }

  // Check if user has access to this ticket
  if (ticket.creatorId !== user.id && !user.role.includes('admin')) {
    throw new Response("Not authorized", { status: 403 });
  }

  return json({ ticket, user });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const ticketId = params.ticketId;
  const formData = await request.formData();
  const content = formData.get("content") as string;

  if (!content?.trim()) {
    return json({ error: "Message content is required" }, { status: 400 });
  }

  try {
    const message = await prisma.ticketMessage.create({
      data: {
        content,
        ticket: { connect: { id: ticketId } },
        author: { connect: { id: user.id } },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return json({ success: true, message });
  } catch (error) {
    return json({ error: "Failed to send message" }, { status: 500 });
  }
}

function getPriorityStyle(priority: TicketPriority) {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-500/20 text-red-400';
    case 'MEDIUM':
      return 'bg-yellow-500/20 text-yellow-400';
    default:
      return 'bg-blue-500/20 text-blue-400';
  }
}

export default function TicketDetails() {
  const { ticket, user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    fetcher.submit(
      { content: replyContent },
      { method: "POST" }
    );
    setReplyContent("");
  };

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 py-24">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-minecraft text-4xl text-emerald-400">
                  Ticket #{ticket.id.slice(-6)}
                </h1>
                <p className="mt-2 text-gray-400">
                  Created on {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-4">
                <span className={`rounded-full px-3 py-1 text-sm ${getStatusStyle(ticket.status)}`}>
                  {formatStatus(ticket.status)}
                </span>
                <span className={`rounded-full px-3 py-1 text-sm ${getPriorityStyle(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Messages Thread */}
            <div className="lg:col-span-2">
              <div className="minecraft-panel space-y-4">
                {/* Initial Ticket */}
                <div className="rounded-lg bg-gray-800/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-minecraft text-emerald-400">{ticket.creator.username}</span>
                      <span className="text-sm text-gray-500">Creator</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="mb-4 text-xl text-white">{ticket.title}</h2>
                  <p className="text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
                </div>

                {/* Messages */}
                {ticket.messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`rounded-lg p-4 ${
                      message.author.role.includes('admin') 
                        ? 'bg-emerald-900/20 border border-emerald-500/20' 
                        : 'bg-gray-800/50'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`font-minecraft ${
                          message.author.role.includes('admin') ? 'text-emerald-400' : 'text-white'
                        }`}>
                          {message.author.username}
                        </span>
                        <span className="text-sm text-gray-500">{message.author.role}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap">{message.content}</p>
                  </div>
                ))}

                {/* Reply Form */}
                <fetcher.Form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    name="content"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply..."
                    className="minecraft-border min-h-[100px] w-full resize-y bg-black/50 p-3 text-white"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={fetcher.state !== "idle"}
                      className={`minecraft-button ${
                        fetcher.state !== "idle"
                          ? "bg-emerald-600/50 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {fetcher.state !== "idle" ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                </fetcher.Form>
              </div>
            </div>

            {/* Ticket Info Sidebar */}
            <div className="space-y-4">
              <div className="minecraft-panel">
                <h3 className="mb-4 font-minecraft text-lg text-emerald-400">Ticket Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Category</label>
                    <div className="mt-1">
                      <span className={`rounded-full px-2 py-1 text-sm ${getCategoryStyle(ticket.category)}`}>
                        {ticket.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Assigned To</label>
                    <div className="mt-1 text-white">
                      {ticket.assignedTo?.username || 'Unassigned'}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Last Updated</label>
                    <div className="mt-1 text-white">
                      {new Date(ticket.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              {user.role.includes('admin') && (
                <div className="minecraft-panel">
                  <h3 className="mb-4 font-minecraft text-lg text-emerald-400">Admin Actions</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Change Status</label>
                      <select className="minecraft-border mt-1 w-full bg-black/50 p-2 text-white">
                        {Object.values(TicketStatus).map((status) => (
                          <option key={status} value={status}>
                            {formatStatus(status)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button className="minecraft-button w-full bg-red-600 hover:bg-red-700">
                      Close Ticket
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatStatus(status: TicketStatus): string {
  return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

// Use the same style helper functions from the tickets list page
function getStatusStyle(status: TicketStatus) {
  switch (status) {
    case 'IN_PROGRESS':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'RESOLVED':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'CLOSED':
      return 'bg-gray-500/20 text-gray-400';
    default:
      return 'bg-blue-500/20 text-blue-400';
  }
}

// ... rest of the style helper functions from support.tickets.tsx 

function getCategoryStyle(category: TicketCategory) {
  switch (category) {
    case 'TECHNICAL':
      return 'bg-blue-500/20 text-blue-400';
    case 'PAYMENT':
      return 'bg-purple-500/20 text-purple-400';
    case 'OTHER':
      return 'bg-gray-500/20 text-gray-400';
    default:
      return 'bg-emerald-500/20 text-emerald-400';
  }
}