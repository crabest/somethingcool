import { useState, useEffect } from "react";

interface ServerStats {
  totalPlayers: number;
  onlinePlayers: number;
  blocksPlaced: number;
  mobsKilled: number;
  playTimeHours: number;
  itemsTraded: number;
}

export function PlayerStats() {
  const [stats, setStats] = useState<ServerStats>({
    totalPlayers: 15783,
    onlinePlayers: 247,
    blocksPlaced: 28456789,
    mobsKilled: 1567432,
    playTimeHours: 234567,
    itemsTraded: 789432
  });

  return (
    <div className="rounded-lg border border-gray-800 bg-black/50 p-6">
      <h2 className="mb-6 font-minecraft text-2xl text-emerald-400">Server Statistics</h2>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard
          icon="👥"
          label="Total Players"
          value={formatNumber(stats.totalPlayers)}
        />
        <StatCard
          icon="🟢"
          label="Online Now"
          value={formatNumber(stats.onlinePlayers)}
          highlight
        />
        <StatCard
          icon="🏗️"
          label="Blocks Placed"
          value={formatNumber(stats.blocksPlaced)}
        />
        <StatCard
          icon="⚔️"
          label="Mobs Killed"
          value={formatNumber(stats.mobsKilled)}
        />
        <StatCard
          icon="⏰"
          label="Play Hours"
          value={formatNumber(stats.playTimeHours)}
        />
        <StatCard
          icon="💎"
          label="Items Traded"
          value={formatNumber(stats.itemsTraded)}
        />
      </div>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-400">
          Stats are updated every 5 minutes
        </span>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  highlight = false 
}: { 
  icon: string; 
  label: string; 
  value: string; 
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-800 bg-black/30 p-4 transition-all hover:border-emerald-400/30">
      <span className="text-2xl">{icon}</span>
      <span className="mt-2 text-sm text-gray-400">{label}</span>
      <span className={`font-minecraft text-lg ${
        highlight ? 'text-emerald-400' : 'text-white'
      }`}>
        {value}
      </span>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
} 