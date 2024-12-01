import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

interface Report {
  id: string;
  type: "player" | "bug" | "chat" | "other";
  status: "open" | "in_progress" | "resolved" | "rejected";
  reporter: {
    username: string;
    uuid: string;
  };
  reported: {
    username?: string;
    uuid?: string;
  };
  description: string;
  evidence: string[];
  location?: {
    world: string;
    x: number;
    y: number;
    z: number;
  };
  date: string;
  assignedTo?: string;
  resolution?: string;
  priority: "low" | "medium" | "high" | "urgent";
  chatLog?: string[];
}

const MOCK_REPORTS: Report[] = [
  {
    id: "r1",
    type: "player",
    status: "open",
    priority: "high",
    reporter: {
      username: "Player123",
      uuid: "abc-123",
    },
    reported: {
      username: "Griefer456",
      uuid: "def-456",
    },
    description: "Player using x-ray hacks to find diamonds",
    evidence: ["Screenshot1.png", "Video1.mp4"],
    location: {
      world: "world",
      x: 100,
      y: 11,
      z: -200,
    },
    date: "2024-03-15T10:30:00Z",
    chatLog: [
      "[10:25] Griefer456: *suspicious mining pattern*",
      "[10:26] Player123: How did you find those diamonds?",
      "[10:27] Griefer456: Just lucky I guess",
    ],
  },
  // Add more mock reports...
];

export default function ReportsManagement() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filter, setFilter] = useState<"all" | "open" | "in_progress" | "resolved">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showingChatLog, setShowingChatLog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-minecraft text-3xl text-emerald-400">Reports</h2>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="rounded-lg bg-gray-800/80 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="all">All Reports</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports..."
              className="w-64 rounded-lg bg-gray-800/80 px-4 py-2 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reports List */}
        <div className="space-y-4">
          {MOCK_REPORTS.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`w-full rounded-lg bg-gray-900/90 p-4 text-left transition-all hover:bg-gray-900 ${
                selectedReport?.id === report.id ? 'ring-2 ring-emerald-500/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${
                    report.priority === "urgent" ? "bg-red-500/20 text-red-400" :
                    report.priority === "high" ? "bg-orange-500/20 text-orange-400" :
                    report.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {report.priority.toUpperCase()}
                  </div>
                  <div>
                    <span className="font-minecraft text-emerald-400">
                      {report.type === "player" ? `Report against ${report.reported?.username}` : `${report.type} Report`}
                    </span>
                    <div className="text-sm text-gray-400">
                      by {report.reporter.username}
                    </div>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm ${
                  report.status === "open" ? "bg-yellow-500/20 text-yellow-400" :
                  report.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                  report.status === "resolved" ? "bg-green-500/20 text-green-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {report.status.replace('_', ' ')}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                {report.description}
              </p>
            </button>
          ))}
        </div>

        {/* Report Details */}
        {selectedReport ? (
          <div className="minecraft-panel space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-minecraft text-2xl text-emerald-400">
                Report Details
              </h3>
              <div className="flex gap-2">
                {selectedReport.status === "open" && (
                  <button className="minecraft-button bg-blue-600 hover:bg-blue-500">
                    Take Report
                  </button>
                )}
                {selectedReport.status !== "resolved" && (
                  <button className="minecraft-button bg-green-600 hover:bg-green-500">
                    Resolve
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-6">
              {/* Reporter Info */}
              <div>
                <h4 className="font-minecraft text-lg text-emerald-400">Reporter</h4>
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={`https://mc-heads.net/avatar/${selectedReport.reporter.username}`}
                    alt={selectedReport.reporter.username}
                    className="h-8 w-8 rounded"
                  />
                  <div>
                    <p className="text-gray-200">{selectedReport.reporter.username}</p>
                    <p className="text-sm text-gray-400">{selectedReport.reporter.uuid}</p>
                  </div>
                </div>
              </div>

              {/* Reported Player (if applicable) */}
              {selectedReport.type === "player" && (
                <div>
                  <h4 className="font-minecraft text-lg text-emerald-400">Reported Player</h4>
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={`https://mc-heads.net/avatar/${selectedReport.reported?.username}`}
                      alt={selectedReport.reported?.username}
                      className="h-8 w-8 rounded"
                    />
                    <div>
                      <p className="text-gray-200">{selectedReport.reported?.username}</p>
                      <p className="text-sm text-gray-400">{selectedReport.reported?.uuid}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="font-minecraft text-lg text-emerald-400">Description</h4>
                <p className="mt-2 text-gray-300">{selectedReport.description}</p>
              </div>

              {/* Location */}
              {selectedReport.location && (
                <div>
                  <h4 className="font-minecraft text-lg text-emerald-400">Location</h4>
                  <div className="mt-2 rounded-lg bg-gray-800/50 p-3">
                    <p className="text-gray-300">
                      World: {selectedReport.location.world}
                      <br />
                      X: {selectedReport.location.x}, Y: {selectedReport.location.y}, Z: {selectedReport.location.z}
                    </p>
                    <button className="mt-2 text-sm text-emerald-400 hover:underline">
                      Teleport to Location
                    </button>
                  </div>
                </div>
              )}

              {/* Evidence */}
              {selectedReport.evidence.length > 0 && (
                <div>
                  <h4 className="font-minecraft text-lg text-emerald-400">Evidence</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedReport.evidence.map((item, index) => (
                      <button
                        key={index}
                        className="rounded bg-gray-800/50 px-3 py-1 text-sm text-emerald-400 hover:bg-gray-800"
                      >
                        View {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Log */}
              {selectedReport.chatLog && (
                <div>
                  <h4 className="font-minecraft text-lg text-emerald-400">Chat Log</h4>
                  <div className="mt-2 max-h-40 space-y-1 overflow-y-auto rounded-lg bg-gray-800/50 p-3">
                    {selectedReport.chatLog.map((message, index) => (
                      <p key={index} className="text-sm text-gray-300">
                        {message}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Staff Actions */}
              <div className="space-y-4 rounded-lg bg-gray-800/50 p-4">
                <h4 className="font-minecraft text-lg text-emerald-400">Staff Actions</h4>
                <div className="space-y-2">
                  <button className="minecraft-button w-full bg-red-600 hover:bg-red-500">
                    Issue Punishment
                  </button>
                  <button className="minecraft-button w-full bg-blue-600 hover:bg-blue-500">
                    View Player History
                  </button>
                  <button className="minecraft-button w-full bg-gray-600 hover:bg-gray-500">
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="minecraft-panel text-center text-gray-400">
            Select a report to view details
          </div>
        )}
      </div>
    </div>
  );
} 