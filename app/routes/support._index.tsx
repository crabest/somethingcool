import { Link } from "@remix-run/react";

export default function SupportIndex() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-8">
        <h1 className="font-minecraft text-4xl text-emerald-400">
          Support Center
        </h1>
        <p className="mt-2 text-gray-400">
          How can we help you today?
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Support Tickets Card */}
        <Link
          to="/support/tickets"
          className="group relative rounded-lg border border-gray-800 bg-black/50 p-8 text-center transition-all hover:border-emerald-400/30"
        >
          <div className="mb-4 text-5xl">🎫</div>
          <h2 className="font-minecraft text-2xl text-emerald-400 group-hover:text-emerald-300">
            Support Tickets
          </h2>
          <p className="mt-4 text-gray-400">
            Create a ticket for general support, technical issues, or other inquiries
          </p>
          <div className="mt-6 inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
            Create Ticket →
          </div>
          <div className="absolute bottom-4 right-4 text-sm text-gray-500">
            Response time: 24-48 hours
          </div>
        </Link>

        {/* Ban Appeal Card */}
        <Link
          to="/support/ban-appeal"
          className="group relative rounded-lg border border-gray-800 bg-black/50 p-8 text-center transition-all hover:border-emerald-400/30"
        >
          <div className="mb-4 text-5xl">⚖️</div>
          <h2 className="font-minecraft text-2xl text-emerald-400 group-hover:text-emerald-300">
            Ban Appeal
          </h2>
          <p className="mt-4 text-gray-400">
            Submit an appeal if you've been banned and would like to request a review
          </p>
          <div className="mt-6 inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
            Submit Appeal →
          </div>
          <div className="absolute bottom-4 right-4 text-sm text-gray-500">
            Review time: 1-3 days
          </div>
        </Link>
      </div>

      {/* Quick Help Section */}
      <div className="mt-12 rounded-lg border border-gray-800 bg-black/50 p-6">
        <h2 className="mb-6 font-minecraft text-xl text-emerald-400">Quick Help</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
            <h3 className="font-minecraft text-lg text-white">Common Issues</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>• Can't connect to server</li>
              <li>• Lost items or progress</li>
              <li>• Payment problems</li>
              <li>• Account issues</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
            <h3 className="font-minecraft text-lg text-white">Useful Commands</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>• /help - View all commands</li>
              <li>• /tpa - Teleport requests</li>
              <li>• /sethome - Set your home</li>
              <li>• /report - Report issues</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
            <h3 className="font-minecraft text-lg text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>• Discord Support</li>
              <li>• Server Rules</li>
              <li>• FAQ Page</li>
              <li>• Contact Staff</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support Hours Notice */}
      <div className="mt-8 rounded-lg border border-gray-800 bg-black/50 p-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">⏰</span>
          <p className="text-center text-sm text-gray-400">
            Staff are typically available for support between 9 AM - 11 PM UTC.
            For urgent issues, please join our Discord server.
          </p>
        </div>
      </div>
    </div>
  );
} 