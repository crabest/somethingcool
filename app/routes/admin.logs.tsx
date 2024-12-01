import { useState } from "react";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "command" | "chat" | "staff_action" | "system";
  player?: string;
  staff?: string;
  content: string;
  details?: Record<string, any>;
}

const MOCK_LOGS: LogEntry[] = [
  {
    id: "log1",
    timestamp: "2024-03-15T10:30:00Z",
    type: "staff_action",
    player: "Griefer456",
    staff: "DiamondMiner123",
    content: "Banned player for using unauthorized mods",
    details: {
      duration: "7 days",
      reason: "Using unauthorized mods",
    },
  },
  {
    id: "log2",
    timestamp: "2024-03-15T10:29:00Z",
    type: "command",
    player: "DiamondMiner123",
    content: "/tp Griefer456",
  },
  // Add more mock logs...
];

export default function ServerLogs() {
  const [filter, setFilter] = useState<"all" | "command" | "chat" | "staff_action" | "system">("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-minecraft text-3xl text-emerald-400">Server Logs</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="h-10 rounded bg-[#1a1f2e] px-4 text-gray-200 outline-none ring-1 ring-gray-700 transition-all focus:ring-emerald-500/50"
        >
          <option value="all">All Logs</option>
          <option value="command">Commands</option>
          <option value="chat">Chat</option>
          <option value="staff_action">Staff Actions</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <svg
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search logs..."
          className="h-10 w-full rounded bg-[#1a1f2e] pl-10 pr-4 text-gray-200 outline-none ring-1 ring-gray-700 transition-all placeholder:text-gray-500 focus:ring-emerald-500/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="minecraft-panel space-y-4">
        {MOCK_LOGS.map((log) => (
          <div
            key={log.id}
            className="rounded-lg bg-gray-800/50 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`rounded-lg px-2 py-1 text-sm ${
                  log.type === "staff_action" ? "bg-red-500/20 text-red-400" :
                  log.type === "command" ? "bg-blue-500/20 text-blue-400" :
                  log.type === "chat" ? "bg-green-500/20 text-green-400" :
                  "bg-gray-500/20 text-gray-400"
                }`}>
                  {log.type.replace('_', ' ').toUpperCase()}
                </span>
                {log.player && (
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://mc-heads.net/avatar/${log.player}/32`}
                      alt={log.player}
                      className="h-6 w-6 rounded"
                    />
                    <span className="text-gray-200">{log.player}</span>
                  </div>
                )}
                {log.staff && (
                  <>
                    <span className="text-gray-500">by</span>
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://mc-heads.net/avatar/${log.staff}/32`}
                        alt={log.staff}
                        className="h-6 w-6 rounded"
                      />
                      <span className="text-emerald-400">{log.staff}</span>
                    </div>
                  </>
                )}
              </div>
              <span className="text-sm text-gray-400">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-gray-300">{log.content}</p>
            {log.details && (
              <div className="mt-2 rounded bg-gray-900/50 p-2 text-sm text-gray-400">
                {Object.entries(log.details).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-semibold">{key}: </span>
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 