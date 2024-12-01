import { useState } from "react";

interface ServerSettings {
  general: {
    serverName: string;
    maxPlayers: number;
    motd: string;
    difficulty: "peaceful" | "easy" | "normal" | "hard";
  };
  chat: {
    enabled: boolean;
    slowMode: number;
    filterEnabled: boolean;
    filteredWords: string[];
  };
  gameplay: {
    pvp: boolean;
    keepInventory: boolean;
    mobGriefing: boolean;
    tntExplosions: boolean;
  };
  protection: {
    antiCheat: boolean;
    maxPlayersPerIP: number;
    allowedCommands: string[];
  };
}

const MOCK_SETTINGS: ServerSettings = {
  general: {
    serverName: "QWMC Network",
    maxPlayers: 100,
    motd: "Welcome to QWMC Network!",
    difficulty: "normal",
  },
  chat: {
    enabled: true,
    slowMode: 3,
    filterEnabled: true,
    filteredWords: ["badword1", "badword2"],
  },
  gameplay: {
    pvp: true,
    keepInventory: false,
    mobGriefing: true,
    tntExplosions: false,
  },
  protection: {
    antiCheat: true,
    maxPlayersPerIP: 3,
    allowedCommands: ["/help", "/spawn", "/home"],
  },
};

export default function ServerSettings() {
  const [settings, setSettings] = useState<ServerSettings>(MOCK_SETTINGS);
  const [activeTab, setActiveTab] = useState<keyof ServerSettings>("general");

  return (
    <div className="space-y-6">
      <h2 className="font-minecraft text-3xl text-emerald-400">Server Settings</h2>

      <div className="flex space-x-2">
        {(Object.keys(MOCK_SETTINGS) as Array<keyof ServerSettings>).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 font-minecraft transition-colors ${
              activeTab === tab
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-gray-400 hover:bg-gray-800/50 hover:text-emerald-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="minecraft-panel space-y-6">
        {activeTab === "general" && (
          <div className="space-y-4">
            <div>
              <label className="block font-minecraft text-sm text-emerald-400">
                Server Name
              </label>
              <input
                type="text"
                value={settings.general.serverName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, serverName: e.target.value },
                  })
                }
                className="mt-1 h-10 w-full rounded bg-[#1a1f2e] px-4 text-gray-200 outline-none ring-1 ring-gray-700 transition-all focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="block font-minecraft text-sm text-emerald-400">
                Max Players
              </label>
              <input
                type="number"
                value={settings.general.maxPlayers}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, maxPlayers: parseInt(e.target.value) },
                  })
                }
                className="mt-1 h-10 w-full rounded bg-[#1a1f2e] px-4 text-gray-200 outline-none ring-1 ring-gray-700 transition-all focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="block font-minecraft text-sm text-emerald-400">
                MOTD
              </label>
              <textarea
                value={settings.general.motd}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, motd: e.target.value },
                  })
                }
                className="mt-1 w-full rounded bg-[#1a1f2e] p-4 text-gray-200 outline-none ring-1 ring-gray-700 transition-all focus:ring-emerald-500/50"
                rows={3}
              />
            </div>

            <div>
              <label className="block font-minecraft text-sm text-emerald-400">
                Difficulty
              </label>
              <select
                value={settings.general.difficulty}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: {
                      ...settings.general,
                      difficulty: e.target.value as ServerSettings["general"]["difficulty"],
                    },
                  })
                }
                className="mt-1 h-10 w-full rounded bg-[#1a1f2e] px-4 text-gray-200 outline-none ring-1 ring-gray-700 transition-all focus:ring-emerald-500/50"
              >
                <option value="peaceful">Peaceful</option>
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="space-y-4">
            {/* Chat settings UI */}
          </div>
        )}

        {activeTab === "gameplay" && (
          <div className="space-y-4">
            {/* Gameplay settings UI */}
          </div>
        )}

        {activeTab === "protection" && (
          <div className="space-y-4">
            {/* Protection settings UI */}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <button className="minecraft-button bg-emerald-600 hover:bg-emerald-500">
            Save Changes
          </button>
          <button className="minecraft-button bg-gray-600 hover:bg-gray-500">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
} 