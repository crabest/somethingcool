import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

interface OverviewData {
  serverStatus: {
    online: number;
    tps: number;
    memoryUsage: string;
  };
  recentApplications: Array<{
    id: string;
    type: string;
    applicant: string;
    submitted: string;
  }>;
  recentReports: Array<{
    id: string;
    type: string;
    reporter: string;
    reported?: string;
    submitted: string;
  }>;
  activePunishments: Array<{
    id: string;
    type: "ban" | "mute";
    player: string;
    expires: string;
  }>;
}

// Mock data
const MOCK_DATA: OverviewData = {
  serverStatus: {
    online: 24,
    tps: 19.8,
    memoryUsage: "4.2GB / 8GB",
  },
  recentApplications: [
    { id: "app1", type: "staff", applicant: "Player123", submitted: "2024-03-15T10:30:00Z" },
    { id: "app2", type: "builder", applicant: "Builder456", submitted: "2024-03-14T15:45:00Z" },
  ],
  recentReports: [
    { id: "rep1", type: "player", reporter: "Player123", reported: "Griefer456", submitted: "2024-03-15T10:30:00Z" },
    { id: "rep2", type: "bug", reporter: "Player789", submitted: "2024-03-14T15:45:00Z" },
  ],
  activePunishments: [
    { id: "pun1", type: "ban", player: "Griefer456", expires: "2024-03-22T10:30:00Z" },
    { id: "pun2", type: "mute", player: "Spammer789", expires: "2024-03-16T15:45:00Z" },
  ],
};

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <h2 className="font-minecraft text-3xl text-emerald-400">Overview</h2>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="minecraft-panel flex items-center gap-4">
          <div className="rounded-lg bg-emerald-500/20 p-3">
            <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">Players Online</div>
            <div className="font-minecraft text-xl text-emerald-400">{MOCK_DATA.serverStatus.online}</div>
          </div>
        </div>

        <div className="minecraft-panel flex items-center gap-4">
          <div className="rounded-lg bg-blue-500/20 p-3">
            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">TPS</div>
            <div className="font-minecraft text-xl text-blue-400">{MOCK_DATA.serverStatus.tps}</div>
          </div>
        </div>

        <div className="minecraft-panel flex items-center gap-4">
          <div className="rounded-lg bg-purple-500/20 p-3">
            <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">Memory</div>
            <div className="font-minecraft text-xl text-purple-400">{MOCK_DATA.serverStatus.memoryUsage}</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="minecraft-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-minecraft text-xl text-emerald-400">Recent Applications</h3>
            <Link 
              to="/admin/applications"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-2">
            {MOCK_DATA.recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                <div>
                  <div className="font-minecraft text-gray-200">{app.applicant}</div>
                  <div className="text-sm text-gray-400">Applied for: {app.type}</div>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(app.submitted).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="minecraft-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-minecraft text-xl text-emerald-400">Recent Reports</h3>
            <Link 
              to="/admin/reports"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-2">
            {MOCK_DATA.recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                <div>
                  <div className="font-minecraft text-gray-200">
                    {report.type === "player" ? `${report.reporter} → ${report.reported}` : report.reporter}
                  </div>
                  <div className="text-sm text-gray-400">Type: {report.type}</div>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(report.submitted).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Punishments */}
        <div className="minecraft-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-minecraft text-xl text-emerald-400">Active Punishments</h3>
            <Link 
              to="/admin/punishments"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-2">
            {MOCK_DATA.activePunishments.map((punishment) => (
              <div key={punishment.id} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                <div>
                  <div className="font-minecraft text-gray-200">{punishment.player}</div>
                  <div className="text-sm text-gray-400">Type: {punishment.type}</div>
                </div>
                <div className="text-sm text-gray-400">
                  Expires: {new Date(punishment.expires).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="minecraft-panel space-y-4">
          <h3 className="font-minecraft text-xl text-emerald-400">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/punishments"
              className="minecraft-button bg-red-600 hover:bg-red-500"
            >
              Issue Punishment
            </Link>
            <Link
              to="/admin/players"
              className="minecraft-button bg-blue-600 hover:bg-blue-500"
            >
              Find Player
            </Link>
            <Link
              to="/admin/applications"
              className="minecraft-button bg-emerald-600 hover:bg-emerald-500"
            >
              Review Applications
            </Link>
            <Link
              to="/admin/reports"
              className="minecraft-button bg-yellow-600 hover:bg-yellow-500"
            >
              Handle Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 