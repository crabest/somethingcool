import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "404 - Lost in the Void - QWMC" },
    { name: "description", content: "You've ventured too far from spawn!" },
  ];
};

const MINECRAFT_DEATH_MESSAGES = [
  "tried to swim in lava",
  "fell from a high place",
  "was slain by Zombie",
  "was shot by Skeleton",
  "hit the ground too hard",
  "suffocated in a wall",
  "discovered the floor was lava",
  "went up in flames",
  "got lost in the End",
  "tried to hug a Creeper",
];

export default function NotFound() {
  const [deathMessage] = useState(() => 
    MINECRAFT_DEATH_MESSAGES[Math.floor(Math.random() * MINECRAFT_DEATH_MESSAGES.length)]
  );
  const [coordinates] = useState({
    x: Math.floor(Math.random() * 10000) - 5000,
    y: Math.floor(Math.random() * 64) + 1,
    z: Math.floor(Math.random() * 10000) - 5000,
  });
  const [respawnCountdown, setRespawnCountdown] = useState(5);

  useEffect(() => {
    if (respawnCountdown > 0) {
      const timer = setTimeout(() => setRespawnCountdown(count => count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [respawnCountdown]);

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 py-20 text-center">
          {/* Death Screen */}
          <div className="mb-8">
            <h1 className="font-minecraft text-8xl font-bold text-red-500">
              You Died!
            </h1>
            <p className="mt-4 font-minecraft text-2xl text-gray-300">
              <span className="text-red-400">Player404</span> {deathMessage}
            </p>
          </div>

          {/* Score Display */}
          <div className="mb-12 font-minecraft text-xl text-gray-400">
            <p>Score: 404</p>
            <p className="text-yellow-400">⭐ Experience: 69420 ⭐</p>
          </div>

          {/* Last Known Coordinates */}
          <div className="mx-auto mb-8 max-w-md rounded-lg border border-gray-800 bg-black/70 p-4 font-minecraft">
            <h3 className="mb-2 text-emerald-400">Last Known Coordinates:</h3>
            <p className="text-gray-300">
              X: <span className="text-red-400">{coordinates.x}</span>{" "}
              Y: <span className="text-green-400">{coordinates.y}</span>{" "}
              Z: <span className="text-blue-400">{coordinates.z}</span>
            </p>
          </div>

          {/* Console Output */}
          <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-gray-800 bg-black/80 p-4 font-minecraft">
            <div className="text-left">
              <p className="text-red-400">[ERROR] Player not found in chunk data</p>
              <p className="text-yellow-400">[WARN] Connection to world lost</p>
              <p className="text-gray-400">[INFO] Attempting to locate nearest spawn point...</p>
              <p className="text-emerald-400">[SUCCESS] Spawn point located at /home</p>
            </div>
          </div>

          {/* Respawn Section */}
          <div className="mb-8">
            {respawnCountdown > 0 ? (
              <div className="animate-pulse font-minecraft text-2xl text-red-400">
                Respawning in {respawnCountdown}...
              </div>
            ) : (
              <div className="flex justify-center gap-4">
                <Link
                  to="/"
                  className="minecraft-button bg-red-600 hover:bg-red-700"
                >
                  Respawn
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="minecraft-button bg-gray-700 hover:bg-gray-600"
                >
                  /back
                </button>
              </div>
            )}
          </div>

          {/* Inventory Lost Message */}
          <div className="mt-4 animate-bounce font-minecraft text-yellow-500">
            ⚠️ Warning: Items in inventory may have been lost! ⚠️
          </div>

          {/* Random Minecraft Tips */}
          <div className="mt-8 rounded-lg border border-gray-800 bg-black/50 p-4">
            <p className="text-sm text-gray-400">
              <span className="text-yellow-500">TIP:</span>{" "}
              {[
                "Always carry a water bucket for MLG saves!",
                "Never dig straight down!",
                "Keep your render distance high to avoid getting lost!",
                "Place torches on your left while exploring caves!",
                "Make sure to create a backup of your world!",
              ][Math.floor(Math.random() * 5)]}
            </p>
          </div>

          {/* Achievement Unlocked */}
          <div className="mt-8 animate-slideIn">
            <div className="mx-auto w-fit rounded-lg bg-gray-900/90 px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-yellow-500/20 p-2 text-2xl">
                  🏆
                </span>
                <div className="text-left">
                  <div className="font-minecraft text-yellow-400">
                    Achievement Unlocked!
                  </div>
                  <div className="text-sm text-gray-400">
                    "How Did We Get Here?"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 