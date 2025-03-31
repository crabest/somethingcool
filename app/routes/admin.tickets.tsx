import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";
import { TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  if (!user.role.includes('admin')) {
    throw new Response("Not authorized", { 
      status: 403,
      statusText: "You don't have permission to access this page" 
    });
  }

  const tickets = await prisma.ticket.findMany({
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
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return json({ tickets });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-minecraft text-4xl text-red-400">
          {error.status === 403 ? 'Access Denied' : 'Error'}
        </h1>
        <p className="mt-4 text-gray-400">
          {error.statusText || "Something went wrong"}
        </p>
        <Link 
          to="/support/tickets"
          className="mt-8 text-emerald-400 hover:text-emerald-300"
        >
          Go to Support Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="font-minecraft text-4xl text-red-400">Error</h1>
      <p className="mt-4 text-gray-400">Something went wrong</p>
    </div>
  );
}

export default function AdminTickets() {
  const { tickets } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-minecraft text-3xl text-emerald-400">Support Tickets</h1>
          <p className="mt-2 text-gray-400">Manage and respond to user tickets</p>
        </div>

        <div className="flex gap-4">
          <select className="minecraft-border rounded bg-black/50 p-2 text-white">
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="minecraft-panel">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-4 text-left font-minecraft text-emerald-400">ID</th>
                <th className="p-4 text-left font-minecraft text-emerald-400">Subject</th>
                <th className="p-4 text-left font-minecraft text-emerald-400">User</th>
                <th className="p-4 text-left font-minecraft text-emerald-400">Category</th>
                <th className="p-4 text-left font-minecraft text-emerald-400">Status</th>
                <th className="p-4 text-left font-minecraft text-emerald-400">Priority</th>
                <th className="p-4 text-left font-minecraft text-emerald-400">Last Update</th>
                <th className="p-4 text-left font-minecraft text-emerald-400">Messages</th>
                <th className="p-4 text-left font-minecraft text-emerald-400">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-emerald-500/5">
                  <td className="p-4">
                    <Link 
                      to={`/support/tickets/${ticket.id}`}
                      className="font-minecraft text-gray-400 hover:text-emerald-400"
                    >
                      #{ticket.id.slice(-6)}
                    </Link>
                  </td>
                  <td className="p-4">
                    <Link 
                      to={`/support/tickets/${ticket.id}`}
                      className="text-white hover:text-emerald-400"
                    >
                      {ticket.title}
                    </Link>
                  </td>
                  <td className="p-4">
                    <Link 
                      to={`/admin/players?id=${ticket.creator.id}`}
                      className="text-gray-400 hover:text-emerald-400"
                    >
                      {ticket.creator.username}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-1 text-xs ${getCategoryStyle(ticket.category)}`}>
                      {ticket.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-1 text-xs ${getStatusStyle(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-1 text-xs ${getPriorityStyle(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                      {ticket.messages.length}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">
                    {ticket.assignedTo?.username || 'Unassigned'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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

function getCategoryStyle(category: TicketCategory) {
  switch (category) {
    case 'BUG':
      return 'bg-blue-500/20 text-blue-400';
    case 'PAYMENT':
      return 'bg-purple-500/20 text-purple-400';
    case 'OTHER':
      return 'bg-gray-500/20 text-gray-400';
    default:
      return 'bg-emerald-500/20 text-emerald-400';
  }
} 