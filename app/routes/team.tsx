import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Staff Team - QWMC" },
    { name: "description", content: "Meet the dedicated staff team behind QWMC" },
  ];
};

interface TeamMember {
  username: string;
  role: 'owner' | 'admin' | 'moderator' | 'helper' | 'builder';
  joinDate: string;
  description: string;
  status: 'online' | 'offline' | 'away';
  specialization?: string[];
  socials?: {
    discord?: string;
    youtube?: string;
    twitter?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    username: "TorrenG",
    role: "owner",
    joinDate: "2023-01-01",
    description: "Server owner and lead developer",
    status: "online",
    specialization: ["Development", "Management", "Community"],
    socials: {
      discord: "TorrenG#0001",
      youtube: "TorrenG",
    }
  },
  {
    username: "Alexis",
    role: "admin",
    joinDate: "2023-02-15", 
    description: "Lead administrator and community manager",
    status: "online",
    specialization: ["Community Management", "Event Planning", "Support"],
    socials: {
      discord: "Alexis#1234",
      twitter: "AlexisGaming"
    }
  },
  {
    username: "BuildMaster99",
    role: "builder",
    joinDate: "2023-03-20",
    description: "Creative lead and head builder",
    status: "away",
    specialization: ["Architecture", "Terraforming", "Interior Design"],
    socials: {
      youtube: "BuildMaster99",
      discord: "BuildMaster#9999"
    }
  },
  {
    username: "NightWatch",
    role: "moderator", 
    joinDate: "2023-04-10",
    description: "Senior moderator focused on maintaining server harmony",
    status: "offline",
    specialization: ["Conflict Resolution", "Player Support"],
    socials: {
      discord: "NightWatch#5555"
    }
  },
  {
    username: "SkyHelper",
    role: "helper",
    joinDate: "2023-06-01",
    description: "Friendly helper specializing in new player guidance",
    status: "online",
    specialization: ["New Player Support", "Game Mechanics", "Tutorial Guide"],
    socials: {
      discord: "SkyHelper#7777"
    }
  },
  {
    username: "CraftPro",
    role: "builder",
    joinDate: "2023-07-15",
    description: "Specialized in medieval and fantasy builds",
    status: "online",
    specialization: ["Medieval Architecture", "Fantasy Builds", "Landscaping"],
    socials: {
      youtube: "CraftProBuilds",
      twitter: "CraftPro_MC"
    }
  }
];

const ROLE_INFO = {
  owner: {
    color: "text-red-400",
    badge: "👑",
    title: "Owner",
    description: "Server owner and primary decision maker"
  },
  admin: {
    color: "text-purple-400",
    badge: "⚡",
    title: "Administrator",
    description: "Manages server operations and staff team"
  },
  moderator: {
    color: "text-blue-400",
    badge: "🛡️",
    title: "Moderator",
    description: "Ensures server rules are followed"
  },
  helper: {
    color: "text-emerald-400",
    badge: "💫",
    title: "Helper",
    description: "Assists players and answers questions"
  },
  builder: {
    color: "text-yellow-400",
    badge: "🏗️",
    title: "Builder",
    description: "Creates amazing builds and structures"
  },
} as const;

export default function Team() {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-minecraft text-4xl text-emerald-400 mb-3">
          Staff Team
        </h1>
        <p className="text-gray-300">
          Meet the dedicated team that makes QWMC possible
        </p>
      </div>

      {/* Role Categories */}
      <div className="max-w-6xl mx-auto space-y-16">
        {(Object.keys(ROLE_INFO) as Array<keyof typeof ROLE_INFO>).map((role) => {
          const members = TEAM_MEMBERS.filter(member => member.role === role);
          if (members.length === 0) return null;

          return (
            <div key={role} className="text-center">
              <div className="mb-8">
                <h2 className={`font-minecraft text-2xl ${ROLE_INFO[role].color} flex items-center justify-center gap-2`}>
                  <span>{ROLE_INFO[role].badge}</span>
                  {ROLE_INFO[role].title}s
                </h2>
                <p className="mt-2 text-gray-400">{ROLE_INFO[role].description}</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                  <div 
                    key={member.username}
                    className="rounded-lg border border-gray-800 bg-black/50 p-6 text-center"
                  >
                    {/* Avatar */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <img
                          src={`https://mc-heads.net/avatar/${member.username}/100`}
                          alt={member.username}
                          className="h-20 w-20 rounded-lg"
                        />
                        <div className="absolute -right-2 -top-2">
                          <span className="text-xl">{ROLE_INFO[member.role].badge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="font-minecraft text-lg text-white mb-1">
                      {member.username}
                    </h3>
                    <p className={`text-sm ${ROLE_INFO[member.role].color} mb-3`}>
                      {ROLE_INFO[member.role].title}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      {member.description}
                    </p>

                    {/* Specializations */}
                    {member.specialization && (
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {member.specialization.map((spec) => (
                          <span
                            key={spec}
                            className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Social Links */}
                    {member.socials && (
                      <div className="flex justify-center gap-4 text-sm">
                        {member.socials.discord && (
                          <a
                            href={`https://discord.com/users/${member.socials.discord}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#5865F2]"
                          >
                            Discord
                          </a>
                        )}
                        {member.socials.youtube && (
                          <a
                            href={`https://youtube.com/@${member.socials.youtube}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-red-500"
                          >
                            YouTube
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a
                            href={`https://twitter.com/${member.socials.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400"
                          >
                            Twitter
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Join the Team Section */}
      <div className="mt-16 max-w-2xl mx-auto text-center rounded-lg border border-gray-800 bg-black/50 p-8">
        <h2 className="font-minecraft text-2xl text-emerald-400 mb-3">
          Want to Join Our Team?
        </h2>
        <p className="text-gray-300 mb-6">
          We're always looking for passionate people to help make QWMC even better!
        </p>
        <Link
          to="/applications"
          className="minecraft-button inline-block bg-emerald-600 hover:bg-emerald-700"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
} 