import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Vote - QWMC" },
    { name: "description", content: "Vote for our Minecraft server and earn rewards!" },
  ];
};

const VOTING_SITES = [
  {
    name: "Minecraft-MP",
    url: "https://minecraft-mp.com/vote-for-server/1234",
    icon: "🎮",
    reward: "1x Vote Key + $1000",
  },
  {
    name: "Planet Minecraft",
    url: "https://planetminecraft.com/vote/1234",
    icon: "🌍",
    reward: "1x Vote Key + $1000",
  },
  {
    name: "Minecraft Servers",
    url: "https://minecraftservers.org/vote/1234",
    icon: "⭐",
    reward: "1x Vote Key + $1000",
  },
  {
    name: "TopG",
    url: "https://topg.org/vote-for-server/1234",
    icon: "🏆",
    reward: "1x Vote Key + $1000",
  },
  {
    name: "Minecraft Server List",
    url: "https://minecraft-server-list.com/vote/1234",
    icon: "📋",
    reward: "1x Vote Key + $1000",
  },
  {
    name: "MC Server Status",
    url: "https://mcserverstatus.com/vote/1234",
    icon: "✨",
    reward: "1x Vote Key + $1000",
  },
];

export default function Vote() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 py-24">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-minecraft text-4xl text-emerald-400">
              Vote for QWMC
            </h1>
            <p className="mt-2 text-gray-400">
              Support us by voting and earn amazing rewards!
            </p>
          </div>

          {/* Instructions */}
          <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-gray-800 bg-black/50 p-4">
            <div className="flex items-center gap-3 text-center">
              <span className="text-2xl">📝</span>
              <p className="text-gray-300">
                Click on each voting site below, vote for our server, and claim your rewards in-game!
              </p>
            </div>
          </div>

          {/* Top Voters Banner */}
          <div className="mb-12">
            <Link 
              to="/top-voters"
              className="block rounded-lg border border-gray-800 bg-black/50 p-6 text-center transition-all hover:border-emerald-400/30"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl">👑</div>
                <div>
                  <h2 className="font-minecraft text-2xl text-emerald-400">
                    Top Voters Leaderboard
                  </h2>
                  <p className="mt-1 text-gray-400">
                    Check out our most dedicated voters and their rewards
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Voting Sites Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VOTING_SITES.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="minecraft-border group relative bg-black/50 p-6 transition-all hover:border-emerald-400/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{site.icon}</div>
                  <div>
                    <h3 className="font-minecraft text-lg text-white group-hover:text-emerald-400">
                      {site.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {site.reward}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Click to Vote ➜
                </div>
              </a>
            ))}
          </div>

          {/* Rewards Info */}
          <div className="mt-12 rounded-lg border border-gray-800 bg-black/50 p-6">
            <h2 className="mb-6 font-minecraft text-2xl text-emerald-400">Voting Rewards</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <RewardCard
                icon="🎁"
                title="Vote Keys"
                description="Get special crate keys for each vote"
              />
              <RewardCard
                icon="💰"
                title="In-game Money"
                description="Earn $1000 per vote"
              />
              <RewardCard
                icon="🔥"
                title="Vote Streak"
                description="Extra rewards for voting daily"
              />
              <RewardCard
                icon="👑"
                title="Top Voter Rewards"
                description="Special perks for top voters"
              />
            </div>
          </div>

          {/* Voting Tips */}
          <div className="mt-8 space-y-4">
            <div className="rounded-lg border border-gray-800 bg-black/50 p-4">
              <p className="text-center text-sm text-gray-400">
                <span className="text-yellow-500">TIP:</span> You can vote once every 24 hours on each site. 
                Don't forget to claim your rewards in-game with /vote claim
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-black/50 p-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">⚠️</span>
                <p className="text-sm text-gray-400">
                  Make sure you're logged in to the server with the same username when voting!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
      <div className="mb-2 text-3xl">{icon}</div>
      <h3 className="font-minecraft text-lg text-emerald-400">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
  );
} 