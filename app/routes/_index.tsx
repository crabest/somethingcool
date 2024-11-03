import type { MetaFunction } from "@remix-run/node";
import { DiscordIcon, StoreIcon, VoteIcon, RulesIcon } from "~/components/Icons";

export const meta: MetaFunction = () => {
  return [
    { title: "QWMC - Minecraft Server" },
    { name: "description", content: "Join our awesome Minecraft survival server!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      {/* Hero Section */}
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 py-20">
            {/* Server Title */}
            <h1 className="font-minecraft text-center text-6xl font-bold text-white">
              <span className="block text-green-400">Welcome to</span>
              <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-7xl text-transparent">
                QWMC
              </span>
            </h1>
            
            {/* Server IP */}
            <div className="group relative mt-4">
              <div className="minecraft-border flex items-center gap-3 bg-gray-900/90 px-6 py-3">
                <p className="font-minecraft text-xl text-gray-300">play.qwmc.net</p>
                <button 
                  className="rounded bg-green-600 px-3 py-1 text-sm font-bold text-white transition hover:bg-green-700"
                  onClick={() => navigator.clipboard.writeText('play.qwmc.net')}
                >
                  Copy IP
                </button>
              </div>
            </div>

            {/* Online Players & Vote */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 font-minecraft text-emerald-400">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
                <span>Players Online</span>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                title="Survival Experience" 
                icon="🏰"
                description="Pure survival gameplay with quality of life features"
              />
              <FeatureCard 
                title="Active Community" 
                icon="👥"
                description="Join our friendly community of players"
              />
              <FeatureCard 
                title="Regular Events" 
                icon="🎉"
                description="Participate in weekly events and competitions"
              />
              <FeatureCard 
                title="Economy" 
                icon="💎"
                description="Player-driven economy with shops and trading"
              />
              <FeatureCard 
                title="Anti-Grief" 
                icon="🛡️"
                description="Protected builds and anti-cheat system"
              />
              <FeatureCard 
                title="Jobs System" 
                icon="⛏️"
                description="Earn money by mining, farming, fishing and more!"
              />
            </div>

            {/* Call to Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a 
                href="https://discord.gg/SFeceZEQAf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="minecraft-button bg-[#5865F2] hover:bg-[#4752C4]"
              >
                <DiscordIcon />
                Join Discord
              </a>
              <a 
                href="https://store.qwmc.net" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="minecraft-button bg-emerald-600 hover:bg-emerald-700"
              >
                <StoreIcon />
                Store
              </a>
              <a href="/vote" className="minecraft-button bg-purple-600 hover:bg-purple-700">
                <VoteIcon />
                Vote
              </a>
              <a href="/rules" className="minecraft-button bg-red-600 hover:bg-red-700">
                <RulesIcon />
                Rules
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, icon, description }: { title: string; icon: string; description: string }) {
  return (
    <div className="minecraft-border group bg-gray-900/90 p-4 transition-transform hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-minecraft text-lg text-emerald-400">{title}</h3>
      </div>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
  );
}
