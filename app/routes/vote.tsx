import type { MetaFunction } from "@remix-run/node";
import { CopyIcon } from "~/components/Icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Vote - QWMC" },
    { name: "description", content: "Vote for our Minecraft server and earn rewards!" },
  ];
};

const VOTE_SITES = [
  {
    name: "TopG",
    url: "https://topg.org/minecraft-servers/server-668389",
    reward: "1 Vote Key",
    cooldown: "24 hours",
  },
  {
    name: "TopMinecraftServers.org",
    url: "https://topminecraftservers.org/server/39280",
    reward: "1 Vote Key",
    cooldown: "24 hours",
  },
  {
    name: "Minecraft.Menu",
    url: "https://minecraft.menu/server-qwmc.3868",
    reward: "1 Vote Key",
    cooldown: "24 hours",
  },
  {
    name: "Minecraft-Server-List.com",
    url: "https://minecraft-server-list.com/server/508192/vote/",
    reward: "1 Vote Key",
    cooldown: "24 hours",
  },
  {
    name: "Minecraft.Buzz",
    url: "https://minecraft.buzz/vote/12381",
    reward: "1 Vote Key",
    cooldown: "24 hours",
  },
  {
    name: "Minecraft-Serverlist.com",
    url: "https://minecraft-serverlist.com/server/1864/vote",
    reward: "1 Vote Key",
    cooldown: "24 hours",
  },
  {
    name: "Servers-Minecraft.net",
    url: "https://servers-minecraft.net/server-qwmc.40705",
    reward: "1 Vote Key",
    cooldown: "24 hours",
  },
  {
    name: "Minecraft-Servers.net",
    url: "https://minecraft-server.net/vote/QWMC/",
    reward: "1 Vote Key",
    cooldown: "24 hours",
  },
];

export default function Vote() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-fixed bg-center">
      <div className="flex min-h-screen items-start justify-center bg-gradient-to-b from-black/50 to-black/70 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="minecraft-panel text-center">
              <h1 className="font-minecraft text-5xl">
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Vote for QWMC
                </span>
              </h1>
              <p className="mt-4 text-gray-300">
                Support our server by voting and earn amazing rewards!
              </p>
            </div>

            {/* Vote Sites Grid - Now 2 per row */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {VOTE_SITES.map((site, index) => (
                <VoteSiteCard
                  key={index}
                  number={index + 1}
                  {...site}
                />
              ))}
            </div>

            {/* Rewards Info */}
            <div className="minecraft-panel mt-8">
              <h2 className="font-minecraft text-2xl text-emerald-400">Voting Rewards</h2>
              <div className="mt-4 space-y-2 text-gray-300">
                <p>• Each vote gives you 1 Vote Key</p>
                <p>• Vote on all sites daily to earn bonus rewards</p>
                <p>• Monthly top voters receive special prizes</p>
                <p>• Keys can be used at spawn for random rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VoteSiteCard({ number, name, url, reward, cooldown }: {
  number: number;
  name: string;
  url: string;
  reward: string;
  cooldown: string;
}) {
  return (
    <div className="minecraft-border group bg-gray-900/90 p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-minecraft text-white">
          {number}
        </span>
        <h2 className="font-minecraft text-xl text-emerald-400">{name}</h2>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="space-y-1 text-gray-300">
          <p>Reward: {reward}</p>
          <p>Cooldown: {cooldown}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="minecraft-button mt-2 bg-emerald-600 hover:bg-emerald-700 w-full justify-center"
        >
          Vote Now
        </a>
      </div>
    </div>
  );
} 