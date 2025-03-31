import { useState } from "react";

interface VoterStats {
  username: string;
  votes: number;
  streak: number;
  lastVote: string;
  rank: number;
  rewards: string[];
  avatar?: string;
}

export default function TopVoters() {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'allTime'>('monthly');

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 py-24">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-minecraft text-4xl text-emerald-400">
              Top Voters
            </h1>
            <p className="mt-2 text-gray-400">
              Support the server and earn exclusive rewards!
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="mb-8 flex justify-center gap-4">
            {(['daily', 'monthly', 'allTime'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`rounded-lg px-4 py-2 font-minecraft transition-colors ${
                  timeframe === period
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400'
                }`}
              >
                {period === 'allTime' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>

          {/* Top 3 Podium */}
          <div className="mb-12 flex justify-center gap-8">
            {/* 2nd Place */}
            <div className="order-1 mt-8">
              <div className="flex flex-col items-center">
                <div className="mb-4 text-4xl">🥈</div>
                <div className="relative h-24 w-24">
                  <img
                    src={topVoters[1].avatar || 'https://mc-heads.net/avatar/MHF_Steve'}
                    alt={topVoters[1].username}
                    className="rounded-lg border-4 border-[#C0C0C0] bg-gray-800"
                  />
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#C0C0C0] font-minecraft text-gray-900">
                    2
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <div className="font-minecraft text-lg text-white">{topVoters[1].username}</div>
                  <div className="text-[#C0C0C0]">{topVoters[1].votes} votes</div>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="order-2">
              <div className="flex flex-col items-center">
                <div className="mb-4 text-5xl">👑</div>
                <div className="relative h-32 w-32">
                  <img
                    src={topVoters[0].avatar || 'https://mc-heads.net/avatar/MHF_Steve'}
                    alt={topVoters[0].username}
                    className="rounded-lg border-4 border-[#FFD700] bg-gray-800"
                  />
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] font-minecraft text-gray-900">
                    1
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <div className="font-minecraft text-xl text-white">{topVoters[0].username}</div>
                  <div className="text-[#FFD700]">{topVoters[0].votes} votes</div>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 mt-12">
              <div className="flex flex-col items-center">
                <div className="mb-4 text-4xl">🥉</div>
                <div className="relative h-20 w-20">
                  <img
                    src={topVoters[2].avatar || 'https://mc-heads.net/avatar/MHF_Steve'}
                    alt={topVoters[2].username}
                    className="rounded-lg border-4 border-[#CD7F32] bg-gray-800"
                  />
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#CD7F32] font-minecraft text-gray-900">
                    3
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <div className="font-minecraft text-lg text-white">{topVoters[2].username}</div>
                  <div className="text-[#CD7F32]">{topVoters[2].votes} votes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="mx-auto max-w-4xl rounded-lg border border-gray-800 bg-black/50">
            <table className="w-full">
              <thead className="border-b border-gray-800 bg-black/50">
                <tr>
                  <th className="p-4 text-left font-minecraft text-emerald-400">Rank</th>
                  <th className="p-4 text-left font-minecraft text-emerald-400">Player</th>
                  <th className="p-4 text-left font-minecraft text-emerald-400">Votes</th>
                  <th className="p-4 text-left font-minecraft text-emerald-400">Streak</th>
                  <th className="p-4 text-left font-minecraft text-emerald-400">Last Vote</th>
                  <th className="p-4 text-left font-minecraft text-emerald-400">Rewards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {topVoters.map((voter) => (
                  <tr key={voter.username} className="hover:bg-emerald-500/5">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {voter.rank <= 3 ? (
                          <span className="text-xl">
                            {voter.rank === 1 ? '👑' : voter.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        ) : (
                          <span className="font-minecraft text-gray-400">#{voter.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={voter.avatar || 'https://mc-heads.net/avatar/MHF_Steve'}
                          alt={voter.username}
                          className="h-8 w-8 rounded bg-gray-800"
                        />
                        <span className="font-minecraft text-white">{voter.username}</span>
                      </div>
                    </td>
                    <td className="p-4 text-emerald-400">{voter.votes}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-yellow-400">
                        🔥 {voter.streak} days
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(voter.lastVote).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {voter.rewards.map((reward, index) => (
                          <span
                            key={index}
                            className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400"
                          >
                            {reward}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rewards Info */}
          <div className="mt-8 rounded-lg border border-gray-800 bg-black/50 p-6">
            <h2 className="mb-4 font-minecraft text-2xl text-emerald-400">Vote Rewards</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <RewardTier
                title="Daily Voter"
                description="Vote every day to maintain your streak"
                rewards={['$1000 in-game money', '10 Vote Keys', 'Daily Voter Tag']}
              />
              <RewardTier
                title="Top 3 Monthly"
                description="Reach top 3 in monthly votes"
                rewards={['$10000 in-game money', '50 Vote Keys', 'Special Discord Role']}
              />
              <RewardTier
                title="All-Time Leaders"
                description="Be among the most dedicated voters"
                rewards={['Custom Player Tag', 'Exclusive Pet', 'Special Commands']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardTier({ title, description, rewards }: { title: string; description: string; rewards: string[] }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
      <h3 className="font-minecraft text-lg text-emerald-400">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
      <ul className="mt-4 space-y-2">
        {rewards.map((reward, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-white">
            <span className="text-emerald-400">✓</span>
            {reward}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Mock data
const topVoters: VoterStats[] = [
  {
    username: "DuckyKnightMC",
    votes: 487,
    streak: 65,
    lastVote: "2024-03-15",
    rank: 1,
    rewards: ["Top Voter", "Streak Master"],
    avatar: "https://mc-heads.net/avatar/DuckyKnightMC"
  },
  {
    username: "Luky1Up",
    votes: 456,
    streak: 45,
    lastVote: "2024-03-15",
    rank: 2,
    rewards: ["Elite Voter"],
    avatar: "https://mc-heads.net/avatar/Luky1Up"
  },
  {
    username: "TarboushMC",
    votes: 423,
    streak: 30,
    lastVote: "2024-03-15",
    rank: 3,
    rewards: ["Dedicated"],
    avatar: "https://mc-heads.net/avatar/TarboushMC"
  },
  {
    username: "Destitution_",
    votes: 423,
    streak: 30,
    lastVote: "2024-03-15",
    rank: 3,
    rewards: ["Dedicated"],
    avatar: "https://mc-heads.net/avatar/Destitution_"
  },
  {
    username: "_InfamousDevil_",
    votes: 423,
    streak: 30,
    lastVote: "2024-03-15",
    rank: 3,
    rewards: ["Dedicated"],
    avatar: "https://mc-heads.net/avatar/_InfamousDevil_"
  },
  // Add more voters...
]; 