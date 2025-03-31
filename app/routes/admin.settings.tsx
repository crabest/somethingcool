import { useState } from "react";
import type { ContentType } from "@prisma/client";

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

interface ContentSettings {
  id: string;
  type: ContentType;
  title: string;
  content: string;
  version: number;
  isActive: boolean;
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

const MOCK_CONTENT: ContentSettings[] = [
  {
    id: "1",
    type: "TOS",
    title: "Terms of Service",
    content: "Our terms of service...",
    version: 1,
    isActive: true
  },
  {
    id: "2",
    type: "RULES",
    title: "Server Rules",
    content: "1. Be respectful...",
    version: 2,
    isActive: true
  }
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'server' | 'content'>('server');
  const [editingContent, setEditingContent] = useState<ContentSettings | null>(null);
  const [contents, setContents] = useState(MOCK_CONTENT);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-minecraft text-3xl text-emerald-400">Admin Settings</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('server')}
            className={`rounded-lg px-4 py-2 font-minecraft transition-colors ${
              activeTab === 'server'
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-gray-400 hover:bg-gray-800/50 hover:text-emerald-400"
            }`}
          >
            Server Settings
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`rounded-lg px-4 py-2 font-minecraft transition-colors ${
              activeTab === 'content'
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-gray-400 hover:bg-gray-800/50 hover:text-emerald-400"
            }`}
          >
            Content Management
          </button>
        </div>
      </div>

      {activeTab === 'server' && (
        <ServerSettingsPanel />
      )}

      {activeTab === 'content' && (
        <div className="minecraft-panel space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-minecraft text-xl text-emerald-400">Content Management</h3>
            <button
              onClick={() => setEditingContent({
                id: '',
                type: 'TOS',
                title: '',
                content: '',
                version: 1,
                isActive: true
              })}
              className="minecraft-button bg-emerald-600 hover:bg-emerald-500"
            >
              Add New Content
            </button>
          </div>

          <div className="space-y-4">
            {contents.map((content) => (
              <div 
                key={content.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50"
              >
                <div>
                  <h4 className="font-minecraft text-white">{content.title}</h4>
                  <p className="text-sm text-gray-400">
                    Type: {content.type} • Version: {content.version} • 
                    Status: {content.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingContent(content)}
                    className="px-3 py-1 text-sm rounded bg-emerald-500/20 text-emerald-400 
                      hover:bg-emerald-500/30"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setContents(contents.map(c => 
                        c.id === content.id ? {...c, isActive: !c.isActive} : c
                      ))
                    }}
                    className="px-3 py-1 text-sm rounded bg-gray-500/20 text-gray-400 
                      hover:bg-gray-500/30"
                  >
                    {content.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editingContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="minecraft-panel w-full max-w-2xl">
            <h3 className="font-minecraft text-xl text-emerald-400 mb-4">
              {editingContent.id ? 'Edit Content' : 'New Content'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-minecraft text-sm text-emerald-400">Type</label>
                <select
                  value={editingContent.type}
                  onChange={(e) => setEditingContent({
                    ...editingContent,
                    type: e.target.value as ContentType
                  })}
                  className="mt-1 w-full rounded bg-[#1a1f2e] p-2"
                >
                  <option value="TOS">Terms of Service</option>
                  <option value="PRIVACY">Privacy Policy</option>
                  <option value="RULES">Rules</option>
                  <option value="REFUND">Refund Policy</option>
                  <option value="GUIDELINES">Guidelines</option>
                  <option value="FAQ">FAQ</option>
                </select>
              </div>

              <div>
                <label className="block font-minecraft text-sm text-emerald-400">Title</label>
                <input
                  type="text"
                  value={editingContent.title}
                  onChange={(e) => setEditingContent({
                    ...editingContent,
                    title: e.target.value
                  })}
                  className="mt-1 w-full rounded bg-[#1a1f2e] p-2"
                />
              </div>

              <div>
                <label className="block font-minecraft text-sm text-emerald-400">Content</label>
                <textarea
                  value={editingContent.content}
                  onChange={(e) => setEditingContent({
                    ...editingContent,
                    content: e.target.value
                  })}
                  rows={10}
                  className="mt-1 w-full rounded bg-[#1a1f2e] p-2"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setEditingContent(null)}
                  className="minecraft-button bg-gray-600 hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingContent.id) {
                      setContents(contents.map(c => 
                        c.id === editingContent.id ? editingContent : c
                      ));
                    } else {
                      setContents([...contents, {
                        ...editingContent,
                        id: Math.random().toString(),
                      }]);
                    }
                    setEditingContent(null);
                  }}
                  className="minecraft-button bg-emerald-600 hover:bg-emerald-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServerSettingsPanel() {
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