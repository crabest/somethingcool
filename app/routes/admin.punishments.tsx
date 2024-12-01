import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

interface Punishment {
  id: string;
  type: "ban" | "mute" | "kick" | "warn";
  player: {
    username: string;
    uuid: string;
  };
  reason: string;
  staffMember: string;
  date: string;
  expires?: string;
  active: boolean;
}

// Mock data
const MOCK_PUNISHMENTS: Punishment[] = [
  {
    id: "p1",
    type: "ban",
    player: {
      username: "GrieferX",
      uuid: "def-456",
    },
    reason: "Using unauthorized mods",
    staffMember: "DiamondMiner123",
    date: "2024-03-15T10:30:00Z",
    expires: "2024-03-22T10:30:00Z",
    active: true,
  },
  {
    id: "p2",
    type: "mute",
    player: {
      username: "ChatSpammer99",
      uuid: "ghi-789",
    },
    reason: "Excessive spam in chat",
    staffMember: "DiamondMiner123",
    date: "2024-03-14T15:45:00Z",
    expires: "2024-03-15T15:45:00Z",
    active: false,
  },
  // Add more mock punishments...
];

export default function PunishmentsManagement() {
  const [selectedType, setSelectedType] = useState<"all" | "ban" | "mute" | "kick" | "warn">("all");
  const [showActive, setShowActive] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPunishment, setSelectedPunishment] = useState<Punishment | null>(null);
  const [issuingPunishment, setIssuingPunishment] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-minecraft text-3xl text-emerald-400">Punishments</h2>
        <button
          onClick={() => setIssuingPunishment(true)}
          className="minecraft-button bg-emerald-600 hover:bg-emerald-500"
        >
          New Punishment
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search player..."
            className="w-full rounded-lg bg-gray-800/80 px-4 py-2 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as typeof selectedType)}
          className="rounded-lg bg-gray-800/80 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <option value="all">All Types</option>
          <option value="ban">Bans</option>
          <option value="mute">Mutes</option>
          <option value="kick">Kicks</option>
          <option value="warn">Warnings</option>
        </select>

        <button
          onClick={() => setShowActive(!showActive)}
          className={`rounded-lg px-4 py-2 transition-colors ${
            showActive
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-gray-800/80 text-gray-300"
          }`}
        >
          Active Only
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Punishments List */}
        <div className="space-y-4">
          {MOCK_PUNISHMENTS.map((punishment) => (
            <button
              key={punishment.id}
              onClick={() => setSelectedPunishment(punishment)}
              className="w-full rounded-lg bg-gray-900/90 p-4 text-left transition-all hover:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${
                    punishment.type === "ban" ? "bg-red-500/20 text-red-400" :
                    punishment.type === "mute" ? "bg-yellow-500/20 text-yellow-400" :
                    punishment.type === "kick" ? "bg-orange-500/20 text-orange-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {punishment.type.toUpperCase()}
                  </div>
                  <div>
                    <span className="font-minecraft text-emerald-400">
                      {punishment.player.username}
                    </span>
                    <div className="text-sm text-gray-400">
                      By {punishment.staffMember}
                    </div>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-sm ${
                  punishment.active
                    ? "bg-red-500/20 text-red-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}>
                  {punishment.active ? "Active" : "Expired"}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Punishment Details or New Punishment Form */}
        {issuingPunishment ? (
          <div className="minecraft-panel">
            <h3 className="font-minecraft text-2xl text-emerald-400">
              Issue New Punishment
            </h3>
            <form className="mt-6 space-y-4">
              <div>
                <label className="block font-minecraft text-sm text-emerald-400">
                  Player Username
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg bg-gray-800/80 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block font-minecraft text-sm text-emerald-400">
                  Punishment Type
                </label>
                <select className="mt-1 w-full rounded-lg bg-gray-800/80 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option value="ban">Ban</option>
                  <option value="mute">Mute</option>
                  <option value="kick">Kick</option>
                  <option value="warn">Warning</option>
                </select>
              </div>
              <div>
                <label className="block font-minecraft text-sm text-emerald-400">
                  Reason
                </label>
                <textarea
                  className="mt-1 w-full rounded-lg bg-gray-800/80 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  rows={3}
                />
              </div>
              <div>
                <label className="block font-minecraft text-sm text-emerald-400">
                  Duration
                </label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Amount"
                    className="rounded-lg bg-gray-800/80 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <select className="rounded-lg bg-gray-800/80 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="permanent">Permanent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="minecraft-button flex-1 bg-red-600 hover:bg-red-500"
                >
                  Issue Punishment
                </button>
                <button
                  type="button"
                  onClick={() => setIssuingPunishment(false)}
                  className="minecraft-button flex-1 bg-gray-600 hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : selectedPunishment ? (
          <div className="minecraft-panel">
            <div className="mb-6">
              <h3 className="font-minecraft text-2xl text-emerald-400">
                Punishment Details
              </h3>
              <p className="text-gray-400">ID: {selectedPunishment.id}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-minecraft text-lg text-emerald-400">Player Info</h4>
                <p className="text-gray-300">{selectedPunishment.player.username}</p>
                <p className="text-sm text-gray-400">UUID: {selectedPunishment.player.uuid}</p>
              </div>

              <div>
                <h4 className="font-minecraft text-lg text-emerald-400">Punishment Info</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <div className="text-sm text-gray-400">Type</div>
                    <div className="text-gray-200">{selectedPunishment.type.toUpperCase()}</div>
                  </div>
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <div className="text-sm text-gray-400">Status</div>
                    <div className="text-gray-200">
                      {selectedPunishment.active ? "Active" : "Expired"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-minecraft text-lg text-emerald-400">Reason</h4>
                <p className="text-gray-300">{selectedPunishment.reason}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-minecraft text-lg text-emerald-400">Issued By</h4>
                  <p className="text-gray-300">{selectedPunishment.staffMember}</p>
                </div>
                <div>
                  <h4 className="font-minecraft text-lg text-emerald-400">Date</h4>
                  <p className="text-gray-300">
                    {new Date(selectedPunishment.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedPunishment.active && (
                <button className="minecraft-button w-full bg-emerald-600 hover:bg-emerald-500">
                  Revoke Punishment
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="minecraft-panel text-center text-gray-400">
            Select a punishment to view details or issue a new one
          </div>
        )}
      </div>
    </div>
  );
} 