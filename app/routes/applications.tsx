import { Link, Outlet } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Applications - QWMC" },
    { name: "description", content: "Apply for staff positions on our Minecraft server!" },
  ];
};

const APPLICATIONS = [
  {
    id: "staff",
    title: "Staff Application",
    description: "Join our team of moderators and administrators",
    icon: "👮",
    requirements: [
      "Must be at least 14 years old",
      "Must have been active on the server for at least 1 month",
      "Must have Discord and a working microphone",
      "Previous moderation experience is a plus",
    ],
  },
  {
    id: "builder",
    title: "Builder Application",
    description: "Help create amazing builds and structures",
    icon: "🏗️",
    requirements: [
      "Must have previous building experience",
      "Must be able to work in a team",
      "Must have a portfolio of previous builds",
      "Knowledge of WorldEdit is a plus",
    ],
  },
  {
    id: "youtuber",
    title: "YouTuber Application",
    description: "Create content and grow with our community",
    icon: "🎥",
    requirements: [
      "Must have an active YouTube channel",
      "Must have at least one video about our server",
      "Must commit to regular content about the server",
    ],
  },
];

export default function Apply() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-fixed bg-center">
      <div className="flex min-h-screen items-start justify-center bg-gradient-to-b from-black/50 to-black/70 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="minecraft-panel text-center">
              <h1 className="font-minecraft text-6xl">
                <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                  Join Our Team
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Choose a position below to submit your application
              </p>
            </div>

            {/* Applications Grid and Outlet in a flex container */}
            <div className="mt-12">
              {/* Form Outlet - Only show when there's a match */}
              <div className={`${!Boolean(Outlet) && "hidden"}`}>
                <Outlet />
              </div>

              {/* Applications Grid - Full width when no form is shown */}
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {APPLICATIONS.map((app) => (
                  <ApplicationCard key={app.id} {...app} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationCard({ id, title, description, icon, requirements }: {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirements: string[];
}) {
  return (
    <div className="minecraft-border group relative overflow-hidden bg-gray-900/90 p-6 transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{icon}</span>
          <h2 className="font-minecraft text-2xl text-emerald-400">{title}</h2>
        </div>
        
        <p className="mt-4 text-gray-300">{description}</p>
        
        <div className="mt-6">
          <h3 className="font-minecraft text-lg text-emerald-400">Requirements:</h3>
          <ul className="mt-3 space-y-2">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <span className="text-emerald-400">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to={id}
          className="minecraft-button mt-8 inline-flex w-full justify-center bg-emerald-600 transition-all hover:-translate-y-0.5 hover:bg-emerald-500"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
} 