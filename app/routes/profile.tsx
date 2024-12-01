import type { LoaderFunction } from "@remix-run/node";

// Extended mock data with more Minecraft-specific details
const mockUserData = {
  minecraft: {
    username: "TorrenG",
    uuid: "12345678-1234-5678-1234-567812345678",
    firstJoin: "2024-01-15T12:00:00Z",
    lastSeen: "2024-03-14T15:30:00Z",
    playtime: "150h 23m",
    ranks: [
      {
        name: "VIP",
        color: "#55FF55",
        obtainedAt: "2024-02-01T00:00:00Z"
      },
      {
        name: "Builder",
        color: "#00AAAA",
        obtainedAt: "2024-02-15T00:00:00Z"
      }
    ],
    currentWorld: "survival",
    balance: 15000,
    homes: ["home", "mine", "farm"],
    friends: 23,
    reputation: 850
  },
  statistics: {
    combat: {
      kills: 1250,
      deaths: 890,
      kdr: 1.40,
      highestKillstreak: 15,
      pvpWins: 125,
      mobKills: 3456
    },
    building: {
      blocksPlaced: 45678,
      blocksBroken: 32456,
      itemsCrafted: 1234,
      toolsBroken: 89,
      structuresBuilt: 12
    },
    economy: {
      totalEarned: 50000,
      totalSpent: 35000,
      shopTransactions: 234,
      tradingReputation: 4.5
    }
  },
  achievements: [
    {
      name: "Master Builder",
      description: "Place 10,000 blocks",
      obtainedAt: "2024-02-20T00:00:00Z",
      icon: "🏗️",
      rarity: "Rare"
    },
    {
      name: "PvP Champion",
      description: "Achieve 1000 kills",
      obtainedAt: "2024-03-01T00:00:00Z",
      icon: "⚔️",
      rarity: "Epic"
    },
    {
      name: "Rich Merchant",
      description: "Earn 50,000 coins",
      obtainedAt: "2024-03-10T00:00:00Z",
      icon: "💰",
      rarity: "Uncommon"
    }
  ],
  offenses: [
    {
      type: "Warning",
      reason: "Inappropriate language in chat",
      issuedBy: "Moderator_Steve",
      issuedAt: "2024-03-01T15:30:00Z",
      expiresAt: "2024-03-15T15:30:00Z",
      status: "Expired"
    },
    {
      type: "Mute",
      reason: "Spamming in global chat",
      issuedBy: "Admin_Alex",
      issuedAt: "2024-02-15T10:20:00Z",
      expiresAt: "2024-02-16T10:20:00Z",
      status: "Expired"
    },
    {
      type: "Temporary Ban",
      reason: "Using unauthorized mods",
      issuedBy: "Senior_Mod_Jane",
      issuedAt: "2024-01-20T08:45:00Z",
      expiresAt: "2024-01-27T08:45:00Z",
      status: "Expired"
    }
  ],
  logs: [
    {
      type: "Login",
      timestamp: "2024-03-14T15:30:00Z",
      ip: "***.***.***.**",
      location: "New York, US"
    },
    {
      type: "Command",
      timestamp: "2024-03-14T15:35:00Z",
      command: "/home",
      world: "survival_world"
    },
    {
      type: "Chat",
      timestamp: "2024-03-14T15:40:00Z",
      message: "Hello everyone!",
      channel: "Global"
    },
    {
      type: "Transaction",
      timestamp: "2024-03-14T16:00:00Z",
      details: "Purchased VIP rank",
      amount: "10.00 USD"
    }
  ]
};

export const loader: LoaderFunction = async () => {
  // In the future, fetch real user data here
  return { user: mockUserData };
};

export default function Profile() {
  return (
    <main className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Enhanced Header Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <img 
                  src={`https://mc-heads.net/avatar/${mockUserData.minecraft.username}/100`}
                  alt={mockUserData.minecraft.username}
                  className="w-24 h-24 rounded-lg transition-transform group-hover:scale-105"
                />
                <img 
                  src={`https://mc-heads.net/head/${mockUserData.minecraft.username}`}
                  alt="3D head"
                  className="absolute -bottom-4 -right-4 w-12 h-12 transform rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
              <div className="text-center">
                <div className="font-minecraft text-sm text-gray-400">Reputation</div>
                <div className="text-2xl font-minecraft text-emerald-400">
                  {mockUserData.minecraft.reputation}
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-minecraft bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    {mockUserData.minecraft.username}
                  </h1>
                  <div className="flex gap-2 mt-2">
                    {mockUserData.minecraft.ranks.map((rank) => (
                      <span 
                        key={rank.name}
                        className="px-3 py-1 rounded-full text-sm font-minecraft"
                        style={{ backgroundColor: rank.color + '33', color: rank.color }}
                      >
                        {rank.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-minecraft text-emerald-400">Balance</div>
                  <div className="text-2xl font-minecraft">
                    ⛃ {mockUserData.minecraft.balance.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <StatBox label="Friends" value={mockUserData.minecraft.friends} />
                <StatBox label="Homes Set" value={mockUserData.minecraft.homes.length} />
                <StatBox label="Current World" value={mockUserData.minecraft.currentWorld} />
                <StatBox 
                  label="Playtime" 
                  value={mockUserData.minecraft.playtime}
                  className="text-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <QuickStat 
            label="PvP Rating"
            value={`${(mockUserData.statistics.combat.pvpWins / (mockUserData.statistics.combat.kills / 10)).toFixed(2)}%`}
            icon="⚔️"
          />
          <QuickStat 
            label="Building Score"
            value={Math.floor(mockUserData.statistics.building.blocksPlaced / 1000)}
            icon="🏗️"
          />
          <QuickStat 
            label="Trading Score"
            value={mockUserData.statistics.economy.tradingReputation}
            icon="💰"
          />
          <QuickStat 
            label="Achievement Points"
            value={mockUserData.achievements.length * 100}
            icon="🏆"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-minecraft text-emerald-400 mb-4">Minecraft Info</h2>
            <div className="space-y-2 font-minecraft text-gray-300">
              <p>First Join: {new Date(mockUserData.minecraft.firstJoin).toLocaleDateString()}</p>
              <p>Last Seen: {new Date(mockUserData.minecraft.lastSeen).toLocaleDateString()}</p>
              <p>Playtime: {mockUserData.minecraft.playtime}</p>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-minecraft text-emerald-400 mb-4">Combat Statistics</h2>
            <div className="space-y-2 font-minecraft text-gray-300">
              <p>Kills: {mockUserData.statistics.combat.kills}</p>
              <p>Deaths: {mockUserData.statistics.combat.deaths}</p>
              <p>K/D Ratio: {mockUserData.statistics.combat.kdr}</p>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-minecraft text-emerald-400 mb-4">Building Statistics</h2>
            <div className="space-y-2 font-minecraft text-gray-300">
              <p>Blocks Placed: {mockUserData.statistics.building.blocksPlaced.toLocaleString()}</p>
              <p>Blocks Broken: {mockUserData.statistics.building.blocksBroken.toLocaleString()}</p>
              <p>Items Crafted: {mockUserData.statistics.building.itemsCrafted.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-emerald-500/50 transition-colors">
          <h2 className="text-xl font-minecraft text-emerald-400 mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUserData.achievements.map((achievement) => (
              <div 
                key={achievement.name}
                className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg p-4 flex items-start gap-3 hover:border-emerald-500/30 transition-colors"
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-minecraft text-emerald-400">{achievement.name}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Obtained: {new Date(achievement.obtainedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offenses History Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-minecraft text-emerald-400 mb-4">Offense History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr className="text-left">
                  <th className="pb-2 font-minecraft text-gray-400">Type</th>
                  <th className="pb-2 font-minecraft text-gray-400">Reason</th>
                  <th className="pb-2 font-minecraft text-gray-400">Issued By</th>
                  <th className="pb-2 font-minecraft text-gray-400">Date</th>
                  <th className="pb-2 font-minecraft text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockUserData.offenses.map((offense, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="py-3 font-minecraft text-gray-300">
                      <span className={`px-2 py-1 rounded text-sm ${
                        offense.type === "Warning" ? "bg-yellow-500/20 text-yellow-400" :
                        offense.type === "Mute" ? "bg-orange-500/20 text-orange-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {offense.type}
                      </span>
                    </td>
                    <td className="py-3 text-gray-300">{offense.reason}</td>
                    <td className="py-3 text-gray-300">{offense.issuedBy}</td>
                    <td className="py-3 text-gray-300">{new Date(offense.issuedAt).toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        offense.status === "Active" ? "bg-red-500/20 text-red-400" : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {offense.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Logs Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-minecraft text-emerald-400 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {mockUserData.logs.map((log, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 border-b border-gray-700/50 pb-4 last:border-0"
              >
                <div className={`p-2 rounded ${
                  log.type === "Login" ? "bg-blue-500/20" :
                  log.type === "Command" ? "bg-purple-500/20" :
                  log.type === "Chat" ? "bg-green-500/20" :
                  "bg-yellow-500/20"
                }`}>
                  <span className="text-lg">
                    {log.type === "Login" ? "🔐" :
                     log.type === "Command" ? "⌨️" :
                     log.type === "Chat" ? "💬" :
                     "💰"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-minecraft text-gray-300">{log.type}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 text-gray-400">
                    {log.type === "Login" && (
                      <>IP: {log.ip} | Location: {log.location}</>
                    )}
                    {log.type === "Command" && (
                      <>Command: {log.command} | World: {log.world}</>
                    )}
                    {log.type === "Chat" && (
                      <>Message: {log.message} | Channel: {log.channel}</>
                    )}
                    {log.type === "Transaction" && (
                      <>Details: {log.details} | Amount: {log.amount}</>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatBox({ label, value, className = "" }: { label: string; value: string | number; className?: string }) {
  return (
    <div className="bg-gray-700/30 rounded-lg p-3 text-center">
      <div className="text-sm text-gray-400 font-minecraft">{label}</div>
      <div className={`text-lg font-minecraft ${className}`}>{value}</div>
    </div>
  );
}

function QuickStat({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-emerald-500/50 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <div className="text-sm text-gray-400 font-minecraft">{label}</div>
          <div className="text-xl font-minecraft text-emerald-400">{value}</div>
        </div>
      </div>
    </div>
  );
} 