import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

interface Player {
  username: string;
  uuid: string;
  status: "online" | "offline";
  lastSeen: string;
  joinDate: string;
  playtime: string;
  gamemode: "survival" | "creative" | "adventure" | "spectator";
  location: {
    world: string;
    x: number;
    y: number;
    z: number;
  };
}

// Mock data
const MOCK_PLAYERS: Player[] = [
  {
    username: "DiamondMiner123",
    uuid: "abc-123",
    status: "online",
    lastSeen: "now",
    joinDate: "2024-01-15",
    playtime: "156h 23m",
    gamemode: "survival",
    location: {
      world: "world",
      x: 100,
      y: 64,
      z: -200
    }
  },
  // Add more mock players...
];

export default function PlayersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-minecraft text-3xl text-emerald-400">Players</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search players..."
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Players List */}
        <div className="space-y-4">
          {MOCK_PLAYERS.map((player) => (
            <button
              key={player.uuid}
              onClick={() => setSelectedPlayer(player)}
              className="w-full rounded-lg bg-gray-900/90 p-4 text-left transition-all hover:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://mc-heads.net/avatar/${player.username}`}
                    alt={player.username}
                    className="h-10 w-10 rounded"
                  />
                  <div>
                    <span className="font-minecraft text-emerald-400">
                      {player.username}
                    </span>
                    <div className="text-sm text-gray-400">
                      Last seen: {player.lastSeen}
                    </div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-sm ${
                    player.status === "online"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {player.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Player Details & Actions */}
        {selectedPlayer ? (
          <div className="minecraft-panel space-y-6">
            <div className="flex items-start gap-4">
              <img
                src={`https://mc-heads.net/avatar/${selectedPlayer.username}/100`}
                alt={selectedPlayer.username}
                className="h-20 w-20 rounded"
              />
              <div>
                <h3 className="font-minecraft text-2xl text-emerald-400">
                  {selectedPlayer.username}
                </h3>
                <p className="text-gray-400">UUID: {selectedPlayer.uuid}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="minecraft-button bg-emerald-600 hover:bg-emerald-500">
                Teleport
              </button>
              <button className="minecraft-button bg-yellow-600 hover:bg-yellow-500">
                Inventory
              </button>
              <button className="minecraft-button bg-blue-600 hover:bg-blue-500">
                Gamemode
              </button>
              <button className="minecraft-button bg-red-600 hover:bg-red-500">
                Kick
              </button>
            </div>

            {/* Player Info */}
            <div className="space-y-4">
              <div>
                <h4 className="font-minecraft text-lg text-emerald-400">Location</h4>
                <p className="text-gray-300">
                  World: {selectedPlayer.location.world}
                  <br />
                  X: {selectedPlayer.location.x}, Y: {selectedPlayer.location.y}, Z:{" "}
                  {selectedPlayer.location.z}
                </p>
              </div>

              <div>
                <h4 className="font-minecraft text-lg text-emerald-400">Stats</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <div className="text-sm text-gray-400">Join Date</div>
                    <div className="text-gray-200">{selectedPlayer.joinDate}</div>
                  </div>
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <div className="text-sm text-gray-400">Playtime</div>
                    <div className="text-gray-200">{selectedPlayer.playtime}</div>
                  </div>
                </div>
              </div>

              {/* Additional Actions */}
              <div className="space-y-2">
                <h4 className="font-minecraft text-lg text-emerald-400">
                  Advanced Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="minecraft-button bg-gray-600 hover:bg-gray-500">
                    View History
                  </button>
                  <button className="minecraft-button bg-gray-600 hover:bg-gray-500">
                    Edit Permissions
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="minecraft-panel text-center text-gray-400">
            Select a player to view details and actions
          </div>
        )}
      </div>
    </div>
  );
} 