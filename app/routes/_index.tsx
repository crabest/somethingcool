import type { MetaFunction } from "@remix-run/node";
import { DiscordIcon, StoreIcon, VoteIcon, RulesIcon } from "~/components/Icons";
import { NewsSection } from "~/components/NewsSection";
import { PlayerStats } from "~/components/PlayerStats";

export const meta: MetaFunction = () => {
  return [
    { title: "QWMC - Minecraft Server" },
    { name: "description", content: "Join our awesome Minecraft survival server!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="flex flex-col items-center gap-8 py-12 pt-24">
            {/* Server Title */}
            <h1 className="font-minecraft text-center text-6xl font-bold text-white">
              <span className="block text-green-400">Welcome to</span>
              <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-7xl text-transparent">
                QWMC
              </span>
            </h1>
            
            {/* Server IP */}
            <div className="group relative">
              <div className="minecraft-border flex items-center gap-3 bg-gray-900/90 px-6 py-3">
                <p className="font-minecraft text-xl text-gray-300 group-hover:text-emerald-400 transition-colors">
                  {Array.from('play.qwmc.net').map((char, i) => (
                    <span 
                      key={i}
                      className={`inline-block ${char === '.' ? 'text-emerald-400' : 'animate-pulse hover:animate-none'}`}
                      style={char !== '.' ? {animationDelay: `${(i + 1) * 0.1}s`} : undefined}
                    >
                      {char}
                    </span>
                  ))}
                </p>
                <button 
                  className="rounded bg-emerald-600 px-3 py-1 text-sm font-bold text-white transition-all hover:bg-emerald-700 hover:scale-105 relative group"
                  onClick={() => {
                    navigator.clipboard.writeText('play.qwmc.net');
                    const button = document.activeElement as HTMLButtonElement;
                    button.textContent = 'Copied!';
                    button.classList.add('bg-emerald-500');
                    setTimeout(() => {
                      button.textContent = 'Copy IP';
                      button.classList.remove('bg-emerald-500');
                    }, 5000);
                  }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Click to copy IP
                  </span>
                  Copy IP
                </button>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
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

          {/* Main Content Grid */}
          <div className="grid gap-8 pb-20 lg:grid-cols-3">
            {/* News Section - Takes 2 columns */}
            <div className="lg:col-span-2">
              <NewsSection />
            </div>

            {/* Features Section - Takes 1 column */}
            <div className="flex flex-col gap-4">
              <h2 className="font-minecraft text-2xl text-emerald-400">Server Features</h2>
              <div className="flex flex-col gap-4">
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
