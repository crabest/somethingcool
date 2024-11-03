import type { MetaFunction } from "@remix-run/node";
import { DiscordIcon, CopyIcon } from "~/components/Icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Server Rules - QWMC" },
    { name: "description", content: "Rules and guidelines for our Minecraft server" },
  ];
};

export default function Rules() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-fixed bg-center">
      <div className="flex min-h-screen items-start justify-center page-gradient pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="minecraft-panel text-center">
              <h1 className="font-minecraft text-5xl">
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Server Rules
                </span>
              </h1>
              <p className="mt-4 text-gray-300">
                Please follow these rules to ensure a fun and fair experience for everyone
              </p>
            </div>

            {/* Rules List */}
            <div className="mt-12 space-y-6">
              <RuleSection
                number="1"
                title="General Conduct"
                rules={[
                  "Be respectful to all players",
                  "No harassment, hate speech, or excessive toxicity",
                  "No spamming or flooding the chat",
                  "Listen to and respect staff members",
                ]}
              />

              <RuleSection
                number="2"
                title="Gameplay"
                rules={[
                  "No hacking, cheating, or using unfair advantages",
                  "No exploiting bugs or glitches",
                  "No AFK machines or automated farming without permission",
                  "Respect other players' builds and property",
                  "No TP killing or spawn killing",
                ]}
              />

              <RuleSection
                number="3"
                title="Building & Property"
                rules={[
                  "No griefing or destroying others' builds",
                  "Maintain a reasonable distance from other players' builds",
                  "No inappropriate or offensive builds",
                  "Report any grief or damage to staff",
                ]}
              />

              <RuleSection
                number="4"
                title="Economy & Trading"
                rules={[
                  "No scamming or false advertising",
                  "Honor all agreed-upon trades",
                  "Use the designated trading system",
                  "Report any suspicious trading activity",
                  "No real-money trading (RMT)",
                ]}
              />
            </div>

            {/* Disclaimer */}
            <div className="minecraft-panel mt-12 border-red-900 bg-gradient-to-b from-red-950/50 to-red-950/70">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="font-minecraft text-xl text-red-400">Important Notice</h2>
              </div>
              <p className="mt-4 text-gray-300">
                Breaking these rules may result in warnings, temporary bans, or permanent bans depending
                on the severity and frequency of the offense. The server staff reserves the right to
                take appropriate action at their discretion.
              </p>
            </div>

            {/* Contact Section */}
            <div className="minecraft-panel mt-12 text-center">
              <h2 className="font-minecraft text-2xl text-emerald-400">Need Help?</h2>
              <p className="mt-2 text-gray-300">
                If you have questions about the rules or need to report a violation:
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <a 
                  href="https://discord.gg/SFeceZEQAf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="minecraft-button bg-[#5865F2]"
                >
                  <DiscordIcon />
                  Join Discord
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText('play.qwmc.net')}
                  className="minecraft-button bg-gray-700"
                >
                  <CopyIcon />
                  Copy Server IP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RuleSection({
  number,
  title,
  rules,
}: {
  number: string;
  title: string;
  rules: string[];
}) {
  return (
    <div className="minecraft-border bg-gray-900/90 p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-minecraft text-white">
          {number}
        </span>
        <h2 className="font-minecraft text-2xl text-emerald-400">{title}</h2>
      </div>
      <ul className="mt-4 space-y-2">
        {rules.map((rule, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-300">
            <span className="text-emerald-400">•</span>
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
} 