import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

interface ServerStats {
  performance: {
    tps: number;
    memoryUsed: number;
    memoryTotal: number;
    cpuUsage: number;
    uptime: string;
  };
  players: {
    online: number;
    peak24h: number;
    unique24h: number;
    totalRegistered: number;
  };
  activity: {
    commandsExecuted: number;
    chatMessages: number;
    blocksPlaced: number;
    blocksDestroyed: number;
  };
  topPlayers: Array<{
    username: string;
    playtime: string;
    lastSeen: string;
  }>;
}

// Mock data
const MOCK_STATS: ServerStats = {
  performance: {
    tps: 19.8,
    memoryUsed: 4096,
    memoryTotal: 8192,
    cpuUsage: 45,
    uptime: "15 days, 7 hours",
  },
  players: {
    online: 24,
    peak24h: 42,
    unique24h: 87,
    totalRegistered: 1543,
  },
  activity: {
    commandsExecuted: 1234,
    chatMessages: 5678,
    blocksPlaced: 45678,
    blocksDestroyed: 34567,
  },
  topPlayers: [
    { username: "DiamondMiner123", playtime: "156h 23m", lastSeen: "now" },
    { username: "BuildMaster", playtime: "145h 12m", lastSeen: "2h ago" },
    { username: "RedstoneWizard", playtime: "134h 45m", lastSeen: "5m ago" },
    { username: "ExplorerPro", playtime: "128h 30m", lastSeen: "now" },
    { username: "CraftingKing", playtime: "120h 15m", lastSeen: "1h ago" },
  ],
};

export default function ServerStats() {
  return (
    <div className="space-y-6">
      <h2 className="font-minecraft text-3xl text-emerald-400">Server Stats</h2>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="minecraft-panel flex items-center gap-4">
          <div className="rounded-lg bg-emerald-500/20 p-3">
            <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">TPS</div>
            <div className="font-minecraft text-xl text-emerald-400">{MOCK_STATS.performance.tps}</div>
          </div>
        </div>

        <div className="minecraft-panel flex items-center gap-4">
          <div className="rounded-lg bg-blue-500/20 p-3">
            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">Memory</div>
            <div className="font-minecraft text-xl text-blue-400">
              {Math.round(MOCK_STATS.performance.memoryUsed / 1024 * 10) / 10}GB / {MOCK_STATS.performance.memoryTotal / 1024}GB
            </div>
          </div>
        </div>

        <div className="minecraft-panel flex items-center gap-4">
          <div className="rounded-lg bg-purple-500/20 p-3">
            <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">Uptime</div>
            <div className="font-minecraft text-xl text-purple-400">{MOCK_STATS.performance.uptime}</div>
          </div>
        </div>

        <div className="minecraft-panel flex items-center gap-4">
          <div className="rounded-lg bg-orange-500/20 p-3">
            <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">CPU Usage</div>
            <div className="font-minecraft text-xl text-orange-400">{MOCK_STATS.performance.cpuUsage}%</div>
          </div>
        </div>
      </div>

      {/* Player Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="minecraft-panel space-y-6">
          <h3 className="font-minecraft text-2xl text-emerald-400">Player Activity</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-800/50 p-4">
              <div className="text-sm text-gray-400">Online Now</div>
              <div className="font-minecraft text-2xl text-emerald-400">{MOCK_STATS.players.online}</div>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-4">
              <div className="text-sm text-gray-400">24h Peak</div>
              <div className="font-minecraft text-2xl text-emerald-400">{MOCK_STATS.players.peak24h}</div>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-4">
              <div className="text-sm text-gray-400">Unique Players (24h)</div>
              <div className="font-minecraft text-2xl text-emerald-400">{MOCK_STATS.players.unique24h}</div>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-4">
              <div className="text-sm text-gray-400">Total Registered</div>
              <div className="font-minecraft text-2xl text-emerald-400">{MOCK_STATS.players.totalRegistered}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-minecraft text-lg text-emerald-400">Most Active Players</h4>
            <div className="space-y-2">
              {MOCK_STATS.topPlayers.map((player, index) => (
                <div key={player.username} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="font-minecraft text-lg text-gray-400">#{index + 1}</div>
                    <img
                      src={`https://mc-heads.net/avatar/${player.username}/32`}
                      alt={player.username}
                      className="h-8 w-8 rounded"
                    />
                    <div className="text-gray-200">{player.username}</div>
                  </div>
                  <div className="text-sm text-gray-400">{player.playtime}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="minecraft-panel space-y-6">
          <h3 className="font-minecraft text-2xl text-emerald-400">Server Activity</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-800/50 p-4">
              <div className="text-sm text-gray-400">Commands Executed</div>
              <div className="font-minecraft text-2xl text-emerald-400">{MOCK_STATS.activity.commandsExecuted}</div>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-4">
              <div className="text-sm text-gray-400">Chat Messages</div>
              <div className="font-minecraft text-2xl text-emerald-400">{MOCK_STATS.activity.chatMessages}</div>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-4">
              <div className="text-sm text-gray-400">Blocks Placed</div>
              <div className="font-minecraft text-2xl text-emerald-400">{MOCK_STATS.activity.blocksPlaced}</div>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-4">
              <div className="text-sm text-gray-400">Blocks Destroyed</div>
              <div className="font-minecraft text-2xl text-emerald-400">{MOCK_STATS.activity.blocksDestroyed}</div>
            </div>
          </div>

          {/* Memory Usage Graph Placeholder */}
          <div className="space-y-2">
            <h4 className="font-minecraft text-lg text-emerald-400">Memory Usage</h4>
            <div className="h-48 rounded-lg bg-gray-800/50 p-4">
              <div className="flex h-full items-center justify-center text-gray-400">
                Graph Coming Soon
              </div>
            </div>
          </div>

          {/* TPS Graph Placeholder */}
          <div className="space-y-2">
            <h4 className="font-minecraft text-lg text-emerald-400">TPS History</h4>
            <div className="h-48 rounded-lg bg-gray-800/50 p-4">
              <div className="flex h-full items-center justify-center text-gray-400">
                Graph Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 