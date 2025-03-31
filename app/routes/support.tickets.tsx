import { useState } from "react";
import { Link, useLoaderData, Outlet, useLocation } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createTicket, getTicketsByUser } from "~/models/ticket.server";
import { requireUser } from "~/session.server";
import { TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const tickets = await getTicketsByUser(user.id);
  return json({ tickets, user });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const title = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as TicketCategory;
  const priority = formData.get("priority") as TicketPriority;

  if (!title || !description || !category || !priority) {
    return json(
      { errors: { title: "All fields are required" } },
      { status: 400 }
    );
  }

  await createTicket({
    title,
    description,
    category,
    priority,
    creatorId: user.id,
  });

  return json({ success: true });
}

interface TicketDisplay {
  id: string;
  title: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  messages: { id: string }[];
  creator: {
    id: string;
    username: string;
  };
}

export const meta = () => {
  return [
    { title: "Support Tickets - QWMC" },
    { name: "description", content: "Create and manage your support tickets" },
  ];
};

export default function SupportTickets() {
  const { tickets, user } = useLoaderData<typeof loader>();
  const location = useLocation();
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [ticketFormData, setTicketFormData] = useState({
    subject: '',
    category: 'OTHER' as TicketCategory,
    description: '',
    priority: 'MEDIUM' as TicketPriority,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("subject", ticketFormData.subject);
    formData.append("description", ticketFormData.description);
    formData.append("category", ticketFormData.category);
    formData.append("priority", ticketFormData.priority);

    const response = await fetch("/support/tickets", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setShowNewTicketModal(false);
      // Optionally refresh the page or update the tickets list
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 py-24">
          {/* Check if we're on the index route or a specific ticket */}
          {location.pathname === "/support/tickets" ? (
            // Original tickets list content
            <>
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="font-minecraft text-4xl text-emerald-400">
                    Support Tickets
                  </h1>
                  <p className="mt-2 text-gray-400">
                    Get help with any issues you're experiencing
                  </p>
                </div>

                <button
                  onClick={() => setShowNewTicketModal(true)}
                  className="minecraft-button bg-emerald-600 hover:bg-emerald-700"
                >
                  Create New Ticket
                </button>
              </div>

              {/* Active Tickets */}
              <div className="rounded-lg border border-gray-800 bg-black/50">
                <div className="border-b border-gray-800 p-4">
                  <h2 className="font-minecraft text-xl text-emerald-400">Your Tickets</h2>
                </div>

                {tickets.length > 0 ? (
                  <table className="w-full">
                    <thead className="border-b border-gray-800 bg-black/30">
                      <tr>
                        <th className="p-4 text-left font-minecraft text-emerald-400">ID</th>
                        <th className="p-4 text-left font-minecraft text-emerald-400">Subject</th>
                        <th className="p-4 text-left font-minecraft text-emerald-400">Category</th>
                        <th className="p-4 text-left font-minecraft text-emerald-400">Status</th>
                        <th className="p-4 text-left font-minecraft text-emerald-400">Priority</th>
                        <th className="p-4 text-left font-minecraft text-emerald-400">Last Update</th>
                        <th className="p-4 text-left font-minecraft text-emerald-400">Messages</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {tickets.map((ticket: TicketDisplay) => (
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
                            {new Date(ticket.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                              {ticket.messages.length} messages
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    No tickets found. Create a new ticket to get help!
                  </div>
                )}
              </div>

              {/* FAQ Section */}
              <div className="mt-8 rounded-lg border border-gray-800 bg-black/50 p-6">
                <h2 className="mb-4 font-minecraft text-2xl text-emerald-400">Common Solutions</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <SolutionCard
                    title="Can't Connect?"
                    description="Make sure you're using the correct server IP and Minecraft version"
                    link="/support/connection-guide"
                  />
                  <SolutionCard
                    title="Lost Items?"
                    description="Learn how to report lost items and what information we need"
                    link="/support/lost-items"
                  />
                  <SolutionCard
                    title="Payment Issues"
                    description="Find solutions for common store and payment problems"
                    link="/support/payment-help"
                  />
                </div>
              </div>
            </>
          ) : (
            // Render child routes
            <Outlet />
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-6 font-minecraft text-2xl text-emerald-400">Create New Ticket</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={ticketFormData.subject}
                  onChange={(e) => setTicketFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="minecraft-border w-full bg-black/50 p-2 text-white"
                  required
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Category</label>
                <select
                  name="category"
                  value={ticketFormData.category}
                  onChange={(e) => setTicketFormData(prev => ({ 
                    ...prev, 
                    category: e.target.value as TicketCategory
                  }))}
                  className="minecraft-border w-full bg-black/50 p-2 text-white"
                >
                  {Object.values(TicketCategory).map((category) => (
                    <option key={category} value={category}>
                      {category.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Description</label>
                <textarea
                  value={ticketFormData.description}
                  onChange={(e) => setTicketFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="minecraft-border min-h-[150px] w-full resize-y bg-black/50 p-2 text-white"
                  required
                  placeholder="Provide as much detail as possible about your issue..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Priority</label>
                <select
                  name="priority"
                  value={ticketFormData.priority}
                  onChange={(e) => setTicketFormData(prev => ({ 
                    ...prev, 
                    priority: e.target.value as TicketPriority
                  }))}
                  className="minecraft-border w-full bg-black/50 p-2 text-white"
                >
                  {Object.values(TicketPriority).map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="rounded bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SolutionCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link 
      to={link}
      className="rounded-lg border border-gray-800 bg-black/30 p-4 transition-all hover:border-emerald-400/30"
    >
      <h3 className="font-minecraft text-lg text-emerald-400">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </Link>
  );
}

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

// Mock data
const tickets: TicketDisplay[] = [
  {
    id: "T-1234",
    title: "Can't access my plot",
    category: "TECHNICAL",
    status: "OPEN",
    priority: "MEDIUM",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
    messages: [{ id: "M-1234" }],
    creator: {
      id: "U-1234",
      username: "JohnDoe",
    },
  },
  // Add more mock tickets...
]; 